export function validatorForExactMatch(expectedOutput: string, actualOutput: string): boolean {

  if(actualOutput.startsWith('{') && actualOutput.endsWith('}')){
    return JSON.stringify(JSON.parse(actualOutput)) === JSON.stringify(JSON.parse(expectedOutput));
  }

  if(actualOutput.startsWith('[') && actualOutput.endsWith(']')){
    return JSON.stringify(JSON.parse(actualOutput)) === JSON.stringify(JSON.parse(expectedOutput));
  }

  return expectedOutput === actualOutput;
}


export function validatorForUnorderedArray(
  expectedOutput: string,
  actualOutput: string
): boolean {
  try {
    const expected = JSON.parse(expectedOutput);
    const actual = JSON.parse(actualOutput);

    if (!Array.isArray(expected) || !Array.isArray(actual)) {
      return false;
    }

    if (expected.length !== actual.length) {
      return false;
    }

    const sortedExpected = [...expected].sort();
    const sortedActual = [...actual].sort();

    return JSON.stringify(sortedExpected) === JSON.stringify(sortedActual);
  } catch {
    return false;
  }
}