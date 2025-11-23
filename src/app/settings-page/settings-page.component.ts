import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgIf } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-settings-page',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css'
})
export class SettingsPageComponent {
  message: string = "";
  showKey = false;
  apiKeyControl = new FormControl('');
  private destroy$ = new Subject<void>();

  constructor(private api: ApiService) {}

  ngOnInit() {
    const hasAPIKey = sessionStorage.getItem('has_api_key') === 'true';
    const token = sessionStorage.getItem('token');
    if (hasAPIKey && token) {
          this.api.getAPIKey().pipe(
            takeUntil(this.destroy$)
          ).subscribe({
            next: (res) => {
              this.apiKeyControl.setValue(res.api_key);
              console.log("API Key loaded", this.apiKeyControl.value);
            },
            error: (err) => {
              console.error('Failed to fetch API key: ', err);
              this.apiKeyControl.setValue('');
            }
          }
          ); 
    }
  }


  saveApiKey(){

  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }

}
