import { injectable } from 'tsyringe';
import { ITtsAndSttService } from '../../domain/services/tts-and-stt-service.interface';
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { config } from '../controllers/auth';

@injectable()
export class TtsAndSttService implements ITtsAndSttService {
    private serviceProvider: ElevenLabsClient;
    constructor() {
        this.serviceProvider = new ElevenLabsClient({
            apiKey: config.elevenLabs.apiKey,
        })
    }

   async textToSpeech(text: string): Promise<Buffer> {
       
     const audio = await this.serviceProvider.textToSpeech.convert("zbf1mNIv57v46njTEPXZ",{
        text,
        modelId:"eleven_multilingual_v2",
        outputFormat:"mp3_44100_128"
     })

     const reader = audio.getReader();
     const chunks:Buffer[] = [];
     while(true){
        const {done,value} = await reader.read();
        if(done)break;
        chunks.push(Buffer.from(value));
     }
     const audioBuffer = Buffer.concat(chunks);
     return audioBuffer

    }
   async speechToText(audio: string): Promise<string> {
        return ""
    }

}
