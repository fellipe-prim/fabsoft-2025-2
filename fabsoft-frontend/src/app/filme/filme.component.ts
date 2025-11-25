import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Filme } from '../model/filme'; // Verifique se o caminho da pasta é 'model' ou 'models'
import { FilmeService } from '../service/filme.service'; // Verifique se o caminho da pasta é 'service' ou 'services'
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-filme',
  standalone: true, // Adicionei standalone: true pois você usa imports
  imports: [HttpClientModule, CommonModule],
  templateUrl: './filme.html',
  styleUrl: './filme.css',
  providers: [FilmeService] // Router removido daqui (ele é global)
})
export class FilmeComponent implements OnInit {

  listaFilmes: Filme[] = [];

  @ViewChild('myModal') modalElement!: ElementRef;
  private modal!: bootstrap.Modal;

  // Use 'private' ou deixe public se precisar usar no HTML. Inicialize undefined para segurança.
  filmeSelecionado!: Filme; 

  constructor(
    private filmeService: FilmeService,
    private router: Router
  ){}

  ngOnInit(){
    console.log('Carregando Filmes...');
    this.carregarFilmes();
  }

  carregarFilmes() {
    this.filmeService.listar().subscribe({
      next: (filmes: Filme[]) => {
        this.listaFilmes = filmes;
      },
      error: (erro: any) => {
        console.error('Erro ao carregar filmes:', erro);
      }
    });
  }
  
  novo(){
    this.router.navigate(['filme/novo']);
  }

  alterar(filme: Filme){
    // Garante que o ID existe antes de navegar
    if(filme.id) {
        this.router.navigate(['filme/alterar', filme.id]);
    }
  }

  abrirConfirmacao(filme: Filme){
    this.filmeSelecionado = filme;
    this.modal = new bootstrap.Modal(this.modalElement.nativeElement);
    this.modal.show();
  }

  fecharConfirmacao(){
    if(this.modal) {
        this.modal.hide();
    }
  }

  confirmarExclusao(){
    if (this.filmeSelecionado && this.filmeSelecionado.id) {
        this.filmeService.deletar(this.filmeSelecionado.id).subscribe({
            next: () => {
              this.fecharConfirmacao();
              this.carregarFilmes(); // Reutiliza o método para atualizar a lista
            },
            error: (error: any) => {
              console.error('Erro ao Excluir Filme', error);
            }
        });
    }
  }
}