import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilmeService } from '../../../service/filme.service'; // Ajuste o caminho
import { SessaoService } from '../../../service/sessao'; // Ajuste o caminho

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'] // Se tiver css
})
export class DashboardComponent implements OnInit {
    
    // Variáveis para guardar os números
    qtdFilmes: number = 0;
    qtdSessoes: number = 0;

    constructor(
        private filmeService: FilmeService,
        private sessaoService: SessaoService
    ) {}

    ngOnInit(): void {
        this.carregarDados();
        this.filmeService.onAtualizacao.subscribe(() => {
            this.carregarDados();
        });
    }

    carregarDados() {
        // 1. Conta os Filmes
        this.filmeService.listar().subscribe({
            next: (lista) => {
                this.qtdFilmes = lista.length; // Pega o tamanho da lista
            },
            error: (e) => console.error(e)
        });

        // 2. Conta as Sessões
        this.sessaoService.listarTudo().subscribe({
            next: (lista) => {
                this.qtdSessoes = lista.length;
            },
            error: (e) => console.error(e)
        });
    }
}