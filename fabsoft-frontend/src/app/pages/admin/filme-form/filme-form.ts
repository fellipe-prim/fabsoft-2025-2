import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FilmeService } from '../../../service/filme.service';
import { Filme } from '../../../model/filme';

@Component({
  selector: 'app-filme-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './filme-form.html'
})
export class FilmeFormComponent implements OnInit {
  
  filme: Filme = { 
    id: 0, titulo: '', genero: '', sinopse: '', imagemURL: '', horas: 0, minutos: 0, classificacao: ''
  };

  constructor(
    private filmeService: FilmeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.filmeService.buscarPorId(id).subscribe(dados => this.filme = dados);
    }
  }

  salvar() {
    this.filmeService.salvar(this.filme).subscribe(() => {
      alert('Filme salvo com sucesso!');
      this.router.navigate(['/admin/filmes']);
    });
  }
}