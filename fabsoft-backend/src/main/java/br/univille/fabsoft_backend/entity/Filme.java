package br.univille.fabsoft_backend.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Filme {
   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String titulo;
    @Column(columnDefinition = "TEXT")
    private String sinopse;
    private int horas;
    private int minutos;   
    private String classificacao;
    private String genero;
    private String imagemURL;

    public int getHoras() {
        return horas;
    }
    public void setHoras(int horas) {
        this.horas = horas;
    }
    public String getClassificacao() {
        return classificacao;
    }
    public void setClassificacao(String classificacao) {
        this.classificacao = classificacao;
    }
    public String getGenero() {
        return genero;
    }
    public void setGenero(String genero) {
        this.genero = genero;
    }
    public String getImagemURL() {
        return imagemURL;
    }
    public void setImagemURL(String imagemURL) {
        this.imagemURL = imagemURL;
    }
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getTitulo() {
        return titulo;
    }
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    public String getSinopse() {
        return sinopse;
    }
    public void setSinopse(String sinopse) {
        this.sinopse = sinopse;
    }
        public int getMinutos() {
        return minutos;
    }
    public void setMinutos(int minutos) {
        this.minutos = minutos;
    }
}
