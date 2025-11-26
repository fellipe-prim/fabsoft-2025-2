import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SalaService } from '../../../service/sala.service';
import { Sala } from '../../../model/sala';

@Component({
  selector: 'app-sala-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sala-list.html'
})
export class SalaListComponent implements OnInit {
  salas: Sala[] = [];

  constructor(private salaService: SalaService) {}

  ngOnInit(): void {
    this.carregarSalas();
  }

  carregarSalas() {
    this.salaService.listar().subscribe(dados => this.salas = dados);
  }

  deletar(sala: Sala) {
    if(confirm(`Tem certeza que deseja excluir a ${sala.nome}?`)) {
      this.salaService.deletar(sala.id).subscribe(() => {
        this.carregarSalas();
      });
    }
  }
}