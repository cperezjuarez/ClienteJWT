import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { UserList } from './components/users/user-list/user-list';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', component: Login },
    { path: 'users-list', component: UserList, canActivate: [authGuard] }
];
