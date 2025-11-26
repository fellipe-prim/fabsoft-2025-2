package br.univille.fabsoft_backend.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import br.univille.fabsoft_backend.entity.Ingresso;
import br.univille.fabsoft_backend.service.IngressoService;

@RestController
@RequestMapping("/api/v1/ingresso")
@CrossOrigin(origins = "*")
public class IngressoController {

    private final IngressoService service;

    public IngressoController(IngressoService service) {
        this.service = service;
    }

    @GetMapping("/sessao/{sessaoId}")
    public ResponseEntity<List<Ingresso>> getBySessao(@PathVariable Long sessaoId) {
        return ResponseEntity.ok(service.listarPorSessao(sessaoId));
    }

    @PutMapping
    public ResponseEntity<Ingresso> atualizar(@RequestBody Ingresso ingresso) {
        return ResponseEntity.ok(service.salvar(ingresso));
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Ingresso>> getByUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(service.listarPorUsuario(usuarioId));
    }
}