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

export default function EditTeamPage () {
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
  const userParam = queryParams.get('team');

  // variables y estados locales
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [allLeagues, setAllLeagues] = useState();
  const [countries, setCountries] = useState(null);
  const [teamDetail, setTeamDetail] = useState({
    "id_pais": '',
    "desc_nombre_pais": '',
    "id_liga": '',
    "desc_liga": '',
    "desc_nombre_club": '',
    "desc_contacto": '',
    "desc_telefono": '',
    "desc_email": '',
});

  useEffect(()=>{
    getTeamDetail(userParam);
    getCountries();
    getLeagues();
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
  const getTeamDetail = async (id) => {
    const data = await Api.call.post('teams/getDetail',{'id_club':id},{headers:headers})
    .then(res => {
      const team = res.data;
      setTeamDetail(team);
      console.log(teamDetail.desc_nombre_club)
    }).catch(err => console.log(err));
  }

  //pedir ligas
  const getCountries = async () => {
    const results = await getSimpleData('masters/getAllCountry')
    .then (res=> {
      setCountries(res.data);
    }).catch(err=> {
      console.log(err);
    })
  }

  //pedir paises
  const getLeagues = async () => {
    const results = await getSimpleData('masters/getAllLigue')
    .then (res=> {
      setAllLeagues(res.data);
    }).catch(err=> {
      console.log(err);
    })
  }

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
      id_club: userParam,
      id_pais: data.id_pais,
      id_liga: data.id_liga,
      desc_nombre_club: data.desc_nombre_club,
      desc_contacto: data.desc_contacto,
      desc_telefono: data.desc_telefono,
      desc_email: data.desc_email,
  }

  Api.call.post('teams/edit',dataSent,{ headers:headers })
  .then (res => {
    navigate('/manage-teams');
  }).catch(err => {
    if (err.code === 'ERR_NETWORK') setError('Error en la base de datos, inténtelo más tarde')
    else setError('Error al realizar la solicitud')
  })
  }

  const handleTeamDelete = () => {
    
    Api.call.post('teams/remove',{id_club:userParam},{ headers:headers })
      .then (res => {
        setModal(false);
        navigate('/manage-teams');
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
                    setUserForm({
                      desc_nombre:'',
                      desc_apellidos:'',
                      desc_email:'',
                      desc_nombre_departamento:'',
                      id_departamento:'',
                      id_usuario:'',
                      pantallas: [],
                      permisos: [],
                    });
                    navigate('/manage-users')}}>
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
                  htmlFor='teamCountry'
                  labelText='Pais'
                  value={teamDetail.id_pais || ''}
                  handleOnChange={e => {setTeamDetail({...teamDetail, id_pais: e.target.value})}} >
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
                  labelText='Liga'
                  value={teamDetail.id_liga || ''}
                  handleOnChange={e => {setTeamDetail({...teamDetail, id_liga: e.target.value})}} >
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
                  value={teamDetail.desc_contacto}
                  handleOnChange={e => {setTeamDetail({...teamDetail, desc_contacto: e.target.value})}}                      
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
                  value={teamDetail.desc_telefono}
                  handleOnChange={e => {setTeamDetail({...teamDetail, desc_telefono: e.target.value})}}                      
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
                  value={teamDetail.desc_email}
                  handleOnChange={e => {setTeamDetail({...teamDetail, desc_email: e.target.value})}}                      
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