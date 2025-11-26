package br.univille.fabsoft_backend.service.Impl;

import java.util.List;
import org.springframework.stereotype.Service;
import br.univille.fabsoft_backend.entity.Ingresso;
import br.univille.fabsoft_backend.repository.IngressoRepository;
import br.univille.fabsoft_backend.service.IngressoService;

@Service
public class IngressoServiceImpl implements IngressoService {

    private final IngressoRepository repository;

    public IngressoServiceImpl(IngressoRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Ingresso> listarPorSessao(Long sessaoId) {
        return repository.findBySessaoId(sessaoId);
    }

    @Override
    public Ingresso salvar(Ingresso ingresso) {
        return repository.save(ingresso);
    }

    @Override
    public List<Ingresso> listarPorUsuario(Long usuarioId) {
        return repository.findByUsuarioId(usuarioId);
    }

}