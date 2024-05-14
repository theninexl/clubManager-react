import { useEffect, useState } from "react";
import { useGetData } from "../../hooks/useGetData";
import { useSaveData } from "../../hooks/useSaveData";
import { useEditPlayerDataContext } from "../../providers/EditPlayeProvider";

export const useGetPlayerData = (idJugador) => {
  const userParamString = idJugador?.toString();
  
  const editPlayerContext = useEditPlayerDataContext();
 
  //pedir datos del jugador
  const getPlayerData = useSaveData();

  const getPlayerDetail = (idJugador) => {
    // console.log('estoy pidiendo jugador', idJugador)
    getPlayerData.uploadData('players/getDetail',{'id_jugador':idJugador})
  }
  
  useEffect (() => {
    if (getPlayerData.responseUpload) {
      editPlayerContext.setPlayerDataDetails(getPlayerData.responseUpload?.jugador[0])
      editPlayerContext.setPlayerDataContracts(getPlayerData.responseUpload?.contratos)
      editPlayerContext.setPlayerDataVariables(getPlayerData.responseUpload?.variables)
    }
  },[getPlayerData.responseUpload])

  return {
    getPlayerDetail,
  }
}