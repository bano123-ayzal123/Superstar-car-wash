import { Routes } from '@angular/router';
import { authGuard } from './core/gaurds/auth.guard';

export const appRoutes: Routes = [
  { path: '', loadChildren: () => import('./features/home/home.routes').then(m => m.HOME_ROUTES) },
  { path: 'services', loadChildren: () => import('./features/services/services.routes').then(m => m.SERVICES_ROUTES) },
  { path: 'pricing', loadChildren: () => import('./features/pricing/pricing.routes').then(m => m.PRICING_ROUTES) },
  { path: 'membership', loadChildren: () => import('./features/membership/membership.routes').then(m => m.MEMBERSHIP_ROUTES) },
  { path: 'locations', loadChildren: () => import('./features/locations/locations.routes').then(m => m.LOCATIONS_ROUTES) },
  { path: 'booking', canActivate: [authGuard], loadChildren: () => import('./features/booking/booking.routes').then(m => m.BOOKING_ROUTES) },
  { path: 'contact', loadChildren: () => import('./features/contact/contact.routes').then(m => m.CONTACT_ROUTES) },
  { path: 'login', loadComponent: () => import('./features/auth/login.page').then(m => m.default) },
  { path: 'register', loadComponent: () => import('./features/auth/register.page').then(m => m.default) },
  { path: '**', redirectTo: '' }
];
