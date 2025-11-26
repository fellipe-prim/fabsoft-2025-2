package br.univille.fabsoft_backend.controller;

import br.univille.fabsoft_backend.entity.Usuario;
import br.univille.fabsoft_backend.entity.TipoUsuario;
import br.univille.fabsoft_backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioRepository repository;

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody Usuario loginUser) {
        Usuario usuario = repository.findByEmailAndSenha(loginUser.getEmail(), loginUser.getSenha());
        if (usuario != null) {
            return ResponseEntity.ok(usuario);
        }
        return ResponseEntity.status(401).build(); // 401 = Não autorizado
    }

    // CADASTRO DE CLIENTE (Pelo site)
    @PostMapping("/cadastro")
    public ResponseEntity<Usuario> cadastro(@RequestBody Usuario novoUsuario) {
        // Todo mundo que se cadastra pelo site vira CLIENTE automaticamente
        novoUsuario.setTipo(TipoUsuario.CLIENTE);
        
        Usuario salvo = repository.save(novoUsuario);
        return ResponseEntity.ok(salvo);
    }
    
    // CRIAR ADMIN (Rodar 1 vez via Postman para ter o primeiro acesso)
    @PostMapping("/setup-admin")
    public ResponseEntity<Usuario> setupAdmin() {
        Usuario admin = new Usuario();
        admin.setNome("Administrador");
        admin.setEmail("admin@cinefab.com");
        admin.setSenha("admin123");
        admin.setTipo(TipoUsuario.ADMIN); // Define como ADMIN
        
        return ResponseEntity.ok(repository.save(admin));
    }
}
