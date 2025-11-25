import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definição do que é uma Sessão no Frontend
export interface Sessao {
  id: number;
  dataHora: string;
  sala: {
    id: number;
    nome: string; 
    capacidade: number;
  };
  filme?: {
    titulo: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class SessaoService {

  // Endereço do seu Backend (confirme se a porta é 8080)
  private apiUrl = 'http://localhost:8080/api/v1/sessao'; 

  constructor(private http: HttpClient) { }

  // Busca todas as sessões de um filme específico (Usado na tela de Detalhes)
  listarPorFilme(filmeId: number): Observable<Sessao[]> {
    return this.http.get<Sessao[]>(`${this.apiUrl}/filme/${filmeId}`);
  }

  // Busca uma sessão específica pelo ID (Será usado na tela de Assentos)
  buscarPorId(id: number): Observable<Sessao> {
    return this.http.get<Sessao>(`${this.apiUrl}/${id}`);
  }
}