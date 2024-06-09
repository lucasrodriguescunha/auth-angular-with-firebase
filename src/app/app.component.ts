// Importa os módulos e serviços necessários do Angular
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { User } from 'firebase/auth'; // Importando o tipo User de firebase/auth

// Define o componente Angular
@Component({
  selector: 'app-root', // O seletor usado para este componente no HTML
  standalone: true, // Indica que este é um componente autônomo
  imports: [
    CommonModule, // Módulo comum para recursos compartilhados
    RouterOutlet, // Diretiva para renderizar as rotas
    LoginComponent, // Componente de login
    RegisterComponent, // Componente de registro
    RouterLink, // Diretiva para criar links de navegação
  ],
  templateUrl: './app.component.html', // O caminho para o arquivo de template HTML deste componente
  styleUrls: ['./app.component.css'], // O caminho para o arquivo CSS deste componente
})
export class AppComponent implements OnInit {
  authService = inject(AuthService); // Injeta o serviço de autenticação

  // Método chamado quando o componente é inicializado
  ngOnInit() {
    // Inscreve-se para receber atualizações no usuário atual
    this.authService.user$.subscribe((user: User | null) => {
      if (user) {
        // Se houver um usuário logado, atualiza os dados do usuário no serviço de autenticação
        this.authService.currentUserSig.set({
          email: user.email!, // Obtém o email do usuário
          username: user.displayName!, // Obtém o nome de usuário do usuário
        });
      } else {
        // Se não houver usuário logado, define o usuário como null no serviço de autenticação
        this.authService.currentUserSig.set(null);
      }
      // Exibe informações do usuário atual no console
      console.log(this.authService.currentUserSig());
    });
  }

  // Método para fazer logout do usuário
  logout(): void {
    this.authService.logout();
  }
}
