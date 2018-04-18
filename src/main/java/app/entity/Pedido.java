package app.entity;

import java.io.*;
import javax.persistence.*;
import java.util.*;
import javax.xml.bind.annotation.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonFilter;
import cronapi.rest.security.CronappSecurity;


/**
 * Classe que representa a tabela PEDIDO
 * @generated
 */
@Entity
@Table(name = "\"PEDIDO\"")
@XmlRootElement
@CronappSecurity
@JsonFilter("app.entity.Pedido")
public class Pedido implements Serializable {

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
  @Column(name = "nomePedido", nullable = true, unique = false, insertable=true, updatable=true)

  private java.lang.String nomePedido;

  /**
   * @generated
   */
  @Column(name = "valor", nullable = true, unique = false, insertable=true, updatable=true)

  private java.lang.String numeroNotaFiscal;

  /**
   * Construtor
   * @generated
   */
  public Pedido(){
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
  public Pedido setId(java.lang.String id){
    this.id = id;
    return this;
  }

  /**
   * Obtém nomePedido
   * return nomePedido
   * @generated
   */

  public java.lang.String getNomePedido(){
    return this.nomePedido;
  }

  /**
   * Define nomePedido
   * @param nomePedido nomePedido
   * @generated
   */
  public Pedido setNomePedido(java.lang.String nomePedido){
    this.nomePedido = nomePedido;
    return this;
  }

  /**
   * Obtém numeroNotaFiscal
   * return numeroNotaFiscal
   * @generated
   */

  public java.lang.String getNumeroNotaFiscal(){
    return this.numeroNotaFiscal;
  }

  /**
   * Define numeroNotaFiscal
   * @param numeroNotaFiscal numeroNotaFiscal
   * @generated
   */
  public Pedido setNumeroNotaFiscal(java.lang.String numeroNotaFiscal){
    this.numeroNotaFiscal = numeroNotaFiscal;
    return this;
  }

  /**
   * @generated
   */
  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null || getClass() != obj.getClass()) return false;
    Pedido object = (Pedido)obj;
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
