import { injectable } from "tsyringe";
import { ILoger } from "./logger-service-interface.js";
import { logger } from "../../../frameworks/logger/winston.js";


@injectable()
export  class WinstonLoggerAdapter implements ILoger{
     info(message: string, meta?: Record<string, any>): void {
         throw new Error("Method not implemented.");
     }
     warn(message: string, meta?: Record<string, any>): void {
         throw new Error("Method not implemented.");
     }
     error(message: string, meta?: Record<string, any>): void {
         logger.error(message,meta)
     }
     debug(message: string, meta?: Record<string, any>): void {
         throw new Error("Method not implemented.");
     }

}