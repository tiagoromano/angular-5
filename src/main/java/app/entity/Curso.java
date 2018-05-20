package app.entity;

import java.io.*;
import javax.persistence.*;
import java.util.*;
import javax.xml.bind.annotation.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonFilter;
import cronapi.rest.security.CronappSecurity;


/**
 * Classe que representa a tabela CURSO
 * @generated
 */
@Entity
@Table(name = "\"CURSO\"")
@XmlRootElement
@CronappSecurity
@JsonFilter("app.entity.Curso")
public class Curso implements Serializable {

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

  @Column(name = "tipo", nullable = true, unique = false, insertable=true, updatable=true)
  private java.lang.String tipo;

  @Column(name = "code", nullable = true, unique = false, insertable=true, updatable=true)
  private java.lang.String code;

  /**
   * Construtor
   * @generated
   */
  public Curso(){
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
  public Curso setId(java.lang.String id){
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
  public Curso setNome(java.lang.String nome){
    this.nome = nome;
    return this;
  }

  public java.lang.String getTipo(){
    return this.tipo;
  }

  public Curso setTipo(java.lang.String tipo){
    this.tipo = tipo;
    return this;
  }

  public String getCode() {
    return code;
  }

  public Curso setCode(String code) {
    this.code = code;
    return this;
  }

  /**
   * @generated
   */
  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null || getClass() != obj.getClass()) return false;
    Curso object = (Curso)obj;
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
