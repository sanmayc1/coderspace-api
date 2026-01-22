import { ITestcaseEntity } from '../domain/entities/testcase-entity';

export const javaTestCodeGenerator = (
  testcase: ITestcaseEntity,
  code: string,
  functionName: string
): string => {
  const inputs = JSON.parse(testcase.input);

  const toJavaValue = (value: any): string => {
    if (value === null) return 'null';

    if (typeof value === 'number') {
      return Number.isInteger(value) ? `${value}` : `${value}d`;
    }

    if (typeof value === 'boolean') {
      return value ? 'true' : 'false';
    }

    if (typeof value === 'string') {
      return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
    }

    if (Array.isArray(value)) {
      // 2D array
      if (Array.isArray(value[0])) {
        return `new int[][]{${value.map((row) => `{${row.join(',')}}`).join(',')}}`;
      }

      // 1D array
      return `new int[]{${value.join(',')}}`;
    }

    throw new Error('Unsupported Java input type');
  };

  const javaArgs = inputs.map(toJavaValue).join(', ');

  return `
import java.util.*;



class Runner {
    public static void main(String[] args) {
        Solution solution = new Solution();
        Object result = solution.${functionName}(${javaArgs});
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

export const javascriptTestCodeGenerator = (
  testcase: ITestcaseEntity,
  code: string,
  functionName: string
) => {
  const inputs = JSON.parse(testcase.input);

  return `
${code};

console.log(
  ${functionName}(
    ${inputs.map((arg: any) => JSON.stringify(arg)).join(', ')}
  )
);
`;
};

const typescriptTestCodeGenerator = (
  testcase: ITestcaseEntity,
  code: string,
  functionName: string
): string => {
  const inputs = JSON.parse(testcase.input);

  const tsArgs = inputs.map((arg: any) => JSON.stringify(arg)).join(', ');

  return `

${code}

try {
  const result = ${functionName}(${tsArgs});
  console.log(JSON.stringify(result));
} catch (e) {
  if (e && (e as any).message) {
    console.error((e as any).message);
  } else {
    console.error(String(e));
  }
}
`;
};

export const pythonTestCodeGenerator = (
  testcase: ITestcaseEntity,
  userCode: string,
  functionName: string
): string => {
  const inputs = JSON.parse(testcase.input);

  const toPythonValue = (value: any): string => {
    if (value === null) return 'None';
    if (typeof value === 'number') return value.toString();
    if (typeof value === 'boolean') return value ? 'True' : 'False';
    if (typeof value === 'string') {
      return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
    }
    if (Array.isArray(value)) return JSON.stringify(value);
    throw new Error('Unsupported Python input type');
  };

  const pythonArgs = inputs.map(toPythonValue).join(', ');

  return `
from typing import *

${userCode}

def __normalize_output__(value):
    if isinstance(value, tuple):
        return list(value)
    if isinstance(value, set):
        return sorted(list(value))
    return value

def __runner__():
    try:
        solution = Solution()
        result = solution.${functionName}(${pythonArgs})
        print(__normalize_output__(result))
    except Exception:
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    __runner__()
`;
};

interface TestCodeGenerator {
  (testcase: ITestcaseEntity, code: string, functionName: string): string;
}

export const testCodeGenerators: Record<string, TestCodeGenerator> = {
  java: javaTestCodeGenerator,
  javascript: javascriptTestCodeGenerator,
  typescript: typescriptTestCodeGenerator,
  python: pythonTestCodeGenerator,
};
