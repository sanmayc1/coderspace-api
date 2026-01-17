
export function normalize(output: string): string {
  return output
    .trim()
    .replace(/\r\n/g, "\n")
    .replace(/\s+/g, "");
}

export function normalizeMongoOutput(output: string): string {
  return output.trim().replace(/^"(.*)"$/, "$1");
}

