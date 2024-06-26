import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetData } from "../../hooks/useGetData";
import { AsideMenu } from "../../components/AsideMenu";
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";
import { CentralBody, CentralBody__Header, HeadContent, HeadContentTitleBar, TitleBar__TitleWBtns, TitleBar__Tools } from "../../components/UI/layout/centralContentComponents";
import { TableCellMedium, TableCellShort, TableDataHeader, TableDataRow, TableDataWrapper } from "../../components/UI/layout/tableData";
import { IconButtonSmallPrimary, IconButtonSmallerPrimary } from "../../components/UI/objects/buttons";
import { SymbolAdd, SymbolEdit, SymbolGroups, SymbolIntermediaries } from "../../components/UI/objects/symbols";


export default function ManageTeamsPage () {

  //navegar
  const navigate = useNavigate();

  // variables y estados locales
  const rowsByPage = 10;
  const [searchValue, setSearchValue] = useState('');
  const [listOrder, setListOrder] = useState(1);
  const [allTeams, setAllTeams] = useState([]);
  const [page, setPage] = useState(1);
  const [errorMsg, setErrorMsg] = useState(null);


  const { responseGetData } = useGetData('teams/getAll')

  useEffect(()=>{
    if (responseGetData) {
      if (responseGetData.status === 200){
        setAllTeams(responseGetData.data.data);
      }  else if (responseGetData.status === 409) { setErrorMsg('El usuario que estás intentnado crear ya existe')
      } else if (responseGetData.code === 'ERR_NETWORK') { setErrorMsg('Error de conexión, inténtelo más tarde')
      } else if (responseGetData.code === 'ERR_BAD_RESPONSE') { setErrorMsg('Error de conexión, inténtelo más tarde')
      } else {
        setErrorMsg('No hay datos disponibles. Vuelve a intentarlo');
      }
    }
  },[responseGetData])


  //resetear pagina a 1 cuando cargas la primera vez
  useEffect(()=> { setPage(1)},[setPage]);

  //volver a pedir users cuando cambia pagina, orden
  // useEffect(()=> {
  //   getTeams();
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
              <TitleBar__TitleWBtns>
                <IconButtonSmallPrimary
                  className='cm-c-field-icon__button active--secondary'>
                  <SymbolGroups />
                </IconButtonSmallPrimary>
                &nbsp;
                <IconButtonSmallPrimary
                  className='cm-c-field-icon__button'
                  onClick={() => {
                    navigate('/manage-intermediaries')}} >
                  <SymbolIntermediaries />
                </IconButtonSmallPrimary>
                &nbsp;
                <h1 className='cm-u-text-bear'>Equipos</h1>
              </TitleBar__TitleWBtns>
              <TitleBar__Tools>
                <IconButtonSmallPrimary
                  onClick={() => {
                    navigate('/new-team')
                  }} >
                  <SymbolAdd />
                </IconButtonSmallPrimary>
              </TitleBar__Tools>
            </HeadContentTitleBar>
          </HeadContent>

          <CentralBody>
            <CentralBody__Header>Equipos</CentralBody__Header>
            <TableDataWrapper className='cm-u-spacer-mb-huge'>
              <TableDataHeader>
                <TableCellMedium>Nombre</TableCellMedium>
                <TableCellShort>&nbsp;</TableCellShort>
              </TableDataHeader>
              <div>
                {errorMsg &&
                  <TableDataRow  className='cm-u-centerText'>
                    <span className='error'>{errorMsg}</span>
                  </TableDataRow>
                }
                {
                  allTeams?.map(team => {
                    return (
                      <TableDataRow key={team.id_equipo} >
                        <TableCellMedium>{team.desc_nombre_club}</TableCellMedium>
                        <TableCellShort className='cm-u-centerText' >
                          <IconButtonSmallerPrimary
                            onClick={() => {
                              navigate(`/edit-team?team=${team.id_equipo}`)
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