import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { findService } from './data/site-content';

/** Unknown service slugs go back to the services overview. */
const serviceExists: CanActivateFn = (route) =>
  findService(route.paramMap.get('slug')) ? true : inject(Router).parseUrl('/services');

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'services',
    pathMatch: 'full',
    loadComponent: () => import('./pages/services/services').then((m) => m.ServicesPage),
  },
  {
    path: 'services/:slug',
    canActivate: [serviceExists],
    loadComponent: () =>
      import('./pages/service-detail/service-detail').then((m) => m.ServiceDetail),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.ContactPage),
  },
  { path: '**', redirectTo: '' },
];
