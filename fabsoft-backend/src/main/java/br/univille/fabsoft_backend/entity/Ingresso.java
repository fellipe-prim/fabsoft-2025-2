package br.univille.fabsoft_backend.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Ingresso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Sessao sessao;
    private Usuario usuario;
    private List<Assento> assentos;
    private StatusIngresso status;
    private LocalDateTime dataCompra;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Sessao getSessao() { return sessao; }
    public void setSessao(Sessao sessao) { this.sessao = sessao; }
    
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    
    public List<Assento> getAssentos() { return assentos; }
    public void setAssentos(List<Assento> assentos) { this.assentos = assentos; }
    
    public StatusIngresso getStatus() { return status; }
    public void setStatus(StatusIngresso status) { this.status = status; }
    
    public LocalDateTime getDataCompra() { return dataCompra; }
    public void setDataCompra(LocalDateTime dataCompra) { this.dataCompra = dataCompra; }
}