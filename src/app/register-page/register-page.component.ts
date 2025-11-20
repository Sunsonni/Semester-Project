import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ModalComponent } from '../modal/modal.component';

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
  //TODO: add invalid item or whatever validators and shit
  
  onSubmit() {
    if (!this.userForm.get('api_key')?.value.trim() && !this.warned) {
      this.modalMessage = `
      <strong>WARNING:</strong> You need a <a href="https://aistudio.google.com/app/api-keys" target="_blank" rel="noopener">Gemini API key</a> to use the chat. You can continue with registration without it, but chat features won't work until you add a key.`;
      this.modalVisible = true;
      this.warned = true;
      return;
    }

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
