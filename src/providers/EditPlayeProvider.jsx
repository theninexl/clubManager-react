import React, { useContext, useState } from "react";

const editPlayerContext = React.createContext();

export const useEditPlayerDataContext = () => {
  return useContext(editPlayerContext);
}

export const EditPlayerContextProvider = ({ children }) => {

  //estados datos generales jugador
  const [playerDataDetails, setPlayerDataDetails ] = useState({
    'desc_alias': '',
    'desc_apellido1': '',
    'desc_apellido2': '',
    'desc_dni_nie': '',
    'desc_nombre': '',
    'desc_nss': '',
    'desc_pasaporte1': '',
    'desc_pasaporte2': '',
    'dt_caducidad_dni': '',
    'dt_caducidad_pasaporte1': '',
    'dt_caducidad_pasaporte2': '',
    'dt_nacimiento': '',
    'flag_comunitario': '',
    'flag_cotonu': '', 
    'flag_residencia': '',
    'id_jugador': '',
    'id_nacionalidad1': '',
    'id_nacionalidad2': '',
    'id_posicion': '',
    'id_tipo_jugador': '',
    'val_valor_mercado': '',
  })
  const [playerDataContracts, setPlayerDataContracts] = useState([]);
  const [playerDataVariables, setPlayerDataVariables] = useState([]);

  //estados creación de contratos
  const defaultContractSalaryArray = [
    {
      id_salaryComb:1,
      importe_fijo:'',
      beneficiario:'',
      salaryComb: [
        {
          id_salario_fijo:1,
          flag_bruto_neto:0,
          dt_inicio:'',
          dt_fin:'',
          val_salario_fijo:0,
        },
      ],
    }
  ]
  const defaultContractTerminationArray = [
    {
      id_clau_rescision:1,
      flag_bruto_neto:0,
      dt_inicio:'',
      dt_fin:'',
      val_clau_rescision:0,
    }
  ]  
  const [creatingContractError, setCreatingContractError] = useState();

  //id contracto activo
  const [activeContractId, setActiveContractId] = useState(null);
  //contrato activo
  const [activeContractData, setActiveContractData] = useState(null);
  //mostrar capa crear nuevo contrato
  const [newContract, setNewContract] = useState(false);
  //datos necesario para creacion de nueva combinación de salario al crear nuevo contrato
  const [newContractDataForSalaryComb, setNewContractDataForSalaryComb] = useState({
    descType:0,
    originClubId:null,
    destinationClubId:null,
    intermediary1:null,
    intermediary1Id:null,
    intermediary2:null,
    intermediary2Id:null,
    intermediary3:null,
    interediary3Id:null,
  });
  //array para guardar las nuevas combinaciones de sueldo añadidas a cada contrato
  const [contractSalary, setContractSalary] = useState(defaultContractSalaryArray);
  //array para guardar las nuevas combinaciones de sueldo añadidas a cada contrato
  const [contractTermination, setContractTermination] = useState(defaultContractTerminationArray);
  //mostrar/ocultar capa editar contrato
  const [editContract, setEditContract] = useState(false)
  //id contrato que se edita
  const [editedContractId, setEditedContractId] = useState(null);
  //array contrato que edito
  const [detailContractData, setDetailContractData] = useState(null);
  //array con combinaciones de sueldo que edito
  const [detailSalaryData, setDetailSalaryData] = useState(null);
  //array con combinaciones de clausula rescision que edito
  const [detailTerminationData, setDetailTerminationData] = useState(null);


  return (
    <editPlayerContext.Provider
      value={{
        playerDataDetails,setPlayerDataDetails,
        playerDataContracts,setPlayerDataContracts,
        playerDataVariables,setPlayerDataVariables,
        defaultContractSalaryArray,
        defaultContractTerminationArray,
        creatingContractError,setCreatingContractError,
        activeContractId,setActiveContractId,
        activeContractData,setActiveContractData,
        newContract,setNewContract,
        newContractDataForSalaryComb,setNewContractDataForSalaryComb,
        contractSalary,setContractSalary,
        contractTermination,setContractTermination,
        editContract,setEditContract,
        editedContractId,setEditedContractId,
        detailContractData,setDetailContractData,
        detailSalaryData,setDetailSalaryData,
        detailTerminationData,setDetailTerminationData,
      }}
    >
      { children }
    </editPlayerContext.Provider>
  );
}