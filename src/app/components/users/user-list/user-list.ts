import { Component, OnInit, signal } from '@angular/core';
import { RegisterRequest, User } from '../../../models';
import { UserService } from '../../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddUserForm } from '../add-user-form/add-user-form';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  users = signal<User[] | null>(null);
  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);

  constructor(private userService: UserService, private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading.set(true);
    this.error.set(null);

    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err);
        this.loading.set(false);
      }
    });
  }

  openForm() {
    const dialogRef = this.dialog.open(AddUserForm, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading.set(true);
        this.error.set(null);

        const request: RegisterRequest = { username: result.username, password: result.password, email: result.email }

        this.authService.register(request).subscribe({
          next: () => {
            this.loadUsers();
            this.loading.set(false);
          },
          error: (err) => {
            this.error.set(err);
            this.loading.set(false);
          }
        });
      }
    });
  }
}
