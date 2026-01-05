export interface ISendRestPasswordLink {
  execute(email: string): Promise<void>;
}
