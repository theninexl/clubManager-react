import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../providers/globalContextProvider";
import { useGetData } from "../../hooks/useGetData";
import { useSaveData } from "../../hooks/useSaveData";
import { AsideMenu } from "../../components/AsideMenu";
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";
import { CentralBody, HeadContent, HeadContentTitleBar, TitleBar__TitleAvatar, TitleBar__Tools } from "../../components/UI/layout/centralContentComponents";
import { ButtonMouseGhost, ButtonMousePrimary, IconButtonSmallPrimary } from "../../components/UI/objects/buttons";
import { SymbolBack } from "../../components/UI/objects/symbols";
import { FormSimplePanel, FormSimplePanelRow, FormSimpleRow, LabelElementAssist, LabelElementNumberAssist, LabelElementToggle, LabelSelectElement, } from "../../components/UI/components/form simple/formSimple";
import { FormTabs, FormTabs__ContentWrapper, FormTabs__LinksWrapper, FormTabs__ToolBarWrapper, TabContent, TabLink } from "../../components/UI/components/formTabs/formTabs";


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


  //estados playerDetails
  const [optaPlayersList, setOptaPlayersList] = useState(null);
  const [optaSelectedPlayer, setOptaSelectedPlayer] = useState('');
  const [optaResultsBox, setOptaResultsBox] = useState(false);
  const [countries, setCountries] = useState(null);
  const [positions, setPositions] = useState(null);
  const [playerTypes, setPlayerTypes] = useState(null);
  const [createdPlayerName, setCreatedPlayerName] = useState(null);
  const [createPlayerError, setCreatePlayerError] = useState(null);

  //pedir paises, tipos, posiciones, contratos, intermediarios y equipos
  const getCountries = useGetData('masters/getAllCountry');
  useEffect (() => {
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
    const playerCotonuVal = document.getElementById('playerCotonu').checked;


    const data = {
      // id_opta:formData.get('playerId'),
      id_equipo: context.activeEntity,
      flag_comunitario: playerComunitarioVal ? 1 : 0,
      desc_nombre: formData.get('playerName'),
      desc_apellido1: formData.get('playerLastname1'),
      desc_apellido2: formData.get('playerLastname2'),
      desc_alias: formData.get('playerAlias'),
      id_tipo_jugador: formData.get('playerType'),
      dt_nacimiento: formData.get('playerBornDate'),
      id_nacionalidad1: formData.get('playerNationality1'),
      id_nacionalidad2: formData.get('playerNationality2'),
      desc_nss: formData.get('playerNSS'),
      desc_dni_nie: formData.get('playerDNI'),
      dt_caducidad_dni: formData.get('playerDNIdate'),
      desc_pasaporte1: formData.get('playerPassport1Nr'),
      dt_caducidad_pasaporte1: formData.get('playerPassport1Date'),
      desc_pasaporte2: formData.get('playerPassport2Nr'),
      dt_caducidad_pasaporte2: formData.get('playerPassport2Date'),
      flag_residencia: playerResidenciaVal ? 1 : 0,      
      id_posicion: formData.get('playerPosition'),
      valor_mercado: formData.get('playerMarketValue'),
      flag_cotonu: playerCotonuVal ? 1 : 0,   
    }

    const dataSent = {
      'id_equipo': data.id_equipo,
      'flag_comunitario': data.flag_comunitario,
      'desc_nombre': data.desc_nombre,
      'desc_apellido1': data.desc_apellido1,
      'desc_apellido2': data.desc_apellido2,
      'desc_alias': data.desc_alias,
      'id_tipo_jugador': data.id_tipo_jugador,
      'dt_nacimiento': data.dt_nacimiento,
      'id_nacionalidad1': data.id_nacionalidad1,
      'id_nacionalidad2': data.id_nacionalidad2,
      'desc_nss': data.desc_nss,
      'desc_dni_nie': data.desc_dni_nie,
      'dt_caducidad_dni': data.dt_caducidad_dni,
      'desc_pasaporte1': data.desc_pasaporte1,
      'dt_caducidad_pasaporte1': data.dt_caducidad_pasaporte1,
      'desc_pasaporte2': data.desc_pasaporte2,
      'dt_caducidad_pasaporte2': data.dt_caducidad_pasaporte2,
      'flag_residencia': data.flag_residencia,      
      'id_posicion': data.id_posicion,
      'valor_mercado': data.valor_mercado,
      'flag_cotonu': data.flag_cotonu,
    }
    
    //console.log('dataSent',dataSent)
    
    if (data.desc_nombre === '' || data.desc_apellido1 === '') {
      setCreatePlayerError('Debe completar la información de los campos obligatorios');
    } else {
      setCreatePlayerError();
      createNewPlayer.uploadData('players/create',dataSent);
    }
  }

  //mirar la respuesta de subir datos al crear jugador para setear error
  useEffect(()=> {
    if (createNewPlayer.responseUpload) {
      // console.log(createNewPlayer.responseUpload);
      if (createNewPlayer.responseUpload.status === 409) { 
        setCreatePlayerError('El usuario que estás intentando crear ya existe')
      } else if (createNewPlayer.responseUpload.code === 'ERR_NETWORK') { 
        setCreatePlayerError('Error de conexión, inténtelo más tarde')
      } else if (createNewPlayer.responseUpload.status === 'ok') { 
        navigate('/manage-players');
        //window.scrollTo(0,0);
      } else {
        setCreatePlayerError('Existe un error en el formulario, inténtelo de nuevo')
      }
    }
  },[createNewPlayer.responseUpload])
  

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
                avatarText={`Nuevo\\nJugador`}>
                Nuevo Jugador
              </TitleBar__TitleAvatar>
              <TitleBar__Tools>
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
                  <TabLink className='active'>General</TabLink>
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
                  <TabContent>
                    <FormSimplePanelRow>
                      {/* <HiddenElement
                        htmlFor='playerId'
                        value={optaSelectedPlayer.id_jugador_opta || ''} /> */}
                      <div className='cm-c-dropdown-select'>
                        <LabelElementAssist
                          htmlFor='playerName'
                          type='text'
                          className='panel-field-long'
                          autoComplete='off'
                          placeholder='Escribe para buscar'
                          required={true}
                          assistanceText=''
                          // value={optaSelectedPlayer.desc_nombre_jugador}
                          // handleOnChange={(e)=>{
                          //   setOptaSelectedPlayer(e.target.value);
                          //   if (e.target.value.length > 2 ) {
                          //     searchPlayer(e.target.value)
                          //   } else if ((e.target.value.length <= 2 )) {
                          //     setOptaPlayersList(null);
                          //     setOptaSelectedPlayer('');
                          //     setOptaResultsBox(false);                              
                          //   }
                          // }} 
                          >
                          Nombre*
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
                        assistanceText=''
                        // value={optaSelectedPlayer.desc_apellido_1 || ''}
                        >
                        Apellido*
                      </LabelElementAssist>
                    </FormSimplePanelRow>
                    <FormSimplePanelRow>
                      <LabelElementAssist
                        htmlFor='playerLastname2'
                        type='text'
                        className='panel-field-long'
                        autoComplete='off'
                        placeholder='Segundo apellido'
                        // assistanceText='*'
                        // value={optaSelectedPlayer.desc_apellido_2 || ''}
                        >
                        Segundo apellido
                      </LabelElementAssist>
                    </FormSimplePanelRow>
                    <FormSimplePanelRow>
                      <LabelElementAssist
                        htmlFor='playerAlias'
                        type='text'
                        className='panel-field-long'
                        autoComplete='off'
                        placeholder='Nombre deportivo'
                        >
                        Nombre deportivo
                      </LabelElementAssist>
                    </FormSimplePanelRow>
                    <FormSimplePanelRow>
                      <LabelSelectElement
                        htmlFor='playerType'
                        labelText='Tipo Entidad'>
                          <option value=''>Selecciona</option>
                          { playerTypes?.map(item => {
                            return (
                              <option key={item.id_tipo_jugador} value={item.id_tipo_jugador}>{item.desc_web}</option>
                            );
                          })}
                      </LabelSelectElement>
                    </FormSimplePanelRow>
                    <FormSimplePanelRow>
                      <LabelElementAssist
                        htmlFor='playerBornDate'
                        type='date'
                        className='panel-field-long'
                        autoComplete='off'
                        placeholder='dd/mm/yyyy'
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
                              <option key={country.id_pais} value={country.id_pais}>{country.desc_pais}</option>
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
                              <option key={country.id_pais} value={country.id_pais}>{country.desc_pais}</option>
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
                      <LabelElementNumberAssist
                        htmlFor='playerMarketValue'
                        suffix={'€'}
                        className='panel-field-long'
                        placeholder='Introduce euros'
                        assistanceText=''
                      >
                        Valoración económica mercado
                      </LabelElementNumberAssist>
                    </FormSimplePanelRow>
                    <FormSimplePanelRow>
                      <LabelElementToggle
                        htmlFor='playerComunitario' >
                        Jugador comunitario
                      </LabelElementToggle>
                    </FormSimplePanelRow>
                    <FormSimplePanelRow>
                      <LabelElementToggle
                        htmlFor='playerResidencia' >
                        Permiso residencia
                      </LabelElementToggle>
                    </FormSimplePanelRow>
                    <FormSimplePanelRow>
                      <LabelElementToggle
                        htmlFor='playerCotonu' >
                        Acuerdo Samoa
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
                        Guardar
                      </ButtonMousePrimary>                          
                      <ButtonMouseGhost
                        onClick={() => {
                          navigate('/manage-players')}} >
                        Cancelar
                      </ButtonMouseGhost>
                    </FormSimplePanelRow>
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