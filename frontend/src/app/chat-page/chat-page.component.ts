import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalComponent } from "../modal/modal.component";
import { NewChatModalComponent } from '../new-chat-modal/new-chat-modal.component';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, ɵInternalFormsSharedModule } from "@angular/forms";

@Component({
  selector: 'app-chat-page',
  imports: [
    ModalComponent,
    NewChatModalComponent,
    NgIf,
    NgFor,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule
],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css'
})
export class ChatPageComponent {
@ViewChild('chatContainer') private chatContainer!: ElementRef;
// TODO: switch input to a text area or something along those lines
  modalVisible = false;
  newChatModalVisible = false;
  modalMessage = '';
  chatHistory = signal<{ role: string; content: string}[]>([]);
  chat_session_id!: Number;
  form: FormGroup;

  constructor(
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder
  ){
    this.form = this.fb.group({
      input : ['']
    });
  }

  ngOnInit() {
    const hasAPIKey = sessionStorage.getItem('has_api_key') === 'true';
    if (!hasAPIKey) {
      this.modalVisible = true;
      this.modalMessage = `
      In order to use the chat features, a Gemini API key is required. 
      You can generate one here: 
      <a href="https://aistudio.google.com/app/api-keys" target="_blank" rel="noopener">
      Gemini API Keys
      </a>.`;
    }
    const chatSessionId = sessionStorage.getItem('chat_session_id')
    if(!chatSessionId) {
      this.newChatModalVisible = true;
    }
    
    this.loadSession(Number(chatSessionId));
    
  }

  onChatConfirmed(event: any) {
    sessionStorage.setItem('chat_session_id', event.chat_session_id);
    this.newChatModalVisible = false;
    this.loadSession(event.chat_session_id);
  }

  private loadSession(chat_session_id: Number) {
    this.chat_session_id = Number(chat_session_id);
    this.api.getSession(this.chat_session_id).subscribe(response =>{
        this.chatHistory.set(response.messages);
      }
    );
  }

  sendMessage(){
    this.chatHistory.set([
      ...this.chatHistory(),
      { role: 'user', content: this.form.get('input')?.value }
    ]);
    this.api.sendMessage(this.chat_session_id, this.form.get('input')?.value ).subscribe(response => {
      this.chatHistory.set([
        ...this.chatHistory(),
      { role: 'assistant', content: response.message }
      ]);
    });
    this.form.get('input')?.setValue('');
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      const el = this.chatContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch (error) {
      console.error('Scroll to bottom failed', error);
    }
  }
  
}
