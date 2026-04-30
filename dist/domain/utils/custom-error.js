"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    statusCode;
    filed;
    constructor(statusCode, message, filed) {
        super(message);
        this.statusCode = statusCode;
        this.filed = filed;
        this.name = 'Customer Error';
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=custom-error.js.map