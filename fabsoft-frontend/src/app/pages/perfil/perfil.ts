import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './perfil.html'
})
export class PerfilComponent implements OnInit {

  usuario: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Busca o usuário salvo no Login
    const userStr = localStorage.getItem('usuario');
    
    if (userStr) {
      this.usuario = JSON.parse(userStr);
    } else {
      // Se não tiver ninguém logado, chuta pro login
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}