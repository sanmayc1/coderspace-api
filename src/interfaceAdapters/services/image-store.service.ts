import { injectable } from "tsyringe";
import { IImageStoreService } from "../../domain/services/image-store.service.interface.js";
import cloudinary from "../../shared/utils/cloudinary.js";
import { UploadApiResponse } from "cloudinary";

@injectable()
export class ImageStoreService implements IImageStoreService {
  async uploadImage(
    file: Express.Multer.File,
    folderName: string
  ): Promise<{ url: string; publicId: string }> {
    const streamUpload = (fileBuffer: Buffer<ArrayBufferLike>) => {
      return new Promise<UploadApiResponse>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: folderName },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );

        stream.end(fileBuffer);
      });
    };

    try {
      const result = await streamUpload(file.buffer);
      return { url: result.secure_url, publicId: result.public_id };
    } catch (error) {
      throw error;
    }
  }
}
