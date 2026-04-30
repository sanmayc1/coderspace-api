"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const tsyringe_1 = require("tsyringe");
const zod_1 = require("zod");
const constant_1 = require("../../shared/constant");
const custom_error_1 = require("../../domain/utils/custom-error");
let ErrorMiddleware = class ErrorMiddleware {
    logger;
    constructor(logger) {
        this.logger = logger;
    }
    handleError(err, req, res, next) {
        let statusCode = constant_1.HTTP_STATUS.INTERNAL_SERVER_ERROR;
        let message = constant_1.ERROR_MESSAGES.SERVER_ERROR;
        let errors = err.errors;
        if (err instanceof zod_1.ZodError) {
            const validationError = [];
            const addedPath = new Set();
            err.issues.forEach((e) => {
                if (!addedPath.has(String(e.path))) {
                    const path = String(e.path[0]);
                    validationError.push({ path, message: e.message });
                    addedPath.add(String(path));
                }
            });
            errors = validationError;
            message = constant_1.ERROR_MESSAGES.VALIDATION_ERROR;
            statusCode = constant_1.HTTP_STATUS.BAD_REQUEST;
        }
        else if (err instanceof custom_error_1.CustomError) {
            if (err.filed) {
                errors = [
                    {
                        path: err.filed,
                        message: err.message,
                    },
                ];
            }
            else {
                errors = [{ error: err.message }];
            }
            statusCode = err.statusCode;
            message = err.message;
        }
        if (statusCode >= 500) {
            this.logger.error('An error occurred', {
                message: err.message,
                stack: err.stack,
                meathod: req.method,
                url: req.url,
                ip: req.ip,
                timeStamp: new Date().toISOString(),
            });
        }
        res.status(statusCode).json({
            success: false,
            message,
            ...(errors && { errors }),
        });
    }
};
exports.ErrorMiddleware = ErrorMiddleware;
exports.ErrorMiddleware = ErrorMiddleware = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('ILogger')),
    __metadata("design:paramtypes", [Object])
], ErrorMiddleware);
//# sourceMappingURL=error-handle.middleware.js.map