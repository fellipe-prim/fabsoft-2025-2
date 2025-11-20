import { Injectable } from '@angular/core';
import { Filme } from '../model/filme';
import { HttpClient } from '@angular/common/http';

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
    return this.http.post(this.apiURL, filme)
  }

}
