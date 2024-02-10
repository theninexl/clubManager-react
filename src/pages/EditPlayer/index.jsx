import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSaveData } from "../../hooks/useSaveData";
import { useGetData } from "../../hooks/useGetData";
import { AsideMenu } from "../../components/AsideMenu";
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";
import { CentralBody, HeadContent, HeadContentTitleBar, TitleBar__Title, TitleBar__TitleAvatar, TitleBar__Tools } from "../../components/UI/layout/centralContentComponents";
import { ButtonCatPrimary, ButtonCatTransparent, ButtonMouseGhost, ButtonMousePrimary, IconButtonSmallPrimary, IconButtonSmallerPrimary } from "../../components/UI/objects/buttons";
import { SymbolAdd, SymbolBack, SymbolDelete } from "../../components/UI/objects/symbols";
import { FormSimplePanel, FormSimplePanelRow, FormSimpleRow, LabelElementAssist, LabelElementToggle, LabelSelectElement, } from "../../components/UI/components/form simple/formSimple";
import { FormTabs, FormTabs__ContentWrapper, FormTabs__LinksWrapper, FormTabs__ToolBarWrapper, TabContent, TabLink } from "../../components/UI/components/formTabs/formTabs";
import { SimpleAccordion, SimpleAccordionContent,  SimpleAccordionTrigger } from "../../components/UI/components/simpleAccordion/simpleAccordion";
import { manageTabs } from "../../domUtilities/manageTabs";
import { FileDrop } from "../../components/UI/components/form simple/fileDrop";
import { TableCellLong, TableCellShort, TableDataHeader, TableDataRow, TableDataWrapper } from "../../components/UI/layout/tableData";
import { useGlobalContext } from "../../providers/globalContextProvider";
import { ModalBody, ModalContainer, ModalContent__Small, ModalFooter } from "../../components/UI/components/modal/modal";

export default function EditPlayerPage () {

  const context = useGlobalContext();

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
      'id_jugador': userParam,
      "desc_entidad": '',
      "desc_plantilla": '',
      "id_club_origen": '',
      "desc_nombre_club_origen": '',
      "desc_liga_origen": '',
      "nombre": '',
      "apellido1": '',
      "apellido2": '',
      "alias": '',
      "desc_dorsal": '',
      "nacionalidad1": '',
      "pasaporte1": '',
      "caducidad_pasaporte1": '',
      "nacionalidad2": '',
      "pasaporte2": '',
      "caducidad_pasaporte2": '',
      "dni_nie": '',
      "caducidad_dni": '',
      "residencia": '',
      "comunitario": '',
      "id_intermediario": '',
      "nombre_intermediario": '',
      "id_posicion": '',
      "desc_posicion": '',
      "peso": '',
      "altura": '',
      "imp_salario_total": '',
      "valor_mercado": '',
      "nss":'',
  });
  

  useEffect(()=>{
    manageTabs();
  },[])

  //pedir datos del jugador
  const getPlayerDetail = useGetData('players/getDetail',{'id_jugador':userParam});
  useEffect (() => {
    if (getPlayerDetail.responseGetData) {
      console.log(getPlayerDetail.responseGetData.data);
      setPlayerData(getPlayerDetail.responseGetData.data.jugador[0])
      setUploadedFiles(getPlayerDetail.responseGetData.data.documentos[0])
    }
  },[getPlayerDetail.responseGetData])    

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
    if (getTeams.responseGetData) {
      console.log(getTeams.responseGetData.data.data);
      setTeams(getTeams.responseGetData.data.data);
    }
  },[getTeams.responseGetData])

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
                onClick={handleFile}>Guardar</ButtonMousePrimary>
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

    const data = {
      id_intermediario: formData.get('playerIntermediary') || '',
      id_posicion: formData.get('playerPosition') || '',
      id_club_origen: formData.get('playerTeamOrigin') || '',
      id_contrato: formData.get('playerContract') || '',
      nombre: formData.get('playerName') || '',
      apellido1: formData.get('playerLastname1') || '',
      apellido2: formData.get('playerLastname2') || '',
      alias: formData.get('playerAlias') || '',
      desc_dorsal: formData.get('playerDorsal') || '',
      nacionalidad1: formData.get('playerNationality1') || '',
      nacionalidad2: formData.get('playerNationality2') || '',
      fch_nacimiento: formData.get('playerBornDate') || '',
      dni_nie: formData.get('playerDNI') || '',
      pasaporte1: formData.get('playerPassport1Nr') || '',
      pasaporte2: formData.get('playerPassport2Nr') || '',
      nss: formData.get('playerNSS') || '',
      caducidad_pasaporte1: formData.get('playerPassport1Date') || '',
      caducidad_pasaporte2: formData.get('playerPassport2Date') || '',
      caducidad_dni: formData.get('playerDNIdate') || '',
      residencia: playerResidenciaVal ? 1 : 0,
      comunitario: playerComunitarioVal ? 1 : 0,
      peso: formData.get('playerWeight') || '',
      altura: formData.get('playerHeight') || '',
      valor_mercado: formData.get('playerMarketValue') || '',
      documentos: uploadedFiles 
    }

    const dataSent = {
      'id_jugador':userParam.toString(),
      'id_intermediario': data.id_intermediario,
      'id_posicion': data.id_posicion,
      'id_club_origen': data.id_club_origen,
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
      'documentos': data.documentos || [],
    }
    updatePlayer.uploadData('players/edit',dataSent);

    // Api.call.post('players/edit',dataSent,{ headers:headers })
    //     .then (res => {
    //       console.log(res);
    //       // navigate('/manage-team');
    //     }).catch(err => {
    //       if (err.code === 'ERR_NETWORK') setError('Error en la base de datos, inténtelo más tarde')
    //       else setError('Error al realizar la solicitud')
    //     })
  }

  //mirar la respuesta de subir datos para setear error
  useEffect(()=> {
    if (updatePlayer.responseUpload) {
      console.log(updatePlayer.responseUpload);
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
      console.log(deletePlayer.responseUpload);
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
                <h3 className="cm-u-text-black-cat">{`¿Estas seguro de borrar a ${playerData.nombre} ${playerData.apellido1} con ID:${userParam}?`}</h3>
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
      {renderModal()}
      <HalfContainer  id='usersList'>
        <HalfContainerAside>
          <AsideMenu />
        </HalfContainerAside>
        <HalfContainerBody >
          <HeadContent>
            <HeadContentTitleBar>
              <TitleBar__TitleAvatar
                avatarText='Editar\nJugador'>
                {`${playerData.nombre} ${playerData.apellido1}`}
              </TitleBar__TitleAvatar>
              <TitleBar__Tools>
                <ButtonMousePrimary
                  onClick={handleSave}>
                  Guardar
                </ButtonMousePrimary>
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
                  <TabLink target='deportivo'>Deportivo</TabLink>
                  <TabLink target='contractual'>Contractual</TabLink>
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
                          htmlFor='playerComunitario'
                          checked={playerData.comunitario ? 'checked':''}
                          handleOnChange={e => {setPlayerData({...playerData, comunitario: e.target.checked})}}>
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
                          value={playerData.nombre}
                          handleOnChange={e => {setPlayerData({...playerData, nombre: e.target.value})}}
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
                          value={playerData.apellido1 || ''}
                          handleOnChange={e => {setPlayerData({...playerData, apellido1: e.target.value})}}
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
                          value={playerData.apellido2 || ''}
                          handleOnChange={e => {setPlayerData({...playerData, apellido2: e.target.value})}}
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
                          value={playerData.alias || ''}
                          handleOnChange={e => {setPlayerData({...playerData, alias: e.target.value})}}
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
                          format={'yyyy-mm-dd'}
                          placeholder='dd/mm/yyyy'
                          required='required'
                          value={playerData.fch_nacimiento}
                          handleOnChange={e => {setPlayerData({...playerData, fch_nacimiento: e.target.value})}}
                          >
                          Fecha nacimiento
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelSelectElement
                          htmlFor='playerNationality1'
                          labelText='Nacionalidad'
                          defaultValue={playerData.nacionalidad1 || ''}
                          handleOnChange={e => {setPlayerData({...playerData, nacionalidad1: e.target.value})}} >
                            <option value=''>Selecciona</option>
                            { countries?.map(country => {
                              const selected = playerData.nacionalidad1 == country.id_pais ? 'selected' : '';
                              return (
                                <option key={country.id_pais} value={country.desc_nombre_pais} selected={selected}>{country.desc_nombre_pais}</option>
                              );
                            })}
                        </LabelSelectElement>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelSelectElement
                          htmlFor='playerNationality2'
                          labelText='Nacionalidad 2'
                          value={playerData.nacionalidad2 || ''}
                          handleOnChange={e => {setPlayerData({...playerData, nacionalidad2: e.target.value})}} >
                            <option value=''>Selecciona</option>
                            { countries?.map(country => {
                              const selected = playerData.nacionalidad2 == country.id_pais ? 'selected' : '';
                              return (
                                <option key={country.id_pais} value={country.desc_nombre_pais} selected={selected}>{country.desc_nombre_pais}</option>
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
                          value={playerData.nss || ''}
                          handleOnChange={e => {setPlayerData({...playerData, nss: e.target.value})}} 
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
                          value={playerData.dni_nie}
                          handleOnChange={e => {setPlayerData({...playerData, dni_nie: e.target.value})}}
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
                          format={'yyyy-mm-dd'}
                          value={playerData.caducidad_dni}
                          handleOnChange={e => {setPlayerData({...playerData, caducidad_dni: e.target.value})}}
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
                          value={playerData.pasaporte1 ? playerData.pasaporte1 : ''}
                          handleOnChange={e => {setPlayerData({...playerData, pasaporte1: e.target.value})}}
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
                          format={'yyyy-mm-dd'}
                          value={playerData.caducidad_pasaporte1}
                          handleOnChange={e => {setPlayerData({...playerData, caducidad_pasaporte1: e.target.value})}}
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
                          value={playerData.pasaporte2 ? playerData.pasaporte2 : ''}
                          handleOnChange={e => {setPlayerData({...playerData, pasaporte2: e.target.value})}}
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
                          format={'yyyy-mm-dd'}
                          value={playerData.caducidad_pasaporte2 | ''}
                          handleOnChange={e => {setPlayerData({...playerData, caducidad_pasaporte2: e.target.value})}}
                          >
                          Caducidad pasaporte 2
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelElementToggle
                          htmlFor='playerResidencia'
                          checked={playerData.residencia ? 'checked':''}
                          handleOnChange={e => {setPlayerData({...playerData, residencia: e.target.checked})}}>
                          Permiso residencia
                        </LabelElementToggle>
                      </FormSimplePanelRow>
                    </TabContent>
                    <TabContent id='deportivo'>
                      <FormSimplePanelRow>
                        <LabelSelectElement
                          htmlFor='playerPosition'
                          labelText='Posicion'
                          value={playerData.id_posicion || ''}
                          handleOnChange={e => {setPlayerData({...playerData, id_posicion: e.target.value})}} >
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
                          value={playerData.desc_dorsal || ''}
                          handleOnChange={e => {setPlayerData({...playerData, desc_dorsal: e.target.value})}}
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
                          value={playerData.peso || ''}
                          handleOnChange={e => {setPlayerData({...playerData, peso: e.target.value})}}
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
                          value={playerData.altura || ''}
                          handleOnChange={e => {setPlayerData({...playerData, altura: e.target.value})}}
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
                          value={playerData.valor_mercado || ''}
                          handleOnChange={e => {setPlayerData({...playerData, valor_mercado: e.target.value})}}
                          >
                          Valoración económica mercado
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                    </TabContent>
                    <TabContent id='contractual'>
                      <FormSimplePanelRow>
                        <LabelSelectElement
                          htmlFor='playerTeamOrigin'
                          labelText='Equipo Origen'
                          value={playerData.id_club_origen || ''}
                          handleOnChange={e => {setPlayerData({...playerData, id_club: e.target.value})}}>
                            <option value=''>Selecciona</option>                            
                            { teams?.map(item => {
                              const selected = playerData.id_club_origen == item.id_club_opta ? 'selected' : '';
                              return (
                                <option key={item.id_club_opta} value={item.id_club_opta} selected={selected}>{item.desc_nombre_club}</option>
                              );
                            })}
                        </LabelSelectElement>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelElementAssist
                          htmlFor='playerEntidad'
                          type='text'
                          className='panel-field-long'
                          autoComplete='off'
                          placeholder='entidad'
                          required='required'
                          readOnly='readonly'
                          value={playerData.desc_entidad || ''}
                          handleOnChange={e => {setPlayerData({...playerData, desc_entidad: e.target.value})}}
                          >
                          Entidad
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelElementAssist
                          htmlFor='playerPlantilla'
                          type='text'
                          className='panel-field-long'
                          autoComplete='off'
                          placeholder='plantilla'
                          required='required'
                          readOnly='readonly'
                          value={playerData.desc_plantilla || ''}
                          handleOnChange={e => {setPlayerData({...playerData, desc_plantilla: e.target.value})}}
                          >
                          Plantilla
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelElementAssist
                          htmlFor='playerPlantilla'
                          type='text'
                          className='panel-field-long'
                          autoComplete='off'
                          placeholder='salario'
                          required='required'
                          readOnly='readonly'
                          value={playerData.imp_salario_total || ''}
                          handleOnChange={e => {setPlayerData({...playerData, imp_salario_total: e.target.value})}}
                          >
                          Salario total
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelSelectElement
                          htmlFor='playerIntermediary'
                          labelText='Intermediario'
                          value={playerData.id_intermediario || ''}
                          handleOnChange={e => {setPlayerData({...playerData, id_intermediario: e.target.value})}}>
                            <option value=''>Selecciona</option>
                            { intermediaries?.map(item => {
                              return (
                                <option key={item.id_intermediario} value={item.id_intermediario}>{item.nombre}</option>
                              );
                            })}
                        </LabelSelectElement>
                      </FormSimplePanelRow>
                    </TabContent>
                    <TabContent id='documentos'>
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