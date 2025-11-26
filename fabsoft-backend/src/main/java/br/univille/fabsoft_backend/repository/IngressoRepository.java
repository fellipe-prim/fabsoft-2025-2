package br.univille.fabsoft_backend.repository;

import br.univille.fabsoft_backend.entity.Ingresso;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IngressoRepository extends JpaRepository<Ingresso, Long> {
    List<Ingresso> findBySessaoId(Long sessaoId);
    List<Ingresso> findByUsuarioId(Long usuarioId);
}