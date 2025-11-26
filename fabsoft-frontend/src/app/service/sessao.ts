import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs'; 
import { Filme } from '../model/filme';
import { Sala } from '../model/sala';  

export interface Sessao {
  id: number;
  dataHora: string;
  sala: Sala;  
  filme: Filme;
}

@Injectable({
  providedIn: 'root'
})
export class SessaoService {
  private apiUrl = 'http://localhost:8080/api/v1/sessao'; 

  // Notificador para o Dashboard
  private atualizador = new Subject<void>();

  constructor(private http: HttpClient) { }

  get onAtualizacao() {
    return this.atualizador.asObservable();
  }

  listarTudo(): Observable<Sessao[]> {
    return this.http.get<Sessao[]>(this.apiUrl);
  }

  listarPorFilme(filmeId: number): Observable<Sessao[]> {
    return this.http.get<Sessao[]>(`${this.apiUrl}/filme/${filmeId}`);
  }

  buscarPorId(id: number): Observable<Sessao> {
    return this.http.get<Sessao>(`${this.apiUrl}/${id}`);
  }

  // --- NOVOS MÉTODOS ---
  salvar(sessao: Sessao): Observable<Sessao> {
    return (sessao.id 
      ? this.http.put<Sessao>(`${this.apiUrl}/${sessao.id}`, sessao)
      : this.http.post<Sessao>(this.apiUrl, sessao)
    ).pipe(
        tap(() => this.atualizador.next()),
  );
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`
    ).pipe(
      tap(() => this.atualizador.next())
    );
  }
}