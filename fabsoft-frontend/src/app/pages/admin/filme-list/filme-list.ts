import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilmeService } from '../../../service/filme.service';
import { Filme } from '../../../model/filme';

@Component({
  selector: 'app-filme-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './filme-list.html'
})
export class FilmeListComponent implements OnInit {
  filmes: Filme[] = [];

  constructor(private filmeService: FilmeService) {}

  ngOnInit(): void {
    this.carregarFilmes();
  }

  carregarFilmes() {
    this.filmeService.listar().subscribe(dados => this.filmes = dados);
  }

  deletarFilme(filme: Filme) {
    if(confirm(`Tem certeza que deseja apagar "${filme.titulo}"?`)) {
      this.filmeService.deletar(filme.id).subscribe(() => {
        this.carregarFilmes(); // Recarrega a lista
      });
    }
  }
}