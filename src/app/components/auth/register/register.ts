import { HttpErrorResponse } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterRequest } from '../../../models';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
    })
  }

  onSubmit(): void {
    this.loading.set(true);
    this.error.set(null);

    const request: RegisterRequest = { username: this.form.value.username, password: this.form.value.password, email: this.form.value.email }

    this.authService.register(request).subscribe({
      next: () => {
        this.router.navigate(['/users-list']);
      },
      error: (err) => {
        this.error.set(err);
        this.loading.set(false);
      }
    });
  }
}
