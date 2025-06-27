import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home.component';
import { FilmListComponent } from './features/films/components/film-list/film-list.component';
import { FilmFormComponent } from './features/films/components/film-form/film-form.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
    redirectTo: '',
  },
];
