import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário para o *ngIf e *ngFor
import { ActivatedRoute, RouterModule } from '@angular/router'; // Necessário para pegar o ID e usar routerLink
import { FilmeService } from '../../service/filme.service';
import { Filme } from '../../model/filme';
import { SessaoService, Sessao } from '../../service/sessao'; // <--- Importante: O Service e a Interface

@Component({
  selector: 'app-filme-detalhes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './filme-detalhes.html',
  styleUrls: ['./filme-detalhes.css']
})
export class FilmeDetalhesComponent implements OnInit {

  filme?: Filme;

  // AQUI ESTAVA O PROBLEMA: Faltava declarar essa lista
  sessoes: Sessao[] = [];

  constructor(
    private route: ActivatedRoute,
    private filmeService: FilmeService,
    private sessaoService: SessaoService // <--- Injetar o service de sessões
  ) { }

  ngOnInit(): void {
    // 1. Pega o ID da URL (ex: filme/1)
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      // 2. Busca os detalhes do Filme
      this.filmeService.buscarPorId(id).subscribe({
        next: (dados) => {
          this.filme = dados;
        },
        error: (err) => console.error('Erro ao buscar filme', err)
      });

      // 3. Busca as Sessões disponíveis para esse filme
      this.sessaoService.listarPorFilme(id).subscribe({
        next: (dados) => {
          this.sessoes = dados; // <--- Guarda os dados na variável que o HTML quer ler
          console.log('Sessões carregadas:', dados);
        },
        error: (err) => console.error('Erro ao buscar sessões', err)
      });
    }
  }

  // Adicione este método lá no final, antes de fechar a classe }
  formatarData(data: any): string {
    // Se vier como array [2025, 11, 25, 19, 0], convertemos para string ISO
    if (Array.isArray(data)) {
      // Cuidado: Java conta meses de 1 a 12, Javascript de 0 a 11? 
      // Na verdade, array do Java usually is [Year, Month, Day, Hour, Minute]
      const [ano, mes, dia, hora, minuto] = data;
      // Formatando manualmente para HH:mm
      const horaString = hora.toString().padStart(2, '0');
      const minString = minuto.toString().padStart(2, '0');
      return `${horaString}:${minString}`;
    }
    // Se for string normal, deixamos o Pipe do HTML cuidar ou retornamos direto
    return data;
  }

}