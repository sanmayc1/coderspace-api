"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../../../shared/config");
class MongoConnect {
    _mongourl;
    constructor() {
        this._mongourl = config_1.config.database.mongoDb;
    }
    connect() {
        mongoose_1.default
            .connect(this._mongourl)
            .then(() => console.log('Connected to MongoDB'))
            .catch((err) => console.log(err));
    }
}
exports.MongoConnect = MongoConnect;
//# sourceMappingURL=connect.js.map