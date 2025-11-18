import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { RegisterPageComponent } from './register-page/register-page.component';

export const routes: Routes = [
    { path: 'login', component: LoginPageComponent, canActivate: [loginGuard] },
    { path: 'home', component: HomePageComponent, canActivate: [authGuard] },
    { path: 'register', component: RegisterPageComponent },
    // TODO: Create error page
    { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
