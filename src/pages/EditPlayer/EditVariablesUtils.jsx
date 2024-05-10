import { useEditPlayerDataContext } from "../../providers/EditPlayeProvider";
import { TableCellLong, TableCellMedium, TableCellShort, TableDataHeader, TableDataRow } from "../../components/UI/layout/tableData"
import { ButtonMouseGhost, ButtonMousePrimary, ButtonMouseTransparent, IconButtonSmallSecondary, IconButtonSmallerPrimary } from "../../components/UI/objects/buttons";
import { SymbolAdd, SymbolDelete } from "../../components/UI/objects/symbols";
import { SimpleAccordion, SimpleAccordionContent, SimpleAccordionTrigger } from "../../components/UI/components/simpleAccordion/simpleAccordion";
import { HeadContentTitleBar, TitleBar__Title, TitleBar__Tools } from "../../components/UI/layout/centralContentComponents";
import { FormSimplePanelRow, LabelElement, LabelElementAssist, LabelElementToggle, LabelElementToggle2SidesPanel, LabelSelectElement, LabelSelectShorterElement, SelectIconShorter } from "../../components/UI/components/form simple/formSimple";

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
           <TableCellMedium>{editPlayerContext.activeContractData[0].desc_descripcion}</TableCellMedium>
            <TableCellMedium>{editPlayerContext.activeContractData[0].desc_tipo_contrato}</TableCellMedium>
            <TableCellMedium>{editPlayerContext.activeContractData[0].desc_tipo_procedimiento}</TableCellMedium>
            <TableCellMedium>{editPlayerContext.activeContractData[0].fecha_ini_fin}</TableCellMedium>
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

export const ListVariablesForSelectedContract = ({ handleDeleteClausula }) => {
  const editPlayerContext = useEditPlayerDataContext();
  return (
    <>
      <TableDataHeader>
        <TableCellLong>Cláusulas añadidas</TableCellLong>
        <TableCellShort></TableCellShort>
      </TableDataHeader>
      
      
      { editPlayerContext.playerDataVariables?.map((item, index) => {   
        return (
          <TableDataRow key={index}>
            <TableCellLong>{`${item?.desc_alias}`}</TableCellLong>
            <TableCellMedium
              className='cm-u-textRight'>
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
          </TableCellMedium>
        </TableDataRow>
        )
      })}
    </>
  )
}

export const VariableDataLayer = ({ handleChangesOnNewVariableExpression,handleChangesOnNewVariableExpressionToggle, handleDeleteNewVariableExpression, handleAddNewVariableExpression,handleDeleteNewCond,handleAddNewCond }) => {
  const editPlayerContext = useEditPlayerDataContext();

  return (
    <>
      {/* Acordeon crear variable */}
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
                  editPlayerContext.setShowNewVariableLayer(true);
                }}
                >
                  Nueva
                </ButtonMousePrimary>
                <ButtonMouseTransparent
                  onClick={(e) => {
                    e.preventDefault();
                    // setModalImportVar(!modalImportVar);
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
          />
        }
      </SimpleAccordion>   
    </>   
  )
}

const NewVariableForm = ({ handleChangesOnNewVariableExpression, handleChangesOnNewVariableExpressionToggle, handleDeleteNewVariableExpression, handleAddNewVariableExpression, handleDeleteNewCond, handleAddNewCond }) => {
  const editPlayerContext = useEditPlayerDataContext();
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
                    textLeft='Bonus'
                    textRight='Prima'
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
                      { editPlayerContext.variableCombos.expresion?.map((item) => {
                          return (
                            <option key={item.id} value={item.id}>{item.value}</option>
                          );
                      })}
                  </LabelSelectShorterElement>
                  <SelectIconShorter
                    name='id_expresion_operador'
                    value={item.id_expresion_operador}
                    handleOnChange={(event) => {
                      handleChangesOnNewVariableExpression(event,index)
                    }} >
                      <option value=''>Operador</option>
                    <option value='<='>=</option>
                    <option value='>='>&gt;=</option>
                  </SelectIconShorter>
                  {/* {renderExprCondValueField(variableExpressions[index].id_expresion, index)} */}

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
                                  { editPlayerContext.variableCombos.condition?.map((item) => {
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
                                  <option value='<='>=</option>
                                  <option value='>='>&gt;=</option>
                              </SelectIconShorter>

                              <ExprCondValueField 
                                idExpresion={editPlayerContext.variableExpressions[index].condiciones[index2].id_condicion}
                                index={index}
                                index2={index2}
                                handleChangesOnNewVariableExpression={handleChangesOnNewVariableExpression}
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
            <LabelElement
              htmlFor='bloque'
              placeholder='introduce bloque'
              type='text'
              className='panel-field-long'
              >Bloque 
            </LabelElement> 
            <LabelSelectElement
              htmlFor='tipo_importe'
              labelText='Tipo importe'>
              <option value=''>Selecciona</option>
              <option value='A'>A</option>
              <option value='B'>B</option>
            </LabelSelectElement>
          </FormSimplePanelRow>
          <FormSimplePanelRow>
            <LabelElementAssist
              htmlFor='variableAmount'
              placeholder='Importe en €'
              type='text'
              className='panel-field-long'>
                Importe
              </LabelElementAssist> 
          </FormSimplePanelRow>
          <FormSimplePanelRow>
            <LabelSelectElement
              htmlFor='variableBeneficiary'
              labelText='Beneficiario'>
              <option value=''>Selecciona</option>
              { editPlayerContext.variableCombos.beneficiarios?.map((item) => {
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
              className='panel-field-short'>
              Vigencia desde
            </LabelElement>
            <LabelElement
              htmlFor='dateTo'
              type='date'
              className='panel-field-short panel-field-short--inline'>
              hasta
            </LabelElement>
          </FormSimplePanelRow>
          <FormSimplePanelRow>
            <LabelElementToggle
                htmlFor='amortizable' >
                Amortizable
              </LabelElementToggle>
            </FormSimplePanelRow>
          <FormSimplePanelRow
            className='cm-u-centerText'>
            <ButtonMousePrimary
              // onClick={handleSaveNewVariable}
              >Guardar</ButtonMousePrimary>
            <ButtonMouseGhost
              onClick={() => {
                editPlayerContext.setShowNewVariableLayer(false);
                editPlayerContext.setVariableExpressions([{id_ExprComb:1,bonus_prima:'',id_expresion_concatenacion:'', id_expresion:'',id_expresion_operador:'',id_expresion_valor:'',condiciones:[{id_condicion:'',id_condicion_operador:'',id_condicion_tipo:'',id_condicion_valor:''}]}]) 
              }}
              >Cancelar</ButtonMouseGhost>
          </FormSimplePanelRow>
        </SimpleAccordionContent>
    </>
  )
}

//render campo valor de expresion dependiendo de tipo de expresión
const ExprCondValueField = ({ idExpresion, index,  handleChangesOnNewVariableExpression,  }) => {
  const editPlayerContext = useEditPlayerDataContext();
  let type = null;
  let result= null;
  let comboVal = null;
  if (idExpresion !== '') {
    type = editPlayerContext.variableCombos.expresion.filter(item => item.id.includes(idExpresion));
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
          value={editPlayerContext.searchExpSelected}
          handleOnChange={(e)=>{
            //console.log(e.target.value);
            editPlayerContext.setSearchExpSelected(e.target.value);
            if (e.target.value.length >= 2 ) {
              editPlayerContext.searchExpression(idExpresion, e.target.value)
            } else if ((e.target.value.length < 2 )) {
              editPlayerContext.setSearchExpResults(null);
              editPlayerContext.setShowSearchExpResults(false);
              
            }
          }}

          />
        <SearchExpResults
          index={index}
        />
      </div>
    );
  }
} 

const SearchExpResults = ({ index }) => {
  const editPlayerContext = useEditPlayerDataContext();

  if (editPlayerContext.showSearchExpResults && editPlayerContext.searchExpResults?.length == 0) {
    return (
      <div className='cm-c-dropdown-select__results-box'><span>No hay resultados</span></div>
    );
  } else if (editPlayerContext.showSearchExpResults && editPlayerContext.searchExpResults?.length > 0) {
    return (
      <div className='cm-c-dropdown-select__results-box'>
        {
          editPlayerContext.searchExpResults.map(item => {   
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