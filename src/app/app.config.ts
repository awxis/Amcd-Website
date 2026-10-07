import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Scrolling (top-of-page on route change, smooth anchor scrolling) is handled by core/scroll-manager.ts.
    // 'reload' lets the same fragment link (e.g. "Contact Us") scroll again when clicked twice.
    provideRouter(
      routes,
      withComponentInputBinding(), // route params (e.g. :slug) bind to component inputs
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
    ),
  ],
};
