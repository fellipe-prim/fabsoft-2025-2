import { Routes } from '@angular/router';
import { FilmeComponent } from './filme/filme.component';
import { SalaComponent } from './sala/sala.component';
import { FormFilme } from './form-filme/form-filme';
import { HomeComponent } from './pages/home/home.component';
import { FilmeDetalhesComponent } from './pages/filme-detalhes/filme-detalhes';
import { SessaoAssentosComponent } from './pages/sessao-assentos/sessao-assentos';
import { LoginComponent } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { DashboardComponent } from './pages/admin/dashboard/dashboard';
import { FilmeListComponent } from './pages/admin/filme-list/filme-list';
import { FilmeFormComponent } from './pages/admin/filme-form/filme-form';

export const routes: Routes = [
    { path: 'filme', component: FilmeComponent },
    { path: 'filme/novo', component: FormFilme },
    { path: 'filme/alterar/:id', component: FormFilme },
    { path: 'sala', component: SalaComponent },
    { path: '', component: HomeComponent },
    { path: 'filme/:id', component: FilmeDetalhesComponent },
    { path: 'sessao/:id', component: SessaoAssentosComponent },
    { path: 'login', component: LoginComponent },
    { path: 'cadastro', component: Cadastro },

    { 
        path: 'admin', 
        component: DashboardComponent,
        children: [
            { path: 'filmes', component: FilmeListComponent }, 
            { path: 'filmes/novo', component: FilmeFormComponent },
            { path: 'filmes/editar/:id', component: FilmeFormComponent }
        ]
    }
];