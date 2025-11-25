package br.univille.fabsoft_backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import br.univille.fabsoft_backend.entity.TipoUsuario;
import br.univille.fabsoft_backend.entity.Usuario;
import br.univille.fabsoft_backend.repository.UsuarioRepository;

@SpringBootApplication
public class FabsoftBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(FabsoftBackendApplication.class, args);
	}

	 @Bean
    public CommandLineRunner demo(UsuarioRepository repository) {
        return (args) -> {
            // Verifica se o Admin já existe
            Usuario adminExistente = repository.findByEmailAndSenha("admin@cinefab.com", "admin123");
            
            if (adminExistente == null) {
                Usuario admin = new Usuario();
                admin.setNome("Administrador");
                admin.setEmail("admin@cinefab.com");
                admin.setSenha("admin123");
                admin.setTipo(TipoUsuario.ADMIN);
                
                repository.save(admin);
                
                System.out.println("-----------------------------------------");
                System.out.println(" ADMIN MESTRE CRIADO AUTOMATICAMENTE!    ");
                System.out.println(" Email: admin@cinefab.com                ");
                System.out.println(" Senha: admin123                         ");
                System.out.println("-----------------------------------------");
            }
        };
    }

}
