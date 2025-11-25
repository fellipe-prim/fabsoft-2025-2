import { Component, OnInit } from '@angular/core';
import { FilmeService } from '../../service/filme.service';
import { Filme } from '../../model/filme';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  styleUrls: ['./home.css'],
  
})
export class HomeComponent implements OnInit {
  filmes: Filme[] = [];

  constructor(private filmeService: FilmeService) {}

    ngOnInit(): void {
    this.filmeService.listar().subscribe({
      next: (dados) => {
        this.filmes = dados;
        console.log('Filmes encontrados:', dados);
      },
      error: (e) => console.error(e)
    });
  }

}