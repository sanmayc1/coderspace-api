import { inject, injectable } from "tsyringe";
import { ILoger } from "../services/logger/logger-service-interface.js";
import { NextFunction, Request, Response } from "express";
import {  ZodError } from "zod";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constant.js";
import { CustomError } from "../../shared/utils/errors/custom-error.js";

@injectable()
export class ErrorMiddleware {
  constructor(@inject("ILogger") private logger: ILoger) {}

  public handleError(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    let message = ERROR_MESSAGES.SERVER_ERROR;
    let errors = err.errors;

    if (err instanceof ZodError) {
      const validationError: Record<string, string>[] = [];
      const addedPath = new Set();
      err.issues.forEach((e) => {
        if (!addedPath.has(String(e.path))) {
          const path = String(e.path[0]);
          validationError.push({ path, message: e.message });
          addedPath.add(String(path));
        }
      });

      errors = validationError;
      message = ERROR_MESSAGES.VALIDATION_ERROR;
      statusCode = HTTP_STATUS.BAD_REQUEST;
    } else if (err instanceof CustomError) {
      if (err.filed) {
        errors = [
          {
            path: err.filed,
            message: err.message,
          },
        ];
      } else {
        errors = [{ error: err.message }];
      }
      statusCode = err.statusCode;
      message = err.message;
    }

    if (statusCode >= 500) {
      this.logger.error("An error occurred", {
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
}
