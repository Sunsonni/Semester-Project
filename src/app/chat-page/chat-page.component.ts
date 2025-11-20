import { Component } from '@angular/core';
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: 'app-chat-page',
  imports: [ModalComponent],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css'
})
export class ChatPageComponent {
  modalVisible = false;
  modalMessage = '';
  constructor(){
    if (sessionStorage.getItem('has_api_key') === 'false') {
      this.modalVisible = true;
      this.modalMessage = `
      In order to use the chat features, a Gemini API key is required. 
      You can generate one here: 
      <a href="https://aistudio.google.com/app/api-keys" target="_blank" rel="noopener">
      Gemini API Keys
      </a>.`;
    }
  }
}
