import { useEffect, useState } from "react";
import { AsideMenu } from "../../components/AsideMenu";
import { useGetData } from "../../hooks/useGetData";
import { useSaveData } from "../../hooks/useSaveData";
import { useGlobalContext } from "../../providers/globalContextProvider";
import { v4 as uuidv4 } from 'uuid';
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";
import { CentralBody, CentralBody__Header, HeadContent, HeadContentTitleBar, TitleBar__Title, TitleBar__TitleAvatar, TitleBar__Tools } from "../../components/UI/layout/centralContentComponents";
import { FormSimpleHrz, LabelElement, LabelElementToggle, SelectIcon } from "../../components/UI/components/form simple/formSimple";
import { TableCellLong, TableCellMedium, TableCellShort, TableDataHeader, TableDataRow, TableDataWrapper } from "../../components/UI/layout/tableData";
import { IconButtonSmallSecondary } from "../../components/UI/objects/buttons";
import { SymbolSave } from "../../components/UI/objects/symbols";
import { NumericFormat } from "react-number-format";



export default function SettingsClausesPage () {
  const globalContext = useGlobalContext();

  //estados locales
  const [allPlayers, setAllPlayers] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [warningMsg, setWarningMsg] = useState('Selecciona un jugador del desplegable para comenzar');
  const [activePlayerId, setActivePlayerId] = useState();
  const [activeContractId, setActiveContractId] = useState();
  const [activePlayerDetails, setActivePlayerDetails] = useState();
  const [activePlayerContracts, setActivePlayerContracts] = useState();
  const [dataClauses,setDataClauses] = useState();

  //pedir todos los jugadores
  // const { responseGetData } = useGetData('players/getAll',{search:'',pagenumber:1,rowspage:9999})
  const getPlayers = useSaveData();
  const getActiveEntityPlayers = () => {
    console.log('pido equipo');
    getPlayers.uploadData('players/getAll',{search:'',pagenumber:1,rowspage:9999, id_equipo:globalContext.activeEntity});
  }

  useEffect(()=>{
    const response = getPlayers.responseUpload;
    if (response){
      console.log(response);
      
      if (response && response.status === 'ok') { 
        setAllPlayers(response.data);
      } else {
        setWarningMsg(null);   
        setErrorMsg('Error de conexión, inténtelo más tarde');
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
        setErrorMsg(null);
      } else {
        setWarningMsg('Selecciona un contrato para mostrar la tabla de pagos');
        setErrorMsg(null);
      }
    } else {
      getClausesList(activeContractId);
      setWarningMsg(null);
      setErrorMsg(null);
    }
  },[activeContractId])

  useEffect(()=>{
    getActiveEntityPlayers();
    setActivePlayerId();
    setActiveContractId();
  },[])

  //pedir datos clausulas
  const getDataClauses = useSaveData();

  const getClausesList = (activeContractId) => {
    getDataClauses.uploadData('config/getClausulas',{'id_contrato':activeContractId})
  }

  useEffect(()=>{
    if(getDataClauses.responseUpload) {
      // console.log(getDataClauses.responseUpload);
      if(getDataClauses.responseUpload.status == "ok") {
        if (Object.keys(getDataClauses.responseUpload.data).length > 0) {
          setDataClauses(getDataClauses.responseUpload.data);
          setErrorMsg(null);
        }
        else {
          setDataClauses()
          setErrorMsg('No hay datos para el contrato seleccionado, por favor selecciona otro contrato u otro jugador');
        }
      }
    }
  },[getDataClauses.responseUpload])

  //actualizar una clausula
  const updateClause = useSaveData();

  const handleUpdateClause = (clauseid, estimation, date) => {
    updateClause.uploadData('/config/updateClausula',{'id_contrato':activeContractId, 'id_clausula':clauseid, 'flag_estimacion_hipo':estimation, 'fch_estimada_complecion':date })
  }

  useEffect(()=>{
    if (updateClause.responseUpload) {
      if (updateClause.responseUpload.status == "ok") {
        setDataClauses();
        getClausesList(activeContractId);
      }
    }
  },[updateClause.responseUpload])


  return (
    <>    
      <HalfContainer  id='playerPaymentDetails'>
        <HalfContainerAside>
          <AsideMenu />
        </HalfContainerAside>
        <HalfContainerBody className='cm-u-spacer-mt-medium'>
          <HeadContent>
            <HeadContentTitleBar>
              <TitleBar__Title>
              { (!activePlayerDetails) ?
                <>Configuración de Clausulas</> 
                : <> {`${activePlayerDetails?.desc_nombre} ${activePlayerDetails?.desc_apellido1}`}</>
              }
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
            <CentralBody__Header>Lista cláusulas</CentralBody__Header>
            {(activePlayerId && activePlayerId != 0 && activeContractId != undefined && dataClauses)  &&
               <TableDataWrapper className='cm-u-spacer-mb-huge'>
               <TableDataHeader>
                 <TableCellLong>Descripción</TableCellLong>
                 <TableCellMedium>Bonus/Prima</TableCellMedium>
                 <TableCellMedium>Beneficiario</TableCellMedium>
                 <TableCellMedium>Importe</TableCellMedium>
                 <TableCellMedium className='cm-u-centerText'>Estimado</TableCellMedium>
                 <TableCellMedium>Fecha estimación</TableCellMedium>
                 <TableCellShort>Guardar</TableCellShort>
               </TableDataHeader>
               <div>
                 {
                   dataClauses?.map((item,index) => {                     
                     return (
                       <TableDataRow key={item.id_clausula} >
                         <TableCellLong>{item.desc_alias}</TableCellLong>
                         <TableCellMedium>{item.bonus_prima}</TableCellMedium>
                         <TableCellMedium>{item.beneficiario}</TableCellMedium>
                         <TableCellMedium>
                          <NumericFormat 
                            displayType="text" 
                            value={item.num_importe} 
                            thousandSeparator="."
                            decimalSeparator=","
                            suffix="€"
                          /></TableCellMedium>
                         <TableCellMedium className='cm-u-centerText'>
                          <LabelElementToggle
                            htmlFor='ClauseEstimation'
                            checked={(item.flag_estimacion_hipo === 1 || item.flag_estimacion_hipo === '1' || item.flag_estimacion_hipo === true) ? 'checked':''}
                            handleOnChange={e => {
                              const checked = e.target.checked === true ? true : false;  
                              const dataClauseUpdate = [...dataClauses];
                              dataClauseUpdate[index]['flag_estimacion_hipo'] = checked;
                              setDataClauses(dataClauseUpdate);
                            }}
                            />
                         </TableCellMedium>
                         <TableCellMedium>
                          <LabelElement
                            htmlFor='ClauseEstimationDate'
                            type='date'
                            autoComplete='off'
                            format={'dt-mm-yyyy'}
                            value={item.fch_estimada_complecion}
                            handleOnChange={e => {
                              const dataClauseUpdate = [...dataClauses];
                              dataClauseUpdate[index]['fch_estimada_complecion'] = e.target.value;
                              setDataClauses(dataClauseUpdate);
                            }}
                          />
                         </TableCellMedium>
                         <TableCellShort className='cm-u-centerText'>
                          <IconButtonSmallSecondary
                            onClick={() => handleUpdateClause(item.id_clausula,item.flag_estimacion_hipo,item.fch_estimada_complecion)}>
                            <SymbolSave />
                          </IconButtonSmallSecondary>
                         </TableCellShort>
                       </TableDataRow>
                     );
                   })
                 }
                 </div>
             </TableDataWrapper>
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