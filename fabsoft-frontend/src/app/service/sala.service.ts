import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Sala } from '../model/sala';

@Injectable({
  providedIn: 'root'
})
export class SalaService {
  
  private apiUrl = 'http://localhost:8080/api/v1/sala';

  private atualizador = new Subject<void>();

  constructor(private http: HttpClient) { }

  get onAtualizacao() {
    return this.atualizador.asObservable();
  }

  listar(): Observable<Sala[]> {
    return this.http.get<Sala[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Sala> {
    return this.http.get<Sala>(`${this.apiUrl}/${id}`);
  }

  salvar(sala: Sala): Observable<Sala> {
    // Se for novo, inicializa assentos como vazio para não dar erro no Java
    if (!sala.assentos) { sala.assentos = []; }

    return (sala.id 
      ? this.http.put<Sala>(`${this.apiUrl}/${sala.id}`, sala)
      : this.http.post<Sala>(this.apiUrl, sala)
    ).pipe(tap(() => this.atualizador.next()));
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.atualizador.next())
    );
  }
}