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
exports.TtsAndSttService = void 0;
const tsyringe_1 = require("tsyringe");
const auth_1 = require("../controllers/auth");
const axios_1 = __importDefault(require("axios"));
let TtsAndSttService = class TtsAndSttService {
    constructor() {
    }
    async textToSpeech(text) {
        const res = await axios_1.default.get(`${auth_1.config.tts.url}/tts?text=${text}`, {
            responseType: "arraybuffer"
        });
        const audioBase64 = Buffer.from(res.data).toString("base64");
        return audioBase64;
    }
    async speechToText(audio) {
        return "";
    }
};
exports.TtsAndSttService = TtsAndSttService;
exports.TtsAndSttService = TtsAndSttService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], TtsAndSttService);
//# sourceMappingURL=tts-and-stt.service.js.map