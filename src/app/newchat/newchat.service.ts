import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewchatService {
  private socket = io('http://localhost:3000/chat');

  sendMessage(message: string) {
    this.socket.emit('new-message', message);
  }
  getMessages() {
    let observable = new Observable<{ _id: String, user: String, message: String, timestamp: String, __v: Number }>(observer => {
      this.socket.on('new-message', (data) => {
        observer.next(data);

      });

      return () => { this.socket.disconnect(); };
    });
    return observable;
  }

  constructor() { }
}
