import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { JsonPipe } from '@angular/common';
import User from '../../models/user';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.loginForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  test: User | undefined;
  
  
  async onSubmit() {
    if (this.loginForm.invalid) {
      
    }
  }

  async handleClick() {
    this.test = await this.apiService.getUserById(1);
  }
  
}
