import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-modal',
  imports: [
    NgIf,
    RouterLink
],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input({ required: true }) title = '';
  @Input({ required: true }) shown!: boolean;
  @Input({ required: true }) message = '';
  @Input({ required: true }) allowClose = true;
  @Output() shownChange = new EventEmitter<boolean>();

  closeModal() {
    this.shown = false;
    this.shownChange.emit(this.shown);
  }

  addAPIKey() {
    
  }

}
