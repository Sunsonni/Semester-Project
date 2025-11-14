import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = signal(!!localStorage.getItem('token'));

  constructor(private api: ApiService, private router: Router) { }

  login(email: string, password: string) {
    return this.api.verifyUser(email,password).subscribe({
      next: (res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.isLoggedIn.set(true);
          this.router.navigate(['/home'], { replaceUrl: true });
        }
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
