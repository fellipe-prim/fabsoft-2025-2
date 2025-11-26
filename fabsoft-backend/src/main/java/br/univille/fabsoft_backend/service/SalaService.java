package br.univille.fabsoft_backend.service;

import java.util.List;
import br.univille.fabsoft_backend.entity.Sala;

public interface SalaService {
    List<Sala> getAll();
    Sala getById(Long id);
    Sala save(Sala sala);
    Sala update(Long id, Sala sala);
    void delete(Long id);
    Sala getByNome(String nome);
}
