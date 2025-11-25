package br.univille.fabsoft_backend.service.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.univille.fabsoft_backend.entity.Filme;
import br.univille.fabsoft_backend.entity.Usuario;
import br.univille.fabsoft_backend.repository.FilmeRepository;
import br.univille.fabsoft_backend.service.FilmeService;

@Service
public class FilmeServiceImpl implements FilmeService {

    private final FilmeRepository filmeRepository;

    public FilmeServiceImpl(FilmeRepository filmeRepository) {
        this.filmeRepository = filmeRepository;
    }

    @Override
    public List<Filme> getAll() {
        return filmeRepository.findAll();
    }

    @Override
    public Filme getById(Long id) {
        return filmeRepository.findById(id).orElse(null);
    }

    @Override
    public Filme save(Filme filme) {
        return filmeRepository.save(filme);
    }

    @Override
    public Filme update(Long id, Filme filme) {
        Optional<Filme> existente = filmeRepository.findById(id);
        if (existente.isPresent()) {
            Filme novo = existente.get();
            novo.setTitulo(filme.getTitulo());
            novo.setSinopse(filme.getSinopse());
            novo.setHoras(filme.getHoras());
            novo.setClassificacao(filme.getClassificacao());
            novo.setGenero(filme.getGenero());
            novo.setImagemURL(filme.getImagemURL());
            return filmeRepository.save(novo);
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        filmeRepository.deleteById(id);
    }
}
