import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { UserList } from './components/users/user-list/user-list';
import { authGuard } from './guards/auth.guard';
import { Register } from './components/auth/register/register';
import { Menu } from './components/menu/menu';
import { AddUserForm } from './components/users/add-user-form/add-user-form';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'users-list', component: UserList, canActivate: [authGuard] },
    { path: 'users-form', component: AddUserForm, canActivate: [authGuard] },
    { path: 'menu', component: Menu, canActivate: [authGuard] }
];
