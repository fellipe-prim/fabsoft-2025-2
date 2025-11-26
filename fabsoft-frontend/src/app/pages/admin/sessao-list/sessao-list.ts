import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SessaoService, Sessao } from '../../../service/sessao';

@Component({
  selector: 'app-sessao-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sessao-list.html'
})
export class SessaoListComponent implements OnInit {
  sessoes: Sessao[] = [];

  constructor(private sessaoService: SessaoService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar() {
    this.sessaoService.listarTudo().subscribe(dados => this.sessoes = dados);
  }

  deletar(sessao: Sessao) {
    if(confirm('Tem certeza que deseja apagar esta sessão?')) {
      this.sessaoService.deletar(sessao.id).subscribe(() => this.carregar());
    }
  }
}