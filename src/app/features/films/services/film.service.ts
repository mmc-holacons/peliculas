import { inject, Injectable } from '@angular/core';
import { Film } from '../models/film';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/peliculas';

  // GET - Listar todas las películas
  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error al cargar las películas:', error);
        return throwError(() => new Error('No se pudieron cargar las películas. Intenta más tarde.'));
      })
    );
  }

  // GET - Ver datos de una película por ID
  getFilmById(id: string): Observable<Film> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Film>(url).pipe(
      catchError(error => {
        console.error('Error al cargar la película con ID', id, error);
        return throwError(() => new Error('No se pudo cargar la película.'));
      })
    );
  }

  // POST - Añadir nueva película
  addFilm(film: Film): Observable<Film> {
    return this.http.post<Film>(this.apiUrl, film).pipe(
      catchError(error => {
        console.error('Error al añadir película:', error);
        return throwError(() => new Error('No se pudo añadir la película.'));
      })
    );
  }

  // PUT - Actualizar película existente
  updateFilm(film: Film): Observable<Film> {
    const url = `${this.apiUrl}/${film.id}`;
    return this.http.put<Film>(url, film).pipe(
      catchError(error => {
        console.error('Error al actualizar película:', error);
        return throwError(() => new Error('No se pudo actualizar la película.'));
      })
    );
  }

  // DELETE - Eliminar película por ID
  deleteFilm(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(error => {
        console.error('Error al eliminar película:', error);
        return throwError(() => new Error('No se pudo eliminar la película.'));
      })
    );
  }
}
