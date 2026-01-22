import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { DeleteResponse, UpdateUserRequest, User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users'

  constructor(private http: HttpClient) { }

  // Obtención de usuarios
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Eliminación de usuario
  public deleteUser(id: number): Observable<DeleteResponse> {
    return this.http.delete<DeleteResponse>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Actualización de usuario
  public updateUser(id: number, request: UpdateUserRequest): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, request)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Obtención de usuarios por nombre
  public getUsersByUsername(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/search/${username}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Gestión de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';

    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`
    } else {
      // Error del servidor
      errorMessage = `Codigo de error: ${error.status}, Mensaje: ${error.message}`;
    }

    console.log(errorMessage);
    return throwError(() => ({
      status: error.status,
      message: errorMessage,
      error: error.error
    }))
  }
}
