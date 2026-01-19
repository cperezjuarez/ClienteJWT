import { Component, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  username = signal<string | null>(null);
  email = signal<string | null>(null);
  error = signal<HttpErrorResponse | null>(null);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.updateUser();
  }

  updateUser(): void {
    this.authService.currentUser$.subscribe({
      next: (data) => {
        this.username.set(data?.username ?? null);
        this.email.set(data?.email ?? null);
      },

      error: (err) => {
        this.error.set(err);
      }
    })
  }
}
