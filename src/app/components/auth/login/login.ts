import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../../models';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);
  form!: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    })
  }

  onSubmit(): void {
    this.loading.set(true);
    this.error.set(null);

    const request: LoginRequest = { username: this.form.value.username, password: this.form.value.password }

    this.authService.login(request).subscribe({
      next: () => {
        this.router.navigate(['/users-list']);
      },
      error: (err) => {
        this.error.set(err);
        this.loading.set(false);
        alert('Usuario incorrecto')
      }
    });
  }
}
