import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app/app.component';
import { isDevMode, importProvidersFrom } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AuthModule } from './app/modules/auth/auth.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SpinnerInterseptor } from './app/modules/core/interceptors/spinner.interceptor';
import { HeaderClassInterseptor } from './app/modules/core/interceptors/header.class.interceptor';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { APP_ROUTES } from './app/app-routes';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      AuthModule,
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first)
        registrationStrategy: 'registerWhenStable:30000',
      }),
    ),
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderClassInterseptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterseptor,
      multi: true,
    },
  ],
}).catch((err) => console.error(err));
