"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageStoreService = void 0;
const tsyringe_1 = require("tsyringe");
const cloudinary_1 = __importDefault(require("../../shared/utils/cloudinary"));
let ImageStoreService = class ImageStoreService {
    async uploadImage(file, folderName) {
        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary_1.default.uploader.upload_stream({ folder: folderName }, (error, result) => {
                    if (result)
                        resolve(result);
                    else
                        reject(error);
                });
                stream.end(fileBuffer);
            });
        };
        try {
            const result = await streamUpload(file.buffer);
            return { url: result.secure_url, publicId: result.public_id };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.ImageStoreService = ImageStoreService;
exports.ImageStoreService = ImageStoreService = __decorate([
    (0, tsyringe_1.injectable)()
], ImageStoreService);
//# sourceMappingURL=image-store.service.js.map