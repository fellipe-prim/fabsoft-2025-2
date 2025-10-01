package br.univille.fabsoft_backend.service;

import java.util.List;
import br.univille.fabsoft_backend.entity.Sessao;

public interface SessaoService {
    List<Sessao> getAll();
    Sessao getById(Long id);
    Sessao save(Sessao sessao);
    Sessao update(Long id, Sessao sessao);
    void delete(Long id);
}