import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = signal<boolean>(false);
  
  constructor(private api: ApiService, private router: Router) {}

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

  login(email: string, password: string) {
    return this.api.verifyUser(email,password).subscribe({
      next: (res: any) => {
        if (res.token) {
          sessionStorage.setItem('token', res.token);
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
