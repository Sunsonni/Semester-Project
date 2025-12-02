import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-new-chat-modal',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './new-chat-modal.component.html',
  styleUrl: './new-chat-modal.component.css'
})
export class NewChatModalComponent {
  showWarning = false;
  warned = false;
  private destroy$ = new Subject<void>();
  @Input({ required: true }) shown!: boolean;
  
  @Output() shownChange = new EventEmitter<Boolean>();
  @Output() confirmed = new EventEmitter<{ title: string; flavor: string; initialResponse: string; chat_session_id: any}>();
  

  constructor (
    private api: ApiService,
    private router: Router
  ) {}

  form = new FormGroup ({
    flavor: new FormControl('default'),
    title: new FormControl('New Chat'),
  });

  close(){
    if(this.warned === false) {
      this.showWarning = true;
    }
    this.shown = false;
    this.shownChange.emit(this.shown);
    this.router.navigate(['/home']);
  }

  confirm() {
      const flavor = this.form.get('flavor')?.value;
      const title = this.form.get('title')?.value;
      if (flavor && title) {
        let initialResponse;
        let chat_session_id;
        let test = this.api.createSession(title, flavor).subscribe(response => {
          this.confirmed.emit({
            title, 
            flavor, 
            initialResponse: response.initialResponse,
            chat_session_id: response.chat_session_id,
          });
          this.shown = false;
          this.shownChange.emit(this.shown);
        }
        );
      }
  }

  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}


