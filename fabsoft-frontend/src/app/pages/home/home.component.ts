import { Component, OnInit } from '@angular/core';
import { FilmeService } from '../../service/filme.service';
import { Filme } from '../../model/filme';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], 
  styleUrls: ['./home.css'],
  
})
export class HomeComponent implements OnInit {
  filmes: Filme[] = [];         
  filmesFiltrados: Filme[] = [];
  termoBusca: string = '';

  constructor(private filmeService: FilmeService) {}

   ngOnInit(): void {
    this.filmeService.listar().subscribe({
      next: (dados) => {
        this.filmes = dados;
        this.filmesFiltrados = dados;
      },
      error: (e) => console.error(e)
    });
  }

  filtrar() {
    if (!this.termoBusca) {
      // Se limpar o campo, mostra tudo de novo
      this.filmesFiltrados = this.filmes;
    } else {
      // Filtra pelo título (ignorando maiúsculas/minúsculas)
      const termo = this.termoBusca.toLowerCase();
      this.filmesFiltrados = this.filmes.filter(filme => 
        filme.titulo.toLowerCase().includes(termo)
      );
    }
  }
    getCorClassificacao(classificacao: string | undefined): string {
    if (!classificacao) return 'bg-secondary';

    const texto = classificacao.toLowerCase();
    
    if (texto.includes('livre')) return 'bg-success';
    if (texto.includes('10')) return 'bg-primary';
    if (texto.includes('12')) return 'bg-warning text-dark';
    if (texto.includes('14')) return 'bg-warning text-dark';
    if (texto.includes('16')) return 'bg-danger';
    if (texto.includes('18')) return 'bg-dark';
    
    return 'bg-secondary';
  }

}