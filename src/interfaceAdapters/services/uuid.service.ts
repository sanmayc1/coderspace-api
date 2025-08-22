import { injectable } from "tsyringe";
import { IUniqueIdService } from "../../entities/services/uuid.interface.js";
import {v4 as uuid} from "uuid"


@injectable()
export class UniqueIdService implements IUniqueIdService {
    generate(): string {
      return uuid()
    }
}