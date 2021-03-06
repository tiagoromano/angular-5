package app.entity;

import java.io.*;
import javax.persistence.*;
import java.util.*;
import javax.xml.bind.annotation.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonFilter;
import cronapi.rest.security.CronappSecurity;


/**
 * Classe que representa a tabela INSTRUTOR
 * @generated
 */
@Entity
@Table(name = "\"INSTRUTOR\"")
@XmlRootElement
@CronappSecurity
@JsonFilter("app.entity.Instrutor")
public class Instrutor implements Serializable {

  /**
   * UID da classe, necessário na serialização
   * @generated
   */
  private static final long serialVersionUID = 1L;

  /**
   * @generated
   */
  @Id
  @Column(name = "id", nullable = false, insertable=true, updatable=true)
  private java.lang.String id = UUID.randomUUID().toString().toUpperCase();

  /**
   * @generated
   */
  @Column(name = "nome", nullable = true, unique = false, insertable=true, updatable=true)
  private java.lang.String nome;

  @Column(name = "cpf", nullable = true, unique = false, insertable=true, updatable=true)
  private java.lang.String cpf;

  @Column(name = "cnpj", nullable = true, unique = false, insertable=true, updatable=true)
  private java.lang.String cnpj;

  @Column(name = "nascimento", nullable = true, unique = false, insertable=true, updatable=true)
  private java.util.Date nascimento;

  @Column(name = "salario", nullable = true, unique = false, insertable=true, updatable=true)
  private java.lang.Double salario;

  @Column(name = "cep", nullable = true, unique = false, insertable=true, updatable=true)
  private java.lang.String cep;

  /**
  * @generated
  */
  @ManyToOne
  @JoinColumn(name="fk_municipio", nullable = true, referencedColumnName = "id", insertable=true, updatable=true)
  private Municipio municipio;

  /**
   * Construtor
   * @generated
   */
  public Instrutor(){
  }


  /**
   * Obtém id
   * return id
   * @generated
   */
  
  public java.lang.String getId(){
    return this.id;
  }

  /**
   * Define id
   * @param id id
   * @generated
   */
  public Instrutor setId(java.lang.String id){
    this.id = id;
    return this;
  }

  /**
   * Obtém nome
   * return nome
   * @generated
   */
  
  public java.lang.String getNome(){
    return this.nome;
  }

  /**
   * Define nome
   * @param nome nome
   * @generated
   */
  public Instrutor setNome(java.lang.String nome){
    this.nome = nome;
    return this;
  }

  /**
   * Obtém municipio
   * return municipio
   * @generated
   */
  
  public Municipio getMunicipio(){
    return this.municipio;
  }

  /**
   * Define municipio
   * @param municipio municipio
   * @generated
   */
  public Instrutor setMunicipio(Municipio municipio){
    this.municipio = municipio;
    return this;
  }

  public String getCpf() {
    return cpf;
  }

  public Instrutor setCpf(String cpf) {
    this.cpf = cpf;
    return this;
  }

  public Date getNascimento() {
    return nascimento;
  }

  public Instrutor setNascimento(Date nascimento) {
    this.nascimento = nascimento;
    return this;
  }

  public Double getSalario() {
    return salario;
  }

  public Instrutor setSalario(Double salario) {
    this.salario = salario;
    return this;
  }

  public String getCnpj() {
    return cnpj;
  }

  public Instrutor setCnpj(String cnpj) {
    this.cnpj = cnpj;
    return this;
  }

  public String getCep() {
    return cep;
  }

  public Instrutor setCep(String cep) {
    this.cep = cep;
    return this;
  }
  /**
   * @generated
   */
  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null || getClass() != obj.getClass()) return false;
    Instrutor object = (Instrutor)obj;
    if (id != null ? !id.equals(object.id) : object.id != null) return false;
    return true;
  }

  /**
   * @generated
   */
  @Override
  public int hashCode() {
    int result = 1;
    result = 31 * result + ((id == null) ? 0 : id.hashCode());
    return result;
  }

}
