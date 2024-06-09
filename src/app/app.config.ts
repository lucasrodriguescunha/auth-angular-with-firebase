// Importa as funções e módulos necessários do Angular
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

// Configurações do Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCuRo1SHG7p1SUAPzSfaiP5hZXkkkum6gU',
  authDomain: 'angularlist-40875.firebaseapp.com',
  databaseURL: 'https://angularlist-40875-default-rtdb.firebaseio.com',
  projectId: 'angularlist-40875',
  storageBucket: 'angularlist-40875.appspot.com',
  messagingSenderId: '892492496560',
  appId: '1:892492496560:web:b50b461b806e36d6a24575',
  measurementId: 'G-NPQWSGMT19',
};

// Define a configuração da aplicação Angular
export const appConfig: ApplicationConfig = {
  providers: [
    // Fornece configurações para otimização de detecção de mudança de zona
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Fornece o serviço de roteamento com as rotas definidas em app.routes
    provideRouter(routes),
    // Fornece o serviço de cliente HTTP para fazer requisições HTTP
    provideHttpClient(),
    // Fornece a instância do aplicativo Firebase inicializada com as configurações fornecidas
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    // Fornece o serviço de autenticação do Firebase
    provideAuth(() => getAuth()),
  ],
};
