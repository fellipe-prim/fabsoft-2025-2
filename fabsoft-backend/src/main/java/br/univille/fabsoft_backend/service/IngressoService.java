package br.univille.fabsoft_backend.service;

import java.util.List;
import br.univille.fabsoft_backend.entity.Ingresso;

public interface IngressoService {
    List<Ingresso> listarPorSessao(Long sessaoId);
    Ingresso salvar(Ingresso ingresso);
    List<Ingresso> listarPorUsuario(Long usuarioId);
}