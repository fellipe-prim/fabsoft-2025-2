import { Component } from '@angular/core';
import { Filme } from '../model/filme';
import { FilmeService } from '../service/filme.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filme',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './filme.html',
  styleUrl: './filme.css',
  providers: [FilmeService, Router]
})

export class FilmeComponent {

  listaFilmes: Filme[] = []

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

}

export { Filme };