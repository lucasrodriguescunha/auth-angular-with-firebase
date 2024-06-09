// Importa os módulos e funções necessários do Angular e do Firebase
import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { UserInterface } from './register/user.interface'; // Importa a interface UserInterface

// Serviço de autenticação
@Injectable({
  providedIn: 'root', // Indica que este serviço está disponível em toda a aplicação
})
export class AuthService {
  firebaseAuth = inject(Auth); // Injeta o serviço de autenticação do Firebase
  user$ = user(this.firebaseAuth); // Observable que fornece informações sobre o usuário atual
  currentUserSig = signal<UserInterface | null | undefined>(undefined); // Sinal que emite o usuário atual ou nulo

  // Método para registrar um novo usuário
  register(
    email: string,
    username: string,
    password: string
  ): Observable<void> {
    // Cria um novo usuário com o email e a senha fornecidos
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((response) =>
      // Atualiza o perfil do usuário com o nome de usuário fornecido
      updateProfile(response.user, { displayName: username })
    );

    // Converte a promise em um Observable e o retorna
    return from(promise);
  }

  // Método para fazer login
  login(email: string, password: string): Observable<void> {
    // Faz login com o email e a senha fornecidos
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {});

    // Converte a promise em um Observable e o retorna
    return from(promise);
  }

  // Método para fazer logout
  logout(): Observable<void> {
    // Faz logout do usuário atual
    const promise = signOut(this.firebaseAuth);

    // Converte a promise em um Observable e o retorna
    return from(promise);
  }
}
