import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router'; // Para pegar o ID da URL
import { FilmeService } from '../../service/filme.service';
import { Filme } from '../../model/filme';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-filme-detalhes',
  standalone: true,
  templateUrl: './filme-detalhes.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./filme-detalhes.css']
})
export class FilmeDetalhesComponent implements OnInit {

  filme?: Filme; // Pode ser undefined enquanto carrega

  constructor(
    private route: ActivatedRoute, 
    private filmeService: FilmeService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    console.log('ID capturado da URL:', id); // <--- Vamos investigar isso

    if(id) {
      this.filmeService.buscarPorId(id).subscribe({
        next: (dados) => {
          console.log('Filme retornado do Backend:', dados); // <--- E isso
          this.filme = dados;
        },
        error: (erro) => {
          console.error('Erro ao buscar filme:', erro);
        }
      });
    }
  }
}
