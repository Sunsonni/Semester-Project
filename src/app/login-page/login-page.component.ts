import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { JsonPipe } from '@angular/common';
import User from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private apiService: ApiService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }
  
  
  test: User | undefined;
  
  
  
  onSubmit() {
    let email = this.loginForm.get('email')?.value;
    let pass = this.loginForm.get('password')?.value;
    this.apiService.verifyUser(email, pass).subscribe({
        next: (res: any) => {
          if (res?.token) {
            localStorage.setItem('token', res.token);
            alert(res?.message || 'Logged in successfully');
            this.router.navigate(['/home'], { replaceUrl: true});
          } else {
            alert(res?.message || 'Login failed');
          }
        },
        error: (err) => {
          console.error('Login error: ', err);
          alert('Something went wrong');
        }
    })
    }
    
}
