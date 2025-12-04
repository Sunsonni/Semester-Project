import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { AdminComponent } from './admin/admin.component';
import { adminGuard } from './guards/admin.guard';
ChatListComponent

export const routes: Routes = [
    { path: '', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'login', component: LoginPageComponent, canActivate: [loginGuard] },
    { path: 'home', component: HomePageComponent, canActivate: [authGuard] },
    { path: 'chat/:id', component: ChatPageComponent, canActivate: [authGuard] },
    { path: 'settings', component: SettingsPageComponent, canActivate: [authGuard] },
    { path: 'chats', component: ChatListComponent, canActivate: [authGuard]},
    { path: 'admin', component: AdminComponent, canActivate: [authGuard, adminGuard]},
    { path: 'error', component: ErrorPageComponent },
    { path: '**', redirectTo: 'error' },
];