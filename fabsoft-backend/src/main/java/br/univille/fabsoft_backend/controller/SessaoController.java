package br.univille.fabsoft_backend.controller;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.univille.fabsoft_backend.entity.Sessao;
import br.univille.fabsoft_backend.service.SessaoService;

@RestController
@RequestMapping("/api/v1/sessao")
@CrossOrigin(origins = "*")
public class SessaoController {

    private final SessaoService sessaoService;

    public SessaoController(SessaoService sessaoService) {
        this.sessaoService = sessaoService;
    }

    @GetMapping
    public ResponseEntity<List<Sessao>> getAll() {
        return ResponseEntity.ok(sessaoService.getAll());
    }
    
    @GetMapping("/filme/{filmeId}")
    public ResponseEntity<List<Sessao>> getByFilmeId(@PathVariable Long filmeId) {
        return ResponseEntity.ok(sessaoService.getByFilmeId(filmeId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sessao> getById(@PathVariable Long id) {
        Sessao sessao = sessaoService.getById(id);
        if (sessao == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(sessao);
    }

    // --- CORREÇÃO AQUI ---
    @PostMapping
    public ResponseEntity<Sessao> create(@RequestBody Sessao sessao) {
        sessao.setId(null); 
        
        Sessao novaSessao = sessaoService.save(sessao);
        return ResponseEntity.ok(novaSessao);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sessao> update(@PathVariable Long id, @RequestBody Sessao sessao) {
        Sessao sessaoAtualizada = sessaoService.update(id, sessao);
        if (sessaoAtualizada == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(sessaoAtualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        sessaoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}