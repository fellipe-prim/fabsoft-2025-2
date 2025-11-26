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
}