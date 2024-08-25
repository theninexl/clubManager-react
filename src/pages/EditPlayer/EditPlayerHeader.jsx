import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useGlobalContext } from "../../providers/globalContextProvider"
import { HeadContentTitleBar, TitleBar__TitleAvatar, TitleBar__Tools } from "../../components/UI/layout/centralContentComponents"
import { IconButtonSmallPrimary } from "../../components/UI/objects/buttons"
import { SymbolBack, SymbolDelete } from "../../components/UI/objects/symbols"
import { useEditPlayerDataContext } from "../../providers/EditPlayeProvider"
import { useGetPlayerData } from "./useGetPlayerData"


export const EditPlayerHeader = ({ idJugador, }) => {
  const globalContext = useGlobalContext()
  const editPlayerContext = useEditPlayerDataContext();

  //navegar
  const navigate = useNavigate();

  //pedir datos de jugador
  const {
    getPlayerDetail,
    } = useGetPlayerData(idJugador);

    useEffect(()=>{
      getPlayerDetail(idJugador);
    },[globalContext.modalImportVar])

  return (
    <HeadContentTitleBar>
      <TitleBar__TitleAvatar
        avatarText='Editar\nJugador'>
        {`${editPlayerContext.playerDataDetails.desc_nombre} ${editPlayerContext.playerDataDetails.desc_apellido1}`}
      </TitleBar__TitleAvatar>
      <TitleBar__Tools>
        <IconButtonSmallPrimary
          onClick={(e) => {
            e.preventDefault();
            globalContext.setEditPlayerModalDelete(true);
          }}>
          <SymbolDelete/>
        </IconButtonSmallPrimary>
        <IconButtonSmallPrimary
          onClick={() => {
            globalContext.setActiveContractId();
            navigate('/manage-players')}}>
          <SymbolBack />
        </IconButtonSmallPrimary>
      </TitleBar__Tools>
    </HeadContentTitleBar>
  )
}