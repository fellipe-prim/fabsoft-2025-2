package br.univille.fabsoft_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.univille.fabsoft_backend.entity.Sala;
import br.univille.fabsoft_backend.service.SalaService;

@RestController
@RequestMapping("/salas")
public class SalaController {

    private final SalaService salaService;

    public SalaController(SalaService salaService) {
        this.salaService = salaService;
    }

    @GetMapping
    public ResponseEntity<List<Sala>> getAll() {
        return ResponseEntity.ok(salaService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sala> getById(@PathVariable Long id) {
        Sala sala = salaService.getById(id);
        if (sala == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(sala);
    }

    @PostMapping
    public ResponseEntity<Sala> create(@RequestBody Sala sala) {
        return ResponseEntity.ok(salaService.save(sala));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sala> update(@PathVariable Long id, @RequestBody Sala sala) {
        Sala atualizado = salaService.update(id, sala);
        if (atualizado == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        salaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
