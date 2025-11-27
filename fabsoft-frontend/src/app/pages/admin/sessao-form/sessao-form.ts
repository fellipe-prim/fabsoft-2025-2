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
  
  // Objeto da sessão
  sessao: Sessao = { 
    id: 0, 
    dataHora: '', 
    filme: { id: 0 } as any,
    sala: { id: 0 } as any 
  };

  // Listas para os Selects
  listaFilmes: Filme[] = [];
  listaSalas: Sala[] = [];

  // Variável para controlar a data mínima (Hoje)
  minDate: string = ''; 

  constructor(
    private sessaoService: SessaoService,
    private filmeService: FilmeService, 
    private salaService: SalaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1. Carrega as listas de filmes e salas
    this.filmeService.listar().subscribe(dados => this.listaFilmes = dados);
    this.salaService.listar().subscribe(dados => this.listaSalas = dados);

    // 2. Calcula a data mínima para bloquear dias anteriores no calendário
    this.calcularDataMinima();
  }

  // Função que pega a data/hora atual e formata para o input HTML (yyyy-MM-ddTHH:mm)
  calcularDataMinima() {
    const agora = new Date();
    
    const ano = agora.getFullYear();
    const mes = (agora.getMonth() + 1).toString().padStart(2, '0');
    const dia = agora.getDate().toString().padStart(2, '0');
    const hora = agora.getHours().toString().padStart(2, '0');
    const minuto = agora.getMinutes().toString().padStart(2, '0');

    // Define o valor: Ex: "2025-11-27T14:30"
    this.minDate = `${ano}-${mes}-${dia}T${hora}:${minuto}`;
  }

  salvar() {
    // Pequena validação extra antes de enviar
    if (this.sessao.dataHora < this.minDate) {
        alert('Não é possível agendar sessões no passado!');
        return;
    }

    this.sessaoService.salvar(this.sessao).subscribe({
      next: () => {
        alert('Sessão criada com sucesso!');
        this.router.navigate(['/admin/sessoes']);
      },
      error: (err) => {
        console.error('Erro ao salvar sessão', err);
        alert('Erro ao salvar. Verifique se todos os campos foram preenchidos.');
      }
    });
  }
}