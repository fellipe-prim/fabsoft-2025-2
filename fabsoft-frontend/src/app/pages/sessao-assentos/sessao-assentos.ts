import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SessaoService, Sessao } from '../../service/sessao';
import { IngressoService, Ingresso } from '../../service/ingresso';

@Component({
  selector: 'app-sessao-assentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sessao-assentos.html',
  styleUrls: ['./sessao-assentos.css']
})
export class SessaoAssentosComponent implements OnInit {

  sessao?: Sessao;
  listaIngressos: Ingresso[] = [];
  selecionados: Set<Ingresso> = new Set();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessaoService: SessaoService,
    private ingressoService: IngressoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // 1. Busca a Sessão (para mostrar horário/filme)
    this.sessaoService.buscarPorId(id).subscribe(dados => this.sessao = dados);

    // 2. Busca os Ingressos REAIS do Banco
    this.ingressoService.listarPorSessao(id).subscribe(dados => {
      this.listaIngressos = dados;
      console.log('Ingressos carregados:', dados);
    });
  }

  toggleAssento(ingresso: Ingresso) {
    // Se já está vendido, ignora o clique
    if (ingresso.status === 'VENDIDO') return;

    if (this.selecionados.has(ingresso)) {
      this.selecionados.delete(ingresso);
    } else {
      this.selecionados.add(ingresso);
    }
  }

  finalizarCompra() {
    // 1. Verifica se selecionou alguma cadeira
    if (this.selecionados.size === 0) {
      alert('Selecione pelo menos um assento.');
      return;
    }

    // --- AQUI COMEÇA A LÓGICA DE LOGIN ---
    
    // 2. Verifica se tem usuário no navegador
    const usuarioLogadoString = localStorage.getItem('usuario');
    
    if (!usuarioLogadoString) {
        alert('Você precisa fazer LOGIN para comprar ingressos!');
        // Salva a URL atual para voltar depois (opcional, mas boa prática)
        // this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url }});
        this.router.navigate(['/login']); 
        return;
    }

    // Converte o texto salvo no navegador de volta para um Objeto JavaScript
    const usuarioLogado = JSON.parse(usuarioLogadoString);

    // 3. Processa a compra
    let processados = 0;
    
    this.selecionados.forEach(ingresso => {
        
        // VINCULA O DONO AO INGRESSO
        // O Backend espera { usuario: { id: 1 } }
        ingresso.usuario = { id: usuarioLogado.id }; 

        this.ingressoService.comprar(ingresso).subscribe({
            next: () => {
                processados++;
                // Só avisa e sai quando salvar o último da lista
                if (processados === this.selecionados.size) {
                    alert('Compra realizada com sucesso!');
                    this.router.navigate(['/']); // Volta pra Home
                }
            },
            error: (err: any) => {
                console.error('Erro ao comprar assento ' + ingresso.numeroAssento, err);
                alert('Ocorreu um erro ao comprar o assento ' + ingresso.numeroAssento);
            }
        });
    });
  }
}