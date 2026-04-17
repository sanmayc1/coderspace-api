import { injectable } from 'tsyringe';
import mongoose from 'mongoose';
import { IAdminDashboardRepository, IDashboardStats } from '../../domain/repositoryInterfaces/admin-dashboard-repository.interface';

@injectable()
export class AdminDashboardRepository implements IAdminDashboardRepository {
  async getDashboardStats(): Promise<IDashboardStats> {
    const UserModel = mongoose.model('User');
    const PaymentModel = mongoose.model('Payment');
    const ProblemModel = mongoose.model('Problem');
    const InterviewModel = mongoose.model('Interview');

    const [totalUsers, activeSubscriptions, totalProblems, totalInterviews] = await Promise.all([
      UserModel.countDocuments(),
      PaymentModel.countDocuments({ status: 'success' }),
      ProblemModel.countDocuments(),
      InterviewModel.countDocuments()
    ]);

    const currentYear = new Date().getFullYear();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const userStats = await UserModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
            $lte: new Date(`${currentYear}-12-31T23:59:59.999Z`)
          }
        }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          users: { $sum: 1 }
        }
      }
    ]);

    const paymentStats = await PaymentModel.aggregate([
      {
        $match: {
          status: 'success',
          createdAt: {
            $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
            $lte: new Date(`${currentYear}-12-31T23:59:59.999Z`)
          }
        }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$amount" }
        }
      }
    ]);

    const monthlyGrowthData = months.map((name, index) => {
      const month = index + 1;
      const uStat = userStats.find((s: any) => s._id === month);
      const pStat = paymentStats.find((s: any) => s._id === month);
      return {
        name,
        users: uStat ? uStat.users : 0,
        revenue: pStat ? pStat.revenue : 0
      };
    });

    return {
      quicktab: {
        totalUsers,
        activeSubscriptions,
        totalProblems,
        totalInterviews
      },
      monthlyGrowthData
    };
  }
}
