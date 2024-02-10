import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSaveData } from "../../hooks/useSaveData";
import { AsideMenu } from "../../components/AsideMenu";
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";
import { CentralBody, CentralBody__Header, HeadContent, HeadContentTitleBar, TitleBar__Title, TitleBar__Tools } from "../../components/UI/layout/centralContentComponents";
import {  ButtonMousePrimary, IconButtonSmallPrimary } from "../../components/UI/objects/buttons";
import { SymbolBack } from "../../components/UI/objects/symbols";
import { FormSimplePanel, FormSimplePanelRow, FormSimpleRow, LabelElementAssist, LabelSelectElement } from "../../components/UI/components/form simple/formSimple";

export default function NewIntermediaryPage () {
  //navegar
  const navigate = useNavigate();

  //hook guardar datos
  const { uploadData, responseUpload } = useSaveData();

  //ref form
  const form = useRef(null);
  //leer pathname actual y manejar navegacion
  const queryParams = new URLSearchParams(window.location.search);
  const userParam = queryParams.get('intermediary');

  // variables y estados locales
  const [error, setError] = useState(null);
  const [intermDetail, setIntermDetail] = useState({});
  

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

  uploadData('intermediaries/create',dataSent);

  }

  //mirar la respuesta de subir datos para setear error
  useEffect(()=> {
    if (responseUpload) {
      console.log(responseUpload);
      if (responseUpload.status === 409) { setError('El intermediario que estás intentando crear ya existe')
      } else if (responseUpload.code === 'ERR_NETWORK') { setError('Error de conexión, inténtelo más tarde')
      } else if (responseUpload.status === 'ok') { navigate('/manage-intermediaries');
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
        <HalfContainerBody className='cm-u-spacer-mt-medium'>
          <HeadContent>
            <HeadContentTitleBar>
              <TitleBar__Title>
                Nuevo Intermediario
              </TitleBar__Title>
              <TitleBar__Tools>
                <ButtonMousePrimary
                  onClick={handleSave}>
                  Guardar
                </ButtonMousePrimary>
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
                  required='required' >
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
                  required='required' >
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
                  required='required' >
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
                  required='required' >
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
                  required='required' >
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
                  required='required' >
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
                  required='required' >
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
                  required='required' >
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
                  required='required' >
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
                  required='required'>
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
                  required='required' >
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
                  required='required' >
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
                  required='required' >
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
                  required='required' >
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