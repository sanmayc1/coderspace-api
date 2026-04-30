"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowerModel = void 0;
const mongoose_1 = require("mongoose");
const follower_schema_1 = require("../schema/follower.schema");
exports.FollowerModel = (0, mongoose_1.model)('Follower', follower_schema_1.followerSchema);
//# sourceMappingURL=follower.model.js.map