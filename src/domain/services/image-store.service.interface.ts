



export interface IImageStoreService{
    uploadImage(file:Express.Multer.File,folderName:string):Promise<{url:string,publicId:string}>
}