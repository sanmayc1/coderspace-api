"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllInterviewsUserUsecaseMapper = exports.createInterviewUsecaseMapper = exports.getChatMessageMapper = exports.getAllChatsUsecaseMapper = exports.getAllAvailableProblemsForContestUsecaseMapper = exports.getContestProblemUsecaseMapper = exports.getAllContestUsecaseMapper = exports.getContestUsecaseMapper = exports.getAllPaymentsUsecaseMapper = exports.getAllPlansUsecaseMapper = exports.getCoderUsecaseMapper = exports.getAllCodersUsecaseMapper = exports.userGetProblemUsecaseMapper = exports.userGetAllProblemsUsecaseMapper = exports.getProblemUsecaseMapper = exports.getAllTestcaseUsecaseMapper = exports.getLanguageDetailsUsecaseMapper = exports.getAllProblemsUsecaseMapper = exports.getAllSkillsUsecaseMapper = exports.getAllDomainsUsecaseMapper = exports.getCompanyUsecaseMapper = exports.getUserUsecaseMapper = exports.getUsersUsecaseMapper = exports.googleAuthUsecaseMapper = exports.authUserUsecaseMapper = void 0;
exports.authUserUsecaseMapper = {
    toOutput(account, user) {
        return {
            accountId: account._id,
            email: account.email,
            ...(user?.isProfileComplete !== undefined && {
                profileComplete: user?.isProfileComplete,
            }),
            profileUrl: account.profileUrl || '',
            role: account.role,
            isPremium: user?.subscription ? user.subscription.endDate > new Date() : false,
        };
    },
};
exports.googleAuthUsecaseMapper = {
    toEntity(data) {
        return {
            email: data.emails[0].value,
            name: data.displayName,
            authProvider: 'google',
            profileUrl: data.photos && data.photos[0].value,
            isVerified: true,
        };
    },
};
exports.getUsersUsecaseMapper = {
    toUserDto(data) {
        return {
            accountId: String(data.accountId._id),
            userId: data._id,
            badge: data.badge,
            email: data.accountId.email,
            level: data.level,
            blocked: data.accountId.isBlocked,
            username: data.username,
            ...(data.accountId.profileUrl && {
                profileUrl: data.accountId.profileUrl,
            }),
        };
    },
    toRespone(users, currentPage, totalPages) {
        return {
            page: currentPage,
            totalPages,
            users,
        };
    },
};
exports.getUserUsecaseMapper = {
    toOutput(user, account, followersAndFollowingCount, solvedProblemsCount) {
        return {
            accountId: user.accountId,
            currentBadge: user.badge,
            currentLevel: user.level,
            id: user._id,
            name: account.name,
            skills: user.skills || [],
            username: user.username,
            xpCoin: user.xpCoin,
            about: user.about || '',
            profileUrl: account.profileUrl || '',
            auth: account.authProvider,
            followers: followersAndFollowingCount.followersCount,
            following: followersAndFollowingCount.followingCount,
            problemSolved: solvedProblemsCount,
        };
    },
};
exports.getCompanyUsecaseMapper = {
    toResponse(account, company) {
        return {
            companyName: account.name,
            email: account.email,
            gstin: company.gstin,
            profileUrl: account.profileUrl || '',
        };
    },
};
exports.getAllDomainsUsecaseMapper = {
    toResponse(data) {
        return {
            id: String(data._id),
            title: data.title,
        };
    },
};
exports.getAllSkillsUsecaseMapper = {
    toResponse(data) {
        return {
            id: String(data._id),
            title: data.title,
        };
    },
};
exports.getAllProblemsUsecaseMapper = {
    toResponse(totalPages, currentPage, problems) {
        return {
            currentPage,
            totalPages,
            problems: problems.map((s) => ({
                languages: s.addedLanguagesId.map((l) => ({
                    language: l.language,
                    id: String(l._id),
                })),
                id: s._id,
                number: s.problemNumber,
                title: s.title,
                view: s.view,
            })),
        };
    },
};
exports.getLanguageDetailsUsecaseMapper = {
    toResponse(data) {
        return {
            id: String(data._id),
            language: data.language,
            fnName: data.functionName,
            solution: data.solution,
            tmpCode: data.templateCode,
        };
    },
};
exports.getAllTestcaseUsecaseMapper = {
    toRespone(data) {
        return {
            id: data._id,
            input: data.input,
            output: data.output,
            ...(data.example ? { example: data.example } : {}),
        };
    },
};
exports.getProblemUsecaseMapper = {
    toResponse(data) {
        return {
            constrain: data.constraints,
            description: data.description,
            difficulty: data.difficulty,
            domain: String(data.domainId),
            examples: data.examples.map((e) => ({
                explanation: e.explanation,
                input: e.input,
                output: e.output,
                id: e.id,
            })),
            premium: data.isPremium,
            skills: data.skillsIds.map((s) => ({
                id: String(s._id),
                title: s.title,
            })),
            title: data.title,
        };
    },
};
exports.userGetAllProblemsUsecaseMapper = {
    toResponse(data) {
        return {
            difficulty: data.difficulty,
            id: data._id,
            number: data.problemNumber,
            skills: data.skillsIds.map((s) => ({
                id: String(s._id),
                title: s.title,
            })),
            premium: data.isPremium,
            title: data.title,
        };
    },
};
exports.userGetProblemUsecaseMapper = {
    toResponse(data, testcases) {
        return {
            constrain: data.constraints,
            description: data.description,
            difficulty: data.difficulty,
            domain: data.domainId,
            examples: data.examples,
            premium: data.isPremium,
            number: data.problemNumber,
            skills: data.skillsIds.map((s) => ({
                id: String(s._id),
                title: s.title,
            })),
            testcases: testcases.map((t) => ({
                input: JSON.parse(t.input)
                    .map((arg, i) => `param${i + 1} = ${JSON.stringify(arg)}`)
                    .join(',  '),
                expected: t.output,
                output: '',
            })),
            templateCodes: data.addedLanguagesId.map((l) => ({
                id: String(l._id),
                language: l.language,
                templateCode: String(l.templateCode),
            })),
            title: data.title,
        };
    },
};
exports.getAllCodersUsecaseMapper = {
    toResponse(data) {
        return {
            userId: data._id,
            name: data.accountId.name,
            username: data.username,
            badge: data.badge,
            profileUrl: data.accountId.profileUrl || '',
            isFollowing: data.isFollowing,
        };
    },
};
exports.getCoderUsecaseMapper = {
    toResponse(data) {
        const date = new Date(data.createdAt);
        const formatted = date.toISOString().split('T')[0];
        return {
            userId: data._id,
            name: data.account.name,
            username: data.username,
            badge: data.badge,
            profileUrl: data.account.profileUrl || '',
            isFollowing: data.isFollowing,
            followers: data.followersCount,
            following: data.followingCount,
            about: data.about,
            joinDate: formatted,
            accountId: data.accountId,
            problemSolved: 0,
            level: data.level,
        };
    },
};
exports.getAllPlansUsecaseMapper = {
    toResponse(data) {
        return {
            id: String(data._id),
            name: data.name,
            price: data.price,
            description: data.description,
            features: data.features,
            duration: String(data.durationInMonths),
        };
    },
};
exports.getAllPaymentsUsecaseMapper = {
    toResponse(data) {
        return {
            username: data.userId.name,
            email: data.userId.email,
            amount: data.amount,
            status: data.status,
            planId: data.planId._id,
            planName: data.planId.name,
            date: data.createdAt.toISOString().split('T')[0],
            paymentId: data.razorpayPaymentId,
        };
    },
};
exports.getContestUsecaseMapper = {
    toResponse(data) {
        return {
            id: String(data._id),
            title: data.title,
            description: data.description,
            dateAndTime: String(data.dateAndTime),
            duration: data.duration,
            visibility: data.view,
            rewards: data.rewards,
            domain: data.domainId,
            skills: data.skillsIds,
            problems: data.problemsIds,
        };
    },
};
exports.getAllContestUsecaseMapper = {
    toResponse(data) {
        return {
            id: String(data._id),
            title: data.title,
            description: data.description,
            dateAndTime: String(data.dateAndTime),
            duration: String(data.duration),
            rewards: data.rewards,
            domain: data.domainId.title,
            skills: data.skillsIds.map((s) => ({
                title: s.title,
                id: String(s._id),
            })),
        };
    },
};
exports.getContestProblemUsecaseMapper = {
    toResponse(data, testcases) {
        return {
            id: String(data._id),
            constrain: data.constraints,
            description: data.description,
            difficulty: data.difficulty,
            domain: data.domainId,
            examples: data.examples,
            premium: data.isPremium,
            number: data.problemNumber,
            skills: data.skillsIds.map((s) => ({
                id: String(s._id),
                title: s.title,
            })),
            testcases: testcases.map((t) => ({
                input: JSON.parse(t.input)
                    .map((arg, i) => `param${i + 1} = ${JSON.stringify(arg)}`)
                    .join(',  '),
                expected: t.output,
                output: '',
            })),
            templateCodes: data.addedLanguagesId.map((l) => ({
                id: String(l._id),
                language: l.language,
                templateCode: String(l.templateCode),
            })),
            title: data.title,
        };
    },
};
exports.getAllAvailableProblemsForContestUsecaseMapper = {
    toResponse(data) {
        return {
            problems: data.map((problem) => ({ id: problem._id, title: problem.title })),
        };
    },
};
exports.getAllChatsUsecaseMapper = {
    toResponse(data) {
        return {
            chatPartner: {
                name: data.chatPartner.name,
                profilePicture: data.chatPartner.profileUrl,
                id: data.chatPartner._id,
            },
            lastMessage: {
                content: data.lastMessage,
                timestamp: data.lastMessageTime,
            },
            unreadCount: data.unseenCount,
        };
    },
};
exports.getChatMessageMapper = {
    toResponse(data) {
        return {
            id: data._id,
            message: data.content,
            timestamp: data.createdAt,
            receiverId: data.receiverId,
            senderId: data.senderId,
            seen: data.seen,
        };
    },
};
exports.createInterviewUsecaseMapper = {
    toResponse(data) {
        return {
            id: String(data._id),
            title: data.title,
            description: data.description,
            numberOfQuestions: data.numberOfQuestions,
            difficulty: data.difficulty,
            premium: data.isPremium,
            duration: data.durationInMinutes,
        };
    },
};
exports.getAllInterviewsUserUsecaseMapper = {
    toResponse(data) {
        return {
            description: data.description,
            id: String(data._id),
            numberOfQuestions: data.numberOfQuestions,
            premium: data.isPremium,
            duration: data.durationInMinutes,
            title: data.title,
            isAttempted: data.isAttempted,
            sessionId: data.sessionId
        };
    },
};
//# sourceMappingURL=mappers.js.map