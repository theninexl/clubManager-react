import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetData } from "../../hooks/useGetData";
import { AsideMenu } from "../../components/AsideMenu";
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";
import { CentralBody, CentralBody__Header, HeadContent, HeadContentTitleBar, TitleBar__TitleWBtns, TitleBar__Tools } from "../../components/UI/layout/centralContentComponents";
import { TableCellMedium, TableCellShort, TableDataHeader, TableDataRow, TableDataWrapper } from "../../components/UI/layout/tableData";
import { IconButtonSmallPrimary,   IconButtonSmallerPrimary,  } from "../../components/UI/objects/buttons";
import { SymbolAdd, SymbolCheck, SymbolEdit,  SymbolGroups, SymbolIntermediaries, SymbolSearch } from "../../components/UI/objects/symbols";


export default function ManageIntermediariesPage () {

  //navegar
  const navigate = useNavigate();

  // variables y estados locales
  const rowsByPage = 10;
  const [searchValue, setSearchValue] = useState('');
  const [listOrder, setListOrder] = useState(1);
  const [allIntermediaries, setAllIntermediaries] = useState([]);
  const [page, setPage] = useState(1);


  const { responseGetData } = useGetData('intermediaries/getAll')

  useEffect(()=>{
    if (responseGetData){
      console.log(responseGetData);
      setAllIntermediaries(responseGetData.data.data);
    }
  },[responseGetData])


  //resetear pagina a 1 cuando cargas la primera vez
  useEffect(()=> { setPage(1)},[setPage]);

  //volver a pedir users cuando cambia pagina, orden
  // useEffect(()=> {
  //   getIntermediaries();
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
                  className='cm-c-field-icon__button'
                  onClick={() => {
                    navigate('/manage-teams')}} >
                  <SymbolGroups />
                </IconButtonSmallPrimary>
                &nbsp;
                <IconButtonSmallPrimary
                  className='cm-c-field-icon__button active--secondary'>
                  <SymbolIntermediaries />
                </IconButtonSmallPrimary>
                &nbsp;
                <h1 className='cm-u-text-bear'>Intermediarios</h1>
              </TitleBar__TitleWBtns>
              <TitleBar__Tools>
                <IconButtonSmallPrimary
                  onClick={() => {
                    navigate('/new-intermediary')
                  }} >
                  <SymbolAdd />
                </IconButtonSmallPrimary>
              </TitleBar__Tools>
            </HeadContentTitleBar>
          </HeadContent>

          <CentralBody>
            <CentralBody__Header>Intermediarios</CentralBody__Header>
            <TableDataWrapper className='cm-u-spacer-mb-huge'>
              <TableDataHeader>
                <TableCellMedium>Nombre</TableCellMedium>
                <TableCellMedium>Jugadores gestionados</TableCellMedium>
                <TableCellShort>&nbsp;</TableCellShort>
              </TableDataHeader>
              <div>
                {
                  allIntermediaries?.map(intermediary => {
                    
                    return (
                      <TableDataRow key={intermediary.id_intermediario} >
                        <TableCellMedium>{intermediary.desc_nombre}</TableCellMedium>
                        <TableCellMedium>{intermediary.jugadores_gestionados}</TableCellMedium>
                        <TableCellShort className='cm-u-centerText' >
                          <IconButtonSmallerPrimary
                            onClick={() => {
                              navigate(`/edit-intermediary?intermediary=${intermediary.id_intermediario}`)
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