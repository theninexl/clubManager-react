import { useEffect, useState } from "react";
import { AsideMenu } from "../../components/AsideMenu";
import { useSaveData } from "../../hooks/useSaveData";
import { v4 as uuidv4 } from 'uuid';
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";
import { CentralBody, CentralBody__Header, HeadContent, HeadContentTitleBar, TitleBar__Title, TitleBar__TitleAvatar, TitleBar__Tools } from "../../components/UI/layout/centralContentComponents";
import { FormSimpleHrz, SelectIcon } from "../../components/UI/components/form simple/formSimple";
import { ActivePlayerTable } from "./ActivePlayerTable";
import { useGlobalContext } from "../../providers/globalContextProvider";



export default function ManagePaymentsPage () {
  const globalContext = useGlobalContext();

  //estados locales
  const [allPlayers, setAllPlayers] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [warningMsg, setWarningMsg] = useState('Selecciona un jugador del desplegable para comenzar');
  const [activePlayerId, setActivePlayerId] = useState();
  const [activeContractId, setActiveContractId] = useState();
  const [activePlayerDetails, setActivePlayerDetails] = useState()
  const [activePlayerContracts, setActivePlayerContracts] = useState()

  //pedir todos los jugadores
  const getPlayers = useSaveData();
  const getActiveEntityPlayers = () => {
    console.log('pido equipo');
    getPlayers.uploadData('players/getAll',{search:'',pagenumber:1,rowspage:9999, id_equipo:globalContext.activeEntity});
  }

  useEffect(()=>{
    const response = getPlayers.responseUpload;
    if (response) {
      console.log('response', response);
      if (response.status == 'ok') { 
        setAllPlayers(response.data);
      } else if (response.code === 'ERR_NETWORK') {
        setWarningMsg(null);   
        setErrorMsg('Error de conexión, inténtelo más tarde');
      } else if (response.code === 'ERR_BAD_RESPONSE') {
        setWarningMsg(null);    
        setErrorMsg('Error de conexión, inténtelo más tarde');
      } else {
        setWarningMsg(null);   
        setErrorMsg('No hay datos disponibles. Vuelve a intentarlo');
      } 
    }
  },[getPlayers.responseUpload])


  //pedir datos jugador activo
  const getPlayerData = useSaveData();

  const getPlayerDetail = (idJugador) => {
    getPlayerData.uploadData('players/getDetail',{'id_jugador':idJugador})
  }

  useEffect (() => {
    if (getPlayerData.responseUpload) {
      // console.log(getPlayerData.responseUpload)
      setActivePlayerDetails(getPlayerData.responseUpload?.jugador[0])
      setActivePlayerContracts(getPlayerData.responseUpload?.contratos)
    }
  },[getPlayerData.responseUpload])

  useEffect(()=>{
    setActiveContractId(undefined);
    if (activePlayerId === undefined || activePlayerId === '' || activePlayerId == 0) {      
      setActivePlayerDetails();
      setActivePlayerContracts();
      setWarningMsg('Selecciona un jugador para comenzar');
      setErrorMsg(null);        
    } else {
      if (activeContractId === undefined || activeContractId === '') {
        setWarningMsg('Selecciona un contrato para mostrar la tabla de pagos');
      }
      getPlayerDetail(activePlayerId)      
    }
  },[activePlayerId])

  useEffect(()=>{
    if (activeContractId === undefined || activeContractId === '') {
      if (activePlayerId === undefined || activePlayerId === '' || activePlayerId == 0) {
        setWarningMsg('Selecciona un jugador para comenzar');
      } else {
        setWarningMsg('Selecciona un contrato para mostrar la tabla de pagos');
      }
    } else {
      setWarningMsg(null);
    }
  },[activeContractId])

  useEffect(()=>{
    getActiveEntityPlayers();
    setActivePlayerId();
    setActiveContractId();
  },[])

  useEffect(()=>{
    getActiveEntityPlayers();
  },[globalContext.activeEntity])


  return (
    <>    
      <HalfContainer  id='playerPaymentDetails'>
        <HalfContainerAside>
          <AsideMenu />
        </HalfContainerAside>
        <HalfContainerBody>
          <HeadContent>
            <HeadContentTitleBar>
              <TitleBar__Title>
                <TitleBar__TitleAvatar
                  avatarText='Calendario\nPagos'>
                  { (!activePlayerDetails) ?
                    <>Calendario de pagos</> 
                    : <> {`${activePlayerDetails?.desc_nombre} ${activePlayerDetails?.desc_apellido1}`}</>
                  }
                </TitleBar__TitleAvatar>
              </TitleBar__Title>
              <TitleBar__Tools>
                <FormSimpleHrz>
                  <SelectIcon
                    name='playerSelect'
                    style={{width:'250px'}}
                    onChange={(e) => {
                      if (e.target.value != '') {
                        setActivePlayerId(e.target.value); 
                        setWarningMsg(null);   
                      } else {
                        setActivePlayerId(null);
                        setWarningMsg('Selecciona un jugador del desplegable para comenzar');   
                      }                
                    }}>
                      <option value='0'>Selecciona jugador</option>
                    { allPlayers?.map(item => {
                      return (
                        <option key={item.id_jugador} value={item.id_jugador}>{item.nombre}</option>
                      );
                    })}
                    </SelectIcon>
                    { (activePlayerId === undefined || activePlayerId == 0) ?
                      ''
                      :
                      <SelectIcon
                        name='contractSelect'
                        style={{marginLeft: '16px', width:'250px'}}
                        onChange={(e) => {
                          setActiveContractId(e.target.value)         
                        }}>
                          <option value=''>Selecciona contrato</option>
                        { activePlayerContracts?.map(item => {
                          return (
                            <option key={item.id_contrato} value={item.id_contrato}>{item.desc_descripcion}</option>
                          );
                        })}
                      </SelectIcon>
                    }
                </FormSimpleHrz>
              </TitleBar__Tools>
            </HeadContentTitleBar>
          </HeadContent>

          <CentralBody>
            <CentralBody__Header>Tabla de pagos</CentralBody__Header>
            {(activePlayerId && activePlayerId != 0 && activeContractId != undefined)  &&
              <ActivePlayerTable
                activePlayerId={activePlayerId}
                activeContractId={activeContractId}
                key={uuidv4()}
              />
            }
            {warningMsg &&
              <div  className='cm-u-centerText'>
                <span className='warning'>{warningMsg}</span>
              </div>
            }
            {errorMsg &&
              <div  className='cm-u-centerText'>
                <span className='error'>{errorMsg}</span>
              </div>
            }
          </CentralBody>
        </HalfContainerBody>
      </HalfContainer>
    </>
  );
}