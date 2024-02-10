import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSaveData } from "../../hooks/useSaveData";
import { useGetData } from "../../hooks/useGetData";
import { AsideMenu } from "../../components/AsideMenu";
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";
import { CentralBody, HeadContent, HeadContentTitleBar, TitleBar__Title, TitleBar__Tools } from "../../components/UI/layout/centralContentComponents";
import { ButtonMousePrimary, IconButtonSmallPrimary } from "../../components/UI/objects/buttons";
import { SymbolBack } from "../../components/UI/objects/symbols";
import { FormSimplePanel, FormSimplePanelRow, FormSimpleRow, LabelElementAssist, LabelSelectElement } from "../../components/UI/components/form simple/formSimple";
import { FormTabs, FormTabs__ContentWrapper, FormTabs__LinksWrapper, TabContent, TabLink } from "../../components/UI/components/formTabs/formTabs";
import { manageTabs } from "../../domUtilities/manageTabs";
import { TablePlayers, TablePlayers__Body, TablePlayers__Header, TablePlayers__tdLong } from "../../components/UI/layout/tablePlayers";


export default function NewUserPage () {
  //navegar
  const navigate = useNavigate();

  //hook guardar datos
  const { uploadData, responseUpload } = useSaveData();

  //ref form
  const form = useRef(null);

  //listado forms de permisos
  const [userForm, setUserForm] = useState({
    permisos: [
      {
        id_pantalla: 1,
        lectura:0,
        escritura:0,
      },
      {
        id_pantalla: 2,
        lectura:0,
        escritura:0,
      }
    ]
  });
  //listado departamentos
  const [departmentsList, setDepartmentsList] = useState();
  //error formulario
  const [error, setError] = useState(null);

  useEffect(()=>{
    //seteo las tabs
    manageTabs();
  },[])    

  //pedir los departamentos y guardarlos en estado
  const { responseGetData } = useGetData('masters/getAllDepartment');
  useEffect(()=>{
    if (responseGetData) {
      setDepartmentsList(responseGetData.data.data);
    }
  },[responseGetData])
  
  //mirar la respuesta de subir datos para setear error
  useEffect(()=> {
    if (responseUpload) {
      console.log(responseUpload);
      if (responseUpload.status === 409) { setError('El usuario que estás intentnado crear ya existe')
      } else if (responseUpload.code === 'ERR_NETWORK') { setError('Error de conexión, inténtelo más tarde')
      } else if (responseUpload.status === 'ok') { navigate('/manage-users');
      } else {
        setError('Existe un error en el formulario, inténtelo de nuevo')
      }
    }
  },[responseUpload])


  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
        
    const data = [{
      name: formData.get('newUserName'),
      lastname: formData.get('newUserLastname'),
      email: formData.get('newUserEmail'),
      departamento: formData.get('newUserDepartment'),
      pwd1: formData.get('newUserPwd'),
      pwd2: formData.get('newUserPwd2'),
      userForm1read: formData.get('newUserForm1read') || '',
      userForm1write: formData.get('newUserForm1write') || '',
      userForm2read: formData.get('newUserForm2read') || '',
      userForm2write: formData.get('newUserForm2write') || '',
    }]      

    if (data[0].pwd1 !== data[0].pwd2) {
      setError('Las contraseñas tienen que coincidir');
    } else {
      setError('');  
      const dataSent = {
          desc_nombre:data[0].name || '',
          desc_apellidos:data[0].lastname || '',
          desc_email:data[0].email || '',
          desc_contrasenya:data[0].pwd1.toString() || '',
          id_departamento:data[0].departamento || '',
          "permisos": [
            {
              "id_pantalla":1,
              "lectura": data[0].userForm1read == 'on' ? 1 : 0,
              "escritura": data[0].userForm1write == 'on' ? 1 : 0,
            },
            {
              "id_pantalla":2,
              "lectura": data[0].userForm2read == 'on' ? 1 : 0,
              "escritura": data[0].userForm2write == 'on' ? 1 : 0,
            },
          ],
      }
      
      uploadData('users/create',dataSent);
      
    }
  }


  return (
    <>
      <HalfContainer  id='usersList'>
        <HalfContainerAside>
          <AsideMenu />
        </HalfContainerAside>
        <HalfContainerBody className='cm-u-spacer-mt-medium'>
          <HeadContent>
            <HeadContentTitleBar>
              <TitleBar__Title>Nuevo usuario</TitleBar__Title>
              <TitleBar__Tools>
                <ButtonMousePrimary
                  onClick={handleSave}>
                  Guardar
                </ButtonMousePrimary>
                <IconButtonSmallPrimary
                  onClick={() => {navigate('/manage-users')}}>
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
                    <TabLink target='userPermissions'>Permisos de usuario</TabLink>
                  </FormTabs__LinksWrapper>
                  <FormTabs__ContentWrapper>
                    <TabContent id='basicData'>
                      <FormSimplePanelRow>
                        <LabelElementAssist
                          htmlFor='newUserName'
                          type='text'
                          className='panel-field-long'
                          autoComplete='off'
                          role="presentation"
                          placeholder='Nombre'
                          required='required'
                          assistanceText='Escribe tu nombre'                   
                          >
                          Nombre
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelElementAssist
                          htmlFor='newUserLastname'
                          type='text'
                          className='panel-field-long'
                          autoComplete='off'
                          placeholder='Apellidos'
                          required='required'
                          assistanceText='Escribe tus apellidos'
                          >
                          Apellidos
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelElementAssist
                          htmlFor='newUserEmail'
                          type='email'
                          className='panel-field-long'
                          autoComplete='off'
                          placeholder='Email'
                          required='required'
                          assistanceText='Escribe un email valido'
                          >
                          Email
                        </LabelElementAssist>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                        <LabelSelectElement
                          htmlFor='newUserDepartment'
                          labelText='Departamento'>
                            <option value=''>Selecciona</option>
                            { departmentsList?.map(item => {
                                return (
                                  <option key={item.id_departamento} value={item.id_departamento}>{item.desc_nombre_departamento}</option>
                                )
                              })}
                        </LabelSelectElement>
                      </FormSimplePanelRow>
                      <FormSimplePanelRow>
                          <LabelElementAssist
                            htmlFor='newUserPwd'
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
                            htmlFor='newUserPwd2'
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
                              const nombreForm = `Pantalla ${item.id_pantalla}`;
                              const checkedLectura = item.lectura === 1 ? 'checked' : '';
                              const checkedEscritura = item.escritura === 1 ? 'checked' : '';

                              return (
                                <tr key={idPantalla}>
                                  <TablePlayers__tdLong>{nombreForm}</TablePlayers__tdLong>
                                  <TablePlayers__tdLong>
                                    <input type="checkbox" id={`newUserForm${idPantalla}read`} name={`newUserForm${idPantalla}read`} 
                                    defaultChecked={checkedLectura}/>
                                  </TablePlayers__tdLong>
                                  <TablePlayers__tdLong>
                                    <input type="checkbox" id={`newUserForm${idPantalla}write`} name={`newUserForm${idPantalla}write`} 
                                    defaultChecked={checkedEscritura}/>
                                  </TablePlayers__tdLong>
                                </tr>
                              )
                            })}
                          </TablePlayers__Body>
                        </TablePlayers>
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