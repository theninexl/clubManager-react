import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSaveData } from "../../hooks/useSaveData";
import { AsideMenu } from "../../components/AsideMenu";
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";
import { CentralBody, CentralBody__Header, HeadContent, HeadContentTitleBar, TitleBar__Title, TitleBar__Tools } from "../../components/UI/layout/centralContentComponents";
import { TableCellMedium, TableCellShort, TableDataHeader, TableDataRow, TableDataWrapper } from "../../components/UI/layout/tableData";
import { IconButtonSmallPrimary, IconButtonSmallerError, IconButtonSmallerPrimary, IconButtonSmallerSuccess } from "../../components/UI/objects/buttons";
import { SymbolAdd, SymbolCheck, SymbolEdit, SymbolError } from "../../components/UI/objects/symbols";
import { useGlobalContext } from "../../providers/globalContextProvider";
import { Pagination } from "../../components/UI/components/pagination/pagination";



export default function ManagePlayersPage () {
  const globalContext = useGlobalContext();
  const navigate = useNavigate();

  // variables y estados locales
  const rowsByPage = 5;
  // const [searchValue, setSearchValue] = useState('');
  // const [listOrder, setListOrder] = useState(1);
  const [allPlayers, setAllPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const [errorMsg, setErrorMsg] = useState(null);
  const [rowsTotal, setRowsTotal] = useState(0);

  //pedir jugadores
  const getPlayers = useSaveData();

  const loadPlayers = () => {
    // console.log('entro en loadPlayers', page, rowsByPage);
    getPlayers.uploadData('players/getAll',{search:'',pagenumber:page,rowspage:rowsByPage, id_equipo:globalContext.activeEntity})
  }

  useEffect(()=>{
    const response = getPlayers.responseUpload;
    if (response){      
      if (response.status == 'ok') { 
        // console.log(response);
        setAllPlayers(response.data);
        setRowsTotal(response.rowscount[0].count);
      } else if (response.status === 409) { setErrorMsg('El usuario que estás intentnado crear ya existe')
      } else if (response.code === 'ERR_NETWORK') { setErrorMsg('Error de conexión, inténtelo más tarde')
      } else if (response.code === 'ERR_BAD_RESPONSE') { setErrorMsg('Error de conexión, inténtelo más tarde')
      } else {
        setErrorMsg('No hay datos disponibles. Vuelve a intentarlo');
      }
    }
  },[getPlayers.responseUpload]) 

  //resetear pagina a 1 cuando cargas la primera vez
  useEffect(()=> { 
    setPage(1);
  },[]);

  //volver a pedir users cuando cambia pagina, orden
  useEffect(()=> {
    loadPlayers();
  },[page, globalContext.activeEntity]);


  return (
    <>    
      <HalfContainer  id='usersList'>
        <HalfContainerAside>
          <AsideMenu />
        </HalfContainerAside>
        <HalfContainerBody className='cm-u-spacer-mt-medium'>
          <HeadContent>
            <HeadContentTitleBar>
              <TitleBar__Title>Plantilla</TitleBar__Title>
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
                {errorMsg &&
                  <TableDataRow  className='cm-u-centerText'>
                    <span className='error'>{errorMsg}</span>
                  </TableDataRow>
                }
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
                              navigate(`/edit-player?player=${player.id_jugador}`)
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
            <TableDataWrapper>
              <div className='cm-c-tablePagination'>
                <Pagination
                  items={allPlayers}
                  itemsPerPage={rowsByPage}
                  rowsCountTotal={rowsTotal}
                  setPage={setPage}
                />
              </div>
            </TableDataWrapper>
          </CentralBody>
        </HalfContainerBody>
      </HalfContainer>
    </>
  );
}