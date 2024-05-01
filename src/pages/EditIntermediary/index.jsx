import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSaveData } from "../../hooks/useSaveData";
import { useGetData } from "../../hooks/useGetData";
import { AsideMenu } from "../../components/AsideMenu";
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";
import { CentralBody, CentralBody__Header, HeadContent, HeadContentTitleBar, TitleBar__Title, TitleBar__Tools } from "../../components/UI/layout/centralContentComponents";
import { ButtonCatPrimary, ButtonCatTransparent, ButtonMousePrimary, IconButtonSmallPrimary } from "../../components/UI/objects/buttons";
import { SymbolBack, SymbolDelete } from "../../components/UI/objects/symbols";
import { FormSimplePanel, FormSimplePanelRow, FormSimpleRow, LabelElementAssist } from "../../components/UI/components/form simple/formSimple";
import { ModalBody, ModalContainer, ModalContent__Small, ModalFooter } from "../../components/UI/components/modal/modal";


export default function EditIntermediaryPage () {
  //navegar
  const navigate = useNavigate();

  //hook guardar datos
  const updateInterm = useSaveData();
  const deleteInterm = useSaveData();
 

  //ref form
  const form = useRef(null);
  //leer pathname actual y manejar navegacion
  const queryParams = new URLSearchParams(window.location.search);
  const userParam = queryParams.get('intermediary');

  // variables y estados locales
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [intermDetail, setIntermDetail] = useState({
    "desc_nombre": '',
    "desc_cif": '',
    "desc_direccion": '',
    "desc_codigo_postal": '',

    "desc_num_telefono_contacto_1": '',
    "desc_email_contacto_1": '',
    "desc_nombre_contacto_1": '',
    "desc_cargo_contacto_1": '',

    "desc_num_telefono_contacto_2": '',
    "desc_email_contacto_2": '',
    "desc_nombre_contacto_2": '',
    "desc_cargo_contacto_2": '',

    "desc_num_telefono_contacto_3": '',
    "desc_email_contacto_3": '',
    "desc_nombre_contacto_3": '',
    "desc_cargo_contacto_3": ''
  });
  

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

  const { responseGetData } = useGetData('intermediaries/getDetail',{'id_intermediario':userParam});
  useEffect (() => {
    if (responseGetData) {
      console.log(responseGetData);
      setIntermDetail(responseGetData.data)
    }
  },[responseGetData])

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);

    

    const data = {
      desc_nombre: formData.get('desc_nombre'),
      desc_cif: formData.get('desc_cif'),
      desc_direccion: formData.get('desc_direccion'),
      desc_codigo_postal: formData.get('desc_codigo_postal'),

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

  updateInterm.uploadData('intermediaries/edit',dataSent);
  }

  //mirar la respuesta de subir datos para setear error
  useEffect(()=> {
    if (updateInterm.responseUpload) {
      console.log(updateInterm.responseUpload);
      if (updateInterm.responseUpload.status === 409) { setError('El intermediario ya existe')
      } else if (updateInterm.responseUpload.code === 'ERR_NETWORK') { setError('Error de conexión, inténtelo más tarde')
      } else if (updateInterm.responseUpload.status === 'ok') { navigate('/manage-intermediaries');
      } else {
        setError('Existe un error en el formulario, inténtelo de nuevo')
      }
    }
  },[updateInterm.responseUpload])

  const handleIntermDelete = () => {
    deleteInterm.uploadData('intermediaries/remove',{id_intermediario:userParam});
  }

  //mirar la respuesta de subir datos para setear error
  useEffect(()=> {
    if (deleteInterm.responseUpload) {
      if (deleteInterm.responseUpload.status === 409) { setError('El intermediario no existe')
      } else if (deleteInterm.responseUpload.code === 'ERR_NETWORK') { setError('Error de conexión, inténtelo más tarde')
      } else if (deleteInterm.responseUpload.status === 'ok') { navigate('/manage-intermediaries');
      } else {
        setError('Existe un error en el formulario, inténtelo de nuevo')
      }
    }
  },[deleteInterm.responseUpload])

  const renderModal = () => {
    if (modal) {
      return (
        <ModalContainer>
          <ModalContent__Small>
            <ModalBody
              className='cm-u-spacer-mb-bigger'>
                <h3 className="cm-u-text-black-cat">¿Está seguro?</h3>
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
                  htmlFor='desc_nombre'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='Nombre'
                  required='required'
                  value={intermDetail.desc_nombre}
                  handleOnChange={e => {setIntermDetail({...intermDetail, desc_nombre: e.target.value})}} >
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
                  required='required'
                  value={intermDetail.desc_cif}
                  handleOnChange={e => {setIntermDetail({...intermDetail, desc_cif: e.target.value})}} >
                  CIF
                </LabelElementAssist>
              </FormSimplePanelRow>
              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='desc_direccion'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='Dirección'
                  required='required'
                  value={intermDetail.desc_direccion}
                  handleOnChange={e => {setIntermDetail({...intermDetail, desc_direccion: e.target.value})}} >
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
                  required='required'
                  value={intermDetail.desc_codigo_postal}
                  handleOnChange={e => {setIntermDetail({...intermDetail, desc_codigo_postal: e.target.value})}} >
                  Código Postal
                </LabelElementAssist>
              </FormSimplePanelRow>
              
              

              <FormSimplePanelRow>
                <LabelElementAssist
                  htmlFor='desc_nombre_contacto_1'
                  type='text'
                  className='panel-field-long'
                  autoComplete='off'
                  placeholder='Nombre contacto 1'
                  required='required'
                  value={teamDetail.desc_nombre_contacto_1}
                  handleOnChange={e => {setTeamDetail({...teamDetail, desc_nombre_contacto_1: e.target.value})}}                      
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
                  required='required'
                  value={teamDetail.desc_cargo_contacto_1}
                  handleOnChange={e => {setTeamDetail({...teamDetail, desc_cargo_contacto_1: e.target.value})}}                      
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
                  required='required'
                  value={teamDetail.desc_num_telefono_contacto_1}
                  handleOnChange={e => {setTeamDetail({...teamDetail, desc_num_telefono_contacto_1: e.target.value})}}                      
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
                  required='required'
                  value={teamDetail.desc_email_contacto_1}
                  handleOnChange={e => {setTeamDetail({...teamDetail, desc_email_contacto_1: e.target.value})}}                      
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
                  required='required'
                  value={teamDetail.desc_nombre_contacto_2}
                  handleOnChange={e => {setTeamDetail({...teamDetail, desc_nombre_contacto_2: e.target.value})}}                      
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
                  required='required'
                  value={teamDetail.desc_cargo_contacto_2}
                  handleOnChange={e => {setTeamDetail({...teamDetail, desc_cargo_contacto_2: e.target.value})}}                      
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
                  required='required'
                  value={teamDetail.desc_num_telefono_contacto_2}
                  handleOnChange={e => {setTeamDetail({...teamDetail, desc_num_telefono_contacto_2: e.target.value})}}                      
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
                  required='required'
                  value={teamDetail.desc_email_contacto_2}
                  handleOnChange={e => {setTeamDetail({...teamDetail, desc_email_contacto_2: e.target.value})}}                      
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
                  required='required'
                  value={teamDetail.desc_nombre_contacto_3}
                  handleOnChange={e => {setTeamDetail({...teamDetail, desc_nombre_contacto_3: e.target.value})}}                      
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
                  required='required'
                  value={teamDetail.desc_cargo_contacto_3}
                  handleOnChange={e => {setTeamDetail({...teamDetail, desc_cargo_contacto_3: e.target.value})}}                      
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
                  required='required'
                  value={teamDetail.desc_num_telefono_contacto_3}
                  handleOnChange={e => {setTeamDetail({...teamDetail, desc_num_telefono_contacto_3: e.target.value})}}                      
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
                  required='required'
                  value={teamDetail.desc_email_contacto_3}
                  handleOnChange={e => {setTeamDetail({...teamDetail, desc_email_contacto_3: e.target.value})}}                      
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