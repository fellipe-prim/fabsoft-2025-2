import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Filme } from '../model/filme'; // Verifique se o caminho da pasta é 'models' ou 'model'

@Injectable({
  providedIn: 'root',
})
export class FilmeService {
  
  // Verifique se a porta é 8080 ou outra
  private apiURL = 'http://localhost:8080/api/v1/filme';

  private atualizador = new Subject<void>();


  constructor(private http: HttpClient) {}

  // =================================================
  // MÉTODOS PADRONIZADOS (Usados nos componentes)
  // =================================================

    get onAtualizacao() {
    return this.atualizador.asObservable();
  }


  // 1. LISTAR (GET)
  listar(): Observable<Filme[]> {
    return this.http.get<Filme[]>(this.apiURL);
  }

  // 2. BUSCAR UM (GET by ID)
  buscarPorId(id: number): Observable<Filme> {
    return this.http.get<Filme>(`${this.apiURL}/${id}`);
  }

  // 3. SALVAR (POST ou PUT)
  // Serve tanto para criar quanto para editar
  salvar(filme: Filme): Observable<Filme> {
    // 3. O operador 'tap' executa algo sem atrapalhar o fluxo
    return (filme.id 
      ? this.http.put<Filme>(`${this.apiURL}/${filme.id}`, filme)
      : this.http.post<Filme>(this.apiURL, filme)
    ).pipe(
      tap(() => this.atualizador.next())
    );
  }

  // 4. DELETAR (DELETE)
  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`).pipe(
      tap(() => this.atualizador.next()) // <--- AVISA QUE MUDOU!
    );
  }
}