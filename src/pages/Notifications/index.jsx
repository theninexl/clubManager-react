import { useGlobalContext } from "../../providers/globalContextProvider";
import { AsideMenu } from "../../components/AsideMenu";
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";
import { CentralBody, HeadTool, HeadToolTitle } from "../../components/UI/layout/centralContentComponents";
import { TableCellLong, TableCellMedium, TableCellShort, TableDataHeader, TableDataRow, TableDataWrapper } from "../../components/UI/layout/tableData";
import { Button } from "../../components/UI/objects/buttons";
import { SymbolDone, SymbolMarkEmailRead } from "../../components/UI/objects/symbols";
import { useSaveData } from "../../hooks/useSaveData";
import { useEffect, useState } from "react";



export default function NotificationsPage () {

  const [notificationsList, setNotificationsList] = useState([]);

  const context = useGlobalContext();

  const getHeaderDetail = useSaveData();
  const getNotifications = useSaveData();
  const setNotReaded = useSaveData();
  const setNotValidated = useSaveData();

  //pido las notificaciones la primera vez
  useEffect(()=>{
    setNotificationsList([])
    getNotifications.uploadData('notifications/getAll',{});
  },[])

  useEffect(()=> {
    if (getNotifications.responseUpload) {
      // console.log('he vuelto a pedir notificaciones')
      // console.log(getNotifications.responseUpload);
      if (getNotifications.responseUpload?.status == 'ok') {
        // console.log('notificacioness', getNotifications.responseUpload.data)
        setNotificationsList(getNotifications.responseUpload.data);
      }
    }
   },[getNotifications.responseUpload])



  const handleReadButton = (id, notifReadState) => {
    // console.log(id, 'state que quiero:', notifReadState)
    const nuevo_flag_leido = (notifReadState === null || notifReadState === false || notifReadState === 0) ? 1 : 0;
    // console.log('nuevo leido será', nuevo_flag_leido);
    setNotReaded.uploadData('/notifications/update_leido', {"id_notificacion":id, "flag_leido":nuevo_flag_leido})
  }

  const handleValidateButton = (id, notifValidState) => {
    // console.log(id, 'state que quiero:', notifValidState)
    const nuevo_flag_validado = (notifValidState === null || notifValidState === false || notifValidState === 0) ? 1 : 0;
    // console.log('nuevo validado será', nuevo_flag_validado);
    setNotValidated.uploadData('/notifications/update_validado', {"id_notificacion":id, "flag_validado":nuevo_flag_validado})
  }

  useEffect(()=>{
    if (setNotReaded.responseUpload || setNotValidated.responseUpload) {
      // console.log('set notif readed', setNotReaded.responseUpload);
      // console.log('set notif validated', setNotValidated.responseUpload);
      setNotificationsList([]);
      getHeaderDetail.uploadData('header/getDetail',{});
      getNotifications.uploadData('notifications/getAll',{});
    }
  },[setNotReaded.responseUpload, setNotValidated.responseUpload])

  //volver a actualizar el número de notificaciones no leídas en el topnav
  useEffect(()=> {
    if (getHeaderDetail.responseUpload) {
      if (getHeaderDetail.responseUpload.notificaciones[0].contador != 0) {
        // console.log('Header Detail notifs', getHeaderDetail.responseUpload.notificaciones[0].contador);
        context.setUnreadNotifications(getHeaderDetail.responseUpload.notificaciones[0].contador)
      }
     }
    },[getHeaderDetail.responseUpload])

   const renderNotifs = (notifsLenght) => {
    if (notifsLenght == 0) {
      return (
        <div  className='cm-u-centerText cm-u-spacer-mt-big'>
          <span className='warning'>Cargando notificaciones</span>
        </div>
      );
    } else if (notifsLenght > 0) {
      return (
        <div>
          {
            notificationsList?.map(notification => {
              return (
                <TableDataRow
                  className={notification.leido == false ? 'cm-l-tabledata__row--noRead' : ''}
                  data-notifid={notification.id_notificacion}
                  key={notification.id_notificacion}
                >
                  <TableCellShort className='cm-u-centerText'>
                    <Button
                      className={(notification.flag_leido == false || notification.flag_leido == null || notification.flag_leido == 0) ? 'cm-o-icon-button-small--primary' 
                      : 'cm-o-icon-button-small--success'}
                      onClick={(e) => {
                        e.preventDefault();
                        handleReadButton(notification.id_notificacion, notification.flag_leido);
                      }}
                    >
                        <SymbolMarkEmailRead/>
                    </Button>
                  </TableCellShort>
                  <TableCellMedium>{notification.desc_asunto}</TableCellMedium>
                  <TableCellMedium>{notification.fch_alta}</TableCellMedium>
                  <TableCellLong>{notification.desc_descripcion}</TableCellLong>
                  <TableCellShort className='cm-u-centerText'>
                    <Button
                      className={(notification.flag_validado == false || notification.flag_validado == null || notification.flag_validado == 0) ? 'cm-o-icon-button-small--primary' 
                      : 'cm-o-icon-button-small--success'}
                      onClick={(e) => {
                        e.preventDefault();
                        handleValidateButton(notification.id_notificacion, notification.flag_validado);
                      }}
                    >
                        <SymbolDone/>
                    </Button>
                  </TableCellShort>
                </TableDataRow>
              );
            })
          }
        </div>
      );
    }
   }



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
                <TableCellShort className='cm-u-centerText'>Leído</TableCellShort>
                <TableCellMedium>Asunto</TableCellMedium>
                <TableCellMedium>Fecha</TableCellMedium>
                <TableCellLong>Asunto</TableCellLong>
                <TableCellShort className='cm-u-centerText'>Validado</TableCellShort>
              </TableDataHeader>
              { renderNotifs(notificationsList.length)}
            </TableDataWrapper>
          </CentralBody>
        </HalfContainerBody>
      </HalfContainer>
    </>
  );
}