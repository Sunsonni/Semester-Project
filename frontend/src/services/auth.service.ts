import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = signal<boolean>(false);
  
  constructor(private api: ApiService, private router: Router) {}

  
  refreshTokens() {
    const refreshToken = sessionStorage.getItem('refresh_token');
    
    if(!refreshToken) {
      this.logout();
      return;
    }
    
    this.api.refreshToken(refreshToken).subscribe({
      next: (res: any) => {
        if (res.access_token) {
          sessionStorage.setItem('token', res.access_token);
          console.log('Token refreshed automatically');
        }
      }, 
      error: () => {
        this.logout();
      }
    })
  }
  
  ngOnInit() {
    const token = sessionStorage.getItem('token');
    
    if(token) {
      this.api.verifyToken(token).subscribe(
        {
        next: (res: any) => {
          this.isLoggedIn.set(res.valid);
        },
        error: ()=> {
          this.isLoggedIn.set(false);
          sessionStorage.removeItem('token');
        }
      })
    }
  }

  login(identifier: string, password: string) {
    return this.api.verifyUser(identifier, password).subscribe({
      next: (res: any) => {
        if (res.token) {
          sessionStorage.setItem('token', res.token);
          sessionStorage.setItem('refresh_token', res.refresh_token);
          sessionStorage.setItem('has_api_key', res.has_api_key);
          sessionStorage.setItem('role', res.role);
          this.isLoggedIn.set(true);
          this.router.navigate(['/home'], { replaceUrl: true });
        }
      }
    });
  }

  logout() {
    sessionStorage.removeItem('token');
    this.isLoggedIn.set(false);
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
