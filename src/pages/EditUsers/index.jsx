import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/api";
import { AsideMenu } from "../../components/AsideMenu";
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";
import { CentralBody, HeadContent, HeadContentTitleBar, TitleBar__Title, TitleBar__Tools } from "../../components/UI/layout/centralContentComponents";
import { ButtonCatPrimary, ButtonCatTransparent, ButtonMousePrimary, IconButtonSmallPrimary } from "../../components/UI/objects/buttons";
import { SymbolBack, SymbolDelete } from "../../components/UI/objects/symbols";
import { FormSimplePanel, FormSimplePanelRow, FormSimpleRow, LabelElementAssist } from "../../components/UI/components/form simple/formSimple";
import { FormTabs, FormTabs__ContentWrapper, FormTabs__LinksWrapper, TabContent, TabLink } from "../../components/UI/components/formTabs/formTabs";
import { manageTabs } from "../../domUtilities/manageTabs";
import { TablePlayers, TablePlayers__Body, TablePlayers__Header, TablePlayers__tdLong } from "../../components/UI/layout/tablePlayers";
import { ModalBody, ModalContainer, ModalContent__Small, ModalFooter } from "../../components/UI/components/modal/modal";

export default function EditUsersPage () {
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
  const [modal, setModal] = useState(false);
  const [userForm, setUserForm] = useState({
    desc_nombre:'',
    desc_apellidos:'',
    desc_email:'',
    desc_nombre_departamento:'',
    id_departamento:'',
    id_usuario:'',
    pantallas: [],
    permisos: [],
  });

  useEffect(()=>{
    manageTabs();
    if (userParam === 'new') {
      // console.log('NO pido detalles de usuario al ser el parametro distinto de new')
    } else {
      // console.log('pido detalles de usuario al ser el parametro distinto de new')
      getUserDetail(userParam);
    }
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

  const getUniqueUserData = async (token,endpoint, id) => {
    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': token,
    }
    const { data } = await Api.call.post(endpoint, {"id_usuario":id,},{ headers:headers })
    return data;
  }

  //pedir detalle usuario
  const getUserDetail = async (id) => {
    const results = await getUniqueUserData(token,'users/getDetail',id)
    .then (res=> {
      console.log(res);
      setUserForm(res);
    }).catch(err=> {
      console.log(err);
    })
  }

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);

    if (userParam === 'new'){
      const data = [{
        name: formData.get('userName'),
        lastname: formData.get('userLastname'),
        email: formData.get('userEmail'),
        pwd1: formData.get('userPwd'),
        pwd2: formData.get('userPwd2'),
      }]

      const emptyFields = data.filter(item => 
        item.name === '' || item.lastname === '' ||
        item.email === '' || item.pwd1 === '' || item.pwd2 === '' );

      if (emptyFields.length > 0) {
        setError('Tienes que rellenar todos los campos');
      } else if (data[0].pwd1 !== data[0].pwd2) {
        setError('Las contraseñas tienen que coincidir');
      } else {
        setError('');
  
        const dataSent = {
            desc_nombre:data[0].name,
            desc_apellidos:data[0].lastname,
            desc_email:data[0].email,
            desc_contrasenya:data[0].pwd1,
            id_departamento:1,
            "permisos": [
              {
                "id_pantalla":1,
                "lectura": 0,
                "escritura": 0,
              },
              {
                "id_pantalla":2,
                "lectura": 0,
                "escritura": 0,
              },
            ],
        }

        console.log('dataSent',dataSent)
  
        Api.call.post('users/create',dataSent,{ headers:headers })
        .then (res => {
          navigate('/manage-users');
        }).catch(err => {
          if (err.code === 'ERR_NETWORK') setError('Error en la base de datos, inténtelo más tarde')
          else setError('Error al realizar la solicitud')
        })
      }
    } else {
      const data = [{
        name: formData.get('userName'),
        lastname: formData.get('userLastname'),
        email: formData.get('userEmail'),
        pwd1: formData.get('userPwd'),
        pwd2: formData.get('userPwd2'),
        userForm1read: formData.get('userForm1read') || '',
        userForm1write: formData.get('userForm1write') || '',
        userForm2read: formData.get('userForm2read') || '',
        userForm2write: formData.get('userForm2write') || '',
      }]

      if (data[0].pwd1 !== data[0].pwd2) {
        setError('Las contraseñas tienen que coincidir');
      } else {
        setError('');
        console.log('esta todo bien');
  
        const dataSent = {
            id_usuario: userParam,
            desc_nombre:data[0].name || '',
            desc_apellidos:data[0].lastname || '',
            desc_email:data[0].email || '',
            desc_contrasenya:data[0].pwd1.toString() || '',
            id_departamento:1,
            "permisos": [
              {
                "id_pantalla":1,
                "lectura": data[0].userForm1read !== null ? 1 : 0,
                "escritura": data[0].userForm1write !== null ? 1 : 0,
              },
              {
                "id_pantalla":2,
                "lectura": data[0].userForm2read !== null ? 1 : 0,
                "escritura": data[0].userForm2write !== null ? 1 : 0,
              },
            ],
        }

        console.log('dataSent',dataSent)
  
        Api.call.post('users/edit',dataSent,{ headers:headers })
        .then (res => {
          console.log(res);
          // navigate('/manage-users');
        }).catch(err => {
          if (err.code === 'ERR_NETWORK') setError('Error en la base de datos, inténtelo más tarde')
          else setError('Error al realizar la solicitud')
        })
      }
    }
  }

  const handleUserDelete = () => {
    
    Api.call.post('users/remove',{id_usuario:userParam},{ headers:headers })
      .then (res => {
        setModal(false);
        navigate('/manage-users');
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
                onClick={handleUserDelete}>
                Borrar usuario
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
                {
                  userParam === 'new' ? 'Añadir nuevo usuario' : 'Editar usuario'
                }
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
            <FormSimplePanel
              innerRef={form}
              autoComplete='off'>
                <FormTabs>
                  <FormTabs__LinksWrapper>
                    <TabLink target='basicData'>Datos Básicos</TabLink>
                    { userParam !== 'new' ? 
                      <TabLink target='userPermissions'>Permisos de usuario</TabLink>
                      :
                      ''}
                  </FormTabs__LinksWrapper>
                  <FormTabs__ContentWrapper>
                    <TabContent id='basicData'>
                      <FormSimplePanelRow>
                        <LabelElementAssist
                          htmlFor='userName'
                          type='text'
                          className='panel-field-long'
                          autoComplete='off'
                          role="presentation"
                          placeholder='Nombre'
                          required='required'
                          assistanceText='Escribe tu nombre'
                          value={userForm.desc_nombre}
                          handleOnChange={e => { setUserForm({desc_nombre: e.target.value})}}                        
                          >
                          Nombre
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelElementAssist
                          htmlFor='userLastname'
                          type='text'
                          className='panel-field-long'
                          autoComplete='off'
                          placeholder='Apellidos'
                          required='required'
                          assistanceText='Escribe tus apellidos'
                          value={userForm.desc_apellidos}
                          handleOnChange={e => { setUserForm({desc_apellidos: e.target.value})}}
                          >
                          Apellidos
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelElementAssist
                          htmlFor='userEmail'
                          type='email'
                          className='panel-field-long'
                          autoComplete='off'
                          placeholder='Email'
                          required='required'
                          assistanceText='Escribe un email valido'
                          value={userForm.desc_email}
                          handleOnChange={e => { setUserForm({desc_email: e.target.value})}}
                          >
                          Email
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                          <LabelElementAssist
                            htmlFor='userPwd'
                            type='password'
                            className='panel-field-long'
                            autoComplete='off'
                            placeholder='Nuevo password'
                            required='required'
                            assistanceText='8 caractéres mínimo'
                            >
                            Contraseña
                          </LabelElementAssist>
                        </FormSimplePanelRow>
                        <FormSimplePanelRow>
                          <LabelElementAssist
                            htmlFor='userPwd2'
                            type='password'
                            className='panel-field-long'
                            autoComplete='off'
                            placeholder='Repite password'
                            required='required'
                            assistanceText='repite la misma contraseña'
                            >
                            Repite contraseña
                          </LabelElementAssist>
                        </FormSimplePanelRow>
                    </TabContent>
                    { userParam !== 'new' ? 
                      <TabContent id='userPermissions'>
                        <TablePlayers className='cm-u-spacer-mb-huge'>
                          <TablePlayers__Header>
                            <tr>
                              <TablePlayers__tdLong>Nombre Form</TablePlayers__tdLong>
                              <TablePlayers__tdLong>Lectura</TablePlayers__tdLong>
                              <TablePlayers__tdLong>Escritura</TablePlayers__tdLong>
                            </tr>
                          </TablePlayers__Header>
                          <TablePlayers__Body>
                            { userForm.permisos?.map(item => {
                              const idPantalla = item.id_pantalla;
                              const nombreForm = userForm.pantallas.filter(item => item.id_pantalla == idPantalla )

                              const checkedLectura = item.lectura === 1 ? 'checked' : '';
                              const checkedEscritura = item.escritura === 1 ? 'checked' : '';

                              return (
                                <tr key={item.id_pantalla}>
                                  <TablePlayers__tdLong>{nombreForm[0].desc_pantalla}</TablePlayers__tdLong>
                                  <TablePlayers__tdLong>
                                    <input type="checkbox" id={`userForm${item.id_pantalla}read`} name={`userForm${item.id_pantalla}read`} 
                                    defaultChecked={checkedLectura}/>
                                  </TablePlayers__tdLong>
                                  <TablePlayers__tdLong>
                                    <input type="checkbox" id={`userForm${item.id_pantalla}write`} name={`userForm${item.id_pantalla}write`} 
                                    defaultChecked={checkedEscritura}/>
                                  </TablePlayers__tdLong>
                                </tr>
                              )
                            })}
                          </TablePlayers__Body>
                        </TablePlayers>
                      </TabContent>
                      :
                      ''
                    }
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