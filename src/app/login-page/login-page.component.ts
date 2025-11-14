import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }
  
  onSubmit() {
    let email = this.loginForm.get('email')?.value;
    let pass = this.loginForm.get('password')?.value;
    this.auth.login(email, pass);
    }
    
}
