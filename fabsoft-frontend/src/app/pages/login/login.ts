import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html', // Verifique se o nome do arquivo é login.html ou login.component.html
  styleUrls: ['./login.css']    // Verifique se o nome do arquivo é login.css ou login.component.css
})
export class LoginComponent {

  usuario = { email: '', senha: '' };

  constructor(private http: HttpClient, private router: Router) { }

  fazerLogin() {
    this.http.post<any>('http://localhost:8080/api/v1/auth/login', this.usuario)
       .subscribe({
        next: (resposta) => {
          localStorage.setItem('usuario', JSON.stringify(resposta));

          if (resposta.tipo === 'ADMIN') {
            // Redireciona direto pro Admin
            this.router.navigate(['/admin']);
          } else {
            // Redireciona direto pra Home
            this.router.navigate(['/']);
          }
        },
        error: (erro) => {
          // Tratamento de erro (ex: 401 Unauthorized)
          if (erro.status === 401) {
            alert('Email ou senha incorretos!');
          } else {
            alert('Erro no sistema. Tente novamente mais tarde.');
          }
          console.error(erro);
        }
      });
  }
}