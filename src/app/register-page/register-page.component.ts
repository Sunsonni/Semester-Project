import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register-page',
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  userForm: FormGroup;
  message: String = "";

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService,
    private router: Router,
    private api: ApiService
  ) {
    this.userForm = this.fb.group({
      name : ['', ],
      email : ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      api_key: [''],  
      role: [''] 
    });

  }
  
  onSubmit() {
    let name = this.userForm.get('name')?.value;
    let email = this.userForm.get('email')?.value;
    let pass = this.userForm.get('password')?.value;
    let api_key = this.userForm.get('api_key')?.value;
    let role = this.userForm.get('role')?.value;
    this.api.createUser(name, email, pass, api_key, role).subscribe({
      next: (res) => {
        this.message = "User added successfully! Redirecting...";
        this.router.navigate(["/login"]);
      }
    });
    }
    
}
