import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../../services/getData";
import { AsideMenu } from "../../components/AsideMenu";
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";
import { CentralBody, CentralBody__Header, HeadContent, HeadContentTitleBar, TitleBar__Title, TitleBar__Tools } from "../../components/UI/layout/centralContentComponents";
import { TableCellLong, TableCellMedium, TableCellShort, TableDataHeader, TableDataRow, TableDataWrapper } from "../../components/UI/layout/tableData";
import { IconButtonSmallPrimary, IconButtonSmallSecondary, IconButtonSmallerPrimary } from "../../components/UI/objects/buttons";
import { SymbolAdd, SymbolEdit, SymbolSearch } from "../../components/UI/objects/symbols";
import { FieldWithIcon, FieldWithIcon__input, FormSimpleHrz } from "../../components/UI/components/form simple/formSimple";




export default function ManageUsersPage () {

  //navegar
  const navigate = useNavigate();
  //guardar token peticiones
  const account = localStorage.getItem('CMAccount');
  const parsedAccount = JSON.parse(account);
  const token = parsedAccount.token;
  // variables y estados locales
  const rowsByPage = 10;
  const [searchValue, setSearchValue] = useState('');
  const [listOrder, setListOrder] = useState(1);
  const [allUsers, setAllUsers] = useState([]);
  const [page, setPage] = useState(1);


  //pedir 10 usuarios
  const getUsers = async (token = token, search,pagenumber, rowspage = rowsByPage, orderby = listOrder ) => {
    const results = await getData(token,'users/getAll',search,pagenumber,rowspage,orderby)
    .then (res=> {
      setAllUsers(res.data);
    }).catch(err=> {
      console.log(err);
    })
  }

  //resetear pagina a 1 cuando cargas la primera vez
  useEffect(()=> { setPage(1)},[setPage]);

  //volver a pedir users cuando cambia pagina, orden
  useEffect(()=> {
    getUsers(token,searchValue,page);
  },[page, listOrder]);


  return (
    <>    
      <HalfContainer  id='usersList'>
        <HalfContainerAside>
          <AsideMenu />
        </HalfContainerAside>
        <HalfContainerBody className='cm-u-spacer-mt-medium'>
          <HeadContent>
            <HeadContentTitleBar>
              <TitleBar__Title>Usuarios</TitleBar__Title>
              <TitleBar__Tools>
                {/* <FormSimpleHrz>
                  <FieldWithIcon>
                    <FieldWithIcon__input
                      name='searchUser'
                      placeholder='Buscar usuarios'/>
                    <IconButtonSmallSecondary
                      className='cm-c-field-icon__button'  >
                      <SymbolSearch />
                    </IconButtonSmallSecondary>
                  </FieldWithIcon>
                </FormSimpleHrz> */}
                <IconButtonSmallPrimary
                  onClick={() => {
                    navigate('/edit-users?user=new')
                  }} >
                  <SymbolAdd />
                </IconButtonSmallPrimary>
              </TitleBar__Tools>
            </HeadContentTitleBar>
          </HeadContent>

          <CentralBody>
            <CentralBody__Header>Usuarios</CentralBody__Header>
            <TableDataWrapper className='cm-u-spacer-mb-huge'>
              <TableDataHeader>
                <TableCellMedium>Nombre</TableCellMedium>
                <TableCellMedium>Apellidos</TableCellMedium>
                <TableCellLong>Email</TableCellLong>
                <TableCellMedium>Ultimo acceso</TableCellMedium>
                <TableCellShort>&nbsp;</TableCellShort>
              </TableDataHeader>
              <div>
                {
                  allUsers?.map(user => {
                    
                    return (
                      <TableDataRow key={user.id_usuario} >
                        
                        <TableCellMedium>{user.desc_nombre}</TableCellMedium>
                        <TableCellMedium>{user.desc_apellidos}</TableCellMedium>
                        <TableCellLong>{user.desc_email}</TableCellLong>
                        <TableCellMedium>{user.ultima_conexion}</TableCellMedium>
                        <TableCellShort className='cm-u-centerText'>
                          <IconButtonSmallerPrimary
                            onClick={() => {
                              navigate(`/edit-users?user=${user.id_usuario}`)
                            }}>
                            <SymbolEdit/>
                          </IconButtonSmallerPrimary>
                        </TableCellShort>
                      </TableDataRow>
                    );
                  })
                }
                </div>
            </TableDataWrapper>
          </CentralBody>
        </HalfContainerBody>
      </HalfContainer>
    </>
  );
}