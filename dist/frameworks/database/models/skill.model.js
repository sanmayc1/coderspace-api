"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillModel = void 0;
const mongoose_1 = require("mongoose");
const skill_schema_1 = require("../schema/skill.schema");
exports.SkillModel = (0, mongoose_1.model)('Skill', skill_schema_1.skillSchema);
//# sourceMappingURL=skill.model.js.map