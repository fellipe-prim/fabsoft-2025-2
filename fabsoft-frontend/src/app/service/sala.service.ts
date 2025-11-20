import { Injectable } from '@angular/core';
import { Sala } from '../model/sala'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SalaService {
  
  apiURL = 'http://localhost:8080/api/v1/sala'

  constructor(private http:HttpClient){}

  getSala(){
    return this.http.get<Sala[]>(this.apiURL)
  }
}
