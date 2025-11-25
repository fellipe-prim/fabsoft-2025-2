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
  selecionados: Set<string> = new Set(); 


  constructor(
    private route: ActivatedRoute,
    private sessaoService: SessaoService
  ) {}

ngOnInit(): void {
    // ... código de buscar a sessão ...

    // --- NOVA LÓGICA DE ASSENTOS ---
    this.assentosDummy = []; // Limpa antes de gerar
    const totalAssentos = 60; // Ex: 5 fileiras de 12 (5 * 12 = 60)
    const colunasPorFileira = 12;

    for (let i = 0; i < totalAssentos; i++) {
        const linhaIndex = Math.floor(i / colunasPorFileira); // 0 = A, 1 = B, 2 = C...
        const numero = (i % colunasPorFileira) + 1; // 1 até 12

        // Código ASCII: 65 é 'A', 66 é 'B', etc.
        const letra = String.fromCharCode(65 + linhaIndex); 

        this.assentosDummy.push(letra + numero); // Resultado: A1, A2... A12, B1...
    }
}

  toggleAssento(assento: string) {
    // Se já está na lista, remove (desmarcar)
    if (this.selecionados.has(assento)) {
      this.selecionados.delete(assento);
    } else {
      // Se não está, adiciona (marcar)
      this.selecionados.add(assento);
    }
    
    console.log('Selecionados:', this.selecionados); // Para você ver no console
  }

}