import { Component, OnInit } from '@angular/core';
import { NewchatService } from './newchat.service'

interface Message {
  _id: string;
  user: string;
  message: string;
  timestamp: string;
  __v: number;
}

@Component({
  selector: 'app-newchat',
  templateUrl: './newchat.component.html',
  styleUrl: './newchat.component.scss'
})
export class NewchatComponent implements OnInit {
  // message: string;
  // messages: string[] = [];

  message: string = '';
  messages: Message[] = [];

  constructor(private newChatService: NewchatService) { }

  ngOnInit() {
     this.newChatService.getMessages().subscribe((message: Message) => {
       this.messages.push(message);
     });
  }

  sendMessage() {
    this.newChatService.sendMessage(this.message);
    this.message = '';
  }
}
