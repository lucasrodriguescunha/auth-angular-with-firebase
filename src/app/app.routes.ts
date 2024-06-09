// Importa a interface Routes do módulo @angular/router
import { Routes } from '@angular/router';
// Importa os componentes RegisterComponent e LoginComponent
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

// Define as rotas da aplicação
export const routes: Routes = [
  {
    path: 'register', // Define o caminho da rota
    component: RegisterComponent, // Define o componente associado a este caminho
  },
  {
    path: 'login', // Define o caminho da rota
    component: LoginComponent, // Define o componente associado a este caminho
  },
];
