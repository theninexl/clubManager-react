import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSaveData } from "../../hooks/useSaveData";
import { AsideMenu } from "../../components/AsideMenu";
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";
import { CentralBody, CentralBody__Header, HeadContent, HeadContentTitleBar, TitleBar__Title, TitleBar__Tools } from "../../components/UI/layout/centralContentComponents";
import {  ButtonMousePrimary, IconButtonSmallPrimary } from "../../components/UI/objects/buttons";
import { SymbolBack } from "../../components/UI/objects/symbols";
import { FormSimplePanel, FormSimplePanelRow, FormSimpleRow, LabelElementAssist, LabelSelectElement } from "../../components/UI/components/form simple/formSimple";
import { useGetData } from "../../hooks/useGetData";

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
  const [countries, setCountries] = useState(null);
  const [error, setError] = useState(null);
  const [intermDetail, setIntermDetail] = useState({});

  const getCountries = useGetData('masters/getAllCountry');
  useEffect (() => {
    if (getCountries.responseGetData) setCountries(getCountries.responseGetData.data.data);
  },[getCountries.responseGetData])
  

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    
    const data = {
      desc_nombre: formData.get('desc_nombre'),
      desc_cif: formData.get('desc_cif'),
      desc_direccion: formData.get('desc_direccion'),
      desc_codigo_postal: formData.get('desc_codigo_postal'),
      id_pais: formData.get('id_pais'),

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
      id_intermediario: userParam,
      desc_nombre: data.desc_nombre,
      desc_cif: data.desc_cif,
      desc_direccion: data.desc_direccion,
      desc_codigo_postal: data.desc_codigo_postal,
      id_pais: data.id_pais,

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

  uploadData('intermediaries/create',dataSent);

  }

  //mirar la respuesta de subir datos para setear error
  useEffect(()=> {
    if (responseUpload) {
      console.log(responseUpload);
      if (responseUpload.status === 409) { setError('El intermediario ya existe')
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
                
                  htmlFor='desc_nombre'
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
                  htmlFor='desc_cif'
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
                  htmlFor='desc_direccion'
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
                  htmlFor='desc_codigo_postal'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='Código Postal'
                  required='required' >
                  Código Postal
                </LabelElementAssist>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelSelectElement
                  htmlFor='id_pais'
                  labelText='País'>
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