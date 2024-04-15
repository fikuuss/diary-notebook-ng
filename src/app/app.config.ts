import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'notebook-f3ee4',
          appId: '1:824810271987:web:eb0951334635695762b386',
          storageBucket: 'notebook-f3ee4.appspot.com',
          apiKey: 'AIzaSyBjB0O0vesErlJv31i6-CZIYO-Y7LawO1o',
          authDomain: 'notebook-f3ee4.firebaseapp.com',
          messagingSenderId: '824810271987',
          measurementId: 'G-0VCPBXHVTC',
        })
      )
    ),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
