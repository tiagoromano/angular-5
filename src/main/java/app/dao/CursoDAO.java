package app.dao;

import app.entity.*;
import java.util.*;
import org.springframework.stereotype.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.domain.*;
import org.springframework.data.repository.query.*;
import org.springframework.transaction.annotation.*; 

/**
 * Realiza operação de Create, Read, Update e Delete no banco de dados.
 * Os métodos de create, edit, delete e outros estão abstraídos no JpaRepository
 * 
 * @see org.springframework.data.jpa.repository.JpaRepository
 * 
 * @generated
 */
@Repository("CursoDAO")
@Transactional(transactionManager="app-TransactionManager")
public interface CursoDAO extends JpaRepository<Curso, java.lang.String> {

  /**
   * Obtém a instância de Curso utilizando os identificadores
   * 
   * @param id
   *          Identificador 
   * @return Instância relacionada com o filtro indicado
   * @generated
   */    
  @Query("SELECT entity FROM Curso entity WHERE entity.id = :id")
  public Curso findOne(@Param(value="id") java.lang.String id);

  /**
   * Remove a instância de Curso utilizando os identificadores
   * 
   * @param id
   *          Identificador 
   * @return Quantidade de modificações efetuadas
   * @generated
   */    
  @Modifying
  @Query("DELETE FROM Curso entity WHERE entity.id = :id")
  public void delete(@Param(value="id") java.lang.String id);



  /**
   * OneToMany Relation
   * @generated
   */
  @Query("SELECT entity FROM CursoInstrutor entity WHERE entity.curso.id = :id")
  public Page<CursoInstrutor> findCursoInstrutor(@Param(value="id") java.lang.String id, Pageable pageable);
  /**
   * ManyToOne Relation
   * @generated
   */
  @Query("SELECT entity.instrutor FROM CursoInstrutor entity WHERE entity.curso.id = :id")
  public Page<Instrutor> listInstrutor(@Param(value="id") java.lang.String id, Pageable pageable);

  /**
   * ManyToOne Relation Delete
   * @generated
   */
  @Modifying
  @Query("DELETE FROM CursoInstrutor entity WHERE entity.curso.id = :instanceId AND entity.instrutor.id = :relationId")
  public int deleteInstrutor(@Param(value="instanceId") java.lang.String instanceId, @Param(value="relationId") java.lang.String relationId);

}
