export interface IBlackListTokenRepository {
  save(token: string, expire: number): Promise<void>;
  find(token: string): Promise<string | null>;
}
