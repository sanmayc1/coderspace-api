"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageModel = void 0;
const mongoose_1 = require("mongoose");
const language_schema_1 = require("../schema/language.schema");
exports.LanguageModel = (0, mongoose_1.model)('Language', language_schema_1.langaugeSchema);
//# sourceMappingURL=language.model.js.map