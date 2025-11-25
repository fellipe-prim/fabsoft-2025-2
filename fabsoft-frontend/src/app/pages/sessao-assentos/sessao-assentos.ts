import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SessaoService, Sessao } from '../../service/sessao'; 

@Component({
  selector: 'app-sessao-assentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sessao-assentos.html', 
  styleUrls: ['./sessao-assentos.css']   
})
export class SessaoAssentosComponent implements OnInit {

  sessao?: Sessao;
  assentosDummy: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private sessaoService: SessaoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.sessaoService.listarPorFilme(1).subscribe(lista => {
         this.sessao = lista.find(s => s.id === id); 
    });

    // Gera cadeiras A1 até A40
    for(let i=1; i<=40; i++) {
        this.assentosDummy.push('A' + i);
    }
  }

  toggleAssento(assento: string) {
    console.log('Clicou no assento', assento);
  }
}