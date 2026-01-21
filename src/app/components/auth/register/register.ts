import { HttpErrorResponse } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterRequest } from '../../../models';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);
  form!: FormGroup;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    })
  }

  onSubmit(): void {
    this.loading.set(true);
    this.error.set(null);

    const request: RegisterRequest = { username: this.form.value.username, password: this.form.value.password, email: this.form.value.email }

    this.authService.register(request).subscribe({
      next: () => {
        this.snackBar.open('Usuario creado correctamente', 'OK',  {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.snackBar.open('ERROR: Error al crear el usuario', 'OK',  {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        })
        this.error.set(err);
        this.loading.set(false);
      }
    });
  }
}
