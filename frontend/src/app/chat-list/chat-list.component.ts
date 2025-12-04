import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgFor } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat-list',
  imports: [
    NgFor,
    DatePipe
  ],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css'
})
export class ChatListComponent {
  chats = signal<{title: string, flavor: string, created_at: Date, last_updated: Date }[]>([]);

  constructor(
    private api: ApiService
  ){}

  ngOnInit(){
    this.api.getChatList().subscribe(response => {
      const parsed = response.data.map((chat: { created_at: string | number | Date; last_updated: string | number | Date; }) => ({
        ...chat,
        created_at: new Date(chat.created_at),
        last_updated: new Date(chat.last_updated)
      }))
      this.chats.set(response.data);
      console.log(response.data)
    })
  }

}
