package br.univille.fabsoft_backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.univille.fabsoft_backend.entity.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Busca usuário por email e senha para o Login
    Usuario findByEmailAndSenha(String email, String senha);
}