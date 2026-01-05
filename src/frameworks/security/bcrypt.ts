import { injectable } from 'tsyringe';
import { IBcrypt } from '../../domain/services/bcrypt.interface';
import { hash, compare } from 'bcrypt';

@injectable()
export class Bcrypt implements IBcrypt {
  async hash(original: string): Promise<string> {
    return await hash(original, 10);
  }
  async compare(current: string, original: string): Promise<boolean> {
    return await compare(current, original);
  }
}
