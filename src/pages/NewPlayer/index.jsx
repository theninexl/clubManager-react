import { useEffect, useRef, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { AsideMenu } from "../../components/AsideMenu";
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";
import { CentralBody, HeadContent, HeadContentTitleBar, TitleBar__Title, TitleBar__TitleAvatar, TitleBar__Tools } from "../../components/UI/layout/centralContentComponents";
import { ButtonMouseGhost, ButtonMousePrimary, IconButtonSmallPrimary, IconButtonSmallSecondary, IconButtonSmallerPrimary } from "../../components/UI/objects/buttons";
import { SymbolAdd, SymbolBack, SymbolDelete, SymbolEdit } from "../../components/UI/objects/symbols";
import { FormSimplePanel, FormSimplePanelRow, FormSimpleRow, LabelElement, LabelElementAssist, LabelElementToggle, LabelSelectElement, LabelSelectShorterElement, SelectIcon, SelectIconShorter } from "../../components/UI/components/form simple/formSimple";
import { FormTabs, FormTabs__ContentWrapper, FormTabs__LinksWrapper, FormTabs__ToolBarWrapper, TabContent, TabLink } from "../../components/UI/components/formTabs/formTabs";
import { SimpleAccordion, SimpleAccordionContent, SimpleAccordionLink, SimpleAccordionTrigger } from "../../components/UI/components/simpleAccordion/simpleAccordion";
import { manageTabs } from "../../domUtilities/manageTabs";
import { FileDrop } from "../../components/UI/components/form simple/fileDrop";
import { TableCellLong, TableCellMedium, TableCellShort, TableDataHeader, TableDataRow, TableDataWrapper } from "../../components/UI/layout/tableData";
import { useGlobalContext } from "../../providers/globalContextProvider";
import { useGetData } from "../../hooks/useGetData";
import { useSaveData } from "../../hooks/useSaveData";

export default function NewPlayerPage () {

  const context = useGlobalContext();

  //hook guardar datos
  const { uploadData, responseUpload } = useSaveData();

  //navegar
  const navigate = useNavigate();

  //ref form
  const form = useRef(null);
  //leer pathname actual y manejar navegacion
  const queryParams = new URLSearchParams(window.location.search);
  const userParam = queryParams.get('user');

  // estados locales
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState(null);
  const [positions, setPositions] = useState(null);
  const [contracts, setContracts] = useState(null);
  const [intermediaries, setIntermediaries] = useState(null);
  const [teams, setTeams] = useState(null);
  //si muestro o no la capa de creacion de variable
  const [showNewVariableLayer, setShowNewVariableLayer ] = useState(false);
  //donde guardo la info de los posibles combos de cada combinacion Exprexion+Condiciones
  const [variableCombos, setVariableCombos] = useState([]);
  //array para guardar las nuevas expresiones añadidas a cada variable
  const [variableExpressions, setVariableExpressions] = useState([{id_ExprComb:1,id_expresion:'',id_expresion_operador:'',id_expresion_valor:'',condiciones:[{id_condicion:'',id_condicion_operador:'',id_condicion_tipo:'',id_condicion_valor:''}]}]);
  //array para guardar las nuevas condiones añadidas a cada expresion
  // const [variableConditions, setVariableConditions] = useState([]);
  //tipo de condicion escogida
  // const [conditionChosen, setConditionChosen] = useState();
  //array con las variables creades
  const [savedVariables, setSavedVariables] = useState([]);
  //si muestro o no la capa de creacion de nuevo documento
  const [showUploadDoc, setShowUploadDoc ] = useState(false);
  //los archivos guardados
  const [uploadedFiles, setUploadedFiles ] = useState([]);
  

  useEffect(()=>{
    manageTabs();    
  },[])
  //pedir paises, posiciones, contratos, intermediarios y equipos
  const getCountries = useGetData('masters/getAllCountry');
  useEffect (() => {
    if (getCountries.responseGetData) setCountries(getCountries.responseGetData.data.data);
  },[getCountries.responseGetData])

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

  const getTeams = useGetData('teams/getAll');
  useEffect (() => {
    if (getTeams.responseGetData) setTeams(getTeams.responseGetData.data.data);
  },[getTeams.responseGetData])

  //pedir combos creación de variables
  const getNewVariableCombos = useGetData('players/getCombosValues');
  useEffect (() => {
    if (getNewVariableCombos.responseGetData) {
      // console.log(getNewVariableCombos.responseGetData.data.data);
      setVariableCombos(getNewVariableCombos.responseGetData.data.data);
    }
  },[getNewVariableCombos.responseGetData])

  //añadir una nueva expresion completa a la variable
  const handleAddNewVariableExpression = (number) => {
   setVariableExpressions([...variableExpressions, {id_ExprComb:number, id_expresion:'',id_expresion_operador:'',id_expresion_valor:'',condiciones:[{id_condicion:'',id_condicion_operador:'',id_condicion_tipo:'',id_condicion_valor:''}]}]) 
  }

  //manejar cambios en los campos de la expresion
  const handleChangesOnNewVariableExpression = (event, index) => {
    let {name, value} = event.target;
    let onChangeValue = [...variableExpressions];
    onChangeValue[index][name] = value;
    setVariableExpressions(onChangeValue);
  }

  const handleDeleteNewVariableExpression = (index) => {
    const newExpressionsArray = [...variableExpressions];
    newExpressionsArray.splice(index,1);
    setVariableExpressions(newExpressionsArray);
  }

  useEffect(()=>{
    console.log('variableExpressions', variableExpressions);
  },[variableExpressions]);
  

  //añadir nueva condicion al crear variable
  const handleAddNewCond = (indexExpr,indexNewCond) => {
    let onChangeValue = [...variableExpressions];
    onChangeValue[indexExpr]["condiciones"][indexNewCond] = {id_condicion:'',id_condicion_operador:'',id_condicion_tipo:'',id_condicion_valor:''};
    setVariableExpressions(onChangeValue);
  }

  //manejar cambios en los campos de la condicion
  // const handleChangesOnNewVariableCondition = (event, index) => {
  //   let {name, value} = event.target;
  //   let onChangeValue = [...variableConditions];
  //   onChangeValue[index][name] = value;
  //   setVariableConditions(onChangeValue);
  // }

  //borrar una nueva condicion al crear variable
  const handleDeleteNewCond = (indexExpr, indexCond) => {
    let newExpressionsArray = [...variableExpressions];
    let newConditionsArray = [...newExpressionsArray[indexExpr].condiciones]
    newExpressionsArray[indexExpr].condiciones = [];
    newConditionsArray.splice(indexCond, 1);
    newExpressionsArray[indexExpr]["condiciones"] = newConditionsArray;    
    setVariableExpressions(newExpressionsArray);
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
          type='text'
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
                  <option key={item.id_condVal} value={item.id_condVal}>{item.value}</option>
                );
            })}
          </SelectIconShorter>  
        </>  
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
          {variableExpressions.map((item,index) => {
            const ExprComb = item.id_ExprComb;          
            return (
              <div key={ExprComb} className='cm-u-spacer-mb-bigger'>
                <FormSimplePanelRow>
                  <LabelSelectShorterElement
                    htmlFor='id_expresion'
                    labelText='Expresión'
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
                    <option value='='>Igual a</option>
                    <option value='<'>Menor qué</option>
                    <option value='>'>Mayor qué</option>
                  </SelectIconShorter>
                  <LabelElement
                    htmlFor='id_expresion_valor'
                    placeholder='introduce valor'
                    type='text'
                    className='cm-c-form-simple'
                    value={item.id_expresion_valor}
                    handleOnChange={(event) => {
                      handleChangesOnNewVariableExpression(event,index)
                    }} /> 
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
                { variableExpressions[index].condiciones.map((item, index2) => {
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
                            console.log(onChangeValue);
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
                            console.log(onChangeValue);
                            setVariableExpressions(onChangeValue);                            
                          }}
                          >
                            <option value=''>Operador</option>
                            <option value='='>Igual a</option>
                            <option value='<'>Menor qué</option>
                            <option value='>'>Mayor qué</option>
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
                })}
                </div>
            );
          })}
          <FormSimplePanelRow>
            <LabelSelectElement
              htmlFor='idCompetition'
              labelText='Competición'>
              <option value=''>Selecciona</option>
              { variableCombos.competition?.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>{item.value}</option>
                    );
                })}
            </LabelSelectElement>
          </FormSimplePanelRow>
          <FormSimplePanelRow>
            <LabelSelectElement
              htmlFor='idStage'
              labelText='Fase'>
              <option value=''>Selecciona</option>
              { variableCombos.stage?.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>{item.value}</option>
                    );
                })}
            </LabelSelectElement>
          </FormSimplePanelRow>
          <FormSimplePanelRow>
            <LabelElementAssist
              htmlFor='variableAmount'
              placeholder='introduce valor'
              type='text'
              className='panel-field-long'>
                Importe
              </LabelElementAssist> 
          </FormSimplePanelRow>
          <FormSimplePanelRow>
            <LabelSelectElement
              htmlFor='variableType'
              labelText='Tipo variable'>
                <option value=''>Selecciona</option>
                <option value='1'>Variable 1</option>
                <option value='2'>Variable 2</option>
              </LabelSelectElement> 
          </FormSimplePanelRow>
          <FormSimplePanelRow>
            <LabelSelectElement
              htmlFor='variableBeneficiary'
              labelText='Beneficiario'>
                <option value=''>Selecciona</option>
                <option value='1'>Beneficiario 1</option>
                <option value='2'>Beneficiario 2</option>
              </LabelSelectElement> 
          </FormSimplePanelRow>
          <FormSimplePanelRow>
            <LabelSelectElement
              htmlFor='idSeason'
              labelText='Temporada'>
              <option value=''>Selecciona</option>
              { variableCombos.season?.map((item,index) => {
                    return (
                      <option key={item.id} value={item.id}>{item.value}</option>
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
                setVariableExpressions([{id_ExprComb:1,id_expresion:'',id_expresion_operador:'',id_expresion_valor:'',condiciones:[{id_condicion:'',id_condicion_operador:'',id_condicion_tipo:'',id_condicion_valor:''}]}]); 
              }}
              >Cancelar</ButtonMouseGhost>
          </FormSimplePanelRow>
        </SimpleAccordionContent>
        </>
      );     
    }
  }

  //guardar una nueva variable
  const handleSaveNewVariable = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const amortizableVal = document.getElementById('amortizable').checked;


    const expresiones = variableExpressions;

    const data = {
      expresiones,
      id_competicion: formData.get('idCompetition'),
      id_fase: formData.get('idStage'),
      id_temporada: formData.get('idSeason'),
      fecha_desde: formData.get('dateSince'),
      fecha_hasta: formData.get('dateTo'),
      amortizable: amortizableVal ? 1 : 0,
      importe: formData.get('variableAmount'),
      id_tipo_variable: formData.get('variableType'),
      id_beneficiario: formData.get('variableBeneficiary'),
    }

    // console.log(data);
    setSavedVariables([...savedVariables, data]);
    setShowNewVariableLayer(false);
    setVariableExpressions([{id_ExprComb:1,id_expresion:'',id_expresion_operador:'',id_expresion_valor:'',condiciones:[{id_condicion:'',id_condicion_operador:'',id_condicion_tipo:'',id_condicion_valor:''}]}]);   
  }

  useEffect(()=> {
    console.log(savedVariables);
  },[savedVariables])
 

  //render acordeon upload docs
  const renderUploadDocsLayer = () => {
    if (showUploadDoc === true) {
      return (
        <SimpleAccordionContent
          id='docUploadContent'>
            <header className="cm-l-body-static-header--inTab" style={{marginTop:'0'}}>
                <p className="cm-u-text-black-cat">Añadir documento</p>
            </header>
            <FormSimplePanelRow>
              <LabelElementAssist
                htmlFor='documentDescription'
                type='text'
                className='panel-field-long'
                autoComplete='off'
                placeholder='Descripcion'
                >
                Descripción
              </LabelElementAssist>
            </FormSimplePanelRow>
            <FormSimplePanelRow>
              <FileDrop
                htmlFor='addFileInput'
                placeholder={context.fileNewPlayerUploaded ? context.fileNewPlayerUploaded : 'Seleccionar o arrastrar'} >
                  Archivo
              </FileDrop>
            </FormSimplePanelRow>
            <FormSimplePanelRow
              className='cm-u-centerText'>
              <ButtonMousePrimary
                onClick={handleFile}
                >Guardar</ButtonMousePrimary>
              <ButtonMouseGhost
                onClick={() => setShowUploadDoc(false)}
                >Cancelar</ButtonMouseGhost>
            </FormSimplePanelRow>
        </SimpleAccordionContent>
      );
    }
  }

  const handleFile = (e) => {
    e.preventDefault();
    const desc = document.getElementById('documentDescription').value;
    setUploadedFiles([...uploadedFiles, { desc_documento: desc, documento: context.fileNewPlayerUploaded }])
    context.setFileNewPlayerUploaded(null);
    setShowUploadDoc(false);
  }

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);

    const playerComunitarioVal = document.getElementById('playerComunitario').checked;
    const playerResidenciaVal = document.getElementById('playerResidencia').checked;
    const savedVariablesInState = savedVariables;

    const data = {
      id_intermediario: formData.get('playerIntermediary'),
      id_posicion: formData.get('playerPosition'),
      id_club_origen: formData.get('playerTeamOrigin'),
      id_contrato: formData.get('playerContract'),
      nombre: formData.get('playerName'),
      apellido1: formData.get('playerLastname1'),
      apellido2: formData.get('playerLastname2'),
      alias: formData.get('playerAlias'),
      desc_dorsal: formData.get('playerDorsal'),
      nacionalidad1: formData.get('playerNationality1'),
      nacionalidad2: formData.get('playerNationality2'),
      fch_nacimiento: formData.get('playerBornDate'),
      dni_nie: formData.get('playerDNI'),
      pasaporte1: formData.get('playerPassport1Nr'),
      pasaporte2: formData.get('playerPassport2Nr'),
      nss: formData.get('playerNSS'),
      caducidad_pasaporte1: formData.get('playerPassport1Date'),
      caducidad_pasaporte2: formData.get('playerPassport2Date'),
      caducidad_dni: formData.get('playerDNIdate'),
      residencia: playerResidenciaVal ? 1 : 0,
      comunitario: playerComunitarioVal ? 1 : 0,
      peso: formData.get('playerWeight'),
      altura: formData.get('playerHeight'),
      valor_mercado: formData.get('playerMarketValue'),
      savedVariables: savedVariablesInState,
      documentos: uploadedFiles 
    }

    const dataSent = {
      'id_intermediario': data.id_intermediario,
      'id_posicion': data.id_posicion,
      'id_club_origen': data.id_club_origen,
      'id_contrato': data.id_contrato,
      'nombre': data.nombre,
      'apellido1': data.apellido1,
      'apellido2': data.apellido2,
      'alias': data.alias,
      'desc_dorsal': data.desc_dorsal,
      'nacionalidad1': data.nacionalidad1,
      'nacionalidad2': data.nacionalidad2,
      'fch_nacimiento': data.fch_nacimiento,
      'dni_nie': data.dni_nie,
      'pasaporte1': data.pasaporte1,
      'pasaporte2': data.pasaporte2,
      'nss': data.nss,
      'caducidad_pasaporte1': data.caducidad_pasaporte1,
      'caducidad_pasaporte2': data.caducidad_pasaporte2,
      'caducidad_dni': data.caducidad_dni,
      'residencia': data.residencia.toString(),
      'comunitario': data.comunitario.toString(),
      'peso': data.peso,
      'altura': data.altura,
      'valor_mercado': data.valor_mercado,
      'variables':data.savedVariables,
      'documentos': data.documentos,
    }
    

    uploadData('players/create',dataSent);
  }

  //mirar la respuesta de subir datos para setear error
  useEffect(()=> {
    if (responseUpload) {
      console.log(responseUpload);
      if (responseUpload.status === 409) { setError('El usuario que estás intentnado crear ya existe')
      } else if (responseUpload.code === 'ERR_NETWORK') { setError('Error de conexión, inténtelo más tarde')
      } else if (responseUpload.status === 'ok') { navigate('/manage-players');
      } else {
        setError('Existe un error en el formulario, inténtelo de nuevo')
      }
    }
  },[responseUpload])

  return (
    <>
      <HalfContainer  id='usersList'>
        <HalfContainerAside>
          <AsideMenu />
        </HalfContainerAside>
        <HalfContainerBody >
          <HeadContent>
            <HeadContentTitleBar>
              <TitleBar__TitleAvatar
                avatarText='Nuevo\nJugador'>
                Nuevo jugador
              </TitleBar__TitleAvatar>
              <TitleBar__Tools>
                <ButtonMousePrimary
                  onClick={handleSave}>
                  Guardar
                </ButtonMousePrimary>
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
                  <TabLink target='deportivo'>Deportivo</TabLink>
                  <TabLink target='contractual'>Contractual</TabLink>
                  <TabLink target='variables'>Variables</TabLink>
                  <TabLink target='documentos'>Documentos</TabLink>
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
                      <FormSimplePanelRow>
                      <LabelElementToggle
                          htmlFor='playerComunitario' >
                          Jugador comunitario
                        </LabelElementToggle>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelElementAssist
                          htmlFor='playerName'
                          type='text'
                          className='panel-field-long'
                          autoComplete='off'
                          placeholder='Nombre'
                          required='required'
                          >
                          Nombre
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelElementAssist
                          htmlFor='playerLastname1'
                          type='text'
                          className='panel-field-long'
                          autoComplete='off'
                          placeholder='Apellido'
                          required='required'
                          >
                          Apellido
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelElementAssist
                          htmlFor='playerLastname2'
                          type='text'
                          className='panel-field-long'
                          autoComplete='off'
                          placeholder='Apellido 2'
                          >
                          Apellido 2
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelElementAssist
                          htmlFor='playerAlias'
                          type='text'
                          className='panel-field-long'
                          autoComplete='off'
                          placeholder='Alias'
                          required='required'
                          >
                          Alias
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelElementAssist
                          htmlFor='playerBornDate'
                          type='date'
                          className='panel-field-long'
                          autoComplete='off'
                          placeholder='dd/mm/yyyy'
                          required='required'
                          >
                          Fecha nacimiento
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelSelectElement
                          htmlFor='playerNationality1'
                          labelText='Nacionalidad'>
                            <option value=''>Selecciona</option>
                            { countries?.map(country => {
                              return (
                                <option key={country.id_pais} value={country.id_pais}>{country.desc_nombre_pais}</option>
                              );
                            })}
                        </LabelSelectElement>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelSelectElement
                          htmlFor='playerNationality2'
                          labelText='Nacionalidad 2'>
                            <option value=''>Selecciona</option>
                            { countries?.map(country => {
                              return (
                                <option key={country.id_pais} value={country.id_pais}>{country.desc_nombre_pais}</option>
                              );
                            })}
                        </LabelSelectElement>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelElementAssist
                          htmlFor='playerNSS'
                          type='number'
                          className='panel-field-long'
                          autoComplete='off'
                          placeholder='Nº Seguridad Social'
                          >
                          Nº Seguridad Social
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelElementAssist
                          htmlFor='playerDNI'
                          type='number'
                          className='panel-field-long'
                          autoComplete='off'
                          placeholder='DNI / NIE'
                          >
                          DNI / NIE
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelElementAssist
                          htmlFor='playerDNIdate'
                          type='date'
                          className='panel-field-long'
                          autoComplete='off'
                          >
                          Caducidad DNI / NIE
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelElementAssist
                          htmlFor='playerPassport1Nr'
                          type='number'
                          className='panel-field-long'
                          autoComplete='off'
                          placeholder='Numero pasaporte'
                          >
                          Pasaporte 1
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelElementAssist
                          htmlFor='playerPassport1Date'
                          type='date'
                          className='panel-field-long'
                          autoComplete='off'
                          >
                          Caducidad pasaporte
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelElementAssist
                          htmlFor='playerPassport2Nr'
                          type='number'
                          className='panel-field-long'
                          autoComplete='off'
                          placeholder='Numero pasaporte'
                          >
                          Pasaporte 2
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelElementAssist
                          htmlFor='playerPassport2Date'
                          type='date'
                          className='panel-field-long'
                          autoComplete='off'
                          >
                          Caducidad pasaporte 2
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelElementToggle
                          htmlFor='playerResidencia' >
                          Permiso residencia
                        </LabelElementToggle>
                      </FormSimplePanelRow>
                    </TabContent>
                    <TabContent id='deportivo'>
                      <FormSimplePanelRow>
                        <LabelSelectElement
                          htmlFor='playerPosition'
                          labelText='Posicion'>
                            <option value=''>Selecciona</option>
                            { positions?.map(item => {
                              return (
                                <option key={item.id_posicion} value={item.id_posicion}>{item.desc_posicion}</option>
                              );
                            })}
                        </LabelSelectElement>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelElementAssist
                          htmlFor='playerDorsal'
                          type='number'
                          className='panel-field-long'
                          autoComplete='off'
                          placeholder='Dorsal'
                          required='required'
                          >
                          Dorsal
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelElementAssist
                          htmlFor='playerWeight'
                          type='text'
                          className='panel-field-long'
                          autoComplete='off'
                          placeholder='Peso'
                          required='required'
                          >
                          Peso
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelElementAssist
                          htmlFor='playerHeight'
                          type='text'
                          className='panel-field-long'
                          autoComplete='off'
                          placeholder='Altura'
                          required='required'
                          >
                          Altura
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelElementAssist
                          htmlFor='playerMarketValue'
                          type='number'
                          className='panel-field-long'
                          autoComplete='off'
                          placeholder='Introduce euros'
                          required='required'
                          >
                          Valoración económica mercado
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                    </TabContent>
                    <TabContent id='contractual'>
                      <FormSimplePanelRow>
                        <LabelSelectElement
                          htmlFor='playerTeamOrigin'
                          labelText='Equipo Origen'>
                            <option value=''>Selecciona</option>
                            { teams?.map(item => {
                              return (
                                <option key={item.id_club_opta} value={item.id_club_opta}>{item.desc_nombre_club}</option>
                              );
                            })}
                        </LabelSelectElement>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelSelectElement
                          htmlFor='playerContract'
                          labelText='Contract'>
                            <option value=''>Selecciona</option>
                            { contracts?.map(item => {
                              return (
                                <option key={item.id_contrato} value={item.id_contrato}>{item.desc_tipo_contrato}</option>
                              );
                            })}
                        </LabelSelectElement>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelSelectElement
                          htmlFor='playerIntermediary'
                          labelText='Intermediario'>
                            <option value=''>Selecciona</option>
                            { intermediaries?.map(item => {
                              return (
                                <option key={item.id_intermediario} value={item.id_intermediario}>{item.nombre}</option>
                              );
                            })}
                        </LabelSelectElement>
                      </FormSimplePanelRow>
                    </TabContent>
                    <TabContent id='variables'>
                       {/* Tabla Variables creadas */}
                      <TableDataWrapper
                        className='cm-u-spacer-mt-big'>
                          <TableDataHeader>
                            <TableCellLong>Variables añadidas</TableCellLong>
                            <TableCellShort></TableCellShort>
                          </TableDataHeader>
                          { savedVariables?.map((item, index) => {                            
                            return (
                              <TableDataRow key={index}>
                                <TableCellLong>{`Variable ${index+1}`}</TableCellLong>
                                <TableCellMedium
                                  className='cm-u-textRight'>
                                  {/* <IconButtonSmallerPrimary
                                      onClick={(indice) => {
                                        
                                        console.log('indice',index);
                                        console.log(savedVariables[index]);
                                        setEditingVarID(index);
                                        setShowNewVariableLayer(true);
                                      }}>
                                    <SymbolEdit />
                                  </IconButtonSmallerPrimary> */}
                                <span>&nbsp;&nbsp;</span>
                                  <IconButtonSmallerPrimary
                                    onClick={(index) => {
                                      // console.log('borro variable');
                                      const newVariablesArray = [...savedVariables];
                                      newVariablesArray.splice(index, 1);
                                      console.log(newVariablesArray);
                                      setSavedVariables(newVariablesArray);
                                    }}
                                    >
                                  <SymbolDelete />
                                </IconButtonSmallerPrimary>
                              </TableCellMedium>
                            </TableDataRow>
                            )
                          })}
                        </TableDataWrapper>
                      

                      {/* Acordeon crear variable */}
                      <SimpleAccordion>
                        <SimpleAccordionTrigger
                          className='cm-u-spacer-mb-bigger'>
                          <HeadContentTitleBar>
                            <TitleBar__Title></TitleBar__Title>
                            <TitleBar__Tools>
                              <IconButtonSmallPrimary
                                onClick={(e) => {
                                  e.preventDefault();
                                  setShowNewVariableLayer(true);
                                }} >
                                  <SymbolAdd />
                              </IconButtonSmallPrimary>
                            </TitleBar__Tools>
                          </HeadContentTitleBar>
                        </SimpleAccordionTrigger>
                        {renderNewVariableLayer()}
                      </SimpleAccordion>
                     

                    </TabContent>
                    <TabContent id='documentos'>
                      {/* Tabla documentos añadidos */}
                      <TableDataWrapper
                        className='cm-u-spacer-mt-big'>
                          <TableDataHeader>
                            <TableCellLong>Documentos añadidos</TableCellLong>
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
                        {/* Acordeon añadir documentos */}
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
                      
                      </TabContent>
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
    </>
  );
}