"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAYMENT_SORTING = exports.PROBLEM_SORTING = exports.USER_SORTING = void 0;
exports.convertToMongoFilter = convertToMongoFilter;
exports.convertToMongoSort = convertToMongoSort;
exports.convertToMongoProjection = convertToMongoProjection;
exports.USER_SORTING = {
    NEWEST: { createdAt: -1 },
    OLDEST: { createdAt: 1 },
    NAME_ASC: { 'accountId.name': 1 },
    NAME_DESC: { 'accountId.name': -1 },
};
exports.PROBLEM_SORTING = {
    NEWEST: { createdAt: 'desc' },
    OLDEST: { createdAt: 'asc' },
    NAME_ASC: { title: 'asc' },
    NAME_DESC: { title: 'desc' },
};
exports.PAYMENT_SORTING = {
    NEWEST: { createdAt: 'desc' },
    OLDEST: { createdAt: 'asc' },
};
function convertToMongoFilter(filter) {
    const mongoQuery = {};
    for (const key in filter) {
        const condition = filter[key];
        if (typeof condition !== 'object' || Array.isArray(condition)) {
            mongoQuery[key] = condition;
            continue;
        }
        switch (condition.op) {
            case 'eq':
                mongoQuery[key] = condition.value;
                break;
            case 'ne':
                mongoQuery[key] = { $ne: condition.value };
                break;
            case 'lt':
                mongoQuery[key] = { $lt: condition.value };
                break;
            case 'lte':
                mongoQuery[key] = { $lte: condition.value };
                break;
            case 'gt':
                mongoQuery[key] = { $gt: condition.value };
                break;
            case 'gte':
                mongoQuery[key] = { $gte: condition.value };
                break;
            case 'in':
                mongoQuery[key] = { $in: condition.value };
                break;
            case 'contains':
                mongoQuery[key] = { $regex: condition.value, $options: 'i' };
                break;
        }
    }
    return mongoQuery;
}
function convertToMongoSort(sort) {
    const mongoSort = {};
    for (const key in sort) {
        mongoSort[key] = sort[key] === 'asc' ? 1 : -1;
    }
    return mongoSort;
}
function convertToMongoProjection(projections) {
    return projections.reduce((acc, f) => {
        acc[f] = 1;
        return acc;
    }, {});
}
//# sourceMappingURL=mongo-utils.js.map