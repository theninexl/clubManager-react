import { useEffect, useState } from "react";
import { useGlobalContext } from "../../providers/globalContextProvider";
import { useEditPlayerDataContext } from "../../providers/EditPlayeProvider";
import { TableCellLong, TableCellMedium, TableCellShort, TableDataHeader, TableDataRow } from "../../components/UI/layout/tableData"
import { ButtonMouseGhost, ButtonMousePrimary, ButtonMouseTransparent, IconButtonSmallSecondary, IconButtonSmallerPrimary } from "../../components/UI/objects/buttons";
import { SymbolAdd, SymbolDelete, SymbolEdit } from "../../components/UI/objects/symbols";
import { SimpleAccordion, SimpleAccordionContent, SimpleAccordionTrigger } from "../../components/UI/components/simpleAccordion/simpleAccordion";
import { HeadContentTitleBar, TitleBar__Title, TitleBar__Tools } from "../../components/UI/layout/centralContentComponents";
import { FormSimplePanelRow, LabelElement, LabelElementNumber, LabelElementToggle, LabelElementToggle2Sides, LabelElementToggle2SidesPanel, LabelSelectElement, LabelSelectShorterElement, SelectIconShorter } from "../../components/UI/components/form simple/formSimple";


export const ListSelectedContract = () => {
  const editPlayerContext = useEditPlayerDataContext();

  return(
    <>
      <TableDataHeader>
        <TableCellLong>Contrato seleccionado</TableCellLong>
      </TableDataHeader>
      { editPlayerContext.activeContractData ? 
        <>
          <TableDataRow>
           <TableCellMedium><strong>Descripcion</strong></TableCellMedium>
            <TableCellMedium><strong>Tipo</strong></TableCellMedium>
            <TableCellMedium><strong>Procedimiento</strong></TableCellMedium>
            <TableCellMedium><strong>Fecha inicio / fin</strong></TableCellMedium>
          </TableDataRow>
          <TableDataRow className='cm-u-spacer-mb-bigger'>
           <TableCellMedium>{editPlayerContext.activeContractData[0]?.desc_descripcion}</TableCellMedium>
            <TableCellMedium>{editPlayerContext.activeContractData[0]?.desc_tipo_contrato}</TableCellMedium>
            <TableCellMedium>{editPlayerContext.activeContractData[0]?.desc_tipo_procedimiento}</TableCellMedium>
            <TableCellMedium>{editPlayerContext.activeContractData[0]?.fecha_ini_fin}</TableCellMedium>
          </TableDataRow>
        </>
        : 
        <>
          <TableDataRow className='cm-u-spacer-mb-bigger cm-u-centerText'>
            <p className="error">Seleccione un contrato para ver las cláusulas</p>
          </TableDataRow>
        </>

      }
    </>
  )
}

export const ListVariablesForSelectedContract = ({ handleDeleteClausula, handleEditClausula }) => {
  const editPlayerContext = useEditPlayerDataContext();

  useEffect(()=>{
    console.log('variables guardadas para mostrar', editPlayerContext.savedVariables); 
  },[editPlayerContext.savedVariables])

  return (
    <>
      <TableDataHeader>
        <TableCellLong>Cláusulas añadidas</TableCellLong>
        <TableCellShort className='cm-u-centerText'>Editar</TableCellShort>
        <TableCellShort className='cm-u-centerText'>Borrar</TableCellShort>
      </TableDataHeader>
      
      
      { editPlayerContext.savedVariables?.map((item, index) => {  
        
        return (
          <TableDataRow key={index}>
            <TableCellLong>{`${item?.desc_alias}`}</TableCellLong>
            <TableCellShort className='cm-u-centerText'>
            <IconButtonSmallerPrimary
              onClick={(e) => {
                e.preventDefault();
                editPlayerContext.setCreatingClauseError(null);
                editPlayerContext.setShowNewVariableLayer(false);
                // editPlayerContext.setShowEditVariableLayer(true);
                editPlayerContext.setEditedVariableId(item.id_clausula);
                handleEditClausula(item.id_clausula);
                // console.log('editar contrato id', item.id_contrato);
              }}>
              <SymbolEdit />
            </IconButtonSmallerPrimary>
          </TableCellShort>
            <TableCellShort
              className='cm-u-centerText'>
            <span>&nbsp;&nbsp;</span>
              <IconButtonSmallerPrimary
                dataValue={index}
                onClick={(event) => {
                  event.preventDefault();
                  handleDeleteClausula(item.id_clausula);
                }}
                >
              <SymbolDelete />
            </IconButtonSmallerPrimary>
          </TableCellShort>
        </TableDataRow>
        )
      })}
    </>
  )
}

export const VariableDataLayer = ({ handleChangesOnNewVariableExpression,handleChangesOnNewVariableExpressionToggle, handleDeleteNewVariableExpression, handleAddNewVariableExpression,handleDeleteNewCond,handleAddNewCond, searchExpression, searchCondition, handleSaveNewVariable, handleSaveExistingVariable,handleAddNewDetailVariableExpression, handleChangesOnDetailVariableExpression, handleChangesOnDetailVariableExpressionToggle,   handleDeleteDetailVariableExpression, handleAddNewDetailCond, handleDeleteDetailCond }) => {
  const globalContext = useGlobalContext();
  const editPlayerContext = useEditPlayerDataContext();

  return (
    <>
      {/* Acordeon crear o editar variable */}
      <SimpleAccordion>
        <SimpleAccordionTrigger
          className='cm-u-spacer-mb-bigger'>
          <HeadContentTitleBar>
            <TitleBar__Title></TitleBar__Title>
            <TitleBar__Tools>
            { editPlayerContext.activeContractData && 
              <>
                <ButtonMousePrimary
                onClick={(e) => {
                  e.preventDefault();
                  editPlayerContext.setCreatingClauseError(null);
                  editPlayerContext.setShowNewVariableLayer(true);
                  editPlayerContext.setShowEditVariableLayer(false);
                }}
                >
                  Nueva
                </ButtonMousePrimary>
                <ButtonMouseTransparent
                  onClick={(e) => {
                    e.preventDefault();
                    globalContext.setModalImportVar(!globalContext.modalImportVar);
                  }}
                >
                  Importar
                </ButtonMouseTransparent>
              </>
              } 
            </TitleBar__Tools>
          </HeadContentTitleBar>
        </SimpleAccordionTrigger>
        { editPlayerContext.showNewVariableLayer &&
          <NewVariableForm 
            handleChangesOnNewVariableExpression={handleChangesOnNewVariableExpression}
            handleChangesOnNewVariableExpressionToggle={handleChangesOnNewVariableExpressionToggle}
            handleDeleteNewVariableExpression={handleDeleteNewVariableExpression}
            handleAddNewVariableExpression={handleAddNewVariableExpression}
            handleDeleteNewCond={handleDeleteNewCond}
            handleAddNewCond={handleAddNewCond}
            searchExpression={searchExpression}
            searchCondition={searchCondition}
            handleSaveNewVariable={handleSaveNewVariable}
          />
        }
        { editPlayerContext.showEditVariableLayer &&
          <EditVariableForm 
            handleChangesOnDetailVariableExpression={handleChangesOnDetailVariableExpression}
            handleChangesOnDetailVariableExpressionToggle={handleChangesOnDetailVariableExpressionToggle}
            searchExpression={searchExpression}
            searchCondition={searchCondition}
            handleSaveExistingVariable={handleSaveExistingVariable}
            handleAddNewDetailVariableExpression={handleAddNewDetailVariableExpression}
            handleDeleteDetailVariableExpression={handleDeleteDetailVariableExpression}
            handleAddNewDetailCond={handleAddNewDetailCond}
            handleDeleteDetailCond={handleDeleteDetailCond}

          />
        }
      </SimpleAccordion>   
    </>   
  )
}

const NewVariableForm = ({ handleChangesOnNewVariableExpression, handleChangesOnNewVariableExpressionToggle, handleDeleteNewVariableExpression, handleAddNewVariableExpression, handleDeleteNewCond, handleAddNewCond, searchExpression, searchCondition, handleSaveNewVariable }) => {
  const editPlayerContext = useEditPlayerDataContext();
  const [recursiveBlocks, setRecursiveBlocks] = useState(0);
  const [blockText, setBlockText] = useState(null);
  const [tipoImporte, setTipoImporte] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  //verifica que al menos estas 3 keys de cada nuevo objeto en el array de expresiones estén rellenas (lo minimo) y en caso afirmativo desbloquea el botón de guardar.
  useEffect(() => {
    const isValid = editPlayerContext.variableExpressions.every((expression) => {
      console.log('Expresión:', expression);
  
      // Validar las claves principales
      const mainFieldsValid =
        expression.id_expresion
  
      // Validar las condiciones solo si bonus_prima === 1
      const conditionsValid =
        expression.bonus_prima === "1" ||
        (Array.isArray(expression.condiciones) &&
          expression.condiciones.every((condition) => {
            return (
              condition.id_condicion
            );
          }));
  
      // Validar si bonus_prima está vacío (solo mainFieldsValid es relevante)
      return mainFieldsValid && (expression.bonus_prima === "" || conditionsValid);
    });
    setIsButtonDisabled(!isValid);
  }, [editPlayerContext.variableExpressions]);


  return (
    <>
      <SimpleAccordionContent>
          <header className="cm-l-body-static-header--inTab" style={{marginTop:'0'}}>
            <p className="cm-u-text-black-cat">Añadir nueva variable</p>
          </header>
          <FormSimplePanelRow>
            <LabelElement
              htmlFor='descripcion'
              placeholder='Descripción'
              type='text'
              className='panel-field-long'
              >Descripción
            </LabelElement> 
          </FormSimplePanelRow>
          {editPlayerContext.variableExpressions.map((item,index) => {
            const ExprComb = item.id_ExprComb;            
            return (
              <div key={ExprComb} className='cm-u-spacer-mb-bigger'>
                <FormSimplePanelRow>
                  {(item.id_ExprComb !== 1) ?
                    <LabelSelectShorterElement
                      htmlFor='id_expresion_concatenacion'
                      labelText='Nueva expresión'
                      value={item.id_expresion_concatenacion}
                      handleOnChange={(event) => {
                        handleChangesOnNewVariableExpression(event,index)
                      }} >
                        <option value=''>Selecciona</option>
                        <option value='y'>Y</option>
                        <option value='o'>O</option>
                    </LabelSelectShorterElement>
                  : ''}
                  <LabelElementToggle2SidesPanel
                    textLeft='Prima'
                    textRight='Bonus'
                    htmlFor='bonus_prima'
                    checked={item.bonus_prima === 1 ? true : ''}
                    handleOnChange={(event) => {
                      handleChangesOnNewVariableExpressionToggle(event, index);
                    }}>
                    {(item.id_ExprComb !== 1) ?  '' : 'Expresión'}
                  </LabelElementToggle2SidesPanel>
                </FormSimplePanelRow>
                <FormSimplePanelRow>
                  <LabelSelectShorterElement
                    htmlFor='id_expresion'                    
                    value={item.id_expresion}
                    handleOnChange={(event) => {
                      handleChangesOnNewVariableExpression(event,index)
                    }}                  
                    >
                      <option value=''>Expresion</option>
                      {
                        editPlayerContext.variableCombos.data.expresion?.map((item) => {                          
                          if (editPlayerContext.variableExpressions[ExprComb-1].bonus_prima == 0) {
                            if (item.bonus_prima === true) {
                              return (
                                <option key={item.id} value={item.id}>{item.value}</option>
                              )
                            }
                          } else {
                            if (item.bonus_prima === false) {
                              return (
                                <option key={item.id} value={item.id}>{item.value}</option>
                              )
                            }
                          }
                          
                      })}
                  </LabelSelectShorterElement>
                  <SelectIconShorter
                    name='id_expresion_operador'
                    value={item.id_expresion_operador}
                    handleOnChange={(event) => {
                      handleChangesOnNewVariableExpression(event,index)
                    }} >
                      <option value=''>Operador</option>
                    <option value='<='>&lt;=</option>
                    <option value='>='>&gt;=</option>
                    <option value='='>=</option>
                  </SelectIconShorter>
                  <ExprCondValueField
                    idExpresion={editPlayerContext.variableExpressions[index].id_expresion}
                    index={index}
                    handleChangesOnNewVariableExpression={handleChangesOnNewVariableExpression}
                    searchExpression={searchExpression}
                  />

                  {(item.id_ExprComb !== 1) ?                   
                    <IconButtonSmallSecondary
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteNewVariableExpression(index);
                      }} >
                        <SymbolDelete />
                    </IconButtonSmallSecondary>
                    : ''}
                  {index+1 == editPlayerContext.variableExpressions.length ?                   
                    <IconButtonSmallSecondary
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddNewVariableExpression(ExprComb+1);
                      }} >
                        <SymbolAdd />
                    </IconButtonSmallSecondary>
                    : ''}
                </FormSimplePanelRow>
                { item.bonus_prima === 1 ?
                  <>
                    {
                      editPlayerContext.variableExpressions[index].condiciones.map((item, index2) => {
                        return(
                          <>
                            <FormSimplePanelRow key={index2}>
                              <LabelSelectShorterElement
                                htmlFor='id_condicion'
                                labelText='Condición'
                                value={editPlayerContext.variableExpressions[index].condiciones[index2].id_condicion || ''}
                                handleOnChange={(e) => {
                                  let onChangeValue = [...editPlayerContext.variableExpressions];
                                  onChangeValue[index]["condiciones"][index2]["id_condicion"] = e.target.value;
                                  editPlayerContext.setVariableExpressions(onChangeValue);                        
                                }}
                                >
                                  <option value=''>Condicion</option>
                                  { editPlayerContext.variableCombos.data.condition?.map((item) => {
                                      return (
                                        <option key={item.id} value={item.id}>{item.value}</option>
                                      );
                                  })}
                              </LabelSelectShorterElement>
                              <SelectIconShorter
                                name='id_condicion_operador'
                                value={editPlayerContext.variableExpressions[index].condiciones[index2].id_condicion_operador || ''}
                                handleOnChange={(e) => {
                                  let onChangeValue = [...editPlayerContext.variableExpressions];
                                  onChangeValue[index]["condiciones"][index2]["id_condicion_operador"] = e.target.value;
                                  editPlayerContext.setVariableExpressions(onChangeValue);                            
                                }}
                                >
                                  <option value=''>Operador</option>
                                  <option value='<='>&lt;=</option>
                                  <option value='>='>&gt;=</option>
                              </SelectIconShorter>

                              <ConditionValueField 
                                idCondicion={editPlayerContext.variableExpressions[index].condiciones[index2].id_condicion}
                                indexExpr={index}
                                indexCond={index2}
                                searchCondition={searchCondition}
                              />
                              
      
                              {(index2 !== 0) ?                   
                                <IconButtonSmallSecondary
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleDeleteNewCond(index, index2);
                                  }} >
                                    <SymbolDelete />
                                </IconButtonSmallSecondary>
                              : ''}
                              {index2+1 == editPlayerContext.variableExpressions[index].condiciones.length ?                   
                                <IconButtonSmallSecondary
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleAddNewCond(index, index2+1);
                                  }} >
                                    <SymbolAdd />
                                </IconButtonSmallSecondary>
                              : ''}
                            </FormSimplePanelRow>
                          </>
                        )
                      })
                    }
                  </>
                  : ''
                }
              </div>
            );
          })}
          <FormSimplePanelRow>
            <LabelElementToggle2SidesPanel
              textLeft='Definido'
              textRight='No definido'
              htmlFor='recursiveBlocks'
              checked={(recursiveBlocks === 1 || recursiveBlocks === '1' || recursiveBlocks === true) ? 'checked':''}
              handleOnChange={(e) => {
                const checked = e.target.checked === true ? '1' : '0';  
                setRecursiveBlocks(checked)               
                if (e.target.checked) setBlockText(null);
              }}>
              Bloques acumulados
            </LabelElementToggle2SidesPanel>
          </FormSimplePanelRow>
          <FormSimplePanelRow>
            <LabelElement
              htmlFor='bloque'
              placeholder='introduce bloques'
              type='text'
              className='panel-field-long'
              disabled={(recursiveBlocks === 0 || recursiveBlocks === '0' || recursiveBlocks === false)? '' : true}
              value={blockText === null ? '' : blockText}
              handleOnChange={(e)=>{
                const value = e.target.value;
                if (recursiveBlocks !== 1 && value !== "") {
                  setBlockText(value);
                } else if (value === "") {
                  setBlockText("");  // Permite mantener el foco al estar vacío
                }           
              }}
              >Bloque 
            </LabelElement> 
            <LabelSelectElement
              htmlFor='tipo_importe'
              labelText='Tipo importe'
              value={tipoImporte}
              handleOnChange={(e) => {
                setTipoImporte(e.target.value)
              }}>
              <option value=''>Selecciona</option>
              { editPlayerContext.variableCombos.tipo_importe?.map((item) => {
                return (
                  <option key={item.id_tipo_importe} value={item.id_tipo_importe}>{item.desc_tipo_importe}</option>
                );
              })}
            </LabelSelectElement>
          </FormSimplePanelRow>

          <FormSimplePanelRow>
            <LabelElementNumber
              htmlFor='variableAmount'
              placeholder={`Introduce cifra`}
              type='text'
              suffix={(tipoImporte == 3) ? '€' : ' '}
              className='panel-field-short'
            >
            Importe
            </LabelElementNumber>
            {
              editPlayerContext.activeContractData[0]?.desc_tipo_contrato == 'Laboral' &&

              <LabelElementToggle2Sides
              textLeft='Neto'
              textRight='Bruto'
              htmlFor='flag_bruto_neto'
              />
            }
          </FormSimplePanelRow>

          <FormSimplePanelRow>
            <LabelSelectElement
              htmlFor='variableBeneficiary'
              labelText='Beneficiario'>
              <option value=''>Selecciona</option>
              { editPlayerContext.variableCombos.beneficiario?.map((item) => {
                    return (
                      <option key={item.id_beneficiario} value={item.id_beneficiario}>{item.nombre}</option>
                    );
                })}
            </LabelSelectElement>
          </FormSimplePanelRow>
          <FormSimplePanelRow>
            <LabelElement
              htmlFor='dateSince'
              type='date'
              required={true}
              className='panel-field-short'>
              Vigencia desde*
            </LabelElement>
            <LabelElement
              htmlFor='dateTo'
              type='date'
              required={true}
              className='panel-field-short panel-field-short--inline'>
              hasta*
            </LabelElement>
          </FormSimplePanelRow>
          <FormSimplePanelRow>
            <LabelSelectElement
              htmlFor='variableAnexoVI'
              labelText='Anexo VI'>
              <option value=''>Selecciona</option>
              { editPlayerContext.variableCombos.anexoVI.recordset?.map((item) => {
                    return (
                      <option key={item.id_anexo} value={item.id_anexo}>{item.desc_anexo}</option>
                    );
                })}
            </LabelSelectElement>
          </FormSimplePanelRow>
          { editPlayerContext.creatingClauseError? 
            <FormSimplePanelRow
            className='cm-u-centerText'>
              <span className='error'>{editPlayerContext.creatingClauseError}</span>
            </FormSimplePanelRow>
            : ''
          }
          <FormSimplePanelRow
            className='cm-u-centerText'>
            <ButtonMousePrimary
              disabled={isButtonDisabled}
              onClick={handleSaveNewVariable}
              >Guardar</ButtonMousePrimary>
            <ButtonMouseGhost
              onClick={() => {
                setRecursiveBlocks(0);
                setBlockText(null);
                editPlayerContext.setCreatingClauseError(null);
                editPlayerContext.setShowNewVariableLayer(false);
                editPlayerContext.setVariableExpressions([{id_ExprComb:1,bonus_prima:'',id_expresion_concatenacion:'', id_expresion:'',id_expresion_operador:'',id_expresion_valor:'',condiciones:[{id_condicion:'',id_condicion_operador:'',id_condicion_tipo:'',id_condicion_valor:''}]}])
              }}
              >Cancelar</ButtonMouseGhost>
          </FormSimplePanelRow>
        </SimpleAccordionContent>
    </>
  )
}

const EditVariableForm = ({ searchExpression, searchCondition, handleSaveExistingVariable, handleAddNewDetailVariableExpression, handleChangesOnDetailVariableExpression, handleChangesOnDetailVariableExpressionToggle,   handleDeleteDetailVariableExpression, handleAddNewDetailCond, handleDeleteDetailCond }) => {
  const editPlayerContext = useEditPlayerDataContext();
  const [editRecursiveBlocks, setEditRecursiveBlocks] = useState(0);
  const [blockText, setBlockText] = useState(null);
  const [tipoImporte, setTipoImporte] = useState();
  const [flagBrutoNetoToggle, setFlagBrutoNetoToggle] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(()=>{
    const bloque = editPlayerContext.detailEditVariableData[0].flag_bloque_recursivo;
    if (bloque === 0) {
      setEditRecursiveBlocks(0);      
    } else if (bloque === 1) {
      setEditRecursiveBlocks(1);
    }
  },[editPlayerContext.detailEditVariableData[0].flag_bloque_recursivo])

  useEffect(() => {
    if (editRecursiveBlocks === 1) {
      setBlockText(null); // Limpiar el contenido si recursiveBlocks está habilitado
      
      const updatedVariableData = [...editPlayerContext.detailEditVariableData];
      updatedVariableData[0] = {
        ...updatedVariableData[0],
        bloque: 0, // Deshabilitar bloque cuando recursiveBlocks está habilitado
      };
  
      editPlayerContext.setDetailEditVariableData(updatedVariableData);
    }
  }, [editRecursiveBlocks]);

  useEffect(()=>{
    const flagBrutoNeto = editPlayerContext.detailEditVariableData[0].flag_bruto_neto;
    if (flagBrutoNeto == 0 || flagBrutoNeto == null) {
      setFlagBrutoNetoToggle(0)
    } else {
      setFlagBrutoNetoToggle(1)
    }

  },[editPlayerContext.detailEditVariableData[0].flag_bruto_neto])

  // useEffect(()=>{
  //   console.log('variable editando', editPlayerContext.detailEditVariableData)
  // },[editPlayerContext.detailEditVariableData])

  

  //verifica que al menos estas 3 keys de cada nuevo objeto en el array de expresiones estén rellenas (lo minimo) y en caso afirmativo desbloquea el botón de guardar.
  useEffect(() => {

    const isValid = editPlayerContext.detailEditVariableData.every((item) => {
      console.log('expresion:', item);
      // Verificar que 'expresiones' exista y sea un array
      return (
        Array.isArray(item.expresiones) &&
        item.expresiones.every((expression) => {
          // Validar las claves principales
          const mainFieldsValid =
            expression.id_expresion
  
          // Validar las condiciones solo si bonus_prima === "1"
          const conditionsValid =
            expression.bonus_prima !== undefined &&
            expression.bonus_prima === true &&
            Array.isArray(expression.condiciones) &&
            expression.condiciones.every((condition) => {
              return (
                condition.id_condicion
              );
            });
  
          // La validación es válida si solo mainFieldsValid es suficiente (bonus_prima === "")
          // o si también se cumple la validación de condiciones (bonus_prima === "1")
          return mainFieldsValid && (!expression.bonus_prima || conditionsValid);
        })
      );
    });
    setIsButtonDisabled(!isValid);
  }, [editPlayerContext.detailEditVariableData]);


  return (
    <>
      <SimpleAccordionContent>
          <header className="cm-l-body-static-header--inTab" style={{marginTop:'0'}}>
            <p className="cm-u-text-black-cat">Editar variable seleccionada</p>
          </header>
          <FormSimplePanelRow>
            <LabelElement
              htmlFor='descripcion'
              placeholder='Descripción'
              type='text'
              className='panel-field-long'
              value={editPlayerContext.detailEditVariableData[0].desc_alias || ''}
              handleOnChange={e => {
                let onChangeValue = [...editPlayerContext.detailEditVariableData];
                onChangeValue[0]["desc_alias"] = e.target.value;
                editPlayerContext.setDetailEditVariableData(onChangeValue); }}
              >Descripción
            </LabelElement> 
          </FormSimplePanelRow>

          {editPlayerContext.detailEditVariableData[0].expresiones.map((item,index) => {
            
            const ExprComb = index;        
            return (
              <div key={index} className='cm-u-spacer-mb-bigger'>
                <FormSimplePanelRow>
                  {(index !== 0) ?
                    <LabelSelectShorterElement
                      htmlFor='id_expresion_concatenacion'
                      labelText='Nueva expresión'
                      value={item.id_expresion_concatenacion}
                      handleOnChange={(event) => {
                        handleChangesOnDetailVariableExpression(event,index)
                      }} >
                        <option value=''>Selecciona</option>
                        <option value='y'>Y</option>
                        <option value='o'>O</option>
                    </LabelSelectShorterElement>
                  : ''}
                  <LabelElementToggle2SidesPanel
                    textLeft='Prima'
                    textRight='Bonus'
                    htmlFor='bonus_prima'
                    checked={item.condiciones.length > 0 ? true : ''}
                    handleOnChange={(event) => {
                      handleChangesOnDetailVariableExpressionToggle(event, index);
                    }}>
                    {(ExprComb !== 0) ?  '' : 'Expresión'}
                  </LabelElementToggle2SidesPanel>
                </FormSimplePanelRow>
                <FormSimplePanelRow>
                  
                  <LabelSelectShorterElement
                    htmlFor='id_expresion'                    
                    value={item.id_expresion}
                    handleOnChange={(event) => {
                      handleChangesOnDetailVariableExpression(event,index)
                    }}                  
                    >
                      <option value=''>Expresión</option>
                      {console.log('variablesCombos disponbibles', editPlayerContext.variableCombos)}

                      {item.condiciones.length > 0 ? 
                        <>
                          { editPlayerContext.variableCombos.data.expresion?.map(item => {
                            if (item.bonus_prima === false) return <option key={item.id} value={item.id}>{item.value}</option>
                          })}            
                        </>
                        : 
                        <>
                          { editPlayerContext.variableCombos.data.expresion?.map(item => {
                            if (item.bonus_prima === true) return <option key={item.id} value={item.id}>{item.value}</option>
                          })}  
                        </>
                      }
                  </LabelSelectShorterElement>
                  <SelectIconShorter
                    name='id_expresion_operador'
                    value={item.id_expresion_operador}
                    handleOnChange={(event) => {
                      handleChangesOnDetailVariableExpression(event,index)
                    }} >
                      <option value=''>Operador</option>
                    <option value='<='>&lt;=</option>
                    <option value='>='>&gt;=</option>
                    <option value='='>=</option>
                  </SelectIconShorter>
                  <ExprCondValueFieldEdit
                    idExpresion={editPlayerContext.detailEditVariableData[0].expresiones[ExprComb].id_expresion}
                    idExpresionValor={editPlayerContext.detailEditVariableData[0].expresiones[ExprComb].id_expresion_valor}
                    idExpresionDesc={editPlayerContext.detailEditVariableData[0].expresiones[ExprComb].id_expresion_desc}
                    index={index}
                    handleChangesOnDetailVariableExpression={handleChangesOnDetailVariableExpression}
                    searchExpression={searchExpression}
                  />

                  {(ExprComb !== 0) ?                   
                    <IconButtonSmallSecondary
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteDetailVariableExpression(ExprComb);
                      }} >
                        <SymbolDelete />
                    </IconButtonSmallSecondary>
                    : ''}
                  {ExprComb+1 == editPlayerContext.detailEditVariableData[0].expresiones.length ?                   
                    <>
                      <IconButtonSmallSecondary
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddNewDetailVariableExpression(ExprComb);
                        }} >
                          <SymbolAdd />
                      </IconButtonSmallSecondary>
                    </>
                    : ''}
                </FormSimplePanelRow>
                
                { (item.condiciones && item.condiciones.length > 0)
                  ?
                  <>
                    {
                      item.condiciones.map((itemCond, index2) => {
                        // console.log('itemCond', itemCond);
                        return(
                          <>
                            <FormSimplePanelRow key={index2}>
                              <LabelSelectShorterElement
                                htmlFor='id_condicion'
                                labelText='Condición'
                                value={itemCond.id_condicion || ''}
                                handleOnChange={(e) => {
                                  e.preventDefault();
                                const updatedDetailEditVariableData = [...editPlayerContext.detailEditVariableData];
                                const targetItem = { ...updatedDetailEditVariableData[0] };
                                const updatedExpressions = [...targetItem.expresiones];
                                const targetExpression = { ...updatedExpressions[index] };

                                // Clona el array `condiciones` del objeto `targetExpression`
                                const updatedConditions = [...targetExpression.condiciones];
                                // Actualiza el campo `id_condicion` de la condición en la posición `index2`
                                updatedConditions[index2] = {
                                  ...updatedConditions[index2],
                                  id_condicion: e.target.value
                                };

                                targetExpression.condiciones = updatedConditions;
                                updatedExpressions[index] = targetExpression;
                                targetItem.expresiones = updatedExpressions;
                                updatedDetailEditVariableData[0] = targetItem;
                                editPlayerContext.setDetailEditVariableData(updatedDetailEditVariableData);      
                                }}
                                >
                                  <option value=''>Condicion</option>
                                  { editPlayerContext.variableCombos.data.condition?.map((itemCond) => {
                                      return (
                                        <option key={itemCond.id} value={itemCond.id}>{itemCond.value}</option>
                                      );
                                  })}
                              </LabelSelectShorterElement>
                              <SelectIconShorter
                                name='id_condicion_operador'
                                value={itemCond.id_condicion_operador || ''}
                                handleOnChange={(e) => {
                                  let onChangeValue = [...editPlayerContext.detailEditVariableData];
                                  onChangeValue[0]["expresiones"][index]["condiciones"][index2]["id_condicion_operador"] = e.target.value;
                                  editPlayerContext.setDetailEditVariableData(onChangeValue);                            
                                }}
                                >
                                  <option value=''>Operador</option>
                                  <option value='<='>&lt;=</option>
                                  <option value='>='>&gt;=</option>
                              </SelectIconShorter>

                              <ConditionValueFieldEdit 
                                idCondicion={itemCond.id_condicion}
                                idCondicionValor={itemCond.id_condicion_valor}
                                idCondicionDesc={itemCond.id_condicion_desc}
                                indexExpr={index}
                                indexCond={index2}
                                searchCondition={searchCondition}
                              />
                              
      
                              {/* Botón para eliminar la condición (excepto la primera) */}
                              {index2 !== 0 && (
                                <IconButtonSmallSecondary
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleDeleteDetailCond(index, index2);
                                  }}>
                                  <SymbolDelete />
                                </IconButtonSmallSecondary>
                              )}

                              {/* Botón para añadir nueva condición (solo en la última condición visible) */}
                              {index2 + 1 === item.condiciones.length && (
                                <IconButtonSmallSecondary
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleAddNewDetailCond(index);
                                  }}>
                                  <SymbolAdd />
                                </IconButtonSmallSecondary>
                              )}
                            </FormSimplePanelRow>
                          </>
                        )
                      })
                    }
                  </>
                  : ''
                }
              </div>
            );
          })}
          <FormSimplePanelRow>
            <LabelElementToggle2SidesPanel
              textLeft='Definido'
              textRight='No definido'
              htmlFor='recursiveBlocks'
              checked={(editRecursiveBlocks === 1 || editRecursiveBlocks === '1' || editRecursiveBlocks === true) ? 'checked':''}
              handleOnChange={(e) => {
                const isChecked = e.target.checked;
                setEditRecursiveBlocks(isChecked ? 1 : 0);
              }}
              >
              Bloques acumulados
            </LabelElementToggle2SidesPanel>

          </FormSimplePanelRow>
          <FormSimplePanelRow>
            <LabelElement
              htmlFor='bloque'
              placeholder='introduce bloque'
              type='text'
              className='panel-field-long'
              disabled={editRecursiveBlocks === 1}
              value={editRecursiveBlocks === 1 ? '' : editPlayerContext.detailEditVariableData[0].bloque}
              handleOnChange={(e) => {
                console.log('editRecursiveBlocks', editRecursiveBlocks)
                const value = e.target.value;
                if (editRecursiveBlocks !== 1 && value !== "") {
                  let onChangeValue = [...editPlayerContext.detailEditVariableData];
                  onChangeValue[0]["bloque"] = value;
                  editPlayerContext.setDetailEditVariableData(onChangeValue);
                } else if (value === "") {
                  console.log('está vacío');
                  let onChangeValue = [...editPlayerContext.detailEditVariableData];
                  onChangeValue[0]["bloque"] = "";
                  console.log('onChangeValue', onChangeValue);
                  // editPlayerContext.setDetailEditVariableData(onChangeValue);
                }        
              }}
              >Bloque 
            </LabelElement> 
            <LabelSelectElement
              htmlFor='tipo_importe'
              labelText='Tipo importe'
              value={editPlayerContext.detailEditVariableData[0].tipo_importe || ''}
              handleOnChange={(e) => {
                let onChangeValue = [...editPlayerContext.detailEditVariableData];
                onChangeValue[0]["tipo_importe"] = e.target.value;
                editPlayerContext.setDetailEditVariableData(onChangeValue);
              }}>
              <option value=''>Selecciona</option>
              { editPlayerContext.variableCombos.tipo_importe?.map((item) => {
                return (
                  <option key={item.id_tipo_importe} value={item.id_tipo_importe}>{item.desc_tipo_importe}</option>
                );
              })}
            </LabelSelectElement>
          </FormSimplePanelRow>

          <FormSimplePanelRow>
            <LabelElementNumber
              htmlFor='variableAmount'
              placeholder='Introduce cifra'
              type='text'
              suffix={(editPlayerContext.detailEditVariableData[0].tipo_importe != 3) ? ' ' : '€'}
              className='panel-field-short'
              value={editPlayerContext.detailEditVariableData[0].num_importe || ''}
              handleOnChange={(values)=>{
                let onChangeValue = [...editPlayerContext.detailEditVariableData];
                onChangeValue[0]["num_importe"] = values.value;
                editPlayerContext.setDetailEditVariableData(onChangeValue); 
              }}
            >
            Importe
            </LabelElementNumber>

            {
              editPlayerContext.activeContractData[0]?.desc_tipo_contrato == 'Laboral' &&

              <LabelElementToggle2Sides
                textLeft='Neto'
                textRight='Bruto'
                htmlFor='flag_bruto_neto'
                checked={flagBrutoNetoToggle == 1 ? 'checked':''}
                handleOnChange={(e)=>{
                  const isChecked = e.target.checked;
                  setFlagBrutoNetoToggle(isChecked ? 1 : 0);
                }}
              />
            }
          </FormSimplePanelRow>
          <FormSimplePanelRow>
            <LabelSelectElement
              htmlFor='variableBeneficiary'
              labelText='Beneficiario'
              value={editPlayerContext.detailEditVariableData[0].id_beneficiario || ''}
              handleOnChange={(e) => {
                let onChangeValue = [...editPlayerContext.detailEditVariableData];
                onChangeValue[0]["id_beneficiario"] = e.target.value;
                editPlayerContext.setDetailEditVariableData(onChangeValue);
              }}
              >
              <option value=''>Selecciona</option>
              { editPlayerContext.variableCombos.beneficiario?.map((item) => {
                    return (
                      <option key={item.id_beneficiario} value={item.id_beneficiario}>{item.nombre}</option>
                    );
                })}
            </LabelSelectElement>
          </FormSimplePanelRow>
          <FormSimplePanelRow>
            <LabelElement
              htmlFor='dateSince'
              type='date'
              required={true}
              className='panel-field-short'
              value={editPlayerContext.detailEditVariableData[0].fecha_desde || ''}
              handleOnChange={e => {
                let onChangeValue = [...editPlayerContext.detailEditVariableData];
                onChangeValue[0]["fecha_desde"] = e.target.value;
                editPlayerContext.setDetailEditVariableData(onChangeValue); }}
              >
              Vigencia desde*
            </LabelElement>
            <LabelElement
              htmlFor='dateTo'
              type='date'
              required={true}
              className='panel-field-short panel-field-short--inline'
              value={editPlayerContext.detailEditVariableData[0].fecha_hasta || ''}
              handleOnChange={e => {
                let onChangeValue = [...editPlayerContext.detailEditVariableData];
                onChangeValue[0]["fecha_hasta"] = e.target.value;
                editPlayerContext.setDetailEditVariableData(onChangeValue); }}
              >
              hasta*
            </LabelElement>
          </FormSimplePanelRow>
          <FormSimplePanelRow>
            <LabelSelectElement
              htmlFor='variableAnexoVI'
              labelText='Anexo VI'
              value={editPlayerContext.detailEditVariableData[0].id_anexo || ''}
              handleOnChange={(e) => {
                let onChangeValue = [...editPlayerContext.detailEditVariableData];
                onChangeValue[0]["id_anexo"] = e.target.value;
                editPlayerContext.setDetailEditVariableData(onChangeValue);
              }}>
              <option value=''>Selecciona</option>
              { editPlayerContext.variableCombos.anexoVI.recordset?.map((item) => {
                    return (
                      <option key={item.id_anexo} value={item.id_anexo}>{item.desc_anexo}</option>
                    );
                })}
            </LabelSelectElement>
          </FormSimplePanelRow>
          { editPlayerContext.creatingClauseError? 
            <FormSimplePanelRow
            className='cm-u-centerText'>
              <span className='error'>{editPlayerContext.creatingClauseError}</span>
            </FormSimplePanelRow>
            : ''
          }
          <FormSimplePanelRow
            className='cm-u-centerText'>
            <ButtonMousePrimary
              disabled={isButtonDisabled}
              onClick={handleSaveExistingVariable}
              >Guardar</ButtonMousePrimary>
            <ButtonMouseGhost
              onClick={() => {
                setEditRecursiveBlocks(0);
                setBlockText(null);
                editPlayerContext.setShowEditVariableLayer(false);
                editPlayerContext.setCreatingClauseError(null);
              }}
              >Cancelar</ButtonMouseGhost>
          </FormSimplePanelRow>
        </SimpleAccordionContent>
    </>
  )
}


//render campo valor de expresion dependiendo de tipo de expresión
const ExprCondValueField = ({ idExpresion, index,  handleChangesOnNewVariableExpression, searchExpression }) => {
  const editPlayerContext = useEditPlayerDataContext();

  const [searchExprSelected, setSearchExprSelected] = useState();
  const [showSearchExprResults, setShowSearchExprResults] = useState(false);

  let type = null;
  let result= null;
  let comboVal = null;
  if (idExpresion !== '') {
    type = editPlayerContext.variableCombos.data.expresion.filter(item => item.id.includes(idExpresion));
    result = type[0]?.type;
    comboVal = type[0]?.comboVal;
  }
  if (result === 'texto') {
    return (
      <LabelElement
        htmlFor='id_expresion_valor'
        placeholder='introduce valor'
        type='number'
        className='cm-c-form-simple'
        value={editPlayerContext.variableExpressions[index]?.id_expresion_valor}
        handleOnChange={(event) => {
          handleChangesOnNewVariableExpression(event,index);
      }} />
    );
  } else if (result === 'combo') {
    return (
      <SelectIconShorter
        name='id_expresion_valor'
        value={editPlayerContext.variableExpressions[index]?.id_expresion_valor || ''}
        handleOnChange={(e) => {
          handleChangesOnNewVariableExpression(e,index);                           
        }} >
        <option value=''>Selecciona</option>
        { comboVal.map((item) => {
            return (
              <option key={item.id} value={item.id}>{item.value}</option>
            );
        })}
      </SelectIconShorter>  
    );
  } else if (result === 'search') {
    return (
      <div className='cm-c-dropdown-select'>
        <LabelElement
          htmlFor='id_expresion_valor'
          type='text'
          className='cm-c-form-simple'
          autoComplete='off'
          placeholder='Escribe para buscar'
          required={true}
          value={searchExprSelected}
          handleOnChange={(e)=>{
            setSearchExprSelected(e.target.value);
            if (e.target.value.length >= 2 ) {
              searchExpression(idExpresion, e.target.value)
              setShowSearchExprResults(true)
            } else if ((e.target.value.length < 2 )) {
              editPlayerContext.setSearchExpResults(null);
              setShowSearchExprResults(false);
              
            }
          }}

          />
        <SearchExpResults
          index={index}
          setSearchExprSelected={setSearchExprSelected}
          showSearchExprResults={showSearchExprResults}
          setShowSearchExprResults={setShowSearchExprResults}
        />
      </div>
    );
  }
} 

//render campo valor de expresion dependiendo de tipo de expresión cuando editamos una expresión creada
const ExprCondValueFieldEdit = ({ idExpresion, idExpresionValor, idExpresionDesc, index,  handleChangesOnDetailVariableExpression, searchExpression }) => {
  const editPlayerContext = useEditPlayerDataContext();

  const [searchExprSelected, setSearchExprSelected] = useState(null);
  const [showSearchExprResults, setShowSearchExprResults] = useState(false);

  let type = null;
  let result= null;
  let comboVal = null;
  if (idExpresion !== '') {
    type = editPlayerContext.variableCombos.data.expresion.filter(item => item.id.includes(idExpresion));
    result = type[0]?.type;
    comboVal = type[0]?.comboVal;
  }
  if (result === 'texto') {
    return (
      <LabelElement
        htmlFor='id_expresion_valor'
        placeholder='introduce valor'
        type='number'
        className='cm-c-form-simple'
        value={idExpresionValor}
        handleOnChange={(event) => {
          handleChangesOnDetailVariableExpression(event,index);
      }} />
    );
  } else if (result === 'combo') {
    return (
      <SelectIconShorter
        name='id_expresion_valor'
        value={idExpresionValor || ''}
        handleOnChange={(e) => {
          handleChangesOnDetailVariableExpression(e,index);                           
        }} >
        <option value=''>Selecciona</option>
        { comboVal.map((item) => {
            return (
              <option key={item.id} value={item.id}>{item.value}</option>
            );
        })}
      </SelectIconShorter>  
    );
  } else if (result === 'search') {
    return (
      <div className='cm-c-dropdown-select'>
        <LabelElement
          htmlFor='id_expresion_valor'
          type='text'
          className='cm-c-form-simple'
          autoComplete='off'
          placeholder='Escribe para buscar'
          required={true}
          value={searchExprSelected || idExpresionDesc}
          handleOnChange={(e)=>{
            setSearchExprSelected(e.target.value);
            if (e.target.value.length >= 2 ) {
              searchExpression(idExpresion, e.target.value)
              setShowSearchExprResults(true)
            } else if ((e.target.value.length < 2 )) {
              editPlayerContext.setSearchExpResults(null);
              setShowSearchExprResults(false);
              
            }
          }}

          />
        <SearchExpResultsEdit
          index={index}
          setSearchExprSelected={setSearchExprSelected}
          showSearchExprResults={showSearchExprResults}
          setShowSearchExprResults={setShowSearchExprResults}
        />
      </div>
    );
  }
} 

//render campo valor condicion dependiendo del escogido en condicion
const ConditionValueField = ({ idCondicion, idCondicionValor, idCondicionDesc, indexExpr, indexCond, searchCondition, }) => {
  const editPlayerContext = useEditPlayerDataContext();  

  const [condSelected, setCondSelected] = useState(null);
  const [showSearchCondResults, setShowSearchCondResults] = useState(false);

  let filter = null;
  let result = null;
  let comboVal = null;
  if (idCondicion !== '') {
    filter = editPlayerContext.variableCombos.data.condition.filter(item => item.id.includes(idCondicion));
    result = filter[0]?.type;
    comboVal = filter[0]?.comboVal;
  }

  if (result === 'texto') { 
    return (
      <>
        <LabelElement
        htmlFor='id_condicion_valor'
        placeholder='introduce valor'
        type='number'
        className='cm-c-form-simple'
        value={editPlayerContext.variableExpressions[indexExpr]?.condiciones[indexCond]?.id_condicion_valor || ''}
        handleOnChange={(e) => {
          let onChangeValue = [...editPlayerContext.variableExpressions];
          onChangeValue[indexExpr]["condiciones"][indexCond]["id_condicion_valor"] = e.target.value;
          editPlayerContext.setVariableExpressions(onChangeValue);
          let onChangeType = [...editPlayerContext.variableExpressions];
          onChangeType[indexExpr]["condiciones"][indexCond]["id_condicion_tipo"] = 'texto';
          editPlayerContext.setVariableExpressions(onChangeType);                              
        }}
         />
      </>          
    );
  } else if (result === 'combo') {
    return (
      <>
        <SelectIconShorter
          name='id_condicion_valor'
          value={editPlayerContext.variableExpressions[indexExpr]?.condiciones[indexCond]?.id_condicion_valor || ''}
          handleOnChange={(e) => {
            let onChangeValue = [...editPlayerContext.variableExpressions];
            onChangeValue[indexExpr]["condiciones"][indexCond]["id_condicion_valor"] = e.target.value;
            editPlayerContext.setVariableExpressions(onChangeValue);
            let onChangeType = [...editPlayerContext.variableExpressions];
            onChangeType[indexExpr]["condiciones"][indexCond]["id_condicion_tipo"] = 'combo';
            editPlayerContext.setVariableExpressions(onChangeType);                           
          }} >
          <option value=''>Selecciona</option>
          { comboVal.map((item) => {
              return (
                <option key={item.id} value={item.id}>{item.value}</option>
              );
          })}
        </SelectIconShorter>  
      </>  
    );
  } else if (result === 'search') {
    return (
      
      <div className='cm-c-dropdown-select'>
        <LabelElement
          htmlFor='id_condicion_valor'
          type='text'
          className='cm-c-form-simple'
          autoComplete='off'
          placeholder='Buscar'
          required={true}
          value={condSelected}
          handleOnChange={(e)=>{            
            setCondSelected(e.target.value);
            if (e.target.value.length >= 2 ) {
              searchCondition(idCondicion, e.target.value);
              setShowSearchCondResults(true);
            } else if ((e.target.value.length < 2 )) {
              editPlayerContext.setSearchCondResults(null);
              setShowSearchCondResults(false);
              
            }
          }}

          />
          <SearchCondResults
            indexExpr={indexExpr}
            indexCond={indexCond}
            setCondSelected={setCondSelected}
            showSearchCondResults={showSearchCondResults}
            setShowSearchCondResults={setShowSearchCondResults}
            
          />
        {/* {renderSearchCondResults(indexExpr, indexCond)} */}
      </div>
    );
  }
}

//render campo valor condicion dependiendo del escogido en condicion
const ConditionValueFieldEdit = ({ idCondicion, idCondicionValor, idCondicionDesc, indexExpr, indexCond, searchCondition, }) => {
  const editPlayerContext = useEditPlayerDataContext();  

  const [condSelected, setCondSelected] = useState(null);
  const [showSearchCondResults, setShowSearchCondResults] = useState(false);

  let filter = null;
  let result = null;
  let comboVal = null;
  if (idCondicion !== '') {
    filter = editPlayerContext.variableCombos.data.condition.filter(item => item.id.includes(idCondicion));
    result = filter[0]?.type;
    comboVal = filter[0]?.comboVal;
  }

  if (result === 'texto') { 
    return (
      <>
        <LabelElement
        htmlFor='id_condicion_valor'
        placeholder='introduce valor'
        type='number'
        className='cm-c-form-simple'
        value={idCondicionValor || ''}
        handleOnChange={(e) => {
          let onChangeValue = [...editPlayerContext.detailEditVariableData];
          onChangeValue[0]["expresiones"][indexExpr]["condiciones"][indexCond]["id_condicion_valor"] = e.target.value;
          editPlayerContext.setDetailEditVariableData(onChangeValue);                        
        }}
         />
      </>          
    );
  } else if (result === 'combo') {
    return (
      <>
        <SelectIconShorter
          name='id_condicion_valor'
          value={idCondicionValor || ''}
          handleOnChange={(e) => {
            let onChangeValue = [...editPlayerContext.detailEditVariableData];
            onChangeValue[0]["expresiones"][indexExpr]["condiciones"][indexCond]["id_condicion_valor"] = e.target.value;
            editPlayerContext.setDetailEditVariableData(onChangeValue);                
          }} >
          <option value=''>Selecciona</option>
          { comboVal.map((item) => {
              return (
                <option key={item.id} value={item.id}>{item.value}</option>
              );
          })}
        </SelectIconShorter>  
      </>  
    );
  } else if (result === 'search') {
    return (
      
      <div className='cm-c-dropdown-select'>
        <LabelElement
          htmlFor='id_condicion_valor'
          type='text'
          className='cm-c-form-simple'
          autoComplete='off'
          placeholder='Buscar'
          required={true}
          value={condSelected || idCondicionDesc}
          handleOnChange={(e)=>{            
            setCondSelected(e.target.value);
            if (e.target.value.length >= 2 ) {
              searchCondition(idCondicion, e.target.value);
              setShowSearchCondResults(true);
            } else if ((e.target.value.length < 2 )) {
              editPlayerContext.setSearchCondResults(null);
              setShowSearchCondResults(false);
              
            }
          }}

          />
          <SearchCondResultsEdit
            indexExpr={indexExpr}
            indexCond={indexCond}
            setCondSelected={setCondSelected}
            showSearchCondResults={showSearchCondResults}
            setShowSearchCondResults={setShowSearchCondResults}
            
          />
        {/* {renderSearchCondResults(indexExpr, indexCond)} */}
      </div>
    );
  }
}

const SearchExpResults = ({ index, setSearchExprSelected, showSearchExprResults, setShowSearchExprResults }) => {
  const editPlayerContext = useEditPlayerDataContext();

  if (showSearchExprResults && editPlayerContext.searchExpResults?.length == 0) {
    return (
      <div className='cm-c-dropdown-select__results-box'><span>No hay resultados</span></div>
    );
  } else if (showSearchExprResults && editPlayerContext.searchExpResults?.length > 0) {
    return (
      <div className='cm-c-dropdown-select__results-box'>
        {
          editPlayerContext.searchExpResults.map(item => {   
            // console.log('searExpr results', item)
            return (
              <span
                className='result'
                key={item.id}
                onClick={e => {
                  e.preventDefault();
                  let onChangeValue = [...editPlayerContext.variableExpressions];
                  onChangeValue[index]["id_expresion_valor"] = item.id.toString();
                  editPlayerContext.setVariableExpressions(onChangeValue);
                  editPlayerContext.setSearchExpResults(item.value);
                  editPlayerContext.setShowSearchExpResults(false);
                  setSearchExprSelected(item.value);
                  setShowSearchExprResults(false);
                }}  >
                  {item.value}
              </span>
            );
          })
        }
      </div>
    );
  }
}

const SearchExpResultsEdit = ({ index, setSearchExprSelected, showSearchExprResults, setShowSearchExprResults }) => {
  const editPlayerContext = useEditPlayerDataContext();

  if (showSearchExprResults && editPlayerContext.searchExpResults?.length == 0) {
    return (
      <div className='cm-c-dropdown-select__results-box'><span>No hay resultados</span></div>
    );
  } else if (showSearchExprResults && editPlayerContext.searchExpResults?.length > 0) {
    return (
      <div className='cm-c-dropdown-select__results-box'>
        {
          editPlayerContext.searchExpResults.map(item => {   
            // console.log('searExpr results', item)
            return (
              <span
                className='result'
                key={item.id}
                onClick={e => {
                  e.preventDefault();
                  let onChangeValue = [...editPlayerContext.detailEditVariableData];
              
                  // Actualiza tanto el valor como la descripción
                  onChangeValue[0]["expresiones"][index]["id_expresion_valor"] = item.id.toString();
                  onChangeValue[0]["expresiones"][index]["id_expresion_desc"] = item.value.toString();

                  editPlayerContext.setDetailEditVariableData(onChangeValue);
                  
                  setSearchExprSelected(item.value);
                  setShowSearchExprResults(false);
                }}  >
                  {item.value}
              </span>
            );
          })
        }
      </div>
    );
  }
}

//render caja de resultados busqueda
const SearchCondResults = ({ indexExpr, indexCond, setCondSelected, showSearchCondResults, setShowSearchCondResults }) => {
  const editPlayerContext = useEditPlayerDataContext();

  if (showSearchCondResults && editPlayerContext.searchCondResults?.length == 0) {
    return (
      <div className='cm-c-dropdown-select__results-box'><span>No hay resultados</span></div>
    );
  } else if (showSearchCondResults && editPlayerContext.searchCondResults?.length > 0) {
    return (
      <div className='cm-c-dropdown-select__results-box'>
        {
          editPlayerContext.searchCondResults.map(item => {
            //console.log(item);
            return (
              <span
                className='result'
                key={item.id}
                onClick={e => {
                  e.preventDefault();
                  let onChangeValue = [...editPlayerContext.variableExpressions];
                  onChangeValue[indexExpr]["condiciones"][indexCond]["id_condicion_valor"] = item.id.toString();
                  editPlayerContext.setVariableExpressions(onChangeValue);
                  editPlayerContext.setSearchCondSelected(item.value);
                  editPlayerContext.setShowSearchCondResults(false);
                  setCondSelected(item.value)
                  setShowSearchCondResults(false);
                }}  >
                  {item.value}
              </span>
            );
          })
        }
      </div>
    );
  }
}

const SearchCondResultsEdit = ({ indexExpr, indexCond, setCondSelected, showSearchCondResults, setShowSearchCondResults }) => {
  const editPlayerContext = useEditPlayerDataContext();

  if (showSearchCondResults && editPlayerContext.searchCondResults?.length == 0) {
    return (
      <div className='cm-c-dropdown-select__results-box'><span>No hay resultados</span></div>
    );
  } else if (showSearchCondResults && editPlayerContext.searchCondResults?.length > 0) {
    return (
      <div className='cm-c-dropdown-select__results-box'>
        {
          editPlayerContext.searchCondResults.map(item => {
            //console.log(item);
            return (
              <span
                className='result'
                key={item.id}
                onClick={e => {
                  e.preventDefault();
                  let onChangeValue = [...editPlayerContext.detailEditVariableData];
                  onChangeValue[0]["expresiones"][indexExpr]["condiciones"][indexCond]["id_condicion_valor"] = item.id.toString();
                  onChangeValue[0]["expresiones"][indexExpr]["condiciones"][indexCond]["id_condicion_desc"] = item.value;
                  editPlayerContext.setDetailEditVariableData(onChangeValue);
                  setCondSelected(item.value);
                  setShowSearchCondResults(false);
                }}  >
                  {item.value}
              </span>
            );
          })
        }
      </div>
    );
  }
}