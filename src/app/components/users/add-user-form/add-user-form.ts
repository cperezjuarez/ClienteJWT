import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { RegisterRequest } from '../../../models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-user-form.html',
  styleUrl: './add-user-form.css',
})
export class AddUserForm implements OnInit {
  error = signal<HttpErrorResponse | null>(null);
  form!: FormGroup;

  constructor(private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    })
  }

  onSubmit(): void {
    this.error.set(null);

    const request: RegisterRequest = { username: this.form.value.username, password: this.form.value.password, email: this.form.value.email }

    // Service
    this.authService.register(request).subscribe({
      next: () => {
        this.snackBar.open('Usuario creado correctamente', 'OK', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
      },

      error: (err) => {
        this.snackBar.open('ERROR: Error al crear el usuario', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        })
        this.error.set(err)
      }
    })
  }
}
