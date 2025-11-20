import { Component } from '@angular/core';
import { Filme } from '../model/filme'
import { FilmeService } from '../service/filme.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-form-filme',
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './form-filme.html',
  styleUrl: './form-filme.css',
  providers: [FilmeService, Router]
})
export class FormFilme {
    filme: Filme = new Filme();

    constructor(
      private filmeService:FilmeService,
      private  router:Router
    ){}

    salvar(){
      this.filmeService.saveFilme(this.filme)
        .subscribe(resultado => {
          this.router.navigate(['filme'])
        })
      this
    }
}
