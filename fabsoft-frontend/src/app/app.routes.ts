import { Routes } from '@angular/router';
import { FilmeComponent } from './filme/filme.component';
import { SalaComponent } from './sala/sala.component';
import { FormFilme } from './form-filme/form-filme';

export const routes: Routes = [
    {path: 'filme', component: FilmeComponent},
    {path: 'filme/novo', component: FormFilme},
    {path: 'sala', component: SalaComponent}
];
