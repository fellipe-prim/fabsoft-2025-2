package br.univille.fabsoft_backend.entity;

import jakarta.persistence.*;

@Entity
public class Ingresso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String numeroAssento;
    @Enumerated(EnumType.STRING)
    private StatusIngresso status; 

    private Double valorPago;

    @ManyToOne
    private Sessao sessao;

    @ManyToOne
    private Usuario usuario;

    public Ingresso() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNumeroAssento() { return numeroAssento; }
    public void setNumeroAssento(String numeroAssento) { this.numeroAssento = numeroAssento; }
    
    public StatusIngresso getStatus() { return status; }
    public void setStatus(StatusIngresso status) { this.status = status; }
    
    public Double getValorPago() { return valorPago; }
    public void setValorPago(Double valorPago) { this.valorPago = valorPago; }
    
    public Sessao getSessao() { return sessao; }
    public void setSessao(Sessao sessao) { this.sessao = sessao; }
    
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
}