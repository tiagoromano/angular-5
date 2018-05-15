package app.entity;

import java.io.*;
import javax.persistence.*;
import java.util.*;
import javax.xml.bind.annotation.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonFilter;
import cronapi.rest.security.CronappSecurity;


/**
 * Classe que representa a tabela CURSOINSTRUTOR
 * @generated
 */
@Entity
@Table(name = "\"CURSOINSTRUTOR\"")
@XmlRootElement
@CronappSecurity
@JsonFilter("app.entity.CursoInstrutor")
public class CursoInstrutor implements Serializable {

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
  @ManyToOne
  @JoinColumn(name="fk_curso", nullable = true, referencedColumnName = "id", insertable=true, updatable=true)
  
  private Curso curso;

  /**
  * @generated
  */
  @ManyToOne
  @JoinColumn(name="fk_instrutor", nullable = true, referencedColumnName = "id", insertable=true, updatable=true)
  
  private Instrutor instrutor;

  /**
   * Construtor
   * @generated
   */
  public CursoInstrutor(){
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
  public CursoInstrutor setId(java.lang.String id){
    this.id = id;
    return this;
  }

  /**
   * Obtém curso
   * return curso
   * @generated
   */
  
  public Curso getCurso(){
    return this.curso;
  }

  /**
   * Define curso
   * @param curso curso
   * @generated
   */
  public CursoInstrutor setCurso(Curso curso){
    this.curso = curso;
    return this;
  }

  /**
   * Obtém instrutor
   * return instrutor
   * @generated
   */
  
  public Instrutor getInstrutor(){
    return this.instrutor;
  }

  /**
   * Define instrutor
   * @param instrutor instrutor
   * @generated
   */
  public CursoInstrutor setInstrutor(Instrutor instrutor){
    this.instrutor = instrutor;
    return this;
  }

  /**
   * @generated
   */
  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null || getClass() != obj.getClass()) return false;
    CursoInstrutor object = (CursoInstrutor)obj;
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
