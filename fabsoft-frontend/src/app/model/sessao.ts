import { Filme } from './filme';
import { Sala } from './sala';

export class Sessao {
    id: number;
    dataHora: string; 
    sala: Sala;
    filme: Filme;
}