import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  formatarData(data: any): string {
    if (Array.isArray(data)) {
      const [ano, mes, dia, hora, minuto] = data;
      const horaString = hora.toString().padStart(2, '0');
      const minString = minuto.toString().padStart(2, '0');
      return `${horaString}:${minString}`;
    }
    return data;
  }

   getCorClassificacao(classificacao: string | undefined): string {
    if (!classificacao) return 'bg-secondary';
    const texto = classificacao.toLowerCase();
    
    if (texto.includes('livre')) return 'bg-success';
    if (texto.includes('10')) return 'bg-primary';
    if (texto.includes('12')) return 'bg-warning text-dark';
    if (texto.includes('14')) return 'bg-warning text-dark';
    if (texto.includes('16')) return 'bg-danger';
    if (texto.includes('18')) return 'bg-dark';
    
    return 'bg-secondary';
  }

}