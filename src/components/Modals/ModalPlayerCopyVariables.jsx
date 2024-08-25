import { useEffect, useState } from "react";
import { useSaveData } from "../../hooks/useSaveData";
import { SearchResultsBox } from "../UI/components/form simple/searchResultsBox";
import { ModalBody, ModalContainer, ModalContent__Big, ModalFooter } from "../UI/components/modal/modal";
import { ButtonCatPrimary, ButtonCatTransparent, } from "../UI/objects/buttons";
import { FieldWithIcon, FieldWithIcon__input, FormSimpleHrz } from "../UI/components/form simple/formSimple";
import { RegularContainer } from "../UI/layout/containers";
import { StaticBodyHeader } from "../UI/layout/headers";
import { TableCellLong, TableCellMedium, TableDataRow, TableDataWrapper } from "../UI/layout/tableData";


export const ModalPlayerCopyVariables = ({ state, setState, playerId, activeContractId }) => {
    //estados recuperar y seleccionar nombre jugador
    const [playersList, setPlayersList] = useState('');
    const [writtenPlayer, setWrittenPlayer] = useState('');
    const [selectedPlayer, setSelectedPlayer] = useState('');
    const [resultsBox, setResultsBox] = useState(false);
    //variables jugador seleccionado
    const [variablesListMsg, setVariablesListMsg] = useState('Seleccione un jugador');
    const [selectedPlayerVars, setSelectedPlayerVars] = useState(null);

    //vacias estados primera vez
    useEffect(()=>{
      //console.log('abro modal useEffect');
      setWrittenPlayer('');
      setSelectedPlayer('');
    },[])

    //solicitud lista jugadores
    const getPlayers = useSaveData();
    const searchPlayers = (search) => getPlayers.uploadData('players/copyClausulaListajugador',{'search':search});
    useEffect(()=>{
      // console.log('resul busqueda jugadores', getPlayers.responseUpload)
      setPlayersList(getPlayers.responseUpload?.data);
    },[getPlayers.responseUpload])

    //recoger jugador seleccionado en busqueda y pedir la busqueda de variables
    useEffect(()=>{
      if (selectedPlayer) {
        // console.log('player seleccionado', selectedPlayer);
        getPlayerVars(selectedPlayer.id_jugador.toString());
      }
    },[selectedPlayer])

    //solicitud variables jugador
    const getClausulaList = useSaveData();
    const getPlayerVars = (numberId) => getClausulaList.uploadData('players/copyClausulaListavariable',{'id_jugador':numberId})
    useEffect(()=>{
      //console.log('clausulas jugador',selectedPlayer.id_jugador,getClausulaList.responseUpload);
      if (getClausulaList.responseUpload?.data) {
        setSelectedPlayerVars(getClausulaList.responseUpload.data);
        setVariablesListMsg('Seleccione un jugador')
      } else {
        setVariablesListMsg('No existen cláusulas para el jugador seleccionado')
      }
    },[getClausulaList.responseUpload])

    //copiar variable
    const copyVariable = useSaveData();
    const copySelectedVariable = (varId) => {
      console.log('copy variable', 'playerID:', playerId, ' idContrato:',activeContractId, ' idClausula:',varId);
      copyVariable.uploadData('players/copyClausula', {
        'id_jugador': playerId.toString(),
        'id_contrato': activeContractId.toString(),
        'id_clausula': varId.toString(),
      });
    }
    useEffect(()=>{
      if (copyVariable.responseUpload?.status == 'ok'){
        setWrittenPlayer('');
        setSelectedPlayer('');
        setSelectedPlayerVars(null);
        setState(!state);
      }
    },[copyVariable.responseUpload])

    

    return (
      <>
      { state &&
        <ModalContainer>
          <ModalContent__Big>
            <ModalBody>
              {/* Buscador header */}
              
              <FormSimpleHrz>
                <div className='cm-c-dropdown-select cm-u-spacer-mb-small'>
                  <FieldWithIcon>
                    <FieldWithIcon__input 
                      name='searchPlayer'
                      placeholder='Buscar jugador'
                      value={writtenPlayer}
                      handleOnChange={(e) => {
                        setWrittenPlayer(e.target.value);
                        if (e.target.value.length > 1 ) {
                          searchPlayers(e.target.value);
                          setResultsBox(true);
                        } else if ((e.target.value.length <= 1 )) {
                          setPlayersList('');
                          setSelectedPlayer('');
                          setResultsBox(false);
                          setSelectedPlayerVars(null);                         
                        }
                      }}
                    />
                  </FieldWithIcon>
                  <SearchResultsBox
                    state={resultsBox}
                    setOnField={setWrittenPlayer}
                    setState={setResultsBox}
                    results={playersList}
                    setSelected={setSelectedPlayer}
                  />
                </div>
              </FormSimpleHrz>
              {/* Resultados */}
              <RegularContainer>
                <StaticBodyHeader className='cm-u-spacer-mb-bigger'><span className='cm-u-text-black-cat'>Cláusulas</span></StaticBodyHeader>
                <TableDataWrapper>
                  { selectedPlayerVars ? 
                    <>
                      { selectedPlayerVars.map(item => {
                        
                        return (
                          <TableDataRow key={item.id_clausula}>
                            <TableCellLong>
                              {item.desc_alias}
                            </TableCellLong>
                            <TableCellMedium className='cm-u-textRight'>
                              <ButtonCatPrimary
                                onClick={() => {
                                  copySelectedVariable(item.id_clausula)
                                }}
                              >
                                Copiar
                              </ButtonCatPrimary>
                            </TableCellMedium>
                          </TableDataRow>
                        )
                      })}
                    </>
                    :
                    <>
                      <TableDataRow className='cm-u-spacer-mb-bigger cm-u-centerText'>
                      <p className="error">{variablesListMsg}</p>
                      </TableDataRow>
                    </>
                  }
                </TableDataWrapper>
              </RegularContainer>
            </ModalBody>
            <ModalFooter>
              <ButtonCatTransparent
                onClick={() => {
                  setSelectedPlayer('');
                  setState(!state);
                }}>
                  Cancelar
              </ButtonCatTransparent>
            </ModalFooter>
          </ModalContent__Big>
        </ModalContainer>       
      }
      </>
    );

}