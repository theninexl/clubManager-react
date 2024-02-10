import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSaveData } from "../../hooks/useSaveData";
import { useGetData } from "../../hooks/useGetData";
import { AsideMenu } from "../../components/AsideMenu";
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";
import { CentralBody, CentralBody__Header, HeadContent, HeadContentTitleBar, TitleBar__Title, TitleBar__Tools } from "../../components/UI/layout/centralContentComponents";
import {   ButtonMousePrimary, IconButtonSmallPrimary } from "../../components/UI/objects/buttons";
import { SymbolBack } from "../../components/UI/objects/symbols";
import { FormSimplePanel, FormSimplePanelRow, FormSimpleRow, LabelElementAssist, LabelSelectElement } from "../../components/UI/components/form simple/formSimple";

export default function NewTeamPage () {
  //navegar
  const navigate = useNavigate();

  //hook guardar datos
  const { uploadData, responseUpload } = useSaveData();

  //ref form
  const form = useRef(null);

  // variables y estados locales
  const [error, setError] = useState(null);
  const [allLeagues, setAllLeagues] = useState();
  const [countries, setCountries] = useState(null);


  //pedir ligas, paises
  const getLeagues = useGetData('masters/getAllLigue');
  useEffect (() => {
    if (getLeagues.responseGetData) setAllLeagues(getLeagues.responseGetData.data.data);;
  },[getLeagues.responseGetData])

  const getCountries = useGetData('masters/getAllCountry');
  useEffect (() => {
    if (getCountries.responseGetData) setCountries(getCountries.responseGetData.data.data);
  },[getCountries.responseGetData])


  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);

    const data = {
      desc_nombre_club: formData.get('teamName'),
      id_pais: formData.get('teamCountry'),
      id_liga: formData.get('teamLeague'),
      desc_contacto: formData.get('teamContactName'),
      desc_telefono: formData.get('teamContactPhone'),
      desc_email: formData.get('teamContactEmail'),
    }

    const dataSent = {
      id_pais: data.id_pais,
      id_liga: data.id_liga,
      desc_nombre_club: data.desc_nombre_club,
      desc_contacto: data.desc_contacto,
      desc_telefono: data.desc_telefono,
      desc_email: data.desc_email,
  }

  uploadData('teams/create',dataSent);

  }

  //mirar la respuesta de subir datos para setear error
  useEffect(()=> {
    if (responseUpload) {
      console.log(responseUpload);
      if (responseUpload.status === 409) { setError('El equipo que estás intentnado crear ya existe')
      } else if (responseUpload.code === 'ERR_NETWORK') { setError('Error de conexión, inténtelo más tarde')
      } else if (responseUpload.status === 'ok') { navigate('/manage-teams');
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
                Nuevo equipo
              </TitleBar__Title>
              <TitleBar__Tools>
                <ButtonMousePrimary
                  onClick={handleSave}>
                  Guardar
                </ButtonMousePrimary>
                <IconButtonSmallPrimary
                  onClick={() => {
                    navigate('/manage-teams')}}>
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
                  htmlFor='teamName'
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
                <LabelSelectElement
                  htmlFor='teamCountry'
                  labelText='Pais' >
                    <option value=''>Selecciona</option>
                    { countries?.map(item => {
                      return (
                        <option key={item.id_pais} value={item.id_pais}>{item.desc_nombre_pais}</option>
                      );
                    })}
                </LabelSelectElement>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelSelectElement
                  htmlFor='teamLeague'
                  labelText='Liga' >
                    <option value=''>Selecciona</option>
                    { allLeagues?.map(item => {
                      return (
                        <option key={item.id_liga} value={item.id_liga}>{item.desc_liga}</option>
                      );
                    })}
                </LabelSelectElement>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='teamContactName'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='Nombre contacto'
                  required='required'                    
                  >
                  Nombre contacto
                </LabelElementAssist>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='teamContactPhone'
                  type='number'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='Teléfono contacto'
                  required='required'                   
                  >
                  Teléfono contacto
                </LabelElementAssist>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='teamContactEmail'
                  type='email'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='Email contacto'
                  required='required'                   
                  >
                  Email contacto
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