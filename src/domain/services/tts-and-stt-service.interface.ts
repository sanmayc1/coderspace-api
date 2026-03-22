export interface ITtsAndSttService {
  textToSpeech(text: string): Promise<Buffer>;
  speechToText(audio: string): Promise<string>;
}
