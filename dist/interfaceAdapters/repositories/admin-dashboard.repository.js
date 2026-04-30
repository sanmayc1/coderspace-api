"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDashboardRepository = void 0;
const tsyringe_1 = require("tsyringe");
const mongoose_1 = __importDefault(require("mongoose"));
let AdminDashboardRepository = class AdminDashboardRepository {
    async getDashboardStats() {
        const UserModel = mongoose_1.default.model('User');
        const PaymentModel = mongoose_1.default.model('Payment');
        const ProblemModel = mongoose_1.default.model('Problem');
        const InterviewModel = mongoose_1.default.model('Interview');
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
            const uStat = userStats.find((s) => s._id === month);
            const pStat = paymentStats.find((s) => s._id === month);
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
};
exports.AdminDashboardRepository = AdminDashboardRepository;
exports.AdminDashboardRepository = AdminDashboardRepository = __decorate([
    (0, tsyringe_1.injectable)()
], AdminDashboardRepository);
//# sourceMappingURL=admin-dashboard.repository.js.map