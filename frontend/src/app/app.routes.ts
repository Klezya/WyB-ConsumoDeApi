// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent // Carga HomeComponent en la ruta raíz
  },
  {
    path: '**',
    redirectTo: '', // Redirige cualquier ruta desconocida a la raíz
  }
];
