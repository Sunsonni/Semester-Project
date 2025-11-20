import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-settings-page',
  imports: [NgIf],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css'
})
export class SettingsPageComponent {
  message: string = "";
  apiKey: string = "";
  showKey = false;

  constructor(private api: ApiService) {
    if (sessionStorage.getItem('has_api_key') === 'true' && !!sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      this.api.getAPIKey(token!).subscribe({
        next: (res) => {
          this.apiKey = res.api_key;
        }
      }
      ); 
    }
  }


  saveApiKey(){

  }

}
