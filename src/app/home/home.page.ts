import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonButton, IonIcon, IonList, IonListHeader, IonLabel, IonItem } from '@ionic/angular/standalone';
import { Sound } from '../services/sound';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonItem, IonLabel, IonListHeader, IonList, IonIcon, IonButton, IonCardContent, IonCard, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements OnInit {

  isRecording = false;

  constructor(private soundService: Sound) { }

  ngOnInit() { }

  async toggleRecording() {
    if (!this.isRecording) {
      await this.startRecording();
    } else {
      await this.stopRecording();
    }
  }

  async startRecording() {
    try {
      await this.soundService.startRecording();
      this.isRecording = true;
    } catch (err) {
      console.error(err);
    }
  }

  async stopRecording() {
    try {
      await this.soundService.stopRecording();
      this.isRecording = false;
    } catch (err) {
      console.error(err);
    }
  }

  play(rec: any) {
    this.soundService.playAudio(rec);
  }

  get recordings() {
    return this.soundService.getRecordings();
  }
}
