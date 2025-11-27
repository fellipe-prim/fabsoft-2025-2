import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css']
})
export class CadastroComponent {

  usuario = {
    nome: '',
    email: '',
    telefone: '',
    senha: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  cadastrar() {
    this.http.post('http://localhost:8080/api/v1/auth/cadastro', this.usuario)
      .subscribe({
        next: (res) => {
          alert('Cadastro realizado com sucesso! Faça login.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao cadastrar. Tente novamente.');
        }
      });
  }

   formatarTelefone(event: any) {
    let input = event.target;
    
    let valor = input.value.replace(/\D/g, ''); 
    
    if (valor.length > 11) {
        valor = valor.substring(0, 11);
    }
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2'); 
    valor = valor.replace(/(\d)(\d{4})$/, '$1-$2'); 
    input.value = valor;
    this.usuario.telefone = valor;
  }

}