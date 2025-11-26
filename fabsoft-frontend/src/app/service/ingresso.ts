import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// --- ATUALIZE A INTERFACE AQUI ---
export interface Ingresso {
  id: number;
  numeroAssento: string;
  status: 'LIVRE' | 'VENDIDO';
  valorPago: number;
  usuario?: { id: number };
  
  // Adicione essa estrutura para o HTML reconhecer os dados aninhados
  sessao?: {
    id: number;
    dataHora: any; // Pode ser string ou array [ano, mes...]
    sala?: {
        id: number;
        nome: string;
    };
    filme?: {
        id: number;
        titulo: string;
        genero: string;
        imagemURL?: string;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class IngressoService {
  private apiUrl = 'http://localhost:8080/api/v1/ingresso';

  constructor(private http: HttpClient) { }

  listarPorSessao(sessaoId: number): Observable<Ingresso[]> {
    return this.http.get<Ingresso[]>(`${this.apiUrl}/sessao/${sessaoId}`);
  }

  listarPorUsuario(usuarioId: number): Observable<Ingresso[]> {
    return this.http.get<Ingresso[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  comprar(ingresso: Ingresso): Observable<Ingresso> {
    ingresso.status = 'VENDIDO';
    return this.http.put<Ingresso>(this.apiUrl, ingresso);
  }
}