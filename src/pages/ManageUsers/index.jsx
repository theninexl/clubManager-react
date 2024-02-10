import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetData } from "../../hooks/useGetData";
import { AsideMenu } from "../../components/AsideMenu";
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";
import { CentralBody, CentralBody__Header, HeadContent, HeadContentTitleBar, TitleBar__Title, TitleBar__Tools } from "../../components/UI/layout/centralContentComponents";
import { TableCellLong, TableCellMedium, TableCellShort, TableDataHeader, TableDataRow, TableDataWrapper } from "../../components/UI/layout/tableData";
import { IconButtonSmallPrimary, IconButtonSmallerPrimary } from "../../components/UI/objects/buttons";
import { SymbolAdd, SymbolEdit } from "../../components/UI/objects/symbols";




export default function ManageUsersPage () {

  //navegar
  const navigate = useNavigate();

  // variables y estados locales
  const rowsByPage = 10;
  const [searchValue, setSearchValue] = useState('');
  const [listOrder, setListOrder] = useState(1);
  const [allUsers, setAllUsers] = useState([]);
  const [page, setPage] = useState(1);


  const { responseGetData } = useGetData('users/getAll',{search:'',pagenumber:page,rowspage:rowsByPage})

  useEffect(()=>{
    if (responseGetData){
      setAllUsers(responseGetData.data.data);
    }
  },[responseGetData])


  //resetear pagina a 1 cuando cargas la primera vez
  useEffect(()=> { setPage(1)},[setPage]);

  //volver a pedir users cuando cambia pagina, orden
  // useEffect(()=> {
  //   getUsers(token,searchValue,page);
  // },[page, listOrder]);


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
                    navigate('/new-user')
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