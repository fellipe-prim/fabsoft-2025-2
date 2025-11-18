import { Component } from '@angular/core';
import { Filme } from '../model/filme';
import { FilmeService } from '../service/filme.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filme',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './filme.html',
  styleUrl: './filme.css',
  providers: [FilmeService]
})

export class FilmeComponent {

  listaFilmes: Filme[] = []

  constructor(private filmeService: FilmeService){}

  ngOnInit(){
    console.log('Carregando Filmes...')
    this.filmeService.getFilme().subscribe( filmes => {
      this.listaFilmes = filmes
    })
  }

}

export { Filme };