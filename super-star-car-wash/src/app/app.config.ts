import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {
providers: [
provideRouter(appRoutes, withInMemoryScrolling({anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'})),
provideHttpClient(withInterceptorsFromDi()),
provideAnimations(),
importProvidersFrom()
]
};