import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [
    NgIf
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input({ required: true }) title = '';
  @Input({ required: true }) shown!: boolean;
  @Output() shownChange = new EventEmitter<boolean>();

  closeModal() {
    this.shown = false;
    this.shownChange.emit(this.shown);
  }

}
