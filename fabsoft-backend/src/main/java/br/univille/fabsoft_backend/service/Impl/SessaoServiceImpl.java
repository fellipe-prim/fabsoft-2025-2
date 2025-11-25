package br.univille.fabsoft_backend.service.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.univille.fabsoft_backend.entity.Sessao;
import br.univille.fabsoft_backend.repository.SessaoRepository;
import br.univille.fabsoft_backend.service.SessaoService;

@Service
public class SessaoServiceImpl implements SessaoService {

    private final SessaoRepository sessaoRepository;

    public SessaoServiceImpl(SessaoRepository sessaoRepository) {
        this.sessaoRepository = sessaoRepository;
    }

    @Override
    public List<Sessao> getAll() {
        return sessaoRepository.findAll();
    }

    @Override
    public Sessao getById(Long id) {
        return sessaoRepository.findById(id).orElse(null);
    }

    @Override
    public Sessao save(Sessao sessao) {
        return sessaoRepository.save(sessao);
    }

    @Override
    public Sessao update(Long id, Sessao sessao) {
        Optional<Sessao> sessaoExistente = sessaoRepository.findById(id);
        if (sessaoExistente.isPresent()) {
            Sessao novaSessao = sessaoExistente.get();
            novaSessao.setDataHora(sessao.getDataHora());
            novaSessao.setSala(sessao.getSala());
            novaSessao.setFilme(sessao.getFilme());
            return sessaoRepository.save(novaSessao);
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        sessaoRepository.deleteById(id);
    }

    @Override
    public List<Sessao> getByFilmeId(Long filmeId) {
        return sessaoRepository.findByFilmeId(filmeId);
    }
}
