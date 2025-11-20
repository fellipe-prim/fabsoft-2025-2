package br.univille.fabsoft_backend.controller;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.univille.fabsoft_backend.entity.Filme;
import br.univille.fabsoft_backend.service.FilmeService;

@RestController
@RequestMapping("/api/v1/filme")
@CrossOrigin(origins = "*") 
public class FilmeController {

    private final FilmeService filmeService;

    public FilmeController(FilmeService filmeService) {
        this.filmeService = filmeService;
    }

    @GetMapping
    public ResponseEntity<List<Filme>> getAll() {
        return ResponseEntity.ok(filmeService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Filme> getById(@PathVariable Long id) {
        Filme filme = filmeService.getById(id);
        if (filme == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(filme);
    }

    @PostMapping
    public ResponseEntity<Filme> create(@RequestBody Filme filme) {
        return ResponseEntity.ok(filmeService.save(filme));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Filme> update(@PathVariable Long id, @RequestBody Filme filme) {
        Filme atualizado = filmeService.update(id, filme);
        if (atualizado == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        filmeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
