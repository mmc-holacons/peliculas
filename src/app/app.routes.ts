import { Routes } from '@angular/router';
import { FilmListComponent } from './features/films/components/film-list/film-list.component';
import { FilmFormComponent } from './features/films/components/film-form/film-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'peliculas',
    pathMatch: 'full',
  },
  {
    path: 'peliculas',
    component: FilmListComponent,
  },
  {
    path: 'peliculas/nueva',
    component: FilmFormComponent,
  },
  {
    path: 'peliculas/:id/editar',
    component: FilmFormComponent,
  },
  {
    path: '**',
    redirectTo: 'peliculas',
  },
];
