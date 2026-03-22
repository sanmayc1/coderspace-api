
export function normalize(output: string): string {
  return output
    .trim()
    .replace(/\r\n/g, "\n")   // Windows newline → Unix
    .replace(/\n/g, "")       // remove newline characters
    .replace(/^"(.*)"$/, "$1"); // remove surrounding quotes
}

export function normalizeMongoOutput(output: string): string {
  return output.trim().replace(/^"(.*)"$/, "$1");
}

