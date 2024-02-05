import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/api";
import { AsideMenu } from "../../components/AsideMenu";
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";
import { CentralBody, CentralBody__Header, HeadContent, HeadContentTitleBar, TitleBar__Title, TitleBar__Tools } from "../../components/UI/layout/centralContentComponents";
import { ButtonCatPrimary, ButtonCatTransparent, ButtonMousePrimary, IconButtonSmallPrimary } from "../../components/UI/objects/buttons";
import { SymbolBack, SymbolDelete } from "../../components/UI/objects/symbols";
import { FormSimplePanel, FormSimplePanelRow, FormSimpleRow, LabelElementAssist, LabelSelectElement } from "../../components/UI/components/form simple/formSimple";
import { FormTabs, FormTabs__ContentWrapper, FormTabs__LinksWrapper, TabContent, TabLink } from "../../components/UI/components/formTabs/formTabs";
import { manageTabs } from "../../domUtilities/manageTabs";
import { TablePlayers, TablePlayers__Body, TablePlayers__Header, TablePlayers__tdLong } from "../../components/UI/layout/tablePlayers";
import { ModalBody, ModalContainer, ModalContent__Small, ModalFooter } from "../../components/UI/components/modal/modal";
import { getSimpleData } from "../../services/getData";

export default function EditIntermediaryPage () {
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
  const userParam = queryParams.get('intermediary');


  // variables y estados locales
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [allLeagues, setAllLeagues] = useState();
  const [countries, setCountries] = useState(null);
  const [intermDetail, setIntermDetail] = useState({
    "desc_email": '',
    "num_telefono": '',
    "territorio": '',
    "desc_direccion": '',
    "desc_codigo_postal": '',
    "desc_cif": '',
    "nombre_contacto": '',
    "apellido1_contacto": '',
    "apellido2_contacto": '',
    "nacionalidad_contacto": '',
    "nss_contacto": '',
    "pasaporte_contacto": '',
    "dni_nie_contacto": '',
    "pct_beneficio": '',
});

  useEffect(()=>{
    console.log('userParam',userParam);
    getIntermDetail(userParam);
  },[])
  

  const renderDeleteUserBtn = () => {
    if (userParam !== 'new') {
      return (
        <IconButtonSmallPrimary
          onClick={() => setModal(true)}>
          <SymbolDelete/>
        </IconButtonSmallPrimary>
      )
    }
  }


  //pedir detalle equipo
  const getIntermDetail = async (id) => {
    const data = await Api.call.post('intermediaries/getDetail',{'id_intermediario':id},{headers:headers})
    .then(res => {
      console.log(res.data);
      const team = res.data;
      setIntermDetail(team);
      console.log(teamDetail.desc_nombre_club)
    }).catch(err => console.log(err));
  }

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);

    const data = {
      nombre_contacto: formData.get('intermName'),
      apellido1_contacto: formData.get('intermLastname1'),
      apellido2_contacto: formData.get('intermLastname2'),
      territorio: formData.get('intermTerritory'),
      pct_beneficio: formData.get('intermPct'),
      nacionalidad_contacto: formData.get('intermCountry'),
      dni_nie_contacto: formData.get('intermDni'),
      pasaporte_contacto: formData.get('intermPassport'),
      nss_contacto: formData.get('intermNss'),
      num_telefono: formData.get('intermPhone'),
      desc_email: formData.get('intermEmail'),
      desc_cif: formData.get('intermTaxNr'),
      desc_direccion: formData.get('intermAddress'),
      desc_codigo_postal: formData.get('intermPostcode'),
    }

    const dataSent = {
      id_intermediario: userParam,
      nombre_contacto: data.nombre_contacto,
      apellido1_contacto: data.apellido1_contacto,
      apellido2_contacto: data.apellido2_contacto,
      territorio: data.territorio,
      pct_beneficio: data.pct_beneficio,
      nacionalidad_contacto: data.nacionalidad_contacto,
      dni_nie_contacto: data.dni_nie_contacto,
      pasaporte_contacto: data.pasaporte_contacto,
      nss_contacto: data.nss_contacto,
      num_telefono: data.num_telefono,
      desc_email: data.desc_email,
      desc_cif: data.desc_cif,
      desc_direccion: data.desc_direccion,
      desc_codigo_postal: data.desc_codigo_postal,
  }

  console.log(dataSent);

  Api.call.post('intermediaries/edit',dataSent,{ headers:headers })
  .then (res => {
    navigate('/manage-intermediaries');
  }).catch(err => {
    if (err.code === 'ERR_NETWORK') setError('Error en la base de datos, inténtelo más tarde')
    else setError('Error al realizar la solicitud')
  })
  }

  const handleIntermDelete = () => {
    
    Api.call.post('intermediaries/remove',{id_intermediario:userParam},{ headers:headers })
      .then (res => {
        setModal(false);
        navigate('/manage-intermediaries');
      }).catch(err => {
        if (err.code === 'ERR_NETWORK') setError('Error en la base de datos, inténtelo más tarde')
        else setError('Error al realizar la solicitud')
      })    
  }

  const renderModal = () => {
    if (modal) {
      return (
        <ModalContainer>
          <ModalContent__Small>
            <ModalBody
              className='cm-u-spacer-mb-bigger'>
                <h3 class="cm-u-text-black-cat">¿Estas seguro?</h3>
              </ModalBody>
            <ModalFooter>
              <ButtonCatTransparent
                onClick={() => setModal(false)}>
                  Cancelar
              </ButtonCatTransparent>
              <ButtonCatPrimary
                onClick={handleIntermDelete}>
                Borrar Intermediario
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
        <HalfContainerBody className='cm-u-spacer-mt-medium'>
          <HeadContent>
            <HeadContentTitleBar>
              <TitleBar__Title>
                Editar Intermediario
              </TitleBar__Title>
              <TitleBar__Tools>
                <ButtonMousePrimary
                  onClick={handleSave}>
                  Guardar
                </ButtonMousePrimary>
                {renderDeleteUserBtn()}
                <IconButtonSmallPrimary
                  onClick={() => {
                    navigate('/manage-intermediaries')}}>
                  <SymbolBack />
                </IconButtonSmallPrimary>
              </TitleBar__Tools>
            </HeadContentTitleBar>
          </HeadContent>

          <CentralBody>
          <CentralBody__Header>General</CentralBody__Header>
            <FormSimplePanel
              innerRef={form}
              autoComplete='off'>
              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='intermName'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='Nombre'
                  required='required'
                  value={intermDetail.nombre_contacto}
                  handleOnChange={e => {setIntermDetail({...intermDetail, nombre_contacto: e.target.value})}} >
                  Nombre
                </LabelElementAssist>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='intermLastname1'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='Apellido'
                  required='required'
                  value={intermDetail.apellido1_contacto}
                  handleOnChange={e => {setIntermDetail({...intermDetail, apellido1_contacto: e.target.value})}} >
                  Apellido 1
                </LabelElementAssist>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='intermLastname2'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='Apellido'
                  required='required'
                  value={intermDetail.apellido2_contacto}
                  handleOnChange={e => {setIntermDetail({...intermDetail, apellido2_contacto: e.target.value})}} >
                  Apellido 2
                </LabelElementAssist>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='intermTerritory'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='Territorio'
                  required='required'
                  value={intermDetail.territorio}
                  handleOnChange={e => {setIntermDetail({...intermDetail, territorio: e.target.value})}} >
                  Territorio
                </LabelElementAssist>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='intermPct'
                  type='number'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='Porcentaje beneficio %'
                  required='required'
                  value={intermDetail.pct_beneficio}
                  handleOnChange={e => {setIntermDetail({...intermDetail, pct_beneficio: e.target.value})}} >
                  Porcentaje beneficio
                </LabelElementAssist>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='intermCountry'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='País'
                  required='required'
                  value={intermDetail.nacionalidad_contacto}
                  handleOnChange={e => {setIntermDetail({...intermDetail, nacionalidad_contacto: e.target.value})}} >
                  Nacionalidad
                </LabelElementAssist>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='intermDni'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='DNI/NIE'
                  required='required'
                  value={intermDetail.dni_nie_contacto}
                  handleOnChange={e => {setIntermDetail({...intermDetail, dni_nie_contacto: e.target.value})}} >
                  DNI / NIE
                </LabelElementAssist>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='intermPassport'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='Pasaporte'
                  required='required'
                  value={intermDetail.pasaporte_contacto}
                  handleOnChange={e => {setIntermDetail({...intermDetail, pasaporte_contacto: e.target.value})}} >
                  Pasaporte
                </LabelElementAssist>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='intermNss'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='NSS'
                  required='required'
                  value={intermDetail.nss_contacto}
                  handleOnChange={e => {setIntermDetail({...intermDetail, nss_contacto: e.target.value})}} >
                  Seguridad Social
                </LabelElementAssist>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='intermPhone'
                  type='number'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='telefono'
                  required='required'
                  value={intermDetail.num_telefono}
                  handleOnChange={e => {setIntermDetail({...intermDetail, num_telefono: e.target.value})}} >
                  Teléfono
                </LabelElementAssist>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='intermEmail'
                  type='email'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='email'
                  required='required'
                  value={intermDetail.desc_email}
                  handleOnChange={e => {setIntermDetail({...intermDetail, desc_email: e.target.value})}} >
                  Email
                </LabelElementAssist>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='intermTaxNr'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='CIF'
                  required='required'
                  value={intermDetail.desc_cif}
                  handleOnChange={e => {setIntermDetail({...intermDetail, desc_cif: e.target.value})}} >
                  CIF
                </LabelElementAssist>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='intermAddress'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='Direccion'
                  required='required'
                  value={intermDetail.desc_direccion}
                  handleOnChange={e => {setIntermDetail({...intermDetail, desc_direccion: e.target.value})}} >
                  Dirección
                </LabelElementAssist>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='intermPostcode'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='Código Postal'
                  required='required'
                  value={intermDetail.desc_codigo_postal}
                  handleOnChange={e => {setIntermDetail({...intermDetail, desc_codigo_postal: e.target.value})}} >
                  Código Postal
                </LabelElementAssist>
              </FormSimplePanelRow>
             
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