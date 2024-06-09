// Importa a função 'bootstrapApplication' do módulo '@angular/platform-browser'
import { bootstrapApplication } from '@angular/platform-browser';
// Importa a configuração da aplicação 'appConfig' do arquivo './app/app.config'
import { appConfig } from './app/app.config';
// Importa o componente principal 'AppComponent' do arquivo './app/app.component'
import { AppComponent } from './app/app.component';

// Inicializa a aplicação Angular com o componente principal 'AppComponent' e a configuração da aplicação 'appConfig'
bootstrapApplication(AppComponent, appConfig)
  // Captura e trata qualquer erro que ocorrer durante a inicialização
  .catch((err) => console.error(err));
