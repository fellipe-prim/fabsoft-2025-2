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
  
  // Variáveis novas para o Pagamento
  total: number = 0;
  processandoPagamento: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessaoService: SessaoService,
    private ingressoService: IngressoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // 1. Busca a Sessão (dados do filme, horário, sala)
    this.sessaoService.buscarPorId(id).subscribe(dados => this.sessao = dados);

    // 2. Busca os Ingressos REAIS do Banco
    this.ingressoService.listarPorSessao(id).subscribe(dados => {
      this.listaIngressos = dados;
      // console.log('Ingressos carregados:', dados);
    });
  }

  toggleAssento(ingresso: Ingresso) {
    // Se já vendeu ou está processando compra, não deixa clicar
    if (ingresso.status === 'VENDIDO' || this.processandoPagamento) return;

    if (this.selecionados.has(ingresso)) {
      this.selecionados.delete(ingresso);
    } else {
      this.selecionados.add(ingresso);
    }

    this.calcularTotal(); // Recalcula o valor sempre que clica
  }

  calcularTotal() {
    this.total = 0;
    this.selecionados.forEach(ingresso => {
        // Garante que soma números (caso venha string do banco)
        this.total += Number(ingresso.valorPago);
    });
  }

  finalizarCompra() {
    // 1. Validação de Seleção
    if (this.selecionados.size === 0) {
      alert('Selecione pelo menos um assento.');
      return;
    }

    // 2. Validação de Login
    const usuarioLogadoString = localStorage.getItem('usuario');
    if (!usuarioLogadoString) {
        alert('Você precisa fazer LOGIN para comprar ingressos!');
        this.router.navigate(['/login']); 
        return;
    }
    const usuarioLogado = JSON.parse(usuarioLogadoString);

    // 3. Confirmação e Simulação de Pagamento
    if (confirm(`Confirma o pagamento de R$ ${this.total.toFixed(2)}?`)) {
        
        this.processandoPagamento = true; // Ativa o spinner no botão

        // Simula delay de 1.5 segundos (rede bancária)
        setTimeout(() => {
            this.realizarCompraReal(usuarioLogado);
        }, 1500);
    }
  }

  // Método auxiliar para salvar no banco depois do delay
  realizarCompraReal(usuario: any) {
    let processados = 0;
    let erros = 0;

    this.selecionados.forEach(ingresso => {
        
        // Vincula o usuário ao ingresso
        ingresso.usuario = { id: usuario.id }; 

        this.ingressoService.comprar(ingresso).subscribe({
            next: () => {
                processados++;
                this.verificarFimProcessamento(processados, erros);
            },
            error: (erro) => {
                console.error('Erro no assento ' + ingresso.numeroAssento, erro);
                erros++;
                processados++; // Conta como processado mesmo com erro para não travar
                this.verificarFimProcessamento(processados, erros);
            }
        });
    });
  }

  verificarFimProcessamento(processados: number, erros: number) {
    // Se terminou de tentar salvar todos
    if (processados === this.selecionados.size) {
        this.processandoPagamento = false; // Destrava a tela

        if (erros === 0) {
            alert('Compra realizada com sucesso! Bom filme. 🍿');
            this.router.navigate(['/meus-ingressos']); // Vai para tela de tickets
        } else {
            alert('Houve um problema ao reservar alguns assentos. Tente novamente.');
            // Recarrega os dados para ver quais falharam (já estarão vermelhos se alguém comprou na frente)
            this.ngOnInit();
            this.selecionados.clear();
            this.calcularTotal();
        }
    }
  }
}