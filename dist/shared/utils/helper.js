"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalize = normalize;
exports.normalizeMongoOutput = normalizeMongoOutput;
function normalize(output) {
    return output
        .trim()
        .replace(/\r\n/g, "\n") // Windows newline → Unix
        .replace(/\n/g, "") // remove newline characters
        .replace(/^"(.*)"$/, "$1"); // remove surrounding quotes
}
function normalizeMongoOutput(output) {
    return output.trim().replace(/^"(.*)"$/, "$1");
}
//# sourceMappingURL=helper.js.map