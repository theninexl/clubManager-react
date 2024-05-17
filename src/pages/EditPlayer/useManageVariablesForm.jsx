import { useEffect } from "react";
import { useGlobalContext } from "../../providers/globalContextProvider";
import { useEditPlayerDataContext } from "../../providers/EditPlayeProvider";
import { useSaveData } from "../../hooks/useSaveData";
import { useGetPlayerData } from "./useGetPlayerData";

export const useManageVariablesForm = (form, idJugador) => {
  const globalContext = useGlobalContext();
  const editPlayerContext = useEditPlayerDataContext(); 

  //llamar al hook de getPlayerData para poder pedir datos de nuevo una vez guardadas/borradas variables
  const { getPlayerDetail } = useGetPlayerData();

   const getVariableCombos = useSaveData();
   const getNewVariableCombos = () => {
    getVariableCombos.uploadData('players/getCombosValues',{});
   }
   useEffect(()=>{
    // console.log('combos values', getVariableCombos.responseUpload);
     if (getVariableCombos.responseUpload) {     
      // console.log('variables combos', getVariableCombos.responseUpload.data);
      editPlayerContext.setVariableCombos(getVariableCombos.responseUpload?.data);
     }
   },[getVariableCombos.responseUpload])
  

  //añadir una nueva expresion completa a la variable
  const handleAddNewVariableExpression = (number) => {
    editPlayerContext.setVariableExpressions([...editPlayerContext.variableExpressions, {id_ExprComb:number,bonus_prima:'',id_expresion_concatenacion:'', id_expresion:'',id_expresion_operador:'',id_expresion_valor:'',condiciones:[{id_condicion:'',id_condicion_operador:'',id_condicion_tipo:'',id_condicion_valor:''}]}]) 
   }
 
  //  //manejar cambios en los campos de la expresion
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
    getExprSearch.uploadData('players/searchComboValues',{'id':id, 'search':search})}
  
  //guardar datos busqueda expresion
  useEffect(()=> {
    if (getExprSearch.responseUpload) {
      //console.log('resultados de busqueda',getExprSearch.responseUpload)
      editPlayerContext.setSearchExpResults(getExprSearch.responseUpload.data);
      editPlayerContext.setShowSearchExpResults(true);
    }
  },[getExprSearch.responseUpload])

  //pedir datos para buscar en una condicion tipo search
  const getCondSearch = useSaveData();
  const searchCondition = (id, search) => {
    // console.log('llamo a search Condition');
    getCondSearch.uploadData('players/searchComboValues',{'id':id, 'search':search})
  }
  //guardar datos busqueda jugador
  useEffect(()=> {
    if (getCondSearch.responseUpload) {
      //console.log(getCondSearch.responseUpload)
      editPlayerContext.setSearchCondResults(getCondSearch.responseUpload.data);
    }
  },[getCondSearch.responseUpload])


  //borrar una variable
  const deleteClausula = useSaveData();
  const handleDeleteClausula = (id) => {
    deleteClausula.uploadData('players/removeClausula', {'id_clausula':id.toString()})
  }

  useEffect(()=>{
    if (deleteClausula.responseUpload){
      //vuelve a pedir el detalle de clausula con el listado de arriba
      getClausulasList(globalContext.activeContractId); 
    }
  },[deleteClausula.responseUpload])

  //pedir clausulas guardadas para un contrato
  const getDetalleClausulasList = useSaveData();
  const getClausulasList = (id) => {
    getDetalleClausulasList.uploadData('players/getDetail_clausula',{id_contrato:id}); 
  }

  useEffect(()=>{
    if (getDetalleClausulasList.responseUpload) {
      editPlayerContext.setSavedVariables(getDetalleClausulasList.responseUpload?.variables)
    }
  },[getDetalleClausulasList.responseUpload])

  //guardar una nueva variable
  const saveClausula = useSaveData();

  const handleSaveNewVariable = (e) => {
    e.preventDefault();
    console.log('form en hook variables', form);
    
    const formData = new FormData(form.current);
    const amortizableVal = document.getElementById('amortizable').checked;
    //const bonusPrimaVal = document.getElementById('bonus_prima').checked;
    const expresiones = editPlayerContext.variableExpressions;
    //console.log(typeof(expresiones));

    const data = {
      expresiones,
      desc_alias: formData.get('descripcion'),
      bloque: formData.get('bloque'),
      tipo_importe: formData.get('tipo_importe'),
      fecha_desde: formData.get('dateSince'),
      fecha_hasta: formData.get('dateTo'),
      amortizable: amortizableVal ? 1 : 0,
      num_importe: formData.get('variableAmount'),
      id_beneficiario: formData.get('variableBeneficiary'),
    }

    const dataSent = {
      'id_contrato': globalContext.activeContractId,
      'variable': data,
    }

    // console.log('variable que guardo', data);
    console.log('variable que mando', dataSent);

    saveClausula.uploadData('players/createClausula', dataSent);
    // setSavedVariables([...savedVariables, dataSent]);    
  }

  useEffect(()=>{
    if (saveClausula.responseUpload) {
      //console.log (saveClausula.responseUpload);
      if (saveClausula.responseUpload.status === 'ok') {
        editPlayerContext.setShowNewVariableLayer(false);
        editPlayerContext.setVariableExpressions([{id_ExprComb:1,bonus_prima:'',id_expresion:'',id_expresion_operador:'',id_expresion_valor:'',condiciones:[{id_condicion:'',id_condicion_operador:'',id_condicion_tipo:'',id_condicion_valor:''}]}]);
        //vuelve a pedir el detalle de clausula con el listado de arriba
        getClausulasList(globalContext.activeContractId); 
        //getPlayersAgain();
      } else {
        editPlayerContext.setError('Existe un error en el formulario, inténtelo de nuevo')
      }
    }
  },[saveClausula.responseUpload])

  return {
    getNewVariableCombos,
    handleAddNewVariableExpression,
    handleChangesOnNewVariableExpression,
    handleChangesOnNewVariableExpressionToggle,
    handleDeleteNewVariableExpression,
    handleAddNewCond,
    handleDeleteNewCond,
    searchExpression,
    searchCondition,
    handleDeleteClausula,
    handleSaveNewVariable,
    getClausulasList,
  }
}