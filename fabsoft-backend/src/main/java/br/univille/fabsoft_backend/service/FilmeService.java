package br.univille.fabsoft_backend.service;

import java.util.List;
import br.univille.fabsoft_backend.entity.Filme;

public interface FilmeService {
    List<Filme> getAll();
    Filme getById(Long id);
    Filme save(Filme filme);
    Filme update(Long id, Filme filme);
    void delete(Long id);
}
