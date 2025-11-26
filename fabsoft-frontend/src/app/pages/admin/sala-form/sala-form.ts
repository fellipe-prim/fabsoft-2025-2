import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SalaService } from '../../../service/sala.service';
import { Sala } from '../../../model/sala';

@Component({
  selector: 'app-sala-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sala-form.html'
})
export class SalaFormComponent implements OnInit {
  
  sala: Sala = { id: 0, nome: '', capacidade: 0, assentos: [] };

  constructor(
    private salaService: SalaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.salaService.buscarPorId(id).subscribe(dados => this.sala = dados);
    }
  }

  salvar() {
    this.salaService.salvar(this.sala).subscribe({
      next: () => {
        alert('Sala salva com sucesso!');
        this.router.navigate(['/admin/salas']);
      },
      error: (erro) => {
        if (erro.status === 409) {
            alert('ERRO: Já existe uma sala com esse nome! Escolha outro.');
        } else {
            alert('Erro ao salvar sala. Verifique o console.');
            console.error(erro);
        }
      }
    });
  }
}