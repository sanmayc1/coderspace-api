import { injectable } from 'tsyringe';
import { ICompilerService, IRunCodeResponse } from '../../domain/services/compiler-service.interface';
import axios from 'axios';
import { config } from '../../shared/config';






@injectable()
export class CompilerService implements ICompilerService {
  constructor() {}
  async availableLanguages(): Promise<string[]> {
   
    const res = await axios.get(`${config.compiler.runtimesUrl}`);
    
    return res.data;
  }
  async runCode(code: string, language: string,version:string ,extension:string): Promise<IRunCodeResponse> {
    const res = await axios.post(`${config.compiler.executeUrl}`, {
      language,
      version,
      files: [
        {
          name: `code-for-run.${extension}`,
          content: code,
        },
      ],
      stdin: '',
      compile_timeout: 10000,
      run_timeout: 3000,
      compile_cpu_time: 10000,
      run_cpu_time: 3000,
      compile_memory_limit: -1,
      run_memory_limit: -1,
    });
    return res.data.run;
  }
}
