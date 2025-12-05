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
  hasAPIKey = false;
  apiKeyControl = new FormControl('');
  private destroy$ = new Subject<void>();

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.hasAPIKey = sessionStorage.getItem('has_api_key') === 'true';
    const token = sessionStorage.getItem('token');
    if (this.hasAPIKey && token) {
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
    const apiKey = this.apiKeyControl.value;
    if (!apiKey) {
      this.message = "API keu cannot be empty";
      return;
    }

    this.api.saveAPIKey(apiKey).subscribe({
      next: (response) => {
        this.message = 'API Key saved successfully';
        sessionStorage.setItem('has_api_key', 'true');
      }, 
      error: (error) => {
        console.error('Failed to save API key', error);
        this.message = 'Failed to save API key';
      }
    });
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }

}
