import { Component, OnInit } from '@angular/core';
import { Filme } from '../model/filme'; // Verifique se é model ou models
import { FilmeService } from '../service/filme.service'; // Verifique se é service ou services
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-filme',
  standalone: true, // Adicionado para suportar os imports
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './form-filme.html',
  styleUrl: './form-filme.css',
  providers: [FilmeService] // Router removido daqui (já é global)
})
export class FormFilme implements OnInit {
    
    // Inicialização segura do objeto
    filme: Filme = new Filme(); 

    constructor(
      private filmeService: FilmeService,
      private router: Router,
      private activeRouter: ActivatedRoute
    ){}

    // A lógica de busca deve ficar aqui, não no construtor
    ngOnInit(): void {
      const id = this.activeRouter.snapshot.paramMap.get('id');

      if(id){
        // CORREÇÃO: Converter 'id' (string) para Number(id)
        this.filmeService.buscarPorId(Number(id)).subscribe({
            next: (res: Filme) => {
              this.filme = res;
            },
            error: (err: any) => {
              console.error('Erro ao buscar filme', err);
            }
        });
      }
    }

    salvar(){
      this.filmeService.salvar(this.filme).subscribe({
        next: (resultado: any) => {
          this.router.navigate(['filme']);
        },
        error: (err: any) => {
          console.error('Erro ao salvar', err);
        }
      });
    }
}