import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';

export const routes: Routes = [
    { path: 'login', component: LoginPageComponent },
    // TODO: Create error page
    { path: '**', component: LoginPageComponent },
];
