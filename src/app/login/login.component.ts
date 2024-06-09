// Importa os módulos e serviços necessários do Angular
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

// Define o componente Angular
@Component({
  selector: 'app-login', // O seletor usado para este componente no HTML
  standalone: true, // Indica que este é um componente autônomo
  imports: [ReactiveFormsModule], // Importa o módulo de formulários reativos do Angular
  templateUrl: './login.component.html', // O caminho para o arquivo de template HTML deste componente
  styleUrl: './login.component.css', // O caminho para o arquivo CSS deste componente
})
export class LoginComponent {
  // Injeta dependências usando o método `inject`
  fb = inject(FormBuilder); // FormBuilder para criar formulários reativos
  http = inject(HttpClient); // HttpClient para fazer requisições HTTP
  authService = inject(AuthService); // AuthService para autenticação do usuário
  router = inject(Router); // Router para navegação

  // Cria um formulário reativo com campos para email e senha
  form = this.fb.nonNullable.group({
    email: ['', Validators.required], // Campo de email, obrigatório
    password: ['', Validators.required], // Campo de senha, obrigatório
  });

  // Inicializa a mensagem de erro como null
  errorMessage: string | null = null;

  // Método chamado quando o formulário é enviado
  onSubmit(): void {
    // Obtém os valores dos campos do formulário
    const rawForm = this.form.getRawValue();

    // Chama o método de login do AuthService com o email e a senha
    this.authService.login(rawForm.email, rawForm.password).subscribe({
      next: () => {
        // Se o login for bem-sucedido, navega para a página principal
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        // Se houver um erro, define a mensagem de erro
        // Assumindo que o erro tem uma propriedade `message`
        this.errorMessage = 'Erro: Insira os dados para realizar o acesso!'; // err.message || 'Registration failed';
      },
    });
  }
}
