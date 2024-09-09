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
          id_salario_fijo:'',
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
      id_clau_rescision:'',
      flag_bruto_neto:0,
      dt_inicio:'',
      dt_fin:'',
      val_clau_rescision:0,
    }
  ]  

  const contractTypes = [
    { desc_tipo_contrato: 'Laboral', id: 1 },
    { desc_tipo_contrato: 'Transfer. permanente', id: 2 },
    { desc_tipo_contrato: 'Transfer. temporal', id: 3 },
    { desc_tipo_contrato: 'Intermediación', id: 4 },
    { desc_tipo_contrato: 'Liquidación', id: 5 },
    { desc_tipo_contrato: 'Renovación inscripción', id: 6 },
  ]

  const procedureTypes = [
    { desc_tipo_procedimiento: 'Alta traspaso', id: 1 },
    { desc_tipo_procedimiento: 'Alta cesión', id: 2 },
    { desc_tipo_procedimiento: 'Alta libre', id: 3 },
    { desc_tipo_procedimiento: 'Baja traspaso', id: 4 },
    { desc_tipo_procedimiento: 'Baja cesión', id: 5 },
    { desc_tipo_procedimiento: 'Baja rescisión', id: 6 },
    { desc_tipo_procedimiento: 'Pago cláusula', id: 7 },
    { desc_tipo_procedimiento: 'Renovación inscripción', id: 8 },
    { desc_tipo_procedimiento: 'Renovación cesión', id: 9 },
  ]  

  const [creatingContractError, setCreatingContractError] = useState();
  const [creatingClauseError, setCreatingClauseError] = useState();


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

  //estados clausulas
  //donde guardo la info de los posibles combos de cada combinacion Exprexion+Condiciones
  const [variableCombos, setVariableCombos] = useState([]);
  const [variableCombos2, setVariableCombos2] = useState([]);
  //variable activa cuando estoy inspeccionado una ya creada
  const [activeVariable, setActiveVariable] = useState(null);
  //array con las variables creades
  const [savedVariables, setSavedVariables] = useState([]);
  //mostrar/ocultar capa de variable ya creada
  const [showVariable, setShowVariable] = useState(false);
  //mostrar/ocultar capa de nueva variable
  const [showNewVariableLayer, setShowNewVariableLayer ] = useState(false);
  //array para guardar las nuevas expresiones añadidas a cada variable
  const [variableExpressions, setVariableExpressions] = useState([
    { id_ExprComb:1,
      bonus_prima:'',
      id_expresion_concatenacion:'',
      id_expresion:'',
      id_expresion_operador:'',
      id_expresion_valor:'', 
      operador:'',
      condiciones:[{
        id_condicion:'',
        id_condicion_operador:'',
        id_condicion_tipo:'',
        id_condicion_valor:''
      }]
    }]);
  //guardar resultados search expressions
  const [searchExpSelected, setSearchExpSelected] = useState(null);
  const [searchExpResults, setSearchExpResults] = useState(null);
  const [showSearchExpResults, setShowSearchExpResults] = useState(false);  
  //guardar resultados search conditions
  const [searchCondSelected, setSearchCondSelected] = useState(null);
  const [searchCondResults, setSearchCondResults] = useState(null);
  const [showSearchCondResults, setShowSearchCondResults] = useState(false);
  //mostrar/ocultar capa editar contrato
  const [showEditVariableLayer, setShowEditVariableLayer] = useState(false)
  //id variable que se edita
  const [editedVariableId, setEditedVariableId] = useState(null);
  //array variable que edito
  const [detailEditVariableData, setDetailEditVariableData] = useState(null);  


  return (
    <editPlayerContext.Provider
      value={{
        playerDataDetails,setPlayerDataDetails,
        playerDataContracts,setPlayerDataContracts,
        playerDataVariables,setPlayerDataVariables,
        defaultContractSalaryArray,
        defaultContractTerminationArray,
        contractTypes,
        procedureTypes,
        creatingContractError,setCreatingContractError,
        creatingClauseError,setCreatingClauseError,
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
        variableCombos,setVariableCombos,
        variableCombos2, setVariableCombos2,
        activeVariable,setActiveVariable,
        savedVariables,setSavedVariables,
        showVariable,setShowVariable,
        showNewVariableLayer,setShowNewVariableLayer,
        variableExpressions, setVariableExpressions,
        searchExpSelected,setSearchExpSelected,
        searchExpResults,setSearchExpResults,
        showSearchExpResults,setShowSearchExpResults,
        searchCondSelected,setSearchCondSelected,
        searchCondResults,setSearchCondResults,
        showSearchCondResults,setShowSearchCondResults,
        showEditVariableLayer,setShowEditVariableLayer,
        editedVariableId,setEditedVariableId,
        detailEditVariableData,setDetailEditVariableData
      }}
    >
      { children }
    </editPlayerContext.Provider>
  );
}