import { Injectable } from '@angular/core';
import {
  VoiceRecorder,
  RecordingData,
  GenericResponse
} from 'capacitor-voice-recorder';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root',
})
export class Sound {
  isRecording = false;
  recordings: any[] = [];

  constructor() { }

  async requestPermission() {
    const permResult = await VoiceRecorder.requestAudioRecordingPermission();
    return permResult.value;
  }

  async startRecording() {
    const allowed = await this.requestPermission();
    if (!allowed) {
      throw new Error('Microphone permission not granted');
    }

    await VoiceRecorder.startRecording();
    this.isRecording = true;
  }

  async stopRecording() {
    const result: RecordingData = await VoiceRecorder.stopRecording();
    this.isRecording = false;

    if (result.value && result.value.recordDataBase64) {
      const fileName = `rec-${Date.now()}.wav`;
      const base64 = result.value.recordDataBase64;

      const audioUrl = `data:audio/wav;base64,${base64}`;

      this.recordings.push({
        fileName,
        audioUrl,
        base64,
      });

      return audioUrl;
    }

    return null;
  }

  async playAudio(recording: any) {
    const audio = new Audio(recording.audioUrl);
    audio.play();
  }

  getRecordings() {
    return this.recordings;
  }

  async saveRecording(fileName: string, data: Blob) {
    const base64 = await this.blobToBase64(data);
    await Filesystem.writeFile({
      path: `recordings/${fileName}`,
      data: base64,
      directory: Directory.Data
    });
  }

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        const base64Data = (reader.result as string).split(',')[1];
        resolve(base64Data);
      };
      reader.readAsDataURL(blob);
    });
  }
}
