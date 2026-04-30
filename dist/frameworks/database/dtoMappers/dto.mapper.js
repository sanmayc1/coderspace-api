"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRepositoryMapper = exports.interviewQuestionsRepositoryMapper = exports.interviewSessionRepositoryMapper = exports.interviewRepositoryMapper = exports.chatRepositoryMapper = exports.contestAttemptRepositoryMapper = exports.paymentRepositoryMapper = exports.planRepositoryMapper = exports.submitProblemRepositoryMapper = exports.followerRepositoryMapper = exports.contestRepositoryMapper = exports.testcaseRepositoryMapper = exports.langaugeRepositoryMapper = exports.skillRepositoryMapper = exports.domainRepositoryMapper = exports.problemRepositoryMapper = exports.companyRepositoryMapper = exports.accountRepositoryMapper = exports.walletMapper = exports.userMapperRepo = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.userMapperRepo = {
    toEntity(data) {
        return {
            _id: String(data._id),
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            username: data.username,
            isProfileComplete: data.isProfileComplete,
            level: data.level,
            notification: data.notification,
            xpCoin: data.xpCoin,
            badge: data.badge,
            about: data.about,
            domain: data.domain,
            suggestionLevel: data.suggestionLevel,
            globalScore: data.globalScore,
            subscription: data.subscription,
            skills: data.skills,
            accountId: data.accountId instanceof mongoose_1.Types.ObjectId
                ? String(data.accountId)
                : data.accountId,
        };
    },
    toModel(data) {
        return {
            ...(data.about && { about: data.about }),
            ...(data.accountId && {
                accountId: new mongoose_1.default.Types.ObjectId(data.accountId),
            }),
            ...(data.badge && { badge: data.badge }),
            ...(data.domain && { domain: data.domain }),
            ...(data.suggestionLevel && { suggestionLevel: data.suggestionLevel }),
            ...(data.globalScore && { globalScore: data.globalScore }),
            ...(data.subscription && { subscription: data.subscription }),
            ...(data.isProfileComplete && {
                isProfileComplete: data.isProfileComplete,
            }),
            ...(data.level && { level: data.level }),
            ...(data.notification && { notification: data.notification }),
            ...(data.skills && { skills: data.skills }),
            ...(data.username && { username: data.username }),
            ...(data.xpCoin && { xpCoin: data.xpCoin }),
        };
    },
};
exports.walletMapper = {
    toEntity(data) {
        return {
            _id: String(data._id),
            balance: data.balance,
            contestAmount: data.contestAmount,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            accountId: String(data.accountId),
        };
    },
    toModel(data) {
        return {
            ...(data.accountId && { accountId: new mongoose_1.Types.ObjectId(data.accountId) }),
            ...(data.balance && { balance: data.balance }),
            ...(data.contestAmount && { contestAmount: data.contestAmount }),
        };
    },
};
exports.accountRepositoryMapper = {
    toEntity(data) {
        return {
            email: data.email,
            name: data.name,
            password: data.password,
            _id: String(data._id),
            authProvider: data.authProvider,
            isVerified: data.isVerified,
            profileUrl: data.profileUrl || '',
            role: data.role,
            isBlocked: data.isBlocked,
        };
    },
    toModel(data) {
        return {
            ...(data.email && { email: data.email }),
            ...(data.name && { name: data.name }),
            ...(data.password && { password: data.password }),
            ...(data.authProvider && { authProvider: data.authProvider }),
            ...(data.isVerified !== undefined && { isVerified: data.isVerified }),
            ...(data.profileUrl && { profileUrl: data.profileUrl }),
            ...(data.role && { role: data.role }),
            ...(data.isBlocked !== undefined && { isBlocked: data.isBlocked }),
        };
    },
};
exports.companyRepositoryMapper = {
    toEntity(data) {
        return {
            accountId: String(data._id),
            gstin: data.gstin,
            createdAt: data.createdAt,
            updtedAt: data.updtedAt,
        };
    },
    toModel(data) {
        return {
            ...(data.accountId && {
                accountId: new mongoose_1.default.Types.ObjectId(data.accountId),
            }),
            ...(data.gstin && { gstin: data.gstin }),
        };
    },
};
exports.problemRepositoryMapper = {
    toEntity(data) {
        return {
            _id: String(data._id),
            title: data.title,
            constraints: data.constraints,
            description: data.description,
            difficulty: data.difficulty,
            domainId: data.domainId instanceof mongoose_1.Types.ObjectId
                ? String(data.domainId)
                : data.domainId,
            examples: data.examples || [],
            isPremium: data.isPremium,
            skillsIds: data.skillsIds?.map((s) => s instanceof mongoose_1.Types.ObjectId ? String(s) : s),
            view: data.view,
            addedLanguagesId: data.addedLanguagesId?.map((l) => l instanceof mongoose_1.Types.ObjectId ? String(l) : l),
            problemNumber: data.problemNumber,
            validatorType: data.validatorType,
        };
    },
    toModel(data) {
        return {
            ...(data.title && { title: data.title }),
            ...(data.description && { description: data.description }),
            ...(data.constraints && { constraints: data.constraints }),
            ...(data.difficulty && { difficulty: data.difficulty }),
            ...(data.domainId && {
                domainId: new mongoose_1.Types.ObjectId(String(data.domainId)),
            }),
            ...(data.examples && { examples: data.examples }),
            ...(data.isPremium !== undefined && { isPremium: data.isPremium }),
            ...(data.skillsIds && {
                skillsIds: data.skillsIds.map((s) => new mongoose_1.Types.ObjectId(String(s))),
            }),
            ...(data.view && { view: data.view }),
            ...(data.addedLanguagesId && {
                addedLanguagesId: data.addedLanguagesId.map((l) => new mongoose_1.Types.ObjectId(String(l))),
            }),
            ...(data.validatorType && { validatorType: data.validatorType }),
            ...(data.problemNumber && { problemNumber: data.problemNumber }),
        };
    },
};
exports.domainRepositoryMapper = {
    toModel(data) {
        return {
            title: data.title,
        };
    },
    toEntity(data) {
        return {
            title: data.title,
            _id: String(data._id),
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    },
};
exports.skillRepositoryMapper = {
    toModel(data) {
        return {
            title: data.title,
        };
    },
    toEntity(data) {
        return {
            title: data.title,
            _id: String(data._id),
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    },
};
exports.langaugeRepositoryMapper = {
    toModel(data) {
        return {
            ...(data.language && { language: data.language }),
            ...(data.functionName && { functionName: data.functionName }),
            ...(data.solution && { solution: data.solution }),
            ...(data.templateCode && { templateCode: data.templateCode }),
        };
    },
    toEntity(data) {
        return {
            language: data.language,
            _id: String(data._id),
            functionName: data.functionName,
            solution: data.solution,
            templateCode: data.templateCode,
        };
    },
};
exports.testcaseRepositoryMapper = {
    toModel(data) {
        return {
            input: data.input,
            output: data.output,
            problemId: new mongoose_1.Types.ObjectId(data.problemId),
            example: data.example,
        };
    },
    toEntity(data) {
        return {
            _id: String(data._id),
            input: data.input,
            output: data.output,
            problemId: String(data.problemId),
            example: data.example,
        };
    },
};
exports.contestRepositoryMapper = {
    toEntity(data) {
        return {
            _id: String(data._id),
            title: data.title,
            description: data.description,
            domainId: data.domainId instanceof mongoose_1.Types.ObjectId
                ? String(data.domainId)
                : data.domainId,
            skillsIds: data.skillsIds.map((skill) => skill instanceof mongoose_1.Types.ObjectId ? String(skill) : skill),
            problemsIds: data.problemsIds.map((problem) => problem instanceof mongoose_1.Types.ObjectId ? String(problem) : problem),
            rewards: data.rewards,
            dateAndTime: data.dateAndTime,
            duration: data.duration,
            view: data.view,
            creatorId: data.creatorId instanceof mongoose_1.Types.ObjectId
                ? String(data.creatorId)
                : data.creatorId,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            endDateAndTime: data.endDateAndTime,
        };
    },
    toModel(data) {
        return {
            ...(data.title && { title: data.title }),
            ...(data.description && { description: data.description }),
            ...(data.domainId && {
                domainId: new mongoose_1.Types.ObjectId(String(data.domainId)),
            }),
            ...(data.skillsIds && {
                skillsIds: data.skillsIds.map((skill) => new mongoose_1.Types.ObjectId(String(skill))),
            }),
            ...(data.problemsIds && {
                problemsIds: data.problemsIds.map((problem) => new mongoose_1.Types.ObjectId(String(problem))),
            }),
            ...(data.rewards && { rewards: data.rewards }),
            ...(data.dateAndTime && { dateAndTime: data.dateAndTime }),
            ...(data.duration && { duration: data.duration }),
            ...(data.view && { view: data.view }),
            ...(data.creatorId && {
                creatorId: new mongoose_1.Types.ObjectId(String(data.creatorId)),
            }),
            ...(data.endDateAndTime && { endDateAndTime: data.endDateAndTime }),
        };
    },
};
exports.followerRepositoryMapper = {
    toEntity(data) {
        return {
            _id: String(data._id),
            followerId: String(data.followerId),
            followeeId: String(data.followeeId),
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    },
    toModel(data) {
        return {
            ...(data.followerId && { followerId: new mongoose_1.Types.ObjectId(String(data.followerId)) }),
            ...(data.followeeId && { followeeId: new mongoose_1.Types.ObjectId(String(data.followeeId)) }),
        };
    },
};
exports.submitProblemRepositoryMapper = {
    toEntity(data) {
        return {
            _id: String(data._id),
            userId: String(data.userId),
            problemId: String(data.problemId),
            solution: data.solution,
            language: data.language,
            status: data.status,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    },
    toModel(data) {
        return {
            ...(data.userId && { userId: new mongoose_1.Types.ObjectId(String(data.userId)) }),
            ...(data.problemId && { problemId: new mongoose_1.Types.ObjectId(String(data.problemId)) }),
            ...(data.solution && { solution: data.solution }),
            ...(data.language && { language: data.language }),
            ...(data.status && { status: data.status }),
        };
    },
};
exports.planRepositoryMapper = {
    toEntity(data) {
        return {
            _id: String(data._id),
            name: data.name,
            price: data.price,
            durationInMonths: data.durationInMonths,
            description: data.description,
            features: data.features,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    },
    toModel(data) {
        return {
            ...(data.name && { name: data.name }),
            ...(data.price && { price: data.price }),
            ...(data.durationInMonths && { durationInMonths: data.durationInMonths }),
            ...(data.description && { description: data.description }),
            ...(data.features && { features: data.features }),
        };
    },
};
exports.paymentRepositoryMapper = {
    toEntity(data) {
        return {
            _id: String(data._id),
            userId: data.userId instanceof mongoose_1.Types.ObjectId
                ? String(data.userId)
                : data.userId,
            planId: data.planId instanceof mongoose_1.Types.ObjectId ? String(data.planId) : data.planId,
            razorpayOrderId: data.razorpayOrderId,
            razorpayPaymentId: data.razorpayPaymentId,
            amount: data.amount,
            currency: data.currency,
            status: data.status,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    },
    toModel(data) {
        return {
            ...(data.userId && { userId: new mongoose_1.Types.ObjectId(String(data.userId)) }),
            ...(data.planId && { planId: new mongoose_1.Types.ObjectId(String(data.planId)) }),
            ...(data.razorpayOrderId && { razorpayOrderId: data.razorpayOrderId }),
            ...(data.razorpayPaymentId && { razorpayPaymentId: data.razorpayPaymentId }),
            ...(data.amount && { amount: data.amount }),
            ...(data.currency && { currency: data.currency }),
            ...(data.status && { status: data.status }),
        };
    },
};
exports.contestAttemptRepositoryMapper = {
    toEntity(data) {
        return {
            _id: String(data._id),
            contestId: data.contestId instanceof mongoose_1.Types.ObjectId
                ? String(data.contestId)
                : data.contestId,
            userId: data.userId instanceof mongoose_1.Types.ObjectId
                ? String(data.userId)
                : data.userId,
            score: data.score,
            totalProblems: data.totalProblems,
            solvedProblems: data.solvedProblems,
            totalSubmissions: data.totalSubmissions,
            startDateAndTime: data.startDateAndTime,
            endDateAndTime: data.endDateAndTime,
        };
    },
    toModel(data) {
        return {
            ...(data.contestId && { contestId: new mongoose_1.Types.ObjectId(String(data.contestId)) }),
            ...(data.userId && { userId: new mongoose_1.Types.ObjectId(String(data.userId)) }),
            ...(data.score && { score: data.score }),
            ...(data.totalProblems && { totalProblems: data.totalProblems }),
            ...(data.solvedProblems && { solvedProblems: data.solvedProblems }),
            ...(data.totalSubmissions && { totalSubmissions: data.totalSubmissions }),
            ...(data.startDateAndTime && { startDateAndTime: data.startDateAndTime }),
            ...(data.endDateAndTime && { endDateAndTime: data.endDateAndTime }),
        };
    },
};
exports.chatRepositoryMapper = {
    toEntity(data) {
        return {
            _id: String(data._id),
            senderId: data.senderId instanceof mongoose_1.Types.ObjectId
                ? String(data.senderId)
                : data.senderId,
            receiverId: data.receiverId instanceof mongoose_1.Types.ObjectId
                ? String(data.receiverId)
                : data.receiverId,
            content: data.content,
            seen: data.seen,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    },
    toModel(data) {
        return {
            ...(data.senderId && { senderId: new mongoose_1.Types.ObjectId(String(data.senderId)) }),
            ...(data.receiverId && { receiverId: new mongoose_1.Types.ObjectId(String(data.receiverId)) }),
            ...(data.content && { content: data.content }),
            ...(data.seen && { seen: data.seen }),
        };
    },
};
exports.interviewRepositoryMapper = {
    toEntity(data) {
        return {
            _id: String(data._id),
            title: data.title,
            description: data.description,
            context: data.context,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            difficulty: data.difficulty,
            durationInMinutes: data.durationInMinutes,
            isPremium: data.isPremium,
            numberOfQuestions: data.numberOfQuestions
        };
    },
    toModel(data) {
        return {
            ...(data.title && { title: data.title }),
            ...(data.description && { description: data.description }),
            ...(data.context && { context: data.context }),
            ...(data.difficulty && { difficulty: data.difficulty }),
            ...(data.durationInMinutes && { durationInMinutes: data.durationInMinutes }),
            ...(data.isPremium !== undefined && { isPremium: data.isPremium }),
            ...(data.numberOfQuestions && { numberOfQuestions: data.numberOfQuestions }),
            ...(data._id && { _id: new mongoose_1.Types.ObjectId(String(data._id)) }),
        };
    },
};
exports.interviewSessionRepositoryMapper = {
    toEntity(data) {
        return {
            _id: String(data._id),
            accountId: String(data.accountId),
            interviewId: String(data.interviewId),
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            startedAt: data.startedAt,
            completedAt: data.completedAt,
            status: data.status,
            overallFeedback: data.overallFeedback,
            finalScore: data.finalScore,
        };
    },
    toModel(data) {
        return {
            ...(data.accountId && { accountId: new mongoose_1.Types.ObjectId(String(data.accountId)) }),
            ...(data.interviewId && { interviewId: new mongoose_1.Types.ObjectId(String(data.interviewId)) }),
            ...(data._id && { _id: new mongoose_1.Types.ObjectId(String(data._id)) }),
            ...(data.startedAt && { startedAt: data.startedAt }),
            ...(data.completedAt && { completedAt: data.completedAt }),
            ...(data.status && { status: data.status }),
            ...(data.overallFeedback && { overallFeedback: data.overallFeedback }),
            ...(data.finalScore && { finalScore: data.finalScore }),
        };
    },
};
exports.interviewQuestionsRepositoryMapper = {
    toEntity(data) {
        return {
            _id: String(data._id),
            sessionId: String(data.sessionId),
            question: data.question,
            answer: data.answer,
            attempted: data.attempted,
            feedback: data.feedback,
            score: data.score,
            order: data.order,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    },
    toModel(data) {
        return {
            ...(data.sessionId && { sessionId: new mongoose_1.Types.ObjectId(String(data.sessionId)) }),
            ...(data._id && { _id: new mongoose_1.Types.ObjectId(String(data._id)) }),
            ...(data.question && { question: data.question }),
            ...(data.answer && { answer: data.answer }),
            ...(data.attempted && { attempted: data.attempted }),
            ...(data.feedback && { feedback: data.feedback }),
            ...(data.score && { score: data.score }),
            ...(data.order && { order: data.order }),
        };
    },
};
exports.notificationRepositoryMapper = {
    toEntity(data) {
        return {
            _id: String(data._id),
            accountId: data.accountId instanceof mongoose_1.Types.ObjectId
                ? String(data.accountId)
                : data.accountId,
            message: data.message,
            title: data.title,
            type: data.type,
            isRead: data.isRead,
            link: data.link,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    },
    toModel(data) {
        return {
            ...(data.accountId && { accountId: new mongoose_1.Types.ObjectId(String(data.accountId)) }),
            ...(data.message && { message: data.message }),
            ...(data.title && { title: data.title }),
            ...(data.type && { type: data.type }),
            ...(data.isRead !== undefined && { isRead: data.isRead }),
            ...(data.link && { link: data.link }),
        };
    },
};
//# sourceMappingURL=dto.mapper.js.map