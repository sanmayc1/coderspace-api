import { inject, injectable } from "tsyringe";
import { ILoger } from "../services/logger/logger-service-interface.js";
import { NextFunction, Request, Response } from "express";
import { success, ZodError } from "zod";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constant.js";
import { error, timeStamp } from "console";

@injectable()
export class ErrorMiddleware {
  constructor(@inject("ILogger") private logger: ILoger) {}

  public handleError(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR
    let message = ERROR_MESSAGES.SERVER_ERROR
    let error = err.errors

    this.logger.error("An error occurred",{
        message:err.message,
        stack:err.stack,
        meathod:req.method,
        url:req.url,
        ip:req.ip,
        timeStamp:new Date().toISOString()
    })

    if (err instanceof ZodError) {
      let validationError: Record<string, string> = {};
      err.issues.forEach((e) => {
        if (!validationError.hasOwnProperty(e.path[0])) {
          const path = String(e.path[0]);
          validationError[path] = e.message;
        }
      });

      error = validationError
      message = ERROR_MESSAGES.VALIDATION_ERROR
      statusCode = HTTP_STATUS.BAD_REQUEST
    }

    res.status(statusCode).json({
        success:false,
        message,
        error

    })
  }
}
