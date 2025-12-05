import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ModalComponent } from '../modal/modal.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-register-page',
  imports: [
    NgIf,
    ReactiveFormsModule,
    ModalComponent
],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  userForm: FormGroup;
  message: String = "";
  modalVisible = false;
  modalMessage = '';
  warned = false;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService,
    private router: Router,
    private api: ApiService
  ) {
    this.userForm = this.fb.group({
      name : ['', ],
      username: ['', [Validators.required, Validators.minLength(5)]],
      email : ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      api_key: [''],  
      role: ['user'] 
    });

  }
  
  onSubmit() {
    if (!this.userForm.get('api_key')?.value.trim() && !this.warned) {
      this.modalMessage = `
      <strong>WARNING:</strong> You need a <a href="https://aistudio.google.com/app/api-keys" target="_blank" rel="noopener">Gemini API key</a> to use the chat. You can continue with registration without it, but chat features won't work until you add a key.`;
      this.modalVisible = true;
      this.warned = true;
      this.userForm.get('api_key')?.markAsTouched();
      return;
    }

    let name = this.userForm.get('name')?.value;
    let username = this.userForm.get('username')?.value;
    let email = this.userForm.get('email')?.value;
    let pass = this.userForm.get('password')?.value;
    let api_key = this.userForm.get('api_key')?.value;
    this.api.createUser(name, email, pass, api_key, username).subscribe({
      next: (res) => {
        this.router.navigate(["/login"]);
      },
      error: (error) => {
        if (error.error?.message?.includes('Username already exists')) {
          this.userForm.get('username')?.setErrors({ unique: true });
          this.message = ''; // Clear the general message
        } else if (error.error?.message?.includes('Email already exists')) {
          this.userForm.get('email')?.setErrors({ unique: true });
          this.message = ''; // Clear the general message
        } else {
          this.message = error.error?.message || 'An error occurred';
        }
      }
    });
    }

    ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
