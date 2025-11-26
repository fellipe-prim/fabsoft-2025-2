import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'fabsoft-frontend';

  constructor(private router: Router) {}

  // Essa função busca o usuário no navegador em tempo real
  get usuarioLogado() {
    const userStr = localStorage.getItem('usuario');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Função para deslogar
  sair() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

   irParaIngressos() {
    if (this.usuarioLogado) {
      this.router.navigate(['/meus-ingressos']);
    } else {
      // Se não estiver logado, manda pro login
      this.router.navigate(['/login']);
    }
  }
}
