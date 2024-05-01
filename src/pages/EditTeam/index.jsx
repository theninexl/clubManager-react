import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetData } from "../../hooks/useGetData";
import { useSaveData } from "../../hooks/useSaveData";
import { AsideMenu } from "../../components/AsideMenu";
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";
import { CentralBody, CentralBody__Header, HeadContent, HeadContentTitleBar, TitleBar__Title, TitleBar__Tools } from "../../components/UI/layout/centralContentComponents";
import { ButtonCatPrimary, ButtonCatTransparent, ButtonMousePrimary, IconButtonSmallPrimary } from "../../components/UI/objects/buttons";
import { SymbolBack, SymbolDelete } from "../../components/UI/objects/symbols";
import { FormSimplePanel, FormSimplePanelRow, FormSimpleRow, LabelElementAssist, LabelSelectElement } from "../../components/UI/components/form simple/formSimple";
import { ModalBody, ModalContainer, ModalContent__Small, ModalFooter } from "../../components/UI/components/modal/modal";


export default function EditTeamPage () {
  //navegar
  const navigate = useNavigate();

  //hook guardar datos
  const updateTeam = useSaveData();
  const deleteTeam = useSaveData();

  //ref form
  const form = useRef(null);
  //leer pathname actual y manejar navegacion
  const queryParams = new URLSearchParams(window.location.search);
  const userParam = queryParams.get('team');

  // variables y estados locales
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [countries, setCountries] = useState(null);
  const [allTeamType, setAllTeamType] = useState(null);
  const [teamDetail, setTeamDetail] = useState({
    "desc_nombre_club": '',
    "id_pais": '',
    "id_tipo_equipo": '',

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

 const getTeamDetail = useGetData('teams/getDetail',{'id_equipo':userParam});
  useEffect (() => {
    if (getTeamDetail.responseGetData) {
      setTeamDetail(getTeamDetail.responseGetData.data)
    }
  },[getTeamDetail.responseGetData])

  const getCountries = useGetData('masters/getAllCountry');
  useEffect (() => {
    if (getCountries.responseGetData) setCountries(getCountries.responseGetData.data.data);
  },[getCountries.responseGetData])

  const getTeamType = useGetData('masters/getAllTeamType');
  useEffect (() => {
    if (getTeamType.responseGetData) setAllTeamType(getTeamType.responseGetData.data.data);;
  },[getTeamType.responseGetData])



  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);

    const data = {
      desc_nombre_club: formData.get('teamName'),
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
      id_equipo: userParam,
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

  updateTeam.uploadData('teams/edit',dataSent);
  }

  //mirar la respuesta de subir datos para setear error
  useEffect(()=> {
    if (updateTeam.responseUpload) {
      if (updateTeam.responseUpload.status === 409) { setError('El equipo ya existe')
      } else if (updateTeam.responseUpload.code === 'ERR_NETWORK') { setError('Error de conexión, inténtelo más tarde')
      } else if (updateTeam.responseUpload.status === 'ok') { navigate('/manage-teams');
      } else {
        setError('Existe un error en el formulario, inténtelo de nuevo')
      }
    }
  },[updateTeam.responseUpload])

  const handleTeamDelete = () => {
    
    deleteTeam.uploadData('teams/remove',{'id_equipo':userParam});
  }

  //mirar la respuesta de borrar usuario para setear error
  useEffect(()=> {
    if (deleteTeam.responseUpload) {
      if (deleteTeam.responseUpload.status === 409) { setError('El equipo no existe')
      } else if (deleteTeam.responseUpload.code === 'ERR_NETWORK') { setError('Error de conexión, inténtelo más tarde')
      } else if (deleteTeam.responseUpload.status === 'ok') { navigate('/manage-teams');
      } else {
        setError('Existe un error en el formulario, inténtelo de nuevo')
      }
    }
  },[deleteTeam.responseUpload])

  const renderModal = () => {
    if (modal) {
      return (
        <ModalContainer>
          <ModalContent__Small>
            <ModalBody
              className='cm-u-spacer-mb-bigger'>
                <h3 class="cm-u-text-black-cat">¿Está seguro?</h3>
              </ModalBody>
            <ModalFooter>
              <ButtonCatTransparent
                onClick={() => setModal(false)}>
                  Cancelar
              </ButtonCatTransparent>
              <ButtonCatPrimary
                onClick={handleTeamDelete}>
                Borrar equipo
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
                Editar equipo
              </TitleBar__Title>
              <TitleBar__Tools>
                <ButtonMousePrimary
                  onClick={handleSave}>
                  Guardar
                </ButtonMousePrimary>
                {renderDeleteUserBtn()}
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
                  value={teamDetail.desc_nombre_club}
                  handleOnChange={e => {setTeamDetail({...teamDetail, desc_nombre_club: e.target.value})}}                      
                  >
                  Nombre
                </LabelElementAssist>
              </FormSimplePanelRow>
               
              <FormSimplePanelRow>
                <LabelSelectElement
                  htmlFor='id_pais'
                  labelText='Pais'
                  defaultValue={teamDetail.id_pais || ''}
                  handleOnChange={e => {
                    setTeamDetail({...teamDetail, id_pais: e.target.value.toString()})
                    }} >
                    <option value=''>Selecciona</option>
                    { countries?.map(country => {
                      const selected = teamDetail.id_pais == country.id_pais ? 'selected' : '';
                      return (
                        <option key={country.id_pais} value={country.id_pais} selected={selected}>{country.desc_pais}</option>
                      );
                    })}
                </LabelSelectElement>
              </FormSimplePanelRow>
              
              
              <FormSimplePanelRow>
                <LabelSelectElement
                  htmlFor='id_tipo_equipo'
                  labelText='Tipo equipo'
                  defaultValue={teamDetail.id_tipo_equipo || ''}
                  handleOnChange={e => {
                    setTeamDetail({...teamDetail, id_tipo_equipo: e.target.value.toString()})
                    }} >
                    <option value=''>Selecciona</option>
                    { allTeamType?.map(item => {
                      const selected = teamDetail.id_tipo_equipo == item.id_tipo_equipo ? 'selected' : '';
                      return (
                        <option key={item.id_tipo_equipo} value={item.id_tipo_equipo} selected={selected}>{item.desc_web}</option>
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