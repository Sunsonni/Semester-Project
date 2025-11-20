import { NgIf } from '@angular/common';
import { Component, effect } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor (private auth: AuthService) {}

  get isLoggedIn() : Boolean {
    return this.auth.isLoggedIn() || !!sessionStorage.getItem('token');
  }

  logout(){
    this.auth.logout();
  }
}
