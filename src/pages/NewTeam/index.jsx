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


  const getCountries = useGetData('masters/getAllCountry');
  useEffect (() => {
    if (getCountries.responseGetData) setCountries(getCountries.responseGetData.data.data);
  },[getCountries.responseGetData])

  const getTeamType = useGetData('masters/getAllTeamType');
  useEffect (() => {
    if (getTeamType.responseGetData) setAllLeagues(getTeamType.responseGetData.data.data);;
  },[getTeamType.responseGetData])

  


  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);

    const data = {
      desc_nombre_club: formData.get('desc_nombre_club'),
      id_pais: formData.get('id_pais'),
      id_tipo_equipo: formData.get('id_tipo_equipo'),

      desc_num_telefono_contacto_1: formData.get('desc_num_telefono_contacto_1'),
      desc_email_contacto_1: formData.get('desc_email_contacto_1'),
      desc_nombre_contacto_1: formData.get('desc_nombre_contacto_1'),
      desc_cargo_contacto_1: formData.get('desc_cargo_contacto_1'),

      desc_num_telefono_contacto_2: formData.get('desc_num_telefono_contacto_2'),
      desc_email_contacto_2: formData.get('desc_email_contacto_2'),
      desc_nombre_contacto_2: formData.get('desc_nombre_contacto_2'),
      desc_cargo_contacto_2: formData.get('desc_cargo_contacto_2'),

      desc_num_telefono_contacto_3: formData.get('desc_num_telefono_contacto_3'),
      desc_email_contacto_3: formData.get('desc_email_contacto_3'),
      desc_nombre_contacto_3: formData.get('desc_nombre_contacto_3'),
      desc_cargo_contacto_3: formData.get('desc_cargo_contacto_3')
    }

    const dataSent = {
      desc_nombre_club: data.desc_nombre_club,
      id_pais: data.id_pais,
      id_tipo_equipo: data.id_tipo_equipo,

      desc_num_telefono_contacto_1: data.desc_num_telefono_contacto_1,
      desc_email_contacto_1: data.desc_email_contacto_1,
      desc_nombre_contacto_1: data.desc_nombre_contacto_1,
      desc_cargo_contacto_1: data.desc_cargo_contacto_1,

      desc_num_telefono_contacto_2: data.desc_num_telefono_contacto_2,
      desc_email_contacto_2: data.desc_email_contacto_2,
      desc_nombre_contacto_2: data.desc_nombre_contacto_2,
      desc_cargo_contacto_2: data.desc_cargo_contacto_2,

      desc_num_telefono_contacto_3: data.desc_num_telefono_contacto_3,
      desc_email_contacto_3: data.desc_email_contacto_3,
      desc_nombre_contacto_3: data.desc_nombre_contacto_3,
      desc_cargo_contacto_3: data.desc_cargo_contacto_3
  }

  uploadData('teams/create',dataSent);

  }

  //mirar la respuesta de subir datos para setear error
  useEffect(()=> {
    if (responseUpload) {
      console.log(responseUpload);
      if (responseUpload.status === 409) { setError('El equipo ya existe')
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
                  htmlFor='desc_nombre_club'
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
                  htmlFor='id_pais'
                  labelText='Pais' >
                    <option value=''>Seleccionar</option>
                    { countries?.map(item => {
                      return (
                        <option key={item.id_pais} value={item.id_pais}>{item.desc_pais}</option>
                      );
                    })}
                </LabelSelectElement>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelSelectElement
                  htmlFor='id_tipo_equipo'
                  labelText='Tipo Equipo' >
                    <option value=''>Seleccionar</option>
                    { allLeagues?.map(item => {
                      return (
                        <option key={item.id_tipo_equipo} value={item.id_tipo_equipo}>{item.desc_web}</option>
                      );
                    })}
                </LabelSelectElement>
              </FormSimplePanelRow>


              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='desc_nombre_contacto_1'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='Nombre contacto 1'
                  >
                  Nombre contacto 1
                </LabelElementAssist>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='desc_cargo_contacto_1'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='Cargo contacto 1'
                  >
                  Cargo contacto 1
                </LabelElementAssist>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='desc_num_telefono_contacto_1'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='Teléfono contacto 1'
                  >
                  Teléfono contacto 1
                </LabelElementAssist>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='desc_email_contacto_1'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='Email contacto 1'  
                  >
                  Email contacto 1
                </LabelElementAssist>
              </FormSimplePanelRow>

              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='desc_nombre_contacto_2'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='Nombre contacto 2'     
                  >
                  Nombre contacto 2
                </LabelElementAssist>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='desc_cargo_contacto_2'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='Cargo contacto 2'   
                  >
                  Cargo contacto 2
                </LabelElementAssist>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='desc_num_telefono_contacto_2'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='Teléfono contacto 2'      
                  >
                  Teléfono contacto 2
                </LabelElementAssist>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='desc_email_contacto_2'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='Email contacto 2'   
                  >
                  Email contacto 2
                </LabelElementAssist>
              </FormSimplePanelRow>

              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='desc_nombre_contacto_3'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='Nombre contacto 3'           
                  >
                  Nombre contacto 3
                </LabelElementAssist>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='desc_cargo_contacto_3'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='Cargo contacto 3'          
                  >
                  Cargo contacto 3
                </LabelElementAssist>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='desc_num_telefono_contacto_3'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='Teléfono contacto 3'              
                  >
                  Teléfono contacto 3
                </LabelElementAssist>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='desc_email_contacto_3'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='Email contacto 3'                   
                  >
                  Email contacto 3
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