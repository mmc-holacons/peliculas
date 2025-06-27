import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';

@Component({
  selector: 'app-film-list',
  imports: [],
  templateUrl: './film-list.component.html',
  styleUrl: './film-list.component.scss',
})
export class FilmListComponent implements OnInit {
  private filmService = inject(FilmService);
  private router = inject(Router);

  films = signal<Film[]>([]);
  filmToDelete = '';

  ngOnInit() {
    this.filmService.getFilms().subscribe(data => {
      this.films.set(data);
      console.log('Películas cargadas:', this.films());
    });
  }

  onEdit(id: string) {
    this.router.navigate(['/peliculas', id, 'editar']);
  }

  confirmDelete(id: string) {
    this.filmToDelete = id;
  }

  cancelDelete() {
    this.filmToDelete = '';
  }

  deleteConfirmed() {
    if (this.filmToDelete !== '') {
      this.filmService.deleteFilm(this.filmToDelete).subscribe(() => {
        this.films.update(films => films.filter(f => f.id !== this.filmToDelete));
        this.filmToDelete = '';
      });
    }
  }
}
