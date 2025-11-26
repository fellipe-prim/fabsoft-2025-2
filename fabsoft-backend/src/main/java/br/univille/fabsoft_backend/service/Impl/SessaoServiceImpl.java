package br.univille.fabsoft_backend.service.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import br.univille.fabsoft_backend.entity.Ingresso;
import br.univille.fabsoft_backend.entity.Sala;
import br.univille.fabsoft_backend.entity.Sessao;
import br.univille.fabsoft_backend.entity.StatusIngresso;
import br.univille.fabsoft_backend.repository.IngressoRepository;
import br.univille.fabsoft_backend.repository.SalaRepository;
import br.univille.fabsoft_backend.repository.SessaoRepository;
import br.univille.fabsoft_backend.service.SessaoService;

@Service
public class SessaoServiceImpl implements SessaoService {

    private final SessaoRepository sessaoRepository;
    private final IngressoRepository ingressoRepository;
    private final SalaRepository salaRepository;

    public SessaoServiceImpl(SessaoRepository sessaoRepository, 
                             IngressoRepository ingressoRepository,
                             SalaRepository salaRepository) {
        this.sessaoRepository = sessaoRepository;
        this.ingressoRepository = ingressoRepository;
        this.salaRepository = salaRepository;
    }

    @Override
    public List<Sessao> getAll() {
        return sessaoRepository.findAll();
    }

    @Override
    public List<Sessao> getByFilmeId(Long filmeId) {
        return sessaoRepository.findByFilmeId(filmeId);
    }

    @Override
    public Sessao getById(Long id) {
        return sessaoRepository.findById(id).orElse(null);
    }

    @Override
    @SuppressWarnings("null")
    public Sessao save(Sessao sessao) {
        if (sessao.getSala() != null && sessao.getSala().getId() != null) {
            Sala salaCompleta = salaRepository.findById(sessao.getSala().getId()).orElse(null);
            if (salaCompleta != null) {
                sessao.setSala(salaCompleta);
            }
        }

        Sessao sessaoSalva = sessaoRepository.save(sessao);

        List<Ingresso> ingressosExistentes = ingressoRepository.findBySessaoId(sessaoSalva.getId());

        if (ingressosExistentes.isEmpty()) {
            gerarIngressos(sessaoSalva);
        }

        return sessaoSalva;
    }

    private void gerarIngressos(Sessao sessao) {
        int capacidade = sessao.getSala().getCapacidade(); 
        int colunas = 12; 

        for (int i = 0; i < capacidade; i++) {
            Ingresso ingresso = new Ingresso();
            
            int linhaIndex = i / colunas; 
            int numero = (i % colunas) + 1;
            char letra = (char) ('A' + linhaIndex);
            
            String nomeAssento = "" + letra + numero;

            ingresso.setNumeroAssento(nomeAssento);
            ingresso.setStatus(StatusIngresso.LIVRE);
            ingresso.setValorPago(30.00); 
            ingresso.setSessao(sessao);
            
            ingressoRepository.save(ingresso);
        }
    }

    @Override
    public Sessao update(Long id, Sessao sessao) {
        Optional<Sessao> sessaoExistente = sessaoRepository.findById(id);
        if(sessaoExistente.isPresent()) {
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
}