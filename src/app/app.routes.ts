import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
    { path: '**', component: LoginPageComponent },
    { path: 'login', component: LoginPageComponent },
    // TODO: Create error page
    { path: 'home', component: HomePageComponent },
];
