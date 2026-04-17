import { injectable } from 'tsyringe';
import { ITtsAndSttService } from '../../domain/services/tts-and-stt-service.interface';
import { config } from '../controllers/auth';
import axios from 'axios';

@injectable()
export class TtsAndSttService implements ITtsAndSttService {
   
    constructor() {
    }

   async textToSpeech(text: string): Promise<string> {
       
     const res = await axios.get(`${config.tts.url}/tts?text=${text}`,{
        responseType: "arraybuffer"
     });

     

      const audioBase64 = Buffer.from(res.data).toString("base64");

     return audioBase64

    }
   async speechToText(audio: string): Promise<string> {
        return ""
    }

}
