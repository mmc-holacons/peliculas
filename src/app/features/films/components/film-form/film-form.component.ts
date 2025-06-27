import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';

@Component({
  selector: 'app-film-form',
  imports: [ReactiveFormsModule],
  templateUrl: './film-form.component.html',
  styleUrl: './film-form.component.scss',
})
export class FilmFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  private filmService = inject(FilmService);

  filmId = '';
  isUpdate = false;
  MIN_YEAR = 1888;

  filmForm: FormGroup = this.fb.group({
    titulo: ['', Validators.required],
    director: ['', Validators.required],
    anyo: [null, [Validators.required, Validators.min(this.MIN_YEAR)]],
    genero: ['', Validators.required],
    puntuacion: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
  });

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.isUpdate = true;
        this.filmId = idParam;
        this.filmService.getFilmById(this.filmId).subscribe(film => {
          if (film) {
            this.filmForm.patchValue(film);
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.filmForm.invalid) return;

    const formData = this.filmForm.value;

    if (this.isUpdate && this.filmId != '') {
      const updatedFilm: Film = { id: this.filmId, ...formData };

      this.filmService.updateFilm(updatedFilm).subscribe(() => {
        alert('Película actualizada correctamente.');
      });
    } else {
      this.filmService.addFilm(formData).subscribe(() => {
        alert('Película añadida correctamente.');
        this.filmForm.reset();
      });
    }
  }
}
