import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSaveData } from "../../hooks/useSaveData";
import { useGetData } from "../../hooks/useGetData";
import { EditPlayerContextProvider, useEditPlayerDataContext } from "../../providers/EditPlayeProvider";
import { EditPlayerTab } from "./EditPlayerTab";
import { EditContractsTab } from "./EditContractsTab";
import { AsideMenu } from "../../components/AsideMenu";

import { ModalPlayerCopyVariables } from "../../components/Modals/ModalPlayerCopyVariables"
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";
import { CentralBody, HeadContent, HeadContentTitleBar, TitleBar__Title, TitleBar__TitleAvatar, TitleBar__Tools } from "../../components/UI/layout/centralContentComponents";
import { ButtonCatPrimary, ButtonCatTransparent, ButtonMouseGhost, ButtonMousePrimary, ButtonMouseTransparent, IconButtonSmallPrimary, IconButtonSmallSecondary, IconButtonSmallerPrimary } from "../../components/UI/objects/buttons";
import { SymbolAdd, SymbolBack, SymbolDelete, SymbolEdit } from "../../components/UI/objects/symbols";
import { FormSimplePanel, FormSimplePanelRow, FormSimpleRow, LabelElement, LabelElementAssist, LabelElementToggle, LabelElementToggle2Sides, LabelElementToggle2SidesPanel, LabelSelectElement, LabelSelectElementAssist, LabelSelectShorterElement, SelectIconShorter, } from "../../components/UI/components/form simple/formSimple";
import { FormTabs, FormTabs__ContentWrapper, FormTabs__LinksWrapper, FormTabs__ToolBarWrapper, TabContent, TabLink } from "../../components/UI/components/formTabs/formTabs";
import { SimpleAccordion, SimpleAccordionContent,  SimpleAccordionTrigger } from "../../components/UI/components/simpleAccordion/simpleAccordion";
import { manageTabs } from "../../domUtilities/manageTabs";
import { FileDrop } from "../../components/UI/components/form simple/fileDrop";
import { TableCellLong, TableCellMedium, TableCellShort, TableDataHeader, TableDataRow, TableDataWrapper } from "../../components/UI/layout/tableData";
import { useGlobalContext } from "../../providers/globalContextProvider";
import { ModalBody, ModalContainer, ModalContent__Small, ModalFooter } from "../../components/UI/components/modal/modal";
import { EditVariablesTab } from "./EditVariablesTab";



export default function EditPlayerPage () {  
  const context = useGlobalContext();
  const editPlayerContext = useEditPlayerDataContext();
  

  //navegar
  const navigate = useNavigate();

  //hook guardar datos
  const updatePlayer = useSaveData();
  const deletePlayer = useSaveData();

  //ref form
  const form = useRef(null);
  //leer pathname actual y manejar navegacion
  const queryParams = new URLSearchParams(window.location.search);
  const userParam = queryParams.get('player');
  const userParamString = userParam.toString();

  // variables y estados locales
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [countries, setCountries] = useState(null);
  const [positions, setPositions] = useState(null);
  const [contracts, setContracts] = useState(null);
  const [intermediaries, setIntermediaries] = useState(null);
  const [teams, setTeams] = useState(null);
  const [showUploadDoc, setShowUploadDoc ] = useState(false);
  const [uploadedFiles, setUploadedFiles ] = useState([]);
  const [playerData, setPlayerData] = useState({
    'desc_alias': '',
    'desc_apellido1': '',
    'desc_apellido2': '',
    'desc_dni_nie': '',
    'desc_nombre': '',
    'desc_nss': '',
    'desc_pasaporte1': '',
    'desc_pasaporte2': '',
    'dt_caducidad_dni': '',
    'dt_caducidad_pasaporte1': '',
    'dt_caducidad_pasaporte2': '',
    'dt_nacimiento': '',
    'flag_comunitario': '',
    'flag_cotonu': '', 
    'flag_residencia': '',
    'id_jugador': '',
    'id_nacionalidad1': '',
    'id_nacionalidad2': '',
    'id_posicion': '',
    'id_tipo_jugador': '',
    'val_valor_mercado': '',
  });
  const [playerContracts, setplayerContracts] = useState([]);

  //estados playerDetails
  //estados recuperar y seleccionar nombre jugador
  const [optaPlayersList, setOptaPlayersList] = useState(null);
  const [optaSelectedPlayer, setOptaSelectedPlayer] = useState('');
  const [optaResultsBox, setOptaResultsBox] = useState(false);
  const [playerTypes, setPlayerTypes] = useState(null);
  
  

  // estados variables
  // mostrar/ocultar modal copiar variables
  // const [modalImportVar, setModalImportVar] = useState(false);
  // //donde guardo la info de los posibles combos de cada combinacion Exprexion+Condiciones
  // const [variableCombos, setVariableCombos] = useState([]);
  // //variable activa cuando estoy inspeccionado una ya creada
  // const [activeVariable, setActiveVariable] = useState(null);
  // //array con las variables creades
  // const [savedVariables, setSavedVariables] = useState([]);
  // //mostrar/ocultar capa de variable ya creada
  // const [showVariable, setShowVariable] = useState(false);
  // //mostrar/ocultar capa de nueva variable
  // const [showNewVariableLayer, setShowNewVariableLayer ] = useState(false);
  // //array para guardar las nuevas expresiones añadidas a cada variable
  // const [variableExpressions, setVariableExpressions] = useState([
  //   { id_ExprComb:1,
  //     bonus_prima:'',
  //     id_expresion_concatenacion:'',
  //     id_expresion:'',
  //     id_expresion_operador:'',
  //     id_expresion_valor:'', 
  //     operador:'',
  //     condiciones:[{
  //       id_condicion:'',
  //       id_condicion_operador:'',
  //       id_condicion_tipo:'',
  //       id_condicion_valor:''
  //     }]
  //   }]);
  // //guardar resultados search expressions
  // const [searchExpSelected, setSearchExpSelected] = useState(null);
  // const [searchExpResults, setSearchExpResults] = useState(null);
  // const [showSearchExpResults, setShowSearchExpResults] = useState(false);  
  // //guardar resultados search conditions
  // const [searchCondSelected, setSearchCondSelected] = useState(null);
  // const [searchCondResults, setSearchCondResults] = useState(null);
  // const [showSearchCondResults, setShowSearchCondResults] = useState(false);  

  useEffect(()=>{
    manageTabs();
  },[])
  
  //------------- PETICIONES DE DATOS MAESTROS ------------------------

  //pedir paises, posiciones, contratos, intermediarios y equipos
  const getCountries = useGetData('masters/getAllCountry');
  useEffect (() => {
    //console.log(getCountries.responseGetData)
    if (getCountries.responseGetData) setCountries(getCountries.responseGetData.data.data);
  },[getCountries.responseGetData])

  const getPlayerTypes = useGetData('masters/getAllPlayerType');
  useEffect(()=>{
    if(getPlayerTypes.responseGetData) setPlayerTypes(getPlayerTypes.responseGetData.data.data);
  },[getPlayerTypes.responseGetData])

  const getPositions = useGetData('masters/getAllPosition');
  useEffect (() => {
    if (getPositions.responseGetData) setPositions(getPositions.responseGetData.data.data);
  },[getPositions.responseGetData])

  const getContracts = useGetData('masters/getAllContract');
  useEffect (() => {
    if (getContracts.responseGetData) setContracts(getContracts.responseGetData.data.data);
  },[getContracts.responseGetData])

  const getIntermediaries = useGetData('masters/getAllIntermediary');
  useEffect (() => {
    if (getIntermediaries.responseGetData) setIntermediaries(getIntermediaries.responseGetData.data.data);
  },[getIntermediaries.responseGetData])

  const getTeams = useGetData('masters/GetAllTeams');
  useEffect (() => {
    if (getTeams.responseGetData) {
      setTeams(getTeams.responseGetData.data.data);
    }
  },[getTeams.responseGetData])

  //pedir combos creación de variables
  // const getNewVariableCombos = useGetData('players/getCombosValues');
  // useEffect (() => {
  //   if (getNewVariableCombos.responseGetData) {
  //     setVariableCombos(getNewVariableCombos.responseGetData.data.data);
  //   }
  // },[getNewVariableCombos.responseGetData])



  //----------------------------------------------------------//
  //variables

  // useEffect(()=> {
  //   if (variableExpressions) console.log('variableExpressions', variableExpressions);
  // },[variableExpressions])

  //añadir una nueva expresion completa a la variable
  const handleAddNewVariableExpression = (number) => {
    setVariableExpressions([...variableExpressions, {id_ExprComb:number,bonus_prima:'',id_expresion_concatenacion:'', id_expresion:'',id_expresion_operador:'',id_expresion_valor:'',condiciones:[{id_condicion:'',id_condicion_operador:'',id_condicion_tipo:'',id_condicion_valor:''}]}]) 
   }
 
   //manejar cambios en los campos de la expresion
   const handleChangesOnNewVariableExpression = (event, index) => {
     let {name, value} = event.target;
     let onChangeValue = [...variableExpressions];
     onChangeValue[index][name] = value;
     setVariableExpressions(onChangeValue);
   }

   const handleChangesOnNewVariableExpressionToggle = (event, index) => {
    let {name, checked} = event.target;
    let onChangeValue = [...variableExpressions];
    onChangeValue[index][name] = checked ? 1 : 0;
    setVariableExpressions(onChangeValue);
  }
 
   const handleDeleteNewVariableExpression = (index) => {
     const newExpressionsArray = [...variableExpressions];
     newExpressionsArray.splice(index,1);
     setVariableExpressions(newExpressionsArray);
   }

   //añadir nueva condicion al crear variable
  const handleAddNewCond = (indexExpr,indexNewCond) => {
    let onChangeValue = [...variableExpressions];
    onChangeValue[indexExpr]["condiciones"][indexNewCond] = {id_condicion:'',id_condicion_operador:'',id_condicion_tipo:'',id_condicion_valor:''};
    setVariableExpressions(onChangeValue);
  }

  //borrar una nueva condicion al crear variable
  const handleDeleteNewCond = (indexExpr, indexCond) => {
    let newExpressionsArray = [...variableExpressions];
    let newConditionsArray = [...newExpressionsArray[indexExpr].condiciones]
    newExpressionsArray[indexExpr].condiciones = [];
    newConditionsArray.splice(indexCond, 1);
    newExpressionsArray[indexExpr]["condiciones"] = newConditionsArray;    
    setVariableExpressions(newExpressionsArray);
  }
  
  //pedir datos para buscar en una expresion tipo search
  const getExprSearch = useSaveData();
  const searchExpression = (id, search) => {
    getExprSearch.uploadData('players/searchComboValues',{'id':id, 'search':search})
  }
  //guardar datos busqueda expresion
  useEffect(()=> {
    if (getExprSearch.responseUpload) {
      //console.log('resultados de busqueda',getExprSearch.responseUpload)
      setSearchExpResults(getExprSearch.responseUpload.data);
      setShowSearchExpResults(true);
    }
  },[getExprSearch.responseUpload])

  //render caja de resultados busqueda expresion
  const renderSearchExpResults = (index) => {
    if (showSearchExpResults && searchExpResults?.length == 0) {
      return (
        <div className='cm-c-dropdown-select__results-box'><span>No hay resultados</span></div>
      );
    } else if (showSearchExpResults && searchExpResults?.length > 0) {
      return (
        <div className='cm-c-dropdown-select__results-box'>
          {
            searchExpResults.map(item => {
     
              return (
                <span
                  className='result'
                  key={item.id}
                  onClick={e => {
                    e.preventDefault();
                    let onChangeValue = [...variableExpressions];
                    onChangeValue[index]["id_expresion_valor"] = item.id.toString();
                    setVariableExpressions(onChangeValue);
                    setSearchExpResults(item.value);
                    setShowSearchExpResults(false);
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

  //render campo valor de expresion dependiendo de tipo de expresión
  const renderExprCondValueField = (idExpresion, index) => {
    let type = null;
    let result= null;
    let comboVal = null;
    if (idExpresion !== '') {
      type = variableCombos.expresion.filter(item => item.id.includes(idExpresion));
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
          value={variableExpressions[index]?.id_expresion_valor}
          handleOnChange={(event) => {
            handleChangesOnNewVariableExpression(event,index);
        }} />
      );
    } else if (result === 'combo') {
      return (
        <SelectIconShorter
          name='id_expresion_valor'
          value={variableExpressions[index]?.id_expresion_valor || ''}
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
            value={searchExpSelected}
            handleOnChange={(e)=>{
              //console.log(e.target.value);
              setSearchExpSelected(e.target.value);
              if (e.target.value.length >= 2 ) {
                searchExpression(idExpresion, e.target.value)
              } else if ((e.target.value.length < 2 )) {
                setSearchExpResults(null);
                setShowSearchExpResults(false);
                
              }
            }}
  
            />
          {renderSearchExpResults(index)}
        </div>
      );
    }
  }  

  //pedir datos para buscar en una condicion tipo search
  const getCondSearch = useSaveData();
  const searchCondition = (id, search) => {
    getCondSearch.uploadData('players/searchComboValues',{'id':id, 'search':search})
  }
  //guardar datos busqueda jugador
  useEffect(()=> {
    if (getCondSearch.responseUpload) {
      //console.log(getCondSearch.responseUpload)
      setSearchCondResults(getCondSearch.responseUpload.data);
      setShowSearchCondResults(true);
    }
  },[getCondSearch.responseUpload])

  //render caja de resultados busqueda jugador
  const renderSearchCondResults = (indexExpr, indexCond) => {
    if (showSearchCondResults && searchCondResults?.length == 0) {
      return (
        <div className='cm-c-dropdown-select__results-box'><span>No hay resultados</span></div>
      );
    } else if (showSearchCondResults && searchCondResults?.length > 0) {
      return (
        <div className='cm-c-dropdown-select__results-box'>
          {
            searchCondResults.map(item => {
              //console.log(item);
              return (
                <span
                  className='result'
                  key={item.id}
                  onClick={e => {
                    e.preventDefault();
                    let onChangeValue = [...variableExpressions];
                    onChangeValue[indexExpr]["condiciones"][indexCond]["id_condicion_valor"] = item.id.toString();
                    setVariableExpressions(onChangeValue);
                    setSearchCondSelected(item.value);
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

  //render campo valor condicion dependiendo del escogido en condicion
  const renderConditionValueField = (idCondicion, indexExpr, indexCond) => {
    let filter = null;
    let result = null;
    let comboVal = null;
    if (idCondicion !== '') {
      filter = variableCombos.condition.filter(item => item.id.includes(idCondicion));
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
          value={variableExpressions[indexExpr]?.condiciones[indexCond]?.id_condicion_valor || ''}
          handleOnChange={(e) => {
            let onChangeValue = [...variableExpressions];
            onChangeValue[indexExpr]["condiciones"][indexCond]["id_condicion_valor"] = e.target.value;
            setVariableExpressions(onChangeValue);
            let onChangeType = [...variableExpressions];
            onChangeType[indexExpr]["condiciones"][indexCond]["id_condicion_tipo"] = 'texto';
            setVariableExpressions(onChangeType);                             
          }}
           />
        </>          
      );
    } else if (result === 'combo') {
      return (
        <>
          <SelectIconShorter
            name='id_condicion_valor'
            value={variableExpressions[indexExpr]?.condiciones[indexCond]?.id_condicion_valor || ''}
            handleOnChange={(e) => {
              let onChangeValue = [...variableExpressions];
              onChangeValue[indexExpr]["condiciones"][indexCond]["id_condicion_valor"] = e.target.value;
              setVariableExpressions(onChangeValue);
              let onChangeType = [...variableExpressions];
              onChangeType[indexExpr]["condiciones"][indexCond]["id_condicion_tipo"] = 'combo';
              setVariableExpressions(onChangeType);                             
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
            placeholder='Escribe para buscar'
            required={true}
            value={searchCondSelected}
            handleOnChange={(e)=>{
              //console.log(e.target.value);
              setSearchCondSelected(e.target.value);
              if (e.target.value.length >= 2 ) {
                searchCondition(idCondicion, e.target.value)
              } else if ((e.target.value.length < 2 )) {
                setSearchCondResults(null);
                setShowSearchCondResults(false);
                
              }
            }}
  
            />
          {renderSearchCondResults(indexExpr, indexCond)}
        </div>
      );
    }
  }

  //render acordeon nueva variable
  const renderNewVariableLayer = () => {
    if (showNewVariableLayer === true) {
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
          {variableExpressions.map((item,index) => {
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
                      { variableCombos.expresion?.map((item) => {
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
                  {renderExprCondValueField(variableExpressions[index].id_expresion, index)}

                  {(item.id_ExprComb !== 1) ?                   
                    <IconButtonSmallSecondary
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteNewVariableExpression(index);
                      }} >
                        <SymbolDelete />
                    </IconButtonSmallSecondary>
                    : ''}
                  {index+1 == variableExpressions.length ?                   
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
                      variableExpressions[index].condiciones.map((item, index2) => {
                        return(
                          <>
                            <FormSimplePanelRow key={index2}>
                              <LabelSelectShorterElement
                                htmlFor='id_condicion'
                                labelText='Condición'
                                value={variableExpressions[index].condiciones[index2].id_condicion || ''}
                                handleOnChange={(e) => {
                                  let onChangeValue = [...variableExpressions];
                                  onChangeValue[index]["condiciones"][index2]["id_condicion"] = e.target.value;
                                  setVariableExpressions(onChangeValue);                            
                                }}
                                >
                                  <option value=''>Condicion</option>
                                  { variableCombos.condition?.map((item) => {
                                      return (
                                        <option key={item.id} value={item.id}>{item.value}</option>
                                      );
                                  })}
                              </LabelSelectShorterElement>
                              <SelectIconShorter
                                name='id_condicion_operador'
                                value={variableExpressions[index].condiciones[index2].id_condicion_operador || ''}
                                handleOnChange={(e) => {
                                  let onChangeValue = [...variableExpressions];
                                  onChangeValue[index]["condiciones"][index2]["id_condicion_operador"] = e.target.value;
                                  setVariableExpressions(onChangeValue);                            
                                }}
                                >
                                  <option value=''>Operador</option>
                                  <option value='<='>=</option>
                                  <option value='>='>&gt;=</option>
                              </SelectIconShorter>
                              {renderConditionValueField(variableExpressions[index].condiciones[index2].id_condicion, index, index2)}
      
                              {(index2 !== 0) ?                   
                                <IconButtonSmallSecondary
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleDeleteNewCond(index, index2);
                                  }} >
                                    <SymbolDelete />
                                </IconButtonSmallSecondary>
                              : ''}
                              {index2+1 == variableExpressions[index].condiciones.length ?                   
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
              { variableCombos.beneficiarios?.map((item) => {
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
              onClick={handleSaveNewVariable}
              >Guardar</ButtonMousePrimary>
            <ButtonMouseGhost
              onClick={() => {
                setShowNewVariableLayer(false);
                setVariableExpressions([{id_ExprComb:1,bonus_prima:'',id_expresion_concatenacion:'', id_expresion:'',id_expresion_operador:'',id_expresion_valor:'',condiciones:[{id_condicion:'',id_condicion_operador:'',id_condicion_tipo:'',id_condicion_valor:''}]}]) 
              }}
              >Cancelar</ButtonMouseGhost>
          </FormSimplePanelRow>
        </SimpleAccordionContent>
        </>
      );     
    }
  }

  //guardar una nueva variable
  const saveClausula = useSaveData();

  const handleSaveNewVariable = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const amortizableVal = document.getElementById('amortizable').checked;
    //const bonusPrimaVal = document.getElementById('bonus_prima').checked;
    const expresiones = variableExpressions;
    //console.log(typeof(expresiones));

    const data = {
      expresiones,
      desc_alias: formData.get('descripcion'),
      bloque: formData.get('bloque'),
      tipo_importe: formData.get('tipo_importe'),
      fecha_desde: formData.get('dateSince'),
      fecha_hasta: formData.get('dateTo'),
      amortizable: amortizableVal ? 1 : 0,
      num_importe: formData.get('variableAmount'),
      id_beneficiario: formData.get('variableBeneficiary'),
    }

    const dataSent = {
      'id_contrato': activeContractId,
      'variable': data,
    }

    // console.log('variable que guardo', data);
    // console.log('variable que mando', dataSent);

    saveClausula.uploadData('players/createClausula', dataSent);
    // setSavedVariables([...savedVariables, dataSent]);    
  }

  useEffect(()=>{
    if (saveClausula.responseUpload) {
      //console.log (saveClausula.responseUpload);
      if (saveClausula.responseUpload.status === 'ok') {
        setShowNewVariableLayer(false);
        setVariableExpressions([{id_ExprComb:1,bonus_prima:'',id_expresion:'',id_expresion_operador:'',id_expresion_valor:'',condiciones:[{id_condicion:'',id_condicion_operador:'',id_condicion_tipo:'',id_condicion_valor:''}]}]);
        //vuelve a pedir el detalle de clausula con el listado de arriba
        getDetalleClausula.uploadData('players/getDetail_clausula',{id_contrato:activeContractId.toString()}); 
        //getPlayersAgain();
      } else {
        setError('Existe un error en el formulario, inténtelo de nuevo')
      }
    }
  },[saveClausula.responseUpload])


  //borrar una variable
  // const deleteClausula = useSaveData();

  // const handleDeleteClausula = (id) => {
  //   deleteClausula.uploadData('players/removeClausula', {'id_clausula':id.toString()})
  // }

  // useEffect(()=>{
  //   if (deleteClausula.responseUpload){
  //     //vuelve a pedir el detalle de clausula con el listado de arriba
  //     getDetalleClausula.uploadData('players/getDetail_clausula',{id_contrato:activeContractId.toString()}); 
  //     //getPlayersAgain();
  //   }
  // },[deleteClausula.responseUpload])

  // //volver a pedir variables al cerror modal copiar variables
  // useEffect(()=>{
  //   if(activeContractId) {
  //     //vuelve a pedir el detalle de clausula con el listado de arriba
  //     getDetalleClausula.uploadData('players/getDetail_clausula',{id_contrato:activeContractId.toString()}); 
  //   }
  // },[modalImportVar])


  //------------------------------------------------------------//
  //documentos

  //render acordeon upload docs
  // const renderUploadDocsLayer = () => {
  //   if (showUploadDoc === true) {
  //     return (
  //       <SimpleAccordionContent
  //         id='docUploadContent'>
  //           <header className="cm-l-body-static-header--inTab" style={{marginTop:'0'}}>
  //               <p className="cm-u-text-black-cat">Añadir documento</p>
  //           </header>
  //           <FormSimplePanelRow>
  //             <LabelElementAssist
  //               htmlFor='documentDescription'
  //               type='text'
  //               className='panel-field-long'
  //               autoComplete='off'
  //               placeholder='Descripcion'
  //               >
  //               Descripción
  //             </LabelElementAssist>
  //           </FormSimplePanelRow>
  //           <FormSimplePanelRow>
  //             <FileDrop
  //               htmlFor='addFileInput'
  //               placeholder={context.fileNewPlayerUploaded ? context.fileNewPlayerUploaded : 'Seleccionar o arrastrar'} >
  //                 Archivo
  //             </FileDrop>
  //           </FormSimplePanelRow>
  //           <FormSimplePanelRow
  //             className='cm-u-centerText'>
  //             <ButtonMousePrimary
  //               onClick={handleFile}>Guardar</ButtonMousePrimary>
  //             <ButtonMouseGhost
  //               onClick={() => setShowUploadDoc(false)}
  //               >Cancelar</ButtonMouseGhost>
  //           </FormSimplePanelRow>
  //       </SimpleAccordionContent>
  //     );
  //   }
  // }

  // const handleFile = (e) => {
  //   e.preventDefault();
  //   const desc = document.getElementById('documentDescription').value;
  //   setUploadedFiles([...uploadedFiles, { desc_documento: desc, documento: context.fileNewPlayerUploaded }])
  //   context.setFileNewPlayerUploaded(null);
  //   setShowUploadDoc(false);
  // }

  //mirar la respuesta de subir datos para setear error
  useEffect(()=> {
    if (updatePlayer.responseUpload) {
      //console.log(updatePlayer.responseUpload);
      if (updatePlayer.responseUpload.status === 409) { setError('El jugador que estás intentnado editar ya existe')
      } else if (updatePlayer.responseUpload.code === 'ERR_NETWORK') { setError('Error de conexión, inténtelo más tarde')
      } else if (updatePlayer.responseUpload.status === 'ok') { navigate('/manage-players');
      } else {
        setError('Existe un error en el formulario, inténtelo de nuevo')
      }
    }
  },[updatePlayer.responseUpload])

  const handlePlayerDelete = () => {
    deletePlayer.uploadData('players/remove',{id_jugador:userParam.toString()});    
  }

  //mirar la respuesta de subir datos para setear error
  useEffect(()=> {
    if (deletePlayer.responseUpload) {
      //console.log(deletePlayer.responseUpload);
      if (deletePlayer.responseUpload.status === 409) { setError('El jugador que estás intentnado borrar no existe')
      } else if (deletePlayer.responseUpload.code === 'ERR_NETWORK') { setError('Error de conexión, inténtelo más tarde')
      } else if (deletePlayer.responseUpload.status === 'ok') { navigate('/manage-players');
      } else {
        setError('Existe un error en el formulario, inténtelo de nuevo')
      }
    }
  },[deletePlayer.responseUpload])

  const renderModal = () => {
    if (modal) {
      return (
        <ModalContainer>
          <ModalContent__Small>
            <ModalBody
              className='cm-u-spacer-mb-bigger'>
                <h3 className="cm-u-text-black-cat">{`¿Estas seguro de borrar a ${playerData.desc_nombre} ${playerData.desc_apellido1}?`}</h3>
              </ModalBody>
            <ModalFooter>
              <ButtonCatTransparent
                onClick={() => setModal(false)}>
                  Cancelar
              </ButtonCatTransparent>
              <ButtonCatPrimary
                onClick={handlePlayerDelete}>
                Borrar usuario
              </ButtonCatPrimary>
            </ModalFooter>
          </ModalContent__Small>
        </ModalContainer>
      );
    }
  }


  return (
    <>
      <EditPlayerContextProvider>
        {renderModal()}
        <ModalPlayerCopyVariables
          state={context.modalImportVar}
          setState={context.setModalImportVar}
          playerId={userParam}
          activeContractId={context.activeContractId}
        />
        <HalfContainer id='usersList'>
          <HalfContainerAside>
            <AsideMenu />
          </HalfContainerAside>
          <HalfContainerBody >
            <HeadContent>
              <HeadContentTitleBar>
                <TitleBar__TitleAvatar
                  avatarText='Editar\nJugador'>
                  {`${playerData.desc_nombre} ${playerData.desc_apellido1}`}
                </TitleBar__TitleAvatar>
                <TitleBar__Tools>
                  <IconButtonSmallPrimary
                    onClick={() => setModal(true)}>
                    <SymbolDelete/>
                  </IconButtonSmallPrimary>
                  <IconButtonSmallPrimary
                    onClick={() => {
                      navigate('/manage-players')}}>
                    <SymbolBack />
                  </IconButtonSmallPrimary>
                </TitleBar__Tools>
              </HeadContentTitleBar>
              <FormTabs__ToolBarWrapper>
                <FormTabs>
                  <FormTabs__LinksWrapper>
                    <TabLink target='general'>General</TabLink>
                    <TabLink target='contractual'>Contractual</TabLink>
                    <TabLink target='variables'>Cláusulas</TabLink>
                  </FormTabs__LinksWrapper>
                </FormTabs>
              </FormTabs__ToolBarWrapper>
            </HeadContent>
            <CentralBody
              style={{paddingTop: '140px'}}>
              <FormSimplePanel
                innerRef={form}
                autoComplete='off'>                
                  <FormTabs>
                    <FormTabs__ContentWrapper>
                      <TabContent id='general'>                      
                      <EditPlayerTab
                        idJugador={userParamString}
                        playerTypes={playerTypes}
                        countries={countries}
                        positions={positions}
                      />
                      </TabContent>
                      <TabContent id='contractual'>
                        <EditContractsTab
                          form={form}
                          idJugador={userParamString}
                          teams={teams}
                          intermediaries={intermediaries}
                        />
                        </TabContent>
                      <TabContent id='variables'>
                        {/* Tabla Variables creadas */}
                        <EditVariablesTab
                          form={form}
                          idJugador={userParamString}
                        />
                      </TabContent>
                      {/* <TabContent id='documentos'>
                        <SimpleAccordion>
                          <SimpleAccordionTrigger
                            className='cm-u-spacer-mb-bigger'>
                            <HeadContentTitleBar>
                              <TitleBar__Title></TitleBar__Title>
                              <TitleBar__Tools>
                                <IconButtonSmallPrimary
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setShowUploadDoc(true);
                                  }} >
                                    <SymbolAdd />
                                </IconButtonSmallPrimary>
                              </TitleBar__Tools>
                            </HeadContentTitleBar>
                          </SimpleAccordionTrigger>
                          {renderUploadDocsLayer()}
                        </SimpleAccordion>
                        <TableDataWrapper
                          className='cm-u-spacer-mt-big'>
                            <TableDataHeader>
                              <TableCellLong>Decripción</TableCellLong>
                              <TableCellShort></TableCellShort>
                            </TableDataHeader>
                            {
                              uploadedFiles?.map((item, index)=> {
                                const description = item.desc_documento;
                                return (
                                  <TableDataRow key={index}>
                                    <TableCellLong>{description}</TableCellLong>
                                    <TableCellShort>
                                      <IconButtonSmallerPrimary
                                        onClick={() => {
                                          const newFilter = uploadedFiles.filter(item => item.desc_documento !== description)
                                          console.log(newFilter);
                                          setUploadedFiles([newFilter])
                                        }}>
                                        <SymbolDelete />
                                      </IconButtonSmallerPrimary>
                                    </TableCellShort>
                                  </TableDataRow>
                                );
                              })
                            }
                        </TableDataWrapper>
                      </TabContent> */}
                    </FormTabs__ContentWrapper>
                  </FormTabs>
                  {error &&
                    <FormSimpleRow className='cm-u-centerText'>
                      <span className='error'>{error}</span>
                    </FormSimpleRow>
                  }
              </FormSimplePanel>
            </CentralBody>
          </HalfContainerBody>
        </HalfContainer>
      </EditPlayerContextProvider>
    </>
  );
}