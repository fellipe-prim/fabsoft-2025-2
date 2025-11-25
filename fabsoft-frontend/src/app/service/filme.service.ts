import { Injectable } from '@angular/core';
import { Filme } from '../model/filme';
import { HttpClient } from '@angular/common/http';
import { TmplAstHostElement } from '@angular/compiler';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class FilmeService {
  
  apiURL = 'http://localhost:8080/api/v1/filme'
  constructor(private http:HttpClient){}

  getFilme(){
    return this.http.get<Filme[]>(this.apiURL)
  }

  saveFilme(filme:Filme){
    if(filme.id){
      return this.http.put(this.apiURL + '/' + filme.id, filme)
    }
    return this.http.post(this.apiURL, filme)
  }

  getFilmeById(id: string){
    return this.http.get<Filme>(this.apiURL + '/' + id)
  }

  excluirFilme(id: string){
    return this.http.delete<Filme>(this.apiURL + '/' + id)
  }

    buscarPorId(id: number): Observable<Filme> {
    return this.http.get<Filme>(`${this.apiURL}/${id}`);
  }

}
