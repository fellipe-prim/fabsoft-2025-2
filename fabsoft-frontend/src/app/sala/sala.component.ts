import { Component } from '@angular/core';
import { Sala } from '../model/sala'
import { SalaService } from '../service/sala.service'
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sala',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './sala.html',
  styleUrl: './sala.css',
  providers: [SalaService]
})
export class SalaComponent {

  listaSala: Sala[] = []

  constructor(private salaService: SalaService){}

  ngOnInit(){
    console.log('Carregando Sala...')
    this.salaService.listar().subscribe( sala => {
      this.listaSala = sala
    })
  }

}
