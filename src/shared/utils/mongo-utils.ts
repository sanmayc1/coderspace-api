import { GenericFilter, Projection, Sort } from "../constant.js";

export const USER_SORTING = {
  NEWEST: { createdAt: -1 },
  OLDEST: { createdAt: 1 },
  NAME_ASC: { "accountId.name": 1 },
  NAME_DESC: { "accountId.name": -1 },
};

export const PROBLEM_SORTING: Record<string, Sort> = {
  NEWEST: { createdAt: "asc" },
  OLDEST: { createdAt: "desc" },
  NAME_ASC: { title: "asc" },
  NAME_DESC: { title: "desc" },
};

export function convertToMongoFilter(filter: GenericFilter): any {
  const mongoQuery: any = {};

  for (const key in filter) {
    const condition = filter[key];

    if (typeof condition !== "object" || Array.isArray(condition)) {
      mongoQuery[key] = condition;
      continue;
    }

    switch (condition.op) {
      case "eq":
        mongoQuery[key] = condition.value;
        break;
      case "ne":
        mongoQuery[key] = { $ne: condition.value };
        break;
      case "lt":
        mongoQuery[key] = { $lt: condition.value };
        break;
      case "lte":
        mongoQuery[key] = { $lte: condition.value };
        break;
      case "gt":
        mongoQuery[key] = { $gt: condition.value };
        break;
      case "gte":
        mongoQuery[key] = { $gte: condition.value };
        break;
      case "in":
        mongoQuery[key] = { $in: condition.value };
        break;
      case "contains":
        mongoQuery[key] = { $regex: condition.value, $options: "i" };
        break;
    }
  }

  return mongoQuery;
}

export function convertToMongoSort(sort: Sort) {
  const mongoSort: Record<string, 1 | -1> = {};

  for (const key in sort) {
    mongoSort[key] = sort[key] === "asc" ? 1 : -1;
  }

  return mongoSort;
}

export function convertToMongoProjection(projections: Projection) {
  return projections.reduce((acc, f) => {
    acc[f] = 1;
    return acc;
  }, {} as Record<string, 1>);
}
