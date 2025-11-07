import { injectable } from "tsyringe";
import { ILoger } from "./logger-service-interface.js";
import { logger } from "../../../frameworks/logger/winston.js";


@injectable()
export  class WinstonLoggerAdapter implements ILoger{
     info(message: string, meta?: Record<string, any>): void {
         logger.info(message,meta)
     }
     warn(message: string, meta?: Record<string, any>): void {
         logger.warn(message,meta)
     }
     error(message: string, meta?: Record<string, any>): void {
         logger.error(message,meta)
     }
     debug(message: string, meta?: Record<string, any>): void {
         logger.debug(message,meta)
     }

}