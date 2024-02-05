import { useGlobalContext } from "../../providers/globalContextProvider";
import { AsideMenu } from "../../components/AsideMenu";
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";
import { CentralBody, HeadTool, HeadToolTitle } from "../../components/UI/layout/centralContentComponents";
import { TableCellLong, TableCellMedium, TableCellShort, TableDataHeader, TableDataRow, TableDataWrapper } from "../../components/UI/layout/tableData";
import { Button } from "../../components/UI/objects/buttons";
import { SymbolDone, SymbolMarkEmailRead } from "../../components/UI/objects/symbols";



export default function NotificationsPage () {
  const context = useGlobalContext();
  return (
    <>    
      <HalfContainer>
        <HalfContainerAside>
          <AsideMenu />
        </HalfContainerAside>
        <HalfContainerBody className='cm-u-spacer-mt-medium'>
          <HeadTool className='cm-u-spacer-mb-bigger'>
            <HeadToolTitle>Notificaciones</HeadToolTitle>
          </HeadTool>
          <CentralBody>
            <TableDataWrapper className='cm-u-spacer-mb-huge'>
              <TableDataHeader>
                {/* <TableCellShort className='cm-u-centerText'>Tipo</TableCellShort> */}
                <TableCellShort className='cm-u-centerText'>Leído</TableCellShort>
                <TableCellMedium>Asunto</TableCellMedium>
                <TableCellMedium>Fecha</TableCellMedium>
                <TableCellLong>Asunto</TableCellLong>
                <TableCellShort className='cm-u-centerText'>Validado</TableCellShort>
              </TableDataHeader>
              <div>
                {
                  context.notifications?.map(notification => {
                    
                    return (
                      <TableDataRow
                        className={notification.leido == false ? 'cm-l-tabledata__row--noRead' : ''}
                        data-notifid={notification.id_notificacion}
                        key={notification.id_notificacion}
                      >
                        <TableCellShort className='cm-u-centerText'>
                          <Button
                            className={notification.leido == false ? 'cm-o-icon-button-small--primary' 
                            : 'cm-o-icon-button-small--success'} >
                              <SymbolMarkEmailRead/>
                          </Button>
                        </TableCellShort>
                        <TableCellMedium>{notification.asunto}</TableCellMedium>
                        <TableCellMedium>{notification.fch_alta}</TableCellMedium>
                        <TableCellLong>{notification.descripcion}</TableCellLong>
                        <TableCellShort className='cm-u-centerText'>
                          <Button
                            className={notification.validado == false ? 'cm-o-icon-button-small--primary' 
                            : 'cm-o-icon-button-small--success'} >
                              <SymbolDone/>
                          </Button>
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