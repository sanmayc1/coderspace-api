

export interface IRunCodeResponse {
  signal: null | string,
  stdout: string,
  stderr: string,
  code: number,
  output: string,
  memory: number,
  message: null,
  status: null | string,
  cpu_time: number,
  wall_time: number
}

export interface ICompilerService {
    availableLanguages(): Promise<string[]>;
    runCode(code: string, language: string,version:string ,extension:string): Promise<IRunCodeResponse>;
}