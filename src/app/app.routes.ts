import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';

export const routes: Routes = [
    { path: '', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'login', component: LoginPageComponent, canActivate: [loginGuard] },
    { path: 'home', component: HomePageComponent, canActivate: [authGuard] },
    { path: 'chat', component: ChatPageComponent, canActivate: [authGuard] },
    { path: 'error', component: ErrorPageComponent },
    { path: '**', redirectTo: 'error' },
];
