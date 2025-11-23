import { Component, ElementRef, viewChild, ViewChild } from '@angular/core';
import { Filme } from '../model/filme';
import { FilmeService } from '../service/filme.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-filme',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './filme.html',
  styleUrl: './filme.css',
  providers: [FilmeService, Router]
})

export class FilmeComponent {

  listaFilmes: Filme[] = []

  @ViewChild('myModal') modalElement!: ElementRef;
  private modal!: bootstrap.Modal

  private filmeSelecionado!: Filme

  constructor(
    private filmeService: FilmeService,
    private router:Router
  ){}

  ngOnInit(){
    console.log('Carregando Filmes...')
    this.filmeService.getFilme().subscribe( filmes => {
      this.listaFilmes = filmes
    })
  }
  
  novo(){
    this.router.navigate(['filme/novo']);
  }

  alterar(filme:Filme){
    this.router.navigate(['filme/alterar', filme.id]);
  }

  abrirConfirmacao(filme:Filme){
    this.filmeSelecionado = filme
    this.modal = new bootstrap.Modal(this.modalElement.nativeElement)
    this.modal.show()
  }

  fecharConfirmacao(){
    this.modal.hide()
  }

  confirmarExclusao(){
    this.filmeService.excluirFilme(this.filmeSelecionado.id.toString())
      .subscribe(
        () => {
          this.fecharConfirmacao()
          this.filmeService.getFilme()
            .subscribe(
              filme => {
                this.listaFilmes = filme
              }
            )
        },
        error => {
          console.error('Erro ao Excluir Filme', error)
        }
      )
  }
}

export { Filme };