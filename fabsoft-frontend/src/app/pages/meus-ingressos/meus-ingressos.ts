import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IngressoService, Ingresso } from '../../service/ingresso.js'; // Ajuste o caminho se necessário

@Component({
  selector: 'app-meus-ingressos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './meus-ingressos.html'
})
export class MeusIngressosComponent implements OnInit {

  meusIngressos: Ingresso[] = [];
  carregando = true;

  constructor(
    private ingressoService: IngressoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userStr = localStorage.getItem('usuario');
    
    if (!userStr) {
      this.router.navigate(['/login']);
      return;
    }

    const usuario = JSON.parse(userStr);

    // Busca os ingressos desse usuário
    this.ingressoService.listarPorUsuario(usuario.id).subscribe({
      next: (dados) => {
        this.meusIngressos = dados;
        this.carregando = false;
      },
      error: (err) => {
        console.error(err);
        this.carregando = false;
      }
    });
  }
}