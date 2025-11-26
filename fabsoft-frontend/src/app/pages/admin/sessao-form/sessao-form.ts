import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SessaoService, Sessao } from '../../../service/sessao';
import { FilmeService } from '../../../service/filme.service';
import { SalaService } from '../../../service/sala.service';
import { Filme } from '../../../model/filme';
import { Sala } from '../../../model/sala';

@Component({
  selector: 'app-sessao-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sessao-form.html'
})
export class SessaoFormComponent implements OnInit {
  
  // Objeto Sessão Inicializado
  sessao: Sessao = { 
    id: 0, 
    dataHora: '', 
    filme: { id: 0 } as any, // Inicializa com ID 0
    sala: { id: 0 } as any 
  };

  // Listas para os Selects
  listaFilmes: Filme[] = [];
  listaSalas: Sala[] = [];

  constructor(
    private sessaoService: SessaoService,
    private filmeService: FilmeService, // Para buscar filmes
    private salaService: SalaService,   // Para buscar salas
    private router: Router
  ) {}

  ngOnInit(): void {
    // Carrega as opções para os dropdowns
    this.filmeService.listar().subscribe(dados => this.listaFilmes = dados);
    this.salaService.listar().subscribe(dados => this.listaSalas = dados);
  }

  salvar() {
    this.sessaoService.salvar(this.sessao).subscribe(() => {
      alert('Sessão criada com sucesso!');
      this.router.navigate(['/admin/sessoes']);
    });
  }
}