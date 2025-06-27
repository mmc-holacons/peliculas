import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';
import { ToastService } from '../../../../shared/toast/services/toast.service';
import { ToastType } from '../../../../shared/toast/models/toast-type.model';

@Component({
  selector: 'app-film-form',
  imports: [ReactiveFormsModule],
  templateUrl: './film-form.component.html',
  styleUrl: './film-form.component.scss',
})
export class FilmFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private toastService = inject(ToastService);
  private fb = inject(FormBuilder);
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

    if (this.isUpdate && this.filmId !== '') {
      const updatedFilm: Film = { id: this.filmId, ...formData };

      this.filmService.updateFilm(updatedFilm).subscribe({
        next: () => {
          this.toastService.showToast('Película actualizada correctamente.', ToastType.Success);
        },
        error: () => {
          this.toastService.showToast('Error al actualizar la película.', ToastType.Error);
        },
      });
    } else {
      this.filmService.addFilm(formData).subscribe({
        next: () => {
          this.toastService.showToast('Película añadida correctamente.', ToastType.Success);
          this.filmForm.reset();
        },
        error: () => {
          this.toastService.showToast('Error al añadir la película.', ToastType.Error);
        },
      });
    }
  }
}
