import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AsideMenu } from "../../components/AsideMenu";
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";
import { CentralBody, CentralBody__Header, HeadContent, HeadContentTitleBar, TitleBar__Title, TitleBar__TitleAvatar, TitleBar__Tools } from "../../components/UI/layout/centralContentComponents";
import { TableCellMedium, TableDataHeader, TableDataRow, TableDataWrapper } from "../../components/UI/layout/tableData";



export default function EditPlayerPaymentsPage () {

  //navegar
  const navigate = useNavigate();

  // variables y estados locales
  const [playerData, setPlayerData] = useState({
      "id_jugador": 1,
      "nombre": "ALVARO",
      "apellidos": "MORATA",
      "alias": "TIRO",
      "comunitario": "SI",
      "desc_posicion": "DELANTERO",
      "imp_salario_total": "100,00€",
      "imp_variable": "100,00€",
      "activo": "NO"
  });
  
  

  return (
    <>
      <HalfContainer  id='usersList'>
        <HalfContainerAside>
          <AsideMenu />
        </HalfContainerAside>
        <HalfContainerBody >
          <HeadContent>
            <HeadContentTitleBar>
              <TitleBar__TitleAvatar
                avatarText={`${playerData.nombre}\\n${playerData.apellidos}`}>
                {`${playerData.nombre} ${playerData.apellidos}`}
              </TitleBar__TitleAvatar>
            </HeadContentTitleBar>
            
          </HeadContent>
          <CentralBody
            style={{paddingTop: '80px'}}>
              <CentralBody__Header>Pagos netos por temporada</CentralBody__Header>
              <TableDataWrapper className='cm-u-spacer-mt-big'>
                <TableDataHeader className='cm-l-tabledata__header--nospace'>
                  <TableCellMedium className='table-bg tablecell-bg-old'>Temp 19/20</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>Temp 20/21</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>Temp 21/22</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-present'>Temp 22/23</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>Temp 23/24</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>Total</TableCellMedium>
                </TableDataHeader>
                <TableDataRow className='cm-l-tabledata__row--nospace'>
                  <TableCellMedium className='table-bg tablecell-bg-old'>2.000.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>3.000.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>3.300.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-present'>1.200.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>3.250.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>12.500.000€</TableCellMedium>
                </TableDataRow>
              </TableDataWrapper>

              <CentralBody__Header
                className='cm-u-spacer-mt-bigger'>Pagos brutos por temporada</CentralBody__Header>
              <TableDataWrapper className='cm-u-spacer-mt-big'>
                <TableDataHeader className='cm-l-tabledata__header--nospace'>
                  <TableCellMedium className='table-bg tablecell-bg-old'>Temp 19/20</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>Temp 20/21</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>Temp 21/22</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-present'>Temp 22/23</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>Temp 23/24</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>Total</TableCellMedium>
                </TableDataHeader>
                <TableDataRow className='cm-l-tabledata__row--nospace'>
                  <TableCellMedium className='table-bg tablecell-bg-old'>3.770.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>5.660.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>6.230.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-present'>2.260.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>6.130.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>24.050.000€</TableCellMedium>
                </TableDataRow>
              </TableDataWrapper>

              <CentralBody__Header
                className='cm-u-spacer-mt-bigger'>Desglose pagos</CentralBody__Header>
              <TableDataWrapper className='cm-u-spacer-mt-big'>
                <TableDataHeader className='cm-l-tabledata__header--nospace'>
                  <TableCellMedium className='table-bg'></TableCellMedium>
                  <TableCellMedium className='table-bg'></TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>Jun22</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>Ago22</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>Sept22</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-present'>Nov22</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>Jun23</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>Jul23</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>Ago23</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>Sept23</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>Total</TableCellMedium>
                </TableDataHeader>
                <TableDataRow className='cm-l-tabledata__row--nospace'>
                  <TableCellMedium className='table-bg'></TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>Salario fijo</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>50.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>50.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-present'>50.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>50.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>50.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>1.440.000€</TableCellMedium>
                </TableDataRow>
                <TableDataRow className='cm-l-tabledata__row--nospace'>
                  <TableCellMedium className='table-bg'></TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>Prima fichaje</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-present'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>470.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>470.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>1.500.000€</TableCellMedium>
                </TableDataRow>
                <TableDataRow className='cm-l-tabledata__row--nospace'>
                  <TableCellMedium className='table-bg'></TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>Prima renovación</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-present'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>470.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>470.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>1.500.000€</TableCellMedium>
                </TableDataRow>
                <TableDataRow className='cm-l-tabledata__row--nospace'>
                  <TableCellMedium className='table-bg'></TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>Clausula fija o variable completada</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-present'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>470.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>470.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>1.500.000€</TableCellMedium>
                </TableDataRow>
                <TableDataRow className='cm-l-tabledata__row--nospace'>
                  <TableCellMedium className='table-bg tablecell-bg-old'>Adelanto</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>Anticipo 1</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-present'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>150.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>150.000€</TableCellMedium>
                </TableDataRow>
                <TableDataRow className='cm-l-tabledata__row--nospace'>
                  <TableCellMedium className='table-bg tablecell-bg-old'>Sanción 2 meses mensualidad</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>Sanciones 1</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-present'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>150.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>150.000€</TableCellMedium>
                </TableDataRow>
                <TableDataRow className='cm-l-tabledata__row--nospace'>
                  <TableCellMedium className='table-bg tablecell-bg-old'>Pago 50.000€ a AT</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>Embargos 1</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-present'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>40.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>40.000€</TableCellMedium>
                </TableDataRow>
                <TableDataRow className='cm-l-tabledata__row--nospace'>
                  <TableCellMedium className='table-bg tablecell-bg-old'>Pago representante</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>Embargos 1</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-old'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-present'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>40.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-future'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>40.000€</TableCellMedium>
                </TableDataRow>
                <TableDataRow className='cm-l-tabledata__row--nospace'>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>Pago representante</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>Jugador</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>50.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>50.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>50.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>50.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>50.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>982.000€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>3.397.000€</TableCellMedium>
                </TableDataRow>
                <TableDataRow className='cm-l-tabledata__row--nospace'>
                  <TableCellMedium className='table-bg tablecell-bg-totals'></TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>Agencia tributaria</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>40.000€</TableCellMedium>
                </TableDataRow>
                <TableDataRow className='cm-l-tabledata__row--nospace'>
                  <TableCellMedium className='table-bg tablecell-bg-totals'></TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>Otros</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>--€</TableCellMedium>
                  <TableCellMedium className='table-bg tablecell-bg-totals'>--€</TableCellMedium>
                </TableDataRow>
              </TableDataWrapper>
          </CentralBody>
        </HalfContainerBody>
      </HalfContainer>
    </>
  );
}