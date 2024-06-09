// Importa os módulos e serviços necessários do Angular
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

// Define o componente Angular
@Component({
  selector: 'app-register', // O seletor usado para este componente no HTML
  templateUrl: './register.component.html', // O caminho para o arquivo de template HTML deste componente
  styleUrl: './register.component.css', // O caminho para o arquivo CSS deste componente
  standalone: true, // Indica que este é um componente autônomo
  imports: [ReactiveFormsModule, RouterModule], // Importa os módulos de formulários reativos e roteamento
})
export class RegisterComponent {
  // Injeta dependências usando o método `inject`
  fb = inject(FormBuilder); // FormBuilder para criar formulários reativos
  http = inject(HttpClient); // HttpClient para fazer requisições HTTP
  authService = inject(AuthService); // AuthService para registro de usuário
  router = inject(Router); // Router para navegação

  // Cria um formulário reativo com campos para nome de usuário, email e senha
  form = this.fb.nonNullable.group({
    username: ['', Validators.required], // Campo de nome de usuário, obrigatório
    email: ['', Validators.required], // Campo de email, obrigatório
    password: ['', Validators.required], // Campo de senha, obrigatório
  });

  // Inicializa a mensagem de erro como null
  errorMessage: string | null = null;

  // Método chamado quando o formulário é enviado
  onSubmit(): void {
    // Obtém os valores dos campos do formulário
    const rawForm = this.form.getRawValue();

    // Chama o método de registro do AuthService com o email, nome de usuário e senha
    this.authService
      .register(rawForm.email, rawForm.username, rawForm.password)
      .subscribe({
        next: () => {
          // Se o registro for bem-sucedido, navega para a página principal
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
