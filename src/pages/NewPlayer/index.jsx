import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../providers/globalContextProvider";
import { useGetData } from "../../hooks/useGetData";
import { useSaveData } from "../../hooks/useSaveData";
import { AsideMenu } from "../../components/AsideMenu";
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";
import { CentralBody, HeadContent, HeadContentTitleBar, TitleBar__Title, TitleBar__TitleAvatar, TitleBar__Tools } from "../../components/UI/layout/centralContentComponents";
import { ButtonMouseDisabled, ButtonMouseGhost, ButtonMousePrimary, IconButtonSmallPrimary, IconButtonSmallSecondary, IconButtonSmallerPrimary } from "../../components/UI/objects/buttons";
import { SymbolAdd, SymbolBack, SymbolDelete, SymbolEdit } from "../../components/UI/objects/symbols";
import { FormSimplePanel, FormSimplePanelRow, FormSimpleRow, HiddenElement, LabelElement, LabelElementAssist, LabelElementToggle, LabelElementToggle2Sides, LabelElementToggle2SidesPanel, LabelSelectElement, LabelSelectElementAssist, LabelSelectShorterElement, SelectIcon, SelectIconShorter } from "../../components/UI/components/form simple/formSimple";
import { FormTabs, FormTabs__ContentWrapper, FormTabs__LinksWrapper, FormTabs__ToolBarWrapper, TabContent, TabLink } from "../../components/UI/components/formTabs/formTabs";
import { SimpleAccordion, SimpleAccordionContent, SimpleAccordionLink, SimpleAccordionTrigger } from "../../components/UI/components/simpleAccordion/simpleAccordion";
import { FileDrop } from "../../components/UI/components/form simple/fileDrop";
import { TableCellLong, TableCellMedium, TableCellShort, TableDataHeader, TableDataRow, TableDataWrapper } from "../../components/UI/layout/tableData";


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
  //tabs contenido
  const [activeTab, setActiveTab] = useState(1);
  const [createPlayerCompleted, setCreatePlayerCompleted ] = useState(false);
  const [contractsTabsActive, setContractsTabsActive] = useState(false);
  const [contractsCompleted, setContractsCompleted] = useState(false);
  const [variableTabsActive, setVariableTabsActive] = useState(false); 

  //estados playerDetails
  const [optaPlayersList, setOptaPlayersList] = useState(null);
  const [optaSelectedPlayer, setOptaSelectedPlayer] = useState('');
  const [optaResultsBox, setOptaResultsBox] = useState(false);
  const [countries, setCountries] = useState(null);
  const [positions, setPositions] = useState(null);
  // const [contracts, setContracts] = useState(null);
  const [intermediaries, setIntermediaries] = useState(null);
  const [teams, setTeams] = useState(null);
  const [createdPlayerData, setCreatedPlayerData] = useState(null);
  const [createdPlayerName, setCreatedPlayerName] = useState(null);
  const [createdPlayerId, setCreatedPlayerId] = useState(null);
  const [createPlayerError, setCreatePlayerError] = useState(null);

  //estados contratos
  const [newContract, setNewContract] = useState(false);
  //array para guardar las nuevas combinaciones de sueldo añadidas a cada contrato
  const [contractSalary, setContractSalary] = useState([{id_salario:1,flag_bruto_neto:'',fch_inicio:'',fch_fin:'',num_salario_fijo:''}]);
  //array con los contratos creados
  const [savedContracts, setSavedContracts] = useState([]);
  //error creando contratos
  const [creatingContractError, setCreatingContractError] = useState();
  //contrato activo
  const [activeContractId, setActiveContractId] = useState();
  const [activeContractData, setActiveContractData] = useState();
  const [activeContractError, setActiveContractError] = useState(false);

  //si muestro o no la capa de creacion de variable
  const [showNewVariableLayer, setShowNewVariableLayer ] = useState(false);
  //donde guardo la info de los posibles combos de cada combinacion Exprexion+Condiciones
  const [variableCombos, setVariableCombos] = useState([]);
  //array para guardar las nuevas expresiones añadidas a cada variable
  const [variableExpressions, setVariableExpressions] = useState([{id_ExprComb:1,id_expresion_bonusprima:'',id_expresion_concatenacion:'',id_expresion:'',id_expresion_operador:'',id_expresion_valor:'', operador:'',condiciones:[{id_condicion:'',id_condicion_operador:'',id_condicion_tipo:'',id_condicion_valor:''}]}]);
  //array con las variables creades
  const [savedVariables, setSavedVariables] = useState([]);
  //guardar resultados search expressions
  const [searchExpSelected, setSearchExpSelected] = useState(null);
  const [searchExpResults, setSearchExpResults] = useState(null);
  const [showSearchExpResults, setShowSearchExpResults] = useState(false);
  //guardar resultados search conditions
  const [searchCondSelected, setSearchCondSelected] = useState(null);
  const [searchCondResults, setSearchCondResults] = useState(null);
  const [showSearchCondResults, setShowSearchCondResults] = useState(false);


  //si muestro o no la capa de creacion de nuevo documento
  const [showUploadDoc, setShowUploadDoc ] = useState(false);
  //los archivos guardados
  const [uploadedFiles, setUploadedFiles ] = useState([]);

  //pedir paises, posiciones, contratos, intermediarios y equipos
  const getCountries = useGetData('masters/getAllCountry');
  useEffect (() => {
    if (getCountries.responseGetData) setCountries(getCountries.responseGetData.data.data);
  },[getCountries.responseGetData])

  const getPositions = useGetData('masters/getAllPosition');
  useEffect (() => {
    if (getPositions.responseGetData) setPositions(getPositions.responseGetData.data.data);
  },[getPositions.responseGetData])


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
  const getNewVariableCombos = useGetData('players/getCombosValues');
  useEffect (() => {
    if (getNewVariableCombos.responseGetData) {
      // console.log(getNewVariableCombos.responseGetData.data.data);
      setVariableCombos(getNewVariableCombos.responseGetData.data.data);
      
    }
  },[getNewVariableCombos.responseGetData])

  //manageTabs manualmente
  const updateActiveTab = (id) => {
    setActiveTab(id)
  };

  //-----------------------------------------------------------------------------//
  // CREACIÓN DE JUGADOR

  //pedir datos para buscar un jugador
  const getOptaPlayer = useSaveData();
  const searchPlayer = (search) => {
    getOptaPlayer.uploadData('players/searchPlayerOpta',{'search':search})
  }
  //guardar datos busqueda jugador
  useEffect(()=> {
    if (getOptaPlayer.responseUpload) {
      console.log(getOptaPlayer.responseUpload);
      setOptaPlayersList(getOptaPlayer.responseUpload.data);
      setOptaResultsBox(true);
    }
  },[getOptaPlayer.responseUpload])

  //render caja de resultados busqueda jugador
  const renderSearchPlayerResults = () => {
    if (optaResultsBox && optaPlayersList?.length == 0) {
      return (
        <div className='cm-c-dropdown-select__results-box'><span>No hay resultados</span></div>
      );
    } else if (optaResultsBox && optaPlayersList?.length > 0) {
      return (
        <div className='cm-c-dropdown-select__results-box'>
          {
            optaPlayersList.map(item => {
              return (
                <span
                  className='result'
                  key={item.id_jugador_opta}
                  onClick={e => {
                    e.preventDefault();
                    setOptaSelectedPlayer(item);
                    setOptaResultsBox(false);
                  }}  >
                    {item.desc_nombre_jugador} {item.desc_apellido_jugador}
                </span>
              );
            })
          }
        </div>
      );
    }
  }

  //handle Save jugador y habilitar la pestaña contractual si no hay fallo.
  const createNewPlayer = useSaveData();

  const handleSavePlayer = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);

    const playerComunitarioVal = document.getElementById('playerComunitario').checked;
    const playerResidenciaVal = document.getElementById('playerResidencia').checked;


    const data = {
      id_opta:formData.get('playerId'),
      desc_nombre: formData.get('playerName'),
      desc_apellido1: formData.get('playerLastname1'),
      //apellido2: formData.get('playerLastname2'),
      desc_alias: formData.get('playerAlias'),
      fch_nacimiento: formData.get('playerBornDate'),
      flag_residencia: playerResidenciaVal ? 1 : 0,
      flag_comunitario: playerComunitarioVal ? 1 : 0,
      id_nacionalidad1: formData.get('playerNationality1'),
      desc_pasaporte1: formData.get('playerPassport1Nr'),
      fch_caducidad_pasaporte1: formData.get('playerPassport1Date'),
      id_nacionalidad2: formData.get('playerNationality2'),
      desc_pasaporte2: formData.get('playerPassport2Nr'),
      fch_caducidad_pasaporte2: formData.get('playerPassport2Date'),
      desc_dni_nie: formData.get('playerDNI'),
      fch_caducidad_dni: formData.get('playerDNIdate'),
      desc_nss: formData.get('playerNSS'),
      desc_dorsal: formData.get('playerDorsal'),
      id_posicion: formData.get('playerPosition'),
      //id_intermediario: '',
      //id_club_origen: formData.get('playerTeamOrigin'),
      valor_mercado: formData.get('playerMarketValue'),
      //fecha_fin_contrato: formData.get('playerContractEndDate'),
      //cotonu: formData.get('playerCotonu'),     
    }

    const dataSent = {
      'id_opta':data.id_opta,
      'desc_nombre': '',
      'desc_apellido1': '',
      'desc_alias': data.desc_alias,
      'fch_nacimiento': data.fch_nacimiento,
      'flag_residencia': data.flag_residencia.toString(),
      'flag_comunitario': data.flag_comunitario.toString(),
      'id_nacionalidad1': data.id_nacionalidad1,
      'desc_pasaporte1': data.desc_pasaporte1,
      'fch_caducidad_pasaporte1': data.fch_caducidad_pasaporte1,
      'id_nacionalidad2': data.id_nacionalidad2,
      'desc_pasaporte2': data.desc_pasaporte2,
      'fch_caducidad_pasaporte2': data.fch_caducidad_pasaporte2,
      'desc_dni_nie': data.desc_dni_nie,
      'fch_caducidad_dni': data.fch_caducidad_dni,
      'desc_nss': data.desc_nss,
      'desc_dorsal': data.desc_dorsal,
      'id_posicion': data.id_posicion,
      // 'id_intermediario': '',
      // 'id_club_origen': data.id_club_origen,
      'valor_mercado': data.valor_mercado,
      // 'fecha_fin_contrato': data.fecha_fin_contrato,
      // 'cotonu', data.cotonu,
    }

    if (data.desc_nombre === '') {
      setCreatePlayerError('Tienes que rellenar los campos mínimos obligatorios');
    } else {
      dataSent['desc_nombre'] = data.desc_nombre;
      if (data.desc_apellido1=== '') {
        setCreatePlayerError('Tienes que rellenar los campos mínimos obligatorios');
      } else {       
        dataSent['desc_apellido1'] = data.desc_apellido1;    
        console.log('jugador que creooooo', dataSent);    
        saveUpdatePlayer(dataSent);
      }
    }    
  }

  const saveUpdatePlayer = (data) => {

    if (!createPlayerCompleted) {
        setCreatedPlayerData(data);
        createNewPlayer.uploadData('players/create',data);
    } else {
      if (data['id_jugador'] === '') {
        data['id_jugador'] = createdPlayerId.toString();
      }
      setCreatedPlayerData(data);
      console.log('dataSent',data);
      createNewPlayer.uploadData('players/edit',data);
    }
  }

  //mirar la respuesta de subir datos al crear jugador para setear error
  useEffect(()=> {
    if (createNewPlayer.responseUpload) {
      console.log(createNewPlayer.responseUpload);
      if (createNewPlayer.responseUpload.status === 409) { 
        setCreatePlayerCompleted(false);
        setCreatedPlayerData(null);
        setCreatePlayerError('El usuario que estás intentando crear ya existe')
      } else if (createNewPlayer.responseUpload.code === 'ERR_NETWORK') { 
        setCreatePlayerCompleted(false);
        setCreatedPlayerData(null);
        setCreatePlayerError('Error de conexión, inténtelo más tarde')
      } else if (createNewPlayer.responseUpload.status === 'ok') { 
        if (!createdPlayerId) setCreatedPlayerId(createNewPlayer.responseUpload.id_jugador);
        window.scrollTo(0,0);
        setCreatePlayerCompleted(true)
        setCreatedPlayerName({'nombre':createdPlayerData.desc_nombre ,'apellido1':createdPlayerData.desc_apellido1})
        setContractsTabsActive(true);
        updateActiveTab(2);
        setContractsCompleted(true);
      } else {
        setCreatePlayerCompleted(false);
        setCreatedPlayerData(null);
        setCreatePlayerError('Existe un error en el formulario, inténtelo de nuevo')
      }
    }
  },[createNewPlayer.responseUpload])


  //-----------------------------------------------------------------------------//
  //form creacion nuevo contrato

  const contractTypes = [
    { desc_tipo_contrato: 'Laboral', id: 1 },
    { desc_tipo_contrato: 'Transfer. permanente', id: 2 },
    { desc_tipo_contrato: 'Transfer. temporal', id: 3 },
    { desc_tipo_contrato: 'Intermediación', id: 3 },
    { desc_tipo_contrato: 'Liquidación', id: 4 },
  ]

  const procedureTypes = [
    { desc_tipo_procedimiento: 'Alta traspaso', id: 1 },
    { desc_tipo_procedimiento: 'Alta cesión', id: 2 },
    { desc_tipo_procedimiento: 'Alta libre', id: 3 },
    { desc_tipo_procedimiento: 'Baja traspaso', id: 4 },
    { desc_tipo_procedimiento: 'Baja cesión', id: 5 },
    { desc_tipo_procedimiento: 'Baja rescisión', id: 6 },
    { desc_tipo_procedimiento: 'Pago cláusula', id: 7 },
  ]

  //añadir una nueva linea de salario
  const handleAddNewSalary = (number) => {
    setContractSalary([...contractSalary, {id_salario:number,flag_bruto_neto:'',fch_inicio:'',fch_fin:'',num_salario_fijo:''}]) 
   }
  
   //borrar linea de salario
   const handleDeleteNewSalary = (index) => {
    const newSalariesArray = [...contractSalary];
    newSalariesArray.splice(index,1);
    setContractSalary(newSalariesArray);
  }
  
  //manejar cambios en los campos de la linea de salario
  const handleChangesOnNewSalary = (event, index) => {
    let {name, value} = event.target;
    let onChangeValue = [...contractSalary];
    onChangeValue[index][name] = value;
    setContractSalary(onChangeValue);
  }

  const handleChangesOnNewSalaryIfToggle = (event, index) => {
    let {name, checked} = event.target;
    let onChangeValue = [...contractSalary];
    onChangeValue[index][name] = checked ? 1 : 0;
    setContractSalary(onChangeValue);
  }

  //guardar un nuevo contrato
  const saveNewContract = useSaveData();

  const handleAddNewContract = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);

    const salarios = contractSalary;

    const data = {
      id_jugador: createdPlayerId,
      desc_tipo_contrato: formData.get('contractType'),
      desc_tipo_procedimiento: formData.get('procedureType'),
      descripcion: formData.get('contractDescription'),
      id_plantilla: context.activeEntity,
      id_club_origen: formData.get('playerTeamOrigin'),
      id_club_destino: formData.get('playerTeamDestination'),
      fch_inicio_contrato: formData.get('contractStartDate'),
      fch_inicio_contrato_real: formData.get('contractRealStartDate'),
      fch_fin_contrato: formData.get('contractEndDate'),
      imp_contrato_fijo: formData.get('amountFixedContract'),
      imp_contrato_variable: formData.get('amountVariableContract'),
      imp_salario_total: formData.get('amountFixedSalary'),
      imp_salario_variable: formData.get('amountVariableSalary'),
      pct_pago_atm: formData.get('clubPercentage'),
      imp_clausula_rescision: formData.get('terminationClause'),
      id_intermediario_1: formData.get('contractIntermediary1'),
      id_intermediario_2: formData.get('contractIntermediary2'),
      id_intermediario_3: formData.get('contractIntermediary3'),
      salario_fijo:salarios,
      // amortizable: amortizableVal ? 1 : 0,
    }

    const savedContract = {
      id_contrato: '',
    }

    if (data) {
      for (const [key, value] of Object.entries(data)) {        
        if (value == '-1' || value == '') {
          setCreatingContractError('Es necesario rellenar todos los campos');
          break;
        } else {
          savedContract[key] = value;
        } 
      }

      if (Object.keys(data).length === (Object.keys(savedContract).length - 1)) {
        console.log('contrato que guardo', data);
        saveNewContract.uploadData('players/createContract',data)
        setSavedContracts([...savedContracts, savedContract]);
        setNewContract(false);
        setContractSalary([{id_salario:1,flag_bruto_neto:'',fch_inicio:'',fch_fin:'',num_salario_fijo:''}]);
        window.scrollTo(0,0);
      }
    } 
  }

  useEffect(() => {
    if (savedContracts) {
      console.log('savedContracts', savedContracts);
    }
  },[savedContracts])

  //mirar la respuesta de subir datos al crear jugador para setear error
  useEffect(()=> {
    if (saveNewContract.responseUpload) {
      console.log(saveNewContract.responseUpload);
      if (saveNewContract.responseUpload.code === 'ERR_NETWORK') { setCreatePlayerError('Error de conexión, inténtelo más tarde')
      } else if (saveNewContract.responseUpload.status === 'ok') { 
        console.log('id_contrato', saveNewContract.responseUpload.id_contrato)
        let onSaveContract = [...savedContracts];
        const index = onSaveContract.length - 1;
        onSaveContract[index]["id_contrato"] = saveNewContract.responseUpload.id_contrato;
        setSavedContracts(onSaveContract);
      } else {
        setCreatePlayerError('Existe un error en el formulario, inténtelo de nuevo')
      }
    }
  },[saveNewContract.responseUpload])

  //asignar contrato y guardar
  const assignContract = useSaveData();

  const handleSaveContracts = (e) => {
    e.preventDefault();
    if (!activeContractId) {
      setActiveContractError('Tienes que seleccionar un contrato para poder continuar')
    } else {
      //assignContract.uploadData('players/setContract',{id_jugador:createdPlayerId.toString(), id_contrato:activeContractId.toString()});  
      //si se ha seleccionado un contrato como "activo", paso a la Tab de variables
      setActiveContractError();
      console.log('savedContracts:', savedContracts);  
      console.log('activeContractId', activeContractId);
      setVariableTabsActive(true);
      updateActiveTab(3); 
    }
  }

  useEffect(()=>{
    if (activeContractId) {
      const filteredActiveContract = savedContracts.filter((contract) => {
        return contract.id_contrato == activeContractId;
      }) 
      setActiveContractData(filteredActiveContract); 
    }
  },[activeContractId])

  useEffect(()=>{
    if (activeContractData) {
      console.log('activeContractData',activeContractData);
    }
  },[activeContractData])  

  //nueva capa contrato
  const renderNewContractLayer = () => {
    if (newContract) {
      return (
        <>
          <SimpleAccordionContent>
            <header className="cm-l-body-static-header--inTab" style={{marginTop:'0'}}>
              <p className="cm-u-text-black-cat">Añadir nuevo contrato</p>
            </header>
            <FormSimplePanelRow>
              <LabelElementAssist
                htmlFor='contractDescription'
                type='text'
                className='panel-field-long'
                autoComplete='off'
                placeholder='Descripción corta'
                required={true}
                assistanceText='Este campo es obligatorio'
                >
                Descripcion
              </LabelElementAssist>
            </FormSimplePanelRow>
            <FormSimplePanelRow>                   
              <LabelSelectElementAssist
                htmlFor='contractType'
                labelText='Tipo de contrato'
                required={true}
                assistanceText='Este campo es obligatorio'>
                  <option value=''>Selecciona</option>
                  {
                    contractTypes.map(item => {
                      return (
                        <option value={item.desc_tipo_contrato}>{item.desc_tipo_contrato}</option>
                      );
                    })
                  }
              </LabelSelectElementAssist>
            </FormSimplePanelRow>
            <FormSimplePanelRow>                   
              <LabelSelectElementAssist
                htmlFor='procedureType'
                labelText='Tipo de procedimiento'
                required={true}
                assistanceText='Este campo es obligatorio'>
                  <option value=''>Selecciona</option>
                  {
                    procedureTypes.map(item => {
                      return (
                        <option value={item.desc_tipo_procedimiento}>{item.desc_tipo_procedimiento}</option>
                      );
                    })
                  }
              </LabelSelectElementAssist>
            </FormSimplePanelRow>
            <FormSimplePanelRow>
              <LabelSelectElementAssist
                htmlFor='playerTeamOrigin'
                labelText='Club Origen'
                assistanceText='Este campo es obligatorio'
                required={true}>
                  <option value=''>Selecciona</option>
                  { teams?.map(item => {
                    return (
                      <option key={item.id_club_opta} value={item.id_club_opta}>{item.desc_nombre_club}</option>
                    );
                  })}
              </LabelSelectElementAssist>
            </FormSimplePanelRow>
            <FormSimplePanelRow>
              <LabelSelectElementAssist
                htmlFor='playerTeamDestination'
                labelText='Club Destino'
                assistanceText='Este campo es obligatorio'
                required={true}>
                  <option value=''>Selecciona</option>
                  { teams?.map(item => {
                    return (
                      <option key={item.id_club_opta} value={item.id_club_opta}>{item.desc_nombre_club}</option>
                    );
                  })}
              </LabelSelectElementAssist>
            </FormSimplePanelRow>
            <FormSimplePanelRow>
              <LabelElementAssist
                htmlFor='contractStartDate'
                type='date'
                className='panel-field-long'
                autoComplete='off'
                placeholder='dd/mm/yyyy'
                required={true}
                assistanceText='Este campo es obligatorio'
                >
                Fecha inicio contrato
              </LabelElementAssist>
            </FormSimplePanelRow>
            <FormSimplePanelRow>
              <LabelElementAssist
                htmlFor='contractRealStartDate'
                type='date'
                className='panel-field-long'
                autoComplete='off'
                placeholder='dd/mm/yyyy'
                required={true}
                assistanceText='Este campo es obligatorio'
                >
                Fecha inicio contrato real
              </LabelElementAssist>
            </FormSimplePanelRow>
            <FormSimplePanelRow>
              <LabelElementAssist
                htmlFor='contractEndDate'
                type='date'
                className='panel-field-long'
                autoComplete='off'
                placeholder='dd/mm/yyyy'
                required={true}
                assistanceText='Este campo es obligatorio'
                >
                Fecha fin contrato
              </LabelElementAssist>
            </FormSimplePanelRow>
            <FormSimplePanelRow>
              <LabelElementAssist
                htmlFor='amountFixedContract'
                type='number'
                className='panel-field-long'
                autoComplete='off'
                placeholder='Importe en €'
                required={true}
                assistanceText='Este campo es obligatorio'
                >
                Importe contrato fijo
              </LabelElementAssist>
            </FormSimplePanelRow>
            <FormSimplePanelRow>
              <LabelElementAssist
                htmlFor='amountVariableContract'
                type='number'
                className='panel-field-long'
                autoComplete='off'
                placeholder='Importe en €'
                required={true}
                assistanceText='Este campo es obligatorio'
                >
                Importe contrato variable
              </LabelElementAssist>
            </FormSimplePanelRow>
            <FormSimplePanelRow>
              <LabelElementAssist
                htmlFor='amountFixedSalary'
                type='number'
                className='panel-field-long'
                autoComplete='off'
                placeholder='Importe en €'
                required={true}
                assistanceText='Este campo es obligatorio'
                >
                Importe salario fijo
              </LabelElementAssist>
            </FormSimplePanelRow>
            <FormSimplePanelRow>
              <LabelElementAssist
                htmlFor='amountVariableSalary'
                type='number'
                className='panel-field-long'
                autoComplete='off'
                placeholder='Importe en €'
                required={true}
                assistanceText='Este campo es obligatorio'
                >
                Importe salario variable
              </LabelElementAssist>
            </FormSimplePanelRow>
            <FormSimplePanelRow>
              <LabelElementAssist
                htmlFor='clubPercentage'
                type='number'
                className='panel-field-long'
                autoComplete='off'
                placeholder='Porcentaje (%)'
                required={true}
                assistanceText='Este campo es obligatorio'
                >
                Porcentaje pago club
              </LabelElementAssist>
            </FormSimplePanelRow>
            <FormSimplePanelRow>
              <LabelElementAssist
                htmlFor='terminationClause'
                type='number'
                className='panel-field-long'
                autoComplete='off'
                placeholder='Importe en €'
                required={true}
                assistanceText='Este campo es obligatorio'
                >
                Importe cláusula rescisión
              </LabelElementAssist>
            </FormSimplePanelRow>
            <FormSimplePanelRow>
                <LabelSelectElement
                  htmlFor='contractIntermediary1'
                  labelText='Intermediario 1'
                  required={true}
                  >
                    <option value=''>Selecciona</option>
                    { intermediaries?.map(item => { ''
                      return (
                        <option key={item.id_intermediario} value={item.id_intermediario}>{item.nombre}</option>
                      );
                    })}
                </LabelSelectElement>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelSelectElement
                  htmlFor='contractIntermediary2'
                  labelText='Intermediario 2'
                  required={true}
                  >
                    <option value=''>Selecciona</option>
                    { intermediaries?.map(item => { ''
                      return (
                        <option key={item.id_intermediario} value={item.id_intermediario}>{item.nombre}</option>
                      );
                    })}
                </LabelSelectElement>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelSelectElement
                  htmlFor='contractIntermediary3'
                  labelText='Intermediario 3'
                  required={true}
                  >
                    <option value=''>Selecciona</option>
                    { intermediaries?.map(item => { ''
                      return (
                        <option key={item.id_intermediario} value={item.id_intermediario}>{item.nombre}</option>
                      );
                    })}
                </LabelSelectElement>
              </FormSimplePanelRow>
            {
              contractSalary.map((item,index) => {
                const SalaryComb = item.id_salario;  
                return (
                  <div key={item.id_salario} data-id={item.id_salario}  className='cm-u-spacer-mb-bigger'>
                    <FormSimplePanelRow >
                      <LabelElement
                        htmlFor='num_salario_fijo'
                        type='number'
                        className='panel-field-short'
                        autoComplete='off'
                        placeholder='Importe en €'
                        required={true}
                        value={item.num_salario_fijo}
                        handleOnChange={(event) => {
                          handleChangesOnNewSalary(event,index)
                        }}
                        >
                        Salario fijo
                      </LabelElement>
                      <LabelElementToggle2Sides
                        htmlFor='flag_bruto_neto'
                        titleClassNameLeft='cm-u-textRight'
                        textLeft='Bruto'
                        titleClassNameRight='cm-u-spacer-mr-medium'
                        textRight='Neto'
                        required={true}
                        checked={item.flag_bruto_neto}
                        handleOnChange={(event) => {
                          handleChangesOnNewSalaryIfToggle(event,index)
                        }} />
                      <LabelElement
                        htmlFor='fch_inicio'
                        type='date'
                        className='panel-field-flexible'
                        autoComplete='off'
                        placeholder='dd/mm/yyyy'
                        required={true}
                        value={item.fch_inicio}
                        handleOnChange={(event) => {
                          handleChangesOnNewSalary(event,index)
                        }}   >
                        Fecha inicio
                      </LabelElement>
                      <LabelElement
                        htmlFor='fch_fin'
                        type='date'
                        className='panel-field-flexible'
                        autoComplete='off'
                        placeholder='dd/mm/yyyy'
                        required={true}
                        value={item.fch_fin}
                        handleOnChange={(event) => {
                          handleChangesOnNewSalary(event,index)
                        }}   >
                        Fecha fin
                      </LabelElement>
                      {(item.id_salario !== 1) ?                   
                        <IconButtonSmallSecondary
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeleteNewSalary(index);
                          }} >
                            <SymbolDelete />
                        </IconButtonSmallSecondary>
                        : ''}
                      {index+1 == contractSalary.length ?                   
                        <IconButtonSmallSecondary
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddNewSalary(SalaryComb+1);
                          }} >
                            <SymbolAdd />
                        </IconButtonSmallSecondary>
                        : ''}
                    </FormSimplePanelRow>
                    
                  </div>
                );
              })
            }
            { creatingContractError? 
              <FormSimplePanelRow
              className='cm-u-centerText'>
                <span className='error'>{creatingContractError}</span>
              </FormSimplePanelRow>
              : ''
            }
            <FormSimplePanelRow
              className='cm-u-centerText'>
              <ButtonMousePrimary
                onClick={handleAddNewContract}
                >Guardar</ButtonMousePrimary>
              <ButtonMouseGhost
                onClick={() => {
                  setNewContract(false);
                  setContractSalary([{id_salario:1,flag_bruto_neto:'',fch_inicio:'',fch_fin:'',num_salario_fijo:''}]); 
                }}
                >Cancelar</ButtonMouseGhost>
            </FormSimplePanelRow>
          </SimpleAccordionContent>
        </>
      )
    }
  }

  useEffect(() => {
    if (variableExpressions) {
      console.log('variableExpressions',variableExpressions);
    }
  },[variableExpressions])

  //----------------------------------------------------------//
  //variables

  //añadir una nueva expresion completa a la variable
  const handleAddNewVariableExpression = (number) => {
   setVariableExpressions([...variableExpressions, {id_ExprComb:number,id_expresion_bonusprima:'',id_expresion_concatenacion:'', id_expresion:'',id_expresion_operador:'',id_expresion_valor:'',condiciones:[{id_condicion:'',id_condicion_operador:'',id_condicion_tipo:'',id_condicion_valor:''}]}]) 
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
  //borrar una variable creada
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
      console.log('resultados de busqueda',getExprSearch.responseUpload)
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
              console.log(e.target.value);
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
      console.log(getCondSearch.responseUpload)
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
              console.log(item);
              return (
                <span
                  className='result'
                  key={item.id}
                  onClick={e => {
                    e.preventDefault();
                    let onChangeValue = [...variableExpressions];
                    onChangeValue[indexExpr]["condiciones"][indexCond]["id_condicion_valor"] = item.value;
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
              console.log(e.target.value);
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
                    htmlFor='id_expresion_bonusprima'
                    checked={item.id_expresion_bonusprima === 1 ? true : ''}
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
                    <option value='='>=</option>
                    <option value='<'>&lt;</option>
                    <option value='>'>&gt;</option>
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
                { item.id_expresion_bonusprima === 1 ?
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
                                  <option value='='>=</option>
                                  <option value='<'>&lt;</option>
                                  <option value='>'>&gt;</option>
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
  const saveClausula = useSaveData();

  const handleSaveNewVariable = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const amortizableVal = document.getElementById('amortizable').checked;


    const expresiones = variableExpressions;

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
      // 'id_jugador': createdPlayerId,
      'id_contrato': activeContractId,
      'variable': data,
    }

    // console.log('variable que guardo', data);
    // console.log('variable que mando', dataSent);

    saveClausula.uploadData('players/createClausula', dataSent);
    setSavedVariables([...savedVariables, dataSent]);    
  }

  useEffect(()=>{
    if (saveClausula.responseUpload) {
      if (saveClausula.responseUpload.status === 'ok') {
        setShowNewVariableLayer(false);
        setVariableExpressions([{id_ExprComb:1,id_expresion:'',id_expresion_operador:'',id_expresion_valor:'',condiciones:[{id_condicion:'',id_condicion_operador:'',id_condicion_tipo:'',id_condicion_valor:''}]}]);   
      } else {
        setError('Existe un error en el formulario, inténtelo de nuevo')
      }
    }
  },[saveClausula.responseUpload])

  useEffect(()=> {
    console.log(savedVariables);
  },[savedVariables])
 

  //------------------------------------------------------------//
  //documentos
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
    navigate('/manage-players');
    // const formData = new FormData(form.current);


    // const savedVariablesInState = savedVariables;

    // const data = {
    //   id_jugador: createdPlayerId,
    //   variable: savedVariablesInState,
    //   // documentos: uploadedFiles 
    // }

    // const dataSent = {
    //   'id_jugador': data.id_jugador,
    //   'variable':data.savedVariables,
    //   // 'documentos': data.documentos,
    // }
    
    // console.log('dataSent',dataSent);

    // uploadData('players/create',dataSent);
  }

  //mirar la respuesta de subir datos para setear error
  // useEffect(()=> {
  //   if (responseUpload) {
  //     console.log(responseUpload);
  //     if (responseUpload.status === 409) { setError('El usuario que estás intentnado crear ya existe')
  //     } else if (responseUpload.code === 'ERR_NETWORK') { setError('Error de conexión, inténtelo más tarde')
  //     } else if (responseUpload.status === 'ok') { navigate('/manage-players');
  //     } else {
  //       setError('Existe un error en el formulario, inténtelo de nuevo')
  //     }
  //   }
  // },[responseUpload])

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
                avatarText={createdPlayerName ? `${createdPlayerName.nombre}\n${createdPlayerName.apellido1}` : 'Nuevo\nJugador'}>
                {createdPlayerName ? `${createdPlayerName.nombre}\n${createdPlayerName.apellido1}` : 'Nuevo Jugador'}
              </TitleBar__TitleAvatar>
              <TitleBar__Tools>
                { savedVariables.length >= 1 || savedContracts.length >= 1 ? 
                  <>
                    <ButtonMousePrimary
                      onClick={handleSave}>
                      Finalizar
                    </ButtonMousePrimary>
                  </>
                  : ''}
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
                  <TabLink 
                    className={activeTab === 1 ? 'active' : ''}
                    handleOnClick={()=> updateActiveTab(1)}
                    >General</TabLink>
                  {contractsTabsActive ? 
                    <TabLink 
                    className={activeTab === 2 ? 'active' : ''}
                    handleOnClick={()=> updateActiveTab(2)}
                    >Contractual</TabLink>
                    :''
                  }
                  {variableTabsActive ? 
                    <TabLink 
                    className={activeTab === 3 ? 'active' : ''} 
                    handleOnClick={()=> updateActiveTab(3)}
                    >Variables</TabLink>  
                    :''
                  }             
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
                    <TabContent className={activeTab === 1 ? '' : 'hideContent'}>
                    <FormSimplePanelRow>
                      <LabelElementToggle
                          htmlFor='playerComunitario' >
                          Jugador comunitario
                        </LabelElementToggle>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <HiddenElement
                          htmlFor='playerId'
                          value={optaSelectedPlayer.id_jugador_opta || ''} />
                        <div className='cm-c-dropdown-select'>
                          <LabelElementAssist
                            htmlFor='playerName'
                            type='text'
                            className='panel-field-long'
                            autoComplete='off'
                            placeholder='Escribe para buscar'
                            required={true}
                            assistanceText='Este campo es obligatorio'
                            value={optaSelectedPlayer.desc_nombre_jugador}
                            handleOnChange={(e)=>{
                              setOptaSelectedPlayer(e.target.value);
                              if (e.target.value.length > 2 ) {
                                searchPlayer(e.target.value)
                              } else if ((e.target.value.length <= 2 )) {
                                setOptaPlayersList(null);
                                setOptaSelectedPlayer('');
                                setOptaResultsBox(false);
                                
                              }
                            }} >
                            Nombre
                          </LabelElementAssist>
                          {renderSearchPlayerResults()}
                        </div>

                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelElementAssist
                          htmlFor='playerLastname1'
                          type='text'
                          className='panel-field-long'
                          autoComplete='off'
                          placeholder='Apellido'
                          required={true}
                          assistanceText='Este campo es obligatorio'
                          value={optaSelectedPlayer.desc_apellido_jugador || ''}
                          >
                          Apellido
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      {/* <FormSimplePanelRow>
                        <LabelElement
                          htmlFor='playerLastname2'
                          type='text'
                          className='panel-field-long'
                          autoComplete='off'
                          placeholder='Segundo apellido'
                          >
                          Apellido
                        </LabelElement>
                      </FormSimplePanelRow> */}
                      <FormSimplePanelRow>
                        <LabelElementAssist
                          htmlFor='playerAlias'
                          type='text'
                          className='panel-field-long'
                          autoComplete='off'
                          placeholder='Alias'
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
                          value={optaSelectedPlayer.fch_nacimiento || ''}
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
                          type='text'
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
                          type='text'
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
                          type='text'
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

                          >
                          Dorsal
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelElementAssist
                          htmlFor='playerMarketValue'
                          type='text'
                          className='panel-field-long'
                          autoComplete='off'
                          placeholder='Introduce euros'
                          assistanceText='€'
                          >
                          Valoración económica mercado
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelElementToggle
                          htmlFor='playerCotonu' >
                          Cotonú
                        </LabelElementToggle>
                      </FormSimplePanelRow>
                      

                      {createPlayerError &&
                        <FormSimpleRow className='cm-u-centerText'>
                          <span className='error'>{createPlayerError}</span>
                        </FormSimpleRow>
                      }
                      <FormSimplePanelRow className='cm-u-centerText'>                                              
                        <ButtonMousePrimary
                          onClick={handleSavePlayer}>
                          { !contractsCompleted ? 'Guardar y Continuar' : 'Actualizar' }
                        </ButtonMousePrimary>                          
                        <ButtonMouseGhost
                          onClick={() => {
                            navigate('/manage-players')}} >
                          Cancelar
                        </ButtonMouseGhost>
                      </FormSimplePanelRow>
                    </TabContent>   
                    { contractsTabsActive?      
                      <TabContent className={activeTab === 2 ? '' : 'hideContent'}>
                        <TableDataWrapper
                          className='cm-u-spacer-mt-big'>
                            <TableDataHeader>
                              <TableCellMedium>Descripción</TableCellMedium>
                              <TableCellMedium>Tipo de Contrato</TableCellMedium>
                              <TableCellMedium>Tipo de Procedimiento</TableCellMedium>
                              <TableCellMedium>Intermediario</TableCellMedium>
                              <TableCellMedium>Fecha Inicio - Fecha Fin</TableCellMedium>
                              <TableCellShort>Seleccionado</TableCellShort>
                              <TableCellShort></TableCellShort>
                            </TableDataHeader>

                            {savedContracts.length >= 1 ?
                             <>
                              { savedContracts?.map((item, index) => {
                                const filteredIntermediary = intermediaries.filter((intermediary) => {
                                  return intermediary.id_intermediario == item.id_intermediario;
                                })                                                
                                return (
                                  <TableDataRow key={index}>
                                    <TableCellMedium>{item.descripcion}</TableCellMedium>
                                    <TableCellMedium>{item.desc_tipo_contrato}</TableCellMedium>
                                    <TableCellMedium>{item.desc_tipo_procedimiento}</TableCellMedium>
                                    <TableCellMedium>{filteredIntermediary[0]?.nombre}</TableCellMedium>
                                    <TableCellMedium>{item.fch_inicio_contrato} - {item.fch_fin_contrato}</TableCellMedium>
                                    <TableCellShort>
                                      <input 
                                        type='radio' 
                                        name='selected'
                                        checked={activeContractId === item.id_contrato ? true : ''} 
                                        onClick={(e) => {
                                          setActiveContractId(item.id_contrato);
                                        }} />
                                    </TableCellShort>
                                    <TableCellShort></TableCellShort>
                                  </TableDataRow>
                                )
                              })}
                             </>
                             :
                             <>
                             <FormSimplePanelRow className='cm-u-centerText'>
                                <span className='warning'>No hay ningún contrato añadido</span>
                              </FormSimplePanelRow>
                             </>
                            }
                            {activeContractError ? 
                              <FormSimplePanelRow className='cm-u-centerText'>
                                <span className="error">{activeContractError}</span>
                              </FormSimplePanelRow>
                              : ''}
                            <FormSimplePanelRow className='cm-u-centerText cm-u-spacer-mt-bigger cm-u-spacer-mb-bigger'>
                              { savedContracts.length >= 1 ? 
                                
                                  <ButtonMousePrimary
                                    onClick={handleSaveContracts}>
                                    Guardar y Continuar
                                  </ButtonMousePrimary>
                                
                                :
                                
                                  <ButtonMouseDisabled
                                    >
                                    Guardar y Continuar
                                  </ButtonMouseDisabled>
                                
                              }
                              </FormSimplePanelRow>
                          </TableDataWrapper>

                            {/* Acordeon crear contrato */}
                            <SimpleAccordion>
                              <SimpleAccordionTrigger
                                className='cm-u-spacer-mb-bigger'>
                                <HeadContentTitleBar>
                                  <TitleBar__Title></TitleBar__Title>
                                  <TitleBar__Tools>
                                    <IconButtonSmallPrimary
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setNewContract(true);
                                      }} >
                                        <SymbolAdd />
                                    </IconButtonSmallPrimary>
                                  </TitleBar__Tools>
                                </HeadContentTitleBar>
                              </SimpleAccordionTrigger>
                              {renderNewContractLayer()}
                            </SimpleAccordion>

                        
                      </TabContent>
                      :''
                    }
                    {variableTabsActive ?
                      <TabContent className={activeTab === 3 ? '' : 'hideContent'}>
                        {/* Tabla Variables creadas */}
                        <TableDataWrapper
                          className='cm-u-spacer-mt-big'>
                            <TableDataHeader>
                              <TableCellLong>Contrato seleccionado</TableCellLong>
                            </TableDataHeader>
                            <TableDataRow className='cm-u-spacer-mb-bigger'>
                              <TableCellMedium>{activeContractData[0].descripcion}</TableCellMedium>
                              <TableCellMedium>{activeContractData[0].desc_tipo_contrato}</TableCellMedium>
                              <TableCellMedium>{activeContractData[0].desc_tipo_procedimiento}</TableCellMedium>
                              <TableCellMedium>{activeContractData[0].fch_inicio_contrato} - {activeContractData[0].fch_fin_contrato}</TableCellMedium>
                            </TableDataRow>
                            <TableDataHeader>
                              <TableCellLong>Variables añadidas</TableCellLong>
                              <TableCellShort></TableCellShort>
                            </TableDataHeader>
                            { savedVariables?.map((item, index) => {                            
                              return (
                                <TableDataRow key={index}>
                                  <TableCellLong>{`Variable ${item.variable?.desc_alias}`}</TableCellLong>
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
                                        // console.log(newVariablesArray);
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
                                    // console.log(variableCombos);
                                  }} >
                                    <SymbolAdd />
                                </IconButtonSmallPrimary>
                              </TitleBar__Tools>
                            </HeadContentTitleBar>
                          </SimpleAccordionTrigger>
                          {renderNewVariableLayer()}
                        </SimpleAccordion>
                      

                      </TabContent>
                      :''
                    }
                    
                    
                    {/* <TabContent id='documentos'>
                      {/* Tabla documentos añadidos */}
                      {/* <TableDataWrapper
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
                        {/* <SimpleAccordion>
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
    </>
  );
}