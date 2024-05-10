import { useEffect } from "react";
import { useSaveData } from "../../hooks/useSaveData";
import { useGetPlayerData } from "./useGetPlayerData";
import { useEditPlayerDataContext } from "../../providers/EditPlayeProvider";

export const useManageVariablesForm = ({ form, idJugador }) => {
  const editPlayerContext = useEditPlayerDataContext();

  //llamar al hook de getPlayerData para poder pedir datos de nuevo una vez guardadas/borradas variables
  const { getPlayerDetail } = useGetPlayerData();

  const getVariableCombos = useSaveData();
  
  const getNewVariableCombos = () => {
    console.log('llamada a getCombosValues');
    getVariableCombos.uploadData('players/getCombosValues');
  };

  useEffect (() => {
    console.log('variable combos', getVariableCombos.responseGetData)
    if (getVariableCombos.responseGetData) {
      
      editPlayerContext.setVariableCombos(getNewVariableCombos.responseGetData.data.data);
    }
  },[getVariableCombos.responseUpload])

  //añadir una nueva expresion completa a la variable
  const handleAddNewVariableExpression = (number) => {
    editPlayerContext.setVariableExpressions([...editPlayerContext.variableExpressions, {id_ExprComb:number,bonus_prima:'',id_expresion_concatenacion:'', id_expresion:'',id_expresion_operador:'',id_expresion_valor:'',condiciones:[{id_condicion:'',id_condicion_operador:'',id_condicion_tipo:'',id_condicion_valor:''}]}]) 
   }
 
   //manejar cambios en los campos de la expresion
   const handleChangesOnNewVariableExpression = (event, index) => {
     let {name, value} = event.target;
     let onChangeValue = [...editPlayerContext.variableExpressions];
     onChangeValue[index][name] = value;
     editPlayerContext.setVariableExpressions(onChangeValue);
   }

   const handleChangesOnNewVariableExpressionToggle = (event, index) => {
    let {name, checked} = event.target;
    let onChangeValue = [...editPlayerContext.variableExpressions];
    onChangeValue[index][name] = checked ? 1 : 0;
    editPlayerContext.setVariableExpressions(onChangeValue);
  }
 
   const handleDeleteNewVariableExpression = (index) => {
     const newExpressionsArray = [...editPlayerContext.variableExpressions];
     newExpressionsArray.splice(index,1);
     editPlayerContext.setVariableExpressions(newExpressionsArray);
   }

   //añadir nueva condicion al crear variable
  const handleAddNewCond = (indexExpr,indexNewCond) => {
    let onChangeValue = [...editPlayerContext.variableExpressions];
    onChangeValue[indexExpr]["condiciones"][indexNewCond] = {id_condicion:'',id_condicion_operador:'',id_condicion_tipo:'',id_condicion_valor:''};
    editPlayerContext.setVariableExpressions(onChangeValue);
  }

  //borrar una nueva condicion al crear variable
  const handleDeleteNewCond = (indexExpr, indexCond) => {
    let newExpressionsArray = [...editPlayerContext.variableExpressions];
    let newConditionsArray = [...newExpressionsArray[indexExpr].condiciones]
    newExpressionsArray[indexExpr].condiciones = [];
    newConditionsArray.splice(indexCond, 1);
    newExpressionsArray[indexExpr]["condiciones"] = newConditionsArray;    
    editPlayerContext.setVariableExpressions(newExpressionsArray);
  }
  
  //pedir datos para buscar en una expresion tipo search
  const getExprSearch = useSaveData();
  const searchExpression = (id, search) => {
    getExprSearch.uploadData('players/searchComboValues',{'id':id, 'search':search})
  }
  //guardar datos busqueda expresion
  useEffect(()=> {
    if (getExprSearch.responseUpload) {
      //console.log('resultados de busqueda',getExprSearch.responseUpload)
      editPlayerContext.setSearchExpResults(getExprSearch.responseUpload.data);
      editPlayerContext.setShowSearchExpResults(true);
    }
  },[getExprSearch.responseUpload])

  //pedir detalle de clausula cuando seleccionamos un contrato
  const getDetalleClausula = useSaveData();
  

  //borrar una variable
  const deleteClausula = useSaveData();
  const handleDeleteClausula = (id) => {
    deleteClausula.uploadData('players/removeClausula', {'id_clausula':id.toString()})
  }

  useEffect(()=>{
    if (deleteClausula.responseUpload){
      //vuelve a pedir el detalle de clausula con el listado de arriba
      getDetalleClausula.uploadData('players/getDetail_clausula',{id_contrato: editPlayerContext.activeContractId.toString()}); 
      getPlayerDetail(idJugador)
    }
  },[deleteClausula.responseUpload])

  return {
    handleAddNewVariableExpression,
    handleChangesOnNewVariableExpression,
    handleChangesOnNewVariableExpressionToggle,
    handleDeleteNewVariableExpression,
    handleAddNewCond,
    handleDeleteNewCond,
    searchExpression,
    handleDeleteClausula,
    getNewVariableCombos,
  };
}