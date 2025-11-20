import { NgIf } from '@angular/common';
import { Component, effect } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

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
  currentRoute: string = '';
  constructor (
    private auth: AuthService,
    private router: Router
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.urlAfterRedirects;
    });
  }

  get isLoggedIn() : Boolean {
    return this.auth.isLoggedIn() || !!sessionStorage.getItem('token');
  }

  get buttonText() : string {
    if (this.currentRoute.includes('login')) return 'Register';
    if (this.currentRoute.includes('register')) return 'Login';
    if (this.currentRoute === '/') return 'Register';
    return 'Login';
  }

  get buttonLink() : string{
    if (this.currentRoute.includes('login')) return '/register';
    if (this.currentRoute.includes('register')) return '/login';
    return '/login';
  }

  logout(){
    this.auth.logout();
  }
}
