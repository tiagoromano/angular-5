package app.entity;

import java.io.*;
import javax.persistence.*;
import java.util.*;
import javax.xml.bind.annotation.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonFilter;
import cronapi.rest.security.CronappSecurity;


/**
 * Classe que representa a tabela PEDIDOITEM
 * @generated
 */
@Entity
@Table(name = "\"PEDIDOITEM\"")
@XmlRootElement
@CronappSecurity
@JsonFilter("app.entity.PedidoItem")
public class PedidoItem implements Serializable {

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
  @Column(name = "item", nullable = true, unique = false, insertable=true, updatable=true)

  private java.lang.String item;

  /**
   * @generated
   */
  @Column(name = "valor", nullable = true, unique = false, insertable=true, updatable=true)

  private java.lang.String valor;

  /**
   * @generated
   */
  @ManyToOne
  @JoinColumn(name="fk_pedido", nullable = true, referencedColumnName = "id", insertable=true, updatable=true)

  private Pedido pedido;

  /**
   * Construtor
   * @generated
   */
  public PedidoItem(){
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
  public PedidoItem setId(java.lang.String id){
    this.id = id;
    return this;
  }

  /**
   * Obtém item
   * return item
   * @generated
   */

  public java.lang.String getItem(){
    return this.item;
  }

  /**
   * Define item
   * @param item item
   * @generated
   */
  public PedidoItem setItem(java.lang.String item){
    this.item = item;
    return this;
  }

  /**
   * Obtém valor
   * return valor
   * @generated
   */

  public java.lang.String getValor(){
    return this.valor;
  }

  /**
   * Define valor
   * @param valor valor
   * @generated
   */
  public PedidoItem setValor(java.lang.String valor){
    this.valor = valor;
    return this;
  }

  /**
   * Obtém pedido
   * return pedido
   * @generated
   */

  public Pedido getPedido(){
    return this.pedido;
  }

  /**
   * Define pedido
   * @param pedido pedido
   * @generated
   */
  public PedidoItem setPedido(Pedido pedido){
    this.pedido = pedido;
    return this;
  }

  /**
   * @generated
   */
  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null || getClass() != obj.getClass()) return false;
    PedidoItem object = (PedidoItem)obj;
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
