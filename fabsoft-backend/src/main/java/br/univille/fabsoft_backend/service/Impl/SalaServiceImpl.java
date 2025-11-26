package br.univille.fabsoft_backend.service.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.univille.fabsoft_backend.entity.Sala;
import br.univille.fabsoft_backend.repository.SalaRepository;
import br.univille.fabsoft_backend.service.SalaService;

@Service
public class SalaServiceImpl implements SalaService {

    private final SalaRepository salaRepository;

    public SalaServiceImpl(SalaRepository salaRepository) {
        this.salaRepository = salaRepository;
    }

    @Override
    public List<Sala> getAll() {
        return salaRepository.findAll();
    }

    @Override
    public Sala getById(Long id) {
        return salaRepository.findById(id).orElse(null);
    }

    @Override
    public Sala save(Sala sala) {
        return salaRepository.save(sala);
    }

    @Override
    public Sala update(Long id, Sala sala) {
        Optional<Sala> existente = salaRepository.findById(id);
        if (existente.isPresent()) {
            Sala nova = existente.get();
            nova.setNome(sala.getNome());
            nova.setCapacidade(sala.getCapacidade());
            nova.setAssentos(sala.getAssentos());
            return salaRepository.save(nova);
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        salaRepository.deleteById(id);
    }

    @Override
    public Sala getByNome(String nome) {
    return salaRepository.findByNome(nome);
}
}
