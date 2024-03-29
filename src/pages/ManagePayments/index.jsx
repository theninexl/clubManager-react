import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../../services/getData";
import { AsideMenu } from "../../components/AsideMenu";
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";
import { CentralBody, CentralBody__Header, HeadContent, HeadContentTitleBar, TitleBar__Title, TitleBar__Tools } from "../../components/UI/layout/centralContentComponents";
import { TableCellLong, TableCellMedium, TableCellShort, TableDataHeader, TableDataRow, TableDataWrapper } from "../../components/UI/layout/tableData";
import { IconButtonSmallPrimary, IconButtonSmallSecondary, IconButtonSmallerError, IconButtonSmallerPrimary, IconButtonSmallerSuccess } from "../../components/UI/objects/buttons";
import { SymbolAdd, SymbolBartchart, SymbolCheck, SymbolEdit, SymbolError, SymbolSearch } from "../../components/UI/objects/symbols";
import { FieldWithIcon, FieldWithIcon__input, FormSimpleHrz } from "../../components/UI/components/form simple/formSimple";


export default function ManagePaymentsPage () {

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
  const [page, setPage] = useState(1);

  const [allPlayers, setAllPlayers] = useState([
    {
      "id_jugador": 1,
      "nombre": "LUCAS",
      "apellidos": "TIRO",
      "alias": "TIRO",
      "comunitario": "SI",
      "desc_posicion": "DEFENSA",
      "imp_salario_total": "100,00€",
      "imp_variable": "100,00€",
      "activo": "NO"
    },
    {
      "id_jugador": 1,
      "nombre": "ALVARO",
      "apellidos": "MORATA MORATO",
      "alias": "MORATA",
      "comunitario": "SI",
      "desc_posicion": "DELANTERO",
      "imp_salario_total": "100,00€",
      "imp_variable": "100,00€",
      "activo": "SI"
    },
    {
      "id_jugador": 1,
      "nombre": "STEFAN",
      "apellidos": "SAVIC",
      "alias": "SAVIC",
      "comunitario": "SI",
      "desc_posicion": "DELANTERO",
      "imp_salario_total": "100,00€",
      "imp_variable": "100,00€",
      "activo": "SI"
    },
  ]);


  //pedir 10 usuarios
  // const getUsers = async (token = token, search,pagenumber, rowspage = rowsByPage, orderby = listOrder ) => {
  //   const results = await getData(token,'players/getAll',search,pagenumber,rowspage,orderby)
  //   .then (res=> {
  //     setAllPlayers(res.data);
  //   }).catch(err=> {
  //     console.log(err);
  //   })
  // }

  // //resetear pagina a 1 cuando cargas la primera vez
  // useEffect(()=> { setPage(1)},[setPage]);

  // //volver a pedir users cuando cambia pagina, orden
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
              <TitleBar__Title>Calendario de pagos</TitleBar__Title>
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
                    navigate('/new-player')
                  }} >
                  <SymbolAdd />
                </IconButtonSmallPrimary>
              </TitleBar__Tools>
            </HeadContentTitleBar>
          </HeadContent>

          <CentralBody>
            <CentralBody__Header>Jugadores</CentralBody__Header>
            <TableDataWrapper className='cm-u-spacer-mb-huge'>
              <TableDataHeader>
                <TableCellMedium>Nombre</TableCellMedium>
                <TableCellMedium>Alias</TableCellMedium>
                <TableCellMedium>Jugador UE</TableCellMedium>
                <TableCellMedium>Posicion</TableCellMedium>
                <TableCellMedium>Salario total</TableCellMedium>
                <TableCellMedium>Variable</TableCellMedium>
                <TableCellShort className='cm-u-centerText'>Activo</TableCellShort>
                <TableCellShort>&nbsp;</TableCellShort>
              </TableDataHeader>
              <div>
                {
                  allPlayers?.map(player => {
                    
                    return (
                      <TableDataRow key={player.id_jugador} >
                        <TableCellMedium>{player.nombre}</TableCellMedium>
                        <TableCellMedium>{player.alias}</TableCellMedium>
                        <TableCellMedium>{player.comunitario}</TableCellMedium>
                        <TableCellMedium>{player.desc_posicion}</TableCellMedium>
                        <TableCellMedium>{player.imp_salario_total}</TableCellMedium>
                        <TableCellMedium>{player.imp_variable}</TableCellMedium>
                        <TableCellShort className='cm-u-centerText'>
                          { player.activo === 'SI' ?
                            <IconButtonSmallerSuccess>
                              <SymbolCheck />
                            </IconButtonSmallerSuccess>
                            :
                            <IconButtonSmallerError>
                              <SymbolError />
                            </IconButtonSmallerError>
                          }
                        </TableCellShort>
                        <TableCellShort className='cm-u-centerText' >
                          <IconButtonSmallerPrimary
                            onClick={() => {
                              navigate(`/manage-player-payments?player=${player.id_jugador}`)
                            }}>
                            <SymbolBartchart/>
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