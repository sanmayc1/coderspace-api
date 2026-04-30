"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompilerService = void 0;
const tsyringe_1 = require("tsyringe");
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../../shared/config");
let CompilerService = class CompilerService {
    constructor() { }
    async availableLanguages() {
        const res = await axios_1.default.get(`${config_1.config.compiler.runtimesUrl}`);
        return res.data;
    }
    async runCode(code, language, version, extension) {
        const res = await axios_1.default.post(`${config_1.config.compiler.executeUrl}`, {
            language,
            version,
            files: [
                {
                    name: `code-for-run.${extension}`,
                    content: code,
                },
            ],
            stdin: '',
            compile_memory_limit: -1,
            run_memory_limit: -1,
            compile_timeout: 5000,
            compile_cpu_time: 5000,
            run_timeout: 2000,
            run_cpu_time: 2000,
        });
        return res.data.run;
    }
};
exports.CompilerService = CompilerService;
exports.CompilerService = CompilerService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], CompilerService);
//# sourceMappingURL=compiler.service.js.map