import { Routes } from '@angular/router';
import { FilmeComponent } from './filme/filme.component';
import { SalaComponent } from './sala/sala.component';
import { FormFilme } from './form-filme/form-filme';
import { HomeComponent } from './pages/home/home.component';
import { FilmeDetalhesComponent } from './pages/filme-detalhes/filme-detalhes';

export const routes: Routes = [
    {path: 'filme', component: FilmeComponent},
    {path: 'filme/novo', component: FormFilme},
    {path: 'filme/alterar/:id', component: FormFilme},
    {path: 'sala', component: SalaComponent},
    { path: '', component: HomeComponent },
    { path: 'filme/:id', component: FilmeDetalhesComponent }
];
