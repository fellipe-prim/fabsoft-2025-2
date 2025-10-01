package br.univille.fabsoft_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.univille.fabsoft_backend.entity.Sessao;

@Repository
public interface SessaoRepository extends JpaRepository<Sessao, Long> {
}
