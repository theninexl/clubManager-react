import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/api";
import { getSimpleData } from "../../services/getData";
import { AsideMenu } from "../../components/AsideMenu";
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";
import { CentralBody, HeadContent, HeadContentTitleBar, TitleBar__Title, TitleBar__TitleAvatar, TitleBar__Tools } from "../../components/UI/layout/centralContentComponents";
import { ButtonMouseGhost, ButtonMousePrimary, IconButtonSmallPrimary, IconButtonSmallerPrimary } from "../../components/UI/objects/buttons";
import { SymbolAdd, SymbolBack, SymbolDelete } from "../../components/UI/objects/symbols";
import { FormSimplePanel, FormSimplePanelRow, FormSimpleRow, LabelElementAssist, LabelElementToggle, LabelSelectElement, SelectIcon } from "../../components/UI/components/form simple/formSimple";
import { FormTabs, FormTabs__ContentWrapper, FormTabs__LinksWrapper, FormTabs__ToolBarWrapper, TabContent, TabLink } from "../../components/UI/components/formTabs/formTabs";
import { SimpleAccordion, SimpleAccordionContent, SimpleAccordionLink, SimpleAccordionTrigger } from "../../components/UI/components/simpleAccordion/simpleAccordion";
import { manageTabs } from "../../domUtilities/manageTabs";
import { FileDrop } from "../../components/UI/components/form simple/fileDrop";
import { TableCellLong, TableCellShort, TableDataHeader, TableDataRow, TableDataWrapper } from "../../components/UI/layout/tableData";
import { useGlobalContext } from "../../providers/globalContextProvider";

export default function NewPlayerPage () {

  const context = useGlobalContext();

  //navegar
  const navigate = useNavigate();

  //guardar token peticiones
  const account = localStorage.getItem('CMAccount');
  const parsedAccount = JSON.parse(account);
  const token = parsedAccount.token;

  const headers = {
    'Content-Type': 'application/json',
    'x-access-token': token
  }

  //ref form
  const form = useRef(null);
  //leer pathname actual y manejar navegacion
  const queryParams = new URLSearchParams(window.location.search);
  const userParam = queryParams.get('user');

  // variables y estados locales
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState(null);
  const [positions, setPositions] = useState(null);
  const [contracts, setContracts] = useState(null);
  const [intermediaries, setIntermediaries] = useState(null);
  const [teams, setTeams] = useState(null);
  const [showNewVariableLayer, setShowNewVariableLayer ] = useState(false);
  const [showUploadDoc, setShowUploadDoc ] = useState(false);
  const [uploadedFiles, setUploadedFiles ] = useState([]);
  

  useEffect(()=>{
    manageTabs();
    getCountries();
    getPositions();
    getContracts();
    getIntermediaries();
    getTeams();
    
  },[])
  

  //pedir paises
  const getCountries = async () => {
    const results = await getSimpleData('masters/getAllCountry')
    .then (res=> {
      setCountries(res.data);
    }).catch(err=> {
      console.log(err);
    })
  }

  //pedir posiciones
  const getPositions = async () => {
    const results = await getSimpleData('masters/getAllPosition')
    .then (res=> {
      setPositions(res.data);
    }).catch(err=> {
      console.log(err);
    })
  }

  //pedir contratos
  const getContracts= async () => {
    const results = await getSimpleData('masters/getAllContract')
    .then (res=> {
      setContracts(res.data);
    }).catch(err=> {
      console.log(err);
    })
  }

  //pedir intermediarios
  const getIntermediaries= async () => {
    const results = await getSimpleData('intermediaries/getAll')
    .then (res=> {
      setIntermediaries(res.data);
    }).catch(err=> {
      console.log(err);
    })
  }

  //pedir equipos
  const getTeams= async () => {
    const results = await getSimpleData('teams/getAll')
    .then (res=> {
      setTeams(res.data);
    }).catch(err=> {
      console.log(err);
    })
  }

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
                >Guardar</ButtonMousePrimary>
              <ButtonMouseGhost
                onClick={() => setShowUploadDoc(false)}
                >Cancelar</ButtonMouseGhost>
            </FormSimplePanelRow>
        </SimpleAccordionContent>
      );
    }
  }

    //render acordeon upload docs
    const renderNewVariableLayer = () => {
      if (showUploadDoc === true) {
        return (
          <SimpleAccordionContent
            id='docUploadContent'>
              <header className="cm-l-body-static-header--inTab" style={{marginTop:'0'}}>
                  <p className="cm-u-text-black-cat">Añadir documento</p>
              </header>
              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='variableDescription'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='Descripcion'
                  >
                  Descripción
                </LabelElementAssist>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
              <label htmlFor="" className="">
              <span style={{display:'inline-block',width:'168px'}}>Condición</span>
                  <div className="cm-c-select-icon">
                      <select className="cm-c-select-icon__select" id="" placeholder="Condicion" name="" style={{width:'100px'}}>
                          <option value=""></option>
                          </select>
                  </div>            
              </label> 
              
                <label htmlFor="" className="">
                
                
                <div className="cm-c-select-icon">
                  <select className="cm-c-select-icon__select" id="" placeholder="Condicion" name="" style={{width:'200px'}}>
                      <option value="1">Partidos jugados</option>
                      <option value="2">Minutos jugados</option>
                      <option value="3">Goles marcados</option>
                      <option value="4">Goles asistidos</option>
                      </select>
                </div>            
              </label>
              <label htmlFor="" className="">
                <div className="cm-c-select-icon">
                  <select className="cm-c-select-icon__select" id="" placeholder="Condicion" name="" style={{width:'200px'}}>
                      <option value="1">Mayor que</option>
                      <option value="2">Igual</option>
                      <option value="3">Menor que</option>
                      </select>
                </div>            
              </label>
              <label htmlFor="" className="">
                  <input type="text" id="" name="newVariableDescription" placeholder="Add value"/>        
              </label>
              <label htmlFor="" className="">
                  <div className="cm-c-select-icon">
                      <select className="cm-c-select-icon__select" id="" placeholder="Condicion" name="" style={{width:'100px'}}>
                          <option value=""></option>
                          </select>
                  </div>            
              </label> 
              <button className="cm-o-icon-button-small--secondary" id="addBonusVariable"><span className="material-symbols-outlined">add</span></button>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
              <div className="cm-c-select-icon" style={{width:'156px',maxWidth:'156px'}}>
                <select className="cm-c-select-icon__select" id="" placeholder="Condicion" name="" >
                    <option value="1">Y</option>
                    <option value="2">O</option>
                    </select>
              </div> 
              <label htmlFor="" className="">
                  <div className="cm-c-select-icon">
                      <select className="cm-c-select-icon__select" id="" placeholder="Condicion" name="" style={{width:'100px'}}>
                          <option value=""></option>
                          </select>
                  </div>            
              </label> 
              <label htmlFor="" className="">
                  <div className="cm-c-select-icon">
                      <select className="cm-c-select-icon__select" id="" placeholder="Condicion" name="" style={{width:'200px'}}>
                          <option value="1">Partidos jugados</option>
                          <option value="2">Minutos jugados</option>
                          <option value="3">Goles marcados</option>
                          <option value="4">Goles asistidos</option>
                          </select>
                  </div>            
              </label>
              <label htmlFor="" className="">
                  <div className="cm-c-select-icon">
                      <select className="cm-c-select-icon__select" id="" placeholder="Condicion" name="" style={{width:'200px'}}>
                          <option value="1">Mayor que</option>
                          <option value="2">Igual</option>
                          <option value="3">Menor que</option>
                          </select>
                  </div>            
              </label>
              <label htmlFor="" className="">
                  <input type="text" id="" name="newVariableDescription" placeholder="Add value"/>        
              </label>
              <label htmlFor="" className="">
                  <div className="cm-c-select-icon">
                      <select className="cm-c-select-icon__select" id="" placeholder="Condicion" name="" style={{width:'100px'}}>
                          <option value=""></option>
                          </select>
                  </div>            
              </label> 
              <button className="cm-o-icon-button-small--secondary" id="addBonusVariable"><span className="material-symbols-outlined">add</span></button>
              <button className="cm-o-icon-button-small--secondary" id="addBonusVariable"><span className="material-symbols-outlined">delete</span></button>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
              <label htmlFor="" className="">
                <span style={{display:'inline-block', width:'160px'}}>Importe</span>
                <input type="text" id="" name="newVariableDescription" placeholder="Add value"/>        
              </label>
              <label htmlFor="" className="">
                <div className="cm-c-select-icon">
                    <select className="cm-c-select-icon__select" id="" placeholder="Condicion" name="" style={{width:'200px'}}>
                        <option value="">Tipo variable</option>
                        <option value="1">Variable1</option>
                        <option value="1">Variable2</option>
                        </select>
                </div>            
              </label>
              <label htmlFor="" className="">
                  <div className="cm-c-select-icon">
                    <select className="cm-c-select-icon__select" id="" placeholder="Condicion" name="" style={{width:'200px'}}>
                        <option value="">Beneficiario</option>
                        <option value="1">Jugador</option>
                        <option value="2">Intermediario</option>
                        <option value="3">Club origen</option>
                        <option value="3">Club destino</option>
                        </select>
                  </div>            
              </label>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
              <label htmlFor="" className="">
                  <span style={{display:'inline-block', width:'160px'}}>Vigencia</span>
                  <input type="date" id="" name="" placeholder="Start"/>       
              </label>
              <label htmlFor="" className="">
                  <input type="date" id="" name="" placeholder="End"/>       
              </label>
              <label htmlFor="" className="" style={{display:'flex',gap:'8px',alignItems:'center'}}>
                  <span>Amortizable</span>
                  <div className="cm-c-form-simple__radio-toggle">
                      <input type="checkbox" id="" name=""/>
                  </div>
              </label>
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
      documentos: uploadedFiles 
    }

    console.log(data);

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
      'documentos': data.documentos,
    }

    Api.call.post('players/create',dataSent,{ headers:headers })
        .then (res => {
          console.log(res);
          // navigate('/manage-team');
        }).catch(err => {
          if (err.code === 'ERR_NETWORK') setError('Error en la base de datos, inténtelo más tarde')
          else setError('Error al realizar la solicitud')
        })
  }

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
                                <option key={item.id_club} value={item.id_club}>{item.desc_nombre_club}</option>
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
                        {renderNewVariableLayer()}
                      </SimpleAccordion>
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