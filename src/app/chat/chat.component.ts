import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io } from 'socket.io-client';

interface Message {
  _id: string;
  user: string;
  message: string;
  timestamp: string;
  __v: number;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  socket = io('http://localhost:3000/chat');
  messageText = '';
  apiEndpoint = 'http://localhost:3000/chat';

  constructor(private http: HttpClient) { }

  ngOnInit() {

    // Connect to Socket.io server
    //this.socket = io('http://localhost:3000/chat');

    // Fetch initial messages from API endpoint
    this.http.get<Message[]>(this.apiEndpoint)
      .subscribe(data => this.messages = data, error => console.error('Error fetching messages:', error));

    // Listen for new messages received via Socket.io
    this.socket.on('new-message', (message: Message) => {
      console.log('Received new message:', message);
      this.messages.push(message);
    });
  }

  sendMessage() {
    if (this.messageText.trim()) {
      // Send message to server via Socket.io
      this.socket.emit('send-message', {
        user: 'You', // Replace with actual username
        message: this.messageText
      });
      this.messageText = '';
    }
  }

  ngOnDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

}
