package br.univille.fabsoft_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.univille.fabsoft_backend.entity.Sala;

@Repository
public interface SalaRepository extends JpaRepository<Sala, Long> {
    Sala findByNome(String nome);
}
