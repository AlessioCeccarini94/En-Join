import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Categorie } from './pages/categorie/categorie';
import { Register } from './pages/register/register';
import { Profile } from './pages/profile/profile';
import { Eventi } from './pages/eventi/eventi';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'categorie', component: Categorie },
  { path: 'register', component: Register },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'eventi', component: Eventi },
];
