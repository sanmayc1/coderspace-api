import { inject, injectable } from 'tsyringe';
import { ICompilerService } from '../../../domain/services/compiler-service.interface';
import { IRunProblemUsecase } from '../../Interfaces/users/problem/run-problem.usecase.interface';
import {
  availableLanguages,
  ERROR_MESSAGES,
  HTTP_STATUS,
  VALIDATORS,
} from '../../../shared/constant';
import { CustomError } from '../../../domain/utils/custom-error';
import { IProblemRepository } from '../../../domain/repositoryInterfaces/problem-repository.interface';
import { ITestcaseRepository } from '../../../domain/repositoryInterfaces/testcase-respository.interface';
import { ILanguageEntity } from '../../../domain/entities/langauge-entity';
import { normalize, normalizeMongoOutput } from '../../../shared/utils/helper';
import {
  validatorForExactMatch,
  validatorForUnorderedArray,
} from '../../../shared/utils/testcase-validators';
import { ITestcaseEntity } from '../../../domain/entities/testcase-entity';

@injectable()
export class RunProblemUsecase implements IRunProblemUsecase {
  constructor(
    @inject('ICompilerService') private _compilerService: ICompilerService,
    @inject('IProblemRepository') private _problemRepository: IProblemRepository,
    @inject('ITestcaseRepository') private _testcaseRepository: ITestcaseRepository
  ) {}

  async execute(language: string, code: string, problemId: string): Promise<void> {
    const selectedLanguage = availableLanguages[language as keyof typeof availableLanguages];

    if (!selectedLanguage) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.INVALID_LANGUAGE);
    }

    const problem = await this._problemRepository.getProblem(problemId, {
      relations: ['addedLanguagesId'],
    });

    if (!problem) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.PROBLEM_NOT_FOUND);
    }

    const selectedLanguageExist = (problem?.addedLanguagesId as ILanguageEntity[]).find(
      (lang) => lang.language === language
    );

    if (!selectedLanguageExist) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.INVALID_LANGUAGE);
    }

    const testcases = await this._testcaseRepository.getTestcasesByProblemId(problemId);

    const length = testcases.length < 3 ? testcases.length : 3;

    const validator = VALIDATORS[problem.validatorType as keyof typeof VALIDATORS];

const javaTestCodeGenerator = (
  testcase: ITestcaseEntity,
): string => {
  const inputs = JSON.parse(testcase.input);

  const toJavaValue = (value: any): string => {
    if (value === null) return "null";

    if (typeof value === "number") {
      return Number.isInteger(value) ? `${value}` : `${value}d`;
    }

    if (typeof value === "boolean") {
      return value ? "true" : "false";
    }

    if (typeof value === "string") {
      return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
    }

    if (Array.isArray(value)) {
      // 2D array
      if (Array.isArray(value[0])) {
        return `new int[][]{${value
          .map((row) => `{${row.join(",")}}`)
          .join(",")}}`;
      }

      // 1D array
      return `new int[]{${value.join(",")}}`;
    }

    throw new Error("Unsupported Java input type");
  };

  const javaArgs = inputs.map(toJavaValue).join(", ");

  return `
import java.util.*;



class Runner {
    public static void main(String[] args) {
        Solution solution = new Solution();
        Object result = solution.${selectedLanguageExist.functionName}(${javaArgs});
        printResult(result);
    }

    private static void printResult(Object result) {
        if (result == null) {
            System.out.println("null");
            return;
        }

        if (result instanceof int[]) {
            System.out.println(Arrays.toString((int[]) result));
        } else if (result instanceof long[]) {
            System.out.println(Arrays.toString((long[]) result));
        } else if (result instanceof double[]) {
            System.out.println(Arrays.toString((double[]) result));
        } else if (result instanceof boolean[]) {
            System.out.println(Arrays.toString((boolean[]) result));
        } else if (result instanceof Object[]) {
            System.out.println(Arrays.deepToString((Object[]) result));
        } else if (result instanceof int[][]) {
            System.out.println(Arrays.deepToString((int[][]) result));
        } else {
            System.out.println(result.toString());
        }
    }
}

${code}
`;
};




    const javascriptTestCodeGenerator = (testcase: ITestcaseEntity) => {
      const inputs = JSON.parse(testcase.input);

      return `
${code};

console.log(
  ${selectedLanguageExist.functionName}(
    ${inputs.map((arg: any) => JSON.stringify(arg)).join(', ')}
  )
);
`;
    };

    for (let i = 0; i < length; i++) {
      let testCode = '';
      if (selectedLanguage.name === 'javascript') {
        testCode = javascriptTestCodeGenerator(testcases[i]);
      }

      if (selectedLanguage.name === 'java') {
        testCode = javaTestCodeGenerator(testcases[i]);
      }

      const result = await this._compilerService.runCode(
        testCode,
        selectedLanguage.name,
        selectedLanguage.version,
        selectedLanguage.extension
      );
      console.log(result)
      
      const normalizedOutput = normalize(result.stdout);

      if (result.stderr) {
        throw new CustomError(HTTP_STATUS.BAD_REQUEST, result.stderr);
      }

      if (result.status !== null) {
        throw new CustomError(HTTP_STATUS.BAD_REQUEST, String(result.message));
      }

      const isCorrect = validator(normalizeMongoOutput(testcases[i].output), normalizedOutput);
      if (!isCorrect) {
        throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.WRONG_ANSWER);
      }
    }
  }
}
