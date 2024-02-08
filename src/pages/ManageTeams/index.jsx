import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData, getSimpleData } from "../../services/getData";
import { AsideMenu } from "../../components/AsideMenu";
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";
import { CentralBody, CentralBody__Header, HeadContent, HeadContentTitleBar, TitleBar__Title, TitleBar__TitleWBtns, TitleBar__Tools } from "../../components/UI/layout/centralContentComponents";
import { TableCellLong, TableCellMedium, TableCellShort, TableDataHeader, TableDataRow, TableDataWrapper } from "../../components/UI/layout/tableData";
import { IconButtonSmallPrimary, IconButtonSmallSecondary, IconButtonSmallerError, IconButtonSmallerPrimary, IconButtonSmallerSuccess } from "../../components/UI/objects/buttons";
import { SymbolAdd, SymbolCheck, SymbolEdit, SymbolError, SymbolGroups, SymbolIntermediaries, SymbolSearch } from "../../components/UI/objects/symbols";
import { FieldWithIcon, FieldWithIcon__input, FormSimpleHrz } from "../../components/UI/components/form simple/formSimple";


export default function ManageTeamsPage () {

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
  const [allTeams, setAllTeams] = useState([]);
  const [page, setPage] = useState(1);

  //pedir paises
  const getTeams = async () => {
    const results = await getSimpleData('teams/getAll', token)
    .then (res=> {
      setAllTeams(res.data);
    }).catch(err=> {
      console.log(err);
    })
  }

  //resetear pagina a 1 cuando cargas la primera vez
  useEffect(()=> { setPage(1)},[setPage]);

  //volver a pedir users cuando cambia pagina, orden
  useEffect(()=> {
    getTeams();
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
            <CentralBody__Header>Jugadores</CentralBody__Header>
            <TableDataWrapper className='cm-u-spacer-mb-huge'>
              <TableDataHeader>
                <TableCellMedium>Nombre</TableCellMedium>
                <TableCellMedium>Pais</TableCellMedium>
                <TableCellMedium>Liga</TableCellMedium>
                <TableCellMedium>Contacto</TableCellMedium>
                <TableCellShort>&nbsp;</TableCellShort>
              </TableDataHeader>
              <div>
                {
                  allTeams?.map(team => {
                    
                    return (
                      <TableDataRow key={team.id_club} >
                        <TableCellMedium>{team.desc_nombre_club}</TableCellMedium>
                        <TableCellMedium>{team.desc_nombre_pais}</TableCellMedium>
                        <TableCellMedium>{team.desc_liga}</TableCellMedium>
                        <TableCellMedium>{team.desc_contacto}</TableCellMedium>
                        <TableCellShort className='cm-u-centerText' >
                          <IconButtonSmallerPrimary
                            onClick={() => {
                              navigate(`/edit-team?team=${team.id_club}`)
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