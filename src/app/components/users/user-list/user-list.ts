import { Component, OnInit, signal } from '@angular/core';
import { RegisterRequest, User } from '../../../models';
import { UserService } from '../../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddUserForm } from '../add-user-form/add-user-form';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private userService: UserService, private authService: AuthService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  // Cargar usuarios
  loadUsers(): void {
    this.loading.set(true);
    this.error.set(null);

    // Service
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

  // Crear usuario
  createUser() {
    // Modal
    const dialogRef = this.dialog.open(AddUserForm, {
      width: '400px',
    });

    // Resultado del modal
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading.set(true);
        this.error.set(null);

        const request: RegisterRequest = { username: result.username, password: result.password, email: result.email }

        // Service
        this.authService.register(request).subscribe({
          next: () => {
            this.snackBar.open('Usuario creado correctamente', 'OK', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            })
            this.loadUsers();
            this.loading.set(false);
          },
          error: (err) => {
            this.snackBar.open('ERROR: Error al crear el usuario', 'OK', {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['error-snackbar']
            })
            this.error.set(err);
            this.loading.set(false);
          }
        });
      }
    });
  }

  // Eliminar usuario
  deleteUser(id: number) {
    this.loading.set(true);
    this.error.set(null);

    // Service
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.snackBar.open('Usuario eliminado correctamente', 'OK', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
        this.loadUsers();
        this.loading.set(false);
      },

      error: (err) => {
        this.snackBar.open('ERROR: Error al eliminar el usuario', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        })
        this.error.set(err);
        this.loading.set(false);
      }
    })
  }
}
