export interface ITtsAndSttService {
  textToSpeech(text: string): Promise<string>;
  speechToText(audio: string): Promise<string>;
}
