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
@Repository("CursoInstrutorDAO")
@Transactional(transactionManager="app-TransactionManager")
public interface CursoInstrutorDAO extends JpaRepository<CursoInstrutor, java.lang.String> {

  /**
   * Obtém a instância de CursoInstrutor utilizando os identificadores
   * 
   * @param id
   *          Identificador 
   * @return Instância relacionada com o filtro indicado
   * @generated
   */    
  @Query("SELECT entity FROM CursoInstrutor entity WHERE entity.id = :id")
  public CursoInstrutor findOne(@Param(value="id") java.lang.String id);

  /**
   * Remove a instância de CursoInstrutor utilizando os identificadores
   * 
   * @param id
   *          Identificador 
   * @return Quantidade de modificações efetuadas
   * @generated
   */    
  @Modifying
  @Query("DELETE FROM CursoInstrutor entity WHERE entity.id = :id")
  public void delete(@Param(value="id") java.lang.String id);

  /**
   * Lista com paginação de acordo com a NamedQuery
   * 
   * @generated
   */
  @Query("select ci from CursoInstrutor ci")
  public Page<CursoInstrutor> list(Pageable pageable);
  


  /**
   * Foreign Key curso
   * @generated
   */
  @Query("SELECT entity FROM CursoInstrutor entity WHERE entity.curso.id = :id")
  public Page<CursoInstrutor> findCursoInstrutorsByCurso(@Param(value="id") java.lang.String id, Pageable pageable);

  /**
   * Foreign Key instrutor
   * @generated
   */
  @Query("SELECT entity FROM CursoInstrutor entity WHERE entity.instrutor.id = :id")
  public Page<CursoInstrutor> findCursoInstrutorsByInstrutor(@Param(value="id") java.lang.String id, Pageable pageable);

}
