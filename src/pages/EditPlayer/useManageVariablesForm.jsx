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

  //obtener las opciones para los combos de creación de nueva variable
  const getVariableCombos = useSaveData();
  const getNewVariableCombos = (contractId) => {
  getVariableCombos.uploadData('players/getCombosValues',{'id_contrato': contractId});
  }
  useEffect(()=>{
    if (getVariableCombos.responseUpload) {     
    // console.log('variablescombos', getVariableCombos.responseUpload);
    editPlayerContext.setVariableCombos(getVariableCombos.responseUpload);
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

  //añadir una linea de expresion nueva editando una variable
  const handleAddNewDetailVariableExpression = () => {
    console.log('add nueva linea de expresion');
    const newIndex = editPlayerContext.detailEditVariableData[0].expresiones.length;
    const newExpression = {
      id_ExprComb: newIndex,
      bonus_prima: 0,
      id_expresion_concatenacion: '',
      id_expresion: '',
      id_expresion_operador: '',
      id_expresion_valor: '',
      condiciones: []
    };

    const updatedDetailEditVariableData = [...editPlayerContext.detailEditVariableData]
    const targetItem = updatedDetailEditVariableData[0];
    targetItem.expresiones = [...targetItem.expresiones, newExpression];

    editPlayerContext.setDetailEditVariableData(updatedDetailEditVariableData);
  };

  //manejar cambios en la nueva linea de expresión editando una variable
  const handleChangesOnDetailVariableExpression = (event, index) => {
    const { name, value } = event.target;

    const updatedDetailEditVariableData = [...editPlayerContext.detailEditVariableData];
    const targetItem = { ...updatedDetailEditVariableData[0] };
    const updatedExpressions = [...targetItem.expresiones];

    // Actualiza el campo específico de la expresión en la posicion index
    updatedExpressions[index] = { 
      ...updatedExpressions[index], 
      [name]: value 
    };

    targetItem.expresiones = updatedExpressions;
    updatedDetailEditVariableData[0] = targetItem;
    editPlayerContext.setDetailEditVariableData(updatedDetailEditVariableData);
  };

  //manejar cambios en el toggle bonusprima editando una variable
  const handleChangesOnDetailVariableExpressionToggle = (event, index) => {
    const { name, checked } = event.target;
    const updatedDetailEditVariableData = [...editPlayerContext.detailEditVariableData];
    const targetItem = { ...updatedDetailEditVariableData[0] };
    const updatedExpressions = [...targetItem.expresiones];

    // Copia la expresión específica que se va a modificar
    const updatedExpression = { ...updatedExpressions[index] };

    // Actualiza la clave 'bonus_prima' según el estado del checkbox
    updatedExpression.bonus_prima = checked ? true : false;

    if (checked) {
        // Si el check se activa, añade una nueva condición vacía si no existe ya
        if (updatedExpression.condiciones.length === 0) {
            updatedExpression.condiciones.push({
                id_condicion: '',
                id_condicion_operador: '',
                id_condicion_tipo: '',
                id_condicion_valor: ''
            });
        }
    } else {
        // Si el check se desactiva, vacía el array de condiciones
        updatedExpression.condiciones = [];
    }

    // Reemplaza la expresión actualizada en el array de expresiones
    updatedExpressions[index] = updatedExpression;
    targetItem.expresiones = updatedExpressions;
    updatedDetailEditVariableData[0] = targetItem;
    editPlayerContext.setDetailEditVariableData(updatedDetailEditVariableData);

  };

  //manejar el borrado de una nueva linea de expresión editando una variable
  const handleDeleteDetailVariableExpression = (index) => {
    const updatedDetailEditVariableData = [...editPlayerContext.detailEditVariableData];
    const targetItem = updatedDetailEditVariableData[0];

    targetItem.expresiones.splice(index, 1);

    // Actualiza el estado con el nuevo array de expresiones
    editPlayerContext.setDetailEditVariableData(updatedDetailEditVariableData);
  };

  //añadir una nueva linea de condicion editando una variable
  const handleAddNewDetailCond = (indexExpr) => {
    const updatedDetailEditVariableData = [...editPlayerContext.detailEditVariableData];
    const targetItem = { ...updatedDetailEditVariableData[0] };
    const updatedExpressions = [...targetItem.expresiones];
    
    // Clona la expresión específica
    const updatedExpression = { ...updatedExpressions[indexExpr] };

    // Añade una nueva condición vacía al final del array `condiciones`
    updatedExpression.condiciones.push({
        id_condicion: '',
        id_condicion_operador: '',
        id_condicion_tipo: '',
        id_condicion_valor: ''
    });

    // Actualiza la expresión en `expresiones`
    updatedExpressions[indexExpr] = updatedExpression;
    targetItem.expresiones = updatedExpressions;
    updatedDetailEditVariableData[0] = targetItem;
    editPlayerContext.setDetailEditVariableData(updatedDetailEditVariableData);
  };

  //borrar una nueva linea de condiciones editando una variable
  const handleDeleteDetailCond = (indexExpr, indexCond) => {
    const updatedDetailEditVariableData = [...editPlayerContext.detailEditVariableData];
    const targetItem = { ...updatedDetailEditVariableData[0] };
    const updatedExpressions = [...targetItem.expresiones];
    const updatedExpression = { ...updatedExpressions[indexExpr] };

    // Elimina la condición en el índice `indexCond`
    updatedExpression.condiciones.splice(indexCond, 1);

    // Actualiza la expresión en `expresiones`
    updatedExpressions[indexExpr] = updatedExpression;
    targetItem.expresiones = updatedExpressions;
    updatedDetailEditVariableData[0] = targetItem;
    editPlayerContext.setDetailEditVariableData(updatedDetailEditVariableData);
  };
  
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

  //pedir datos para editar una variable que ya existe
  const getClausulaDetail = useSaveData();

  const handleEditClausula = (id) => {
    getClausulaDetail.uploadData('players/getDetail_clausula',{id_clausula:id})  }

  useEffect(()=>{
    const response = getClausulaDetail.responseUpload;

    if(response) {
      console.log('detalle variable que quiero editar', response);
      //guardar datos variable
      editPlayerContext.setDetailEditVariableData(response.variables)
      //capa edicion variable
      editPlayerContext.setShowEditVariableLayer(true);
    }

  },[getClausulaDetail.responseUpload])



  //borrar una variable
  const deleteClausula = useSaveData();
  const handleDeleteClausula = (id) => {
    deleteClausula.uploadData('players/removeClausula', {'id_clausula':id.toString()})
  }

  useEffect(()=>{
    if (deleteClausula.responseUpload){
      //vuelve a pedir el detalle de clausula con el listado de arriba
      console.log('he borrado la clausula, y vuelvo a pedir las clausulas para el contrato:', globalContext.activeContractId)
      getClausulasList(globalContext.activeContractId); 
    }
  },[deleteClausula.responseUpload])

  //pedir clausulas guardadas para un contrato
  const getDetalleClausulasList = useSaveData();
  const getClausulasList = (id) => {
    getDetalleClausulasList.uploadData('players/getAllDetail_clausula',{id_contrato:id}); 
  }

  useEffect(()=>{
    if (getDetalleClausulasList.responseUpload) {
      editPlayerContext.setSavedVariables(getDetalleClausulasList.responseUpload?.clausulas)
    }
  },[getDetalleClausulasList.responseUpload])

  //guardar una nueva variable
  const saveClausula = useSaveData();

  const handleSaveNewVariable = (e) => {
    e.preventDefault();
    //console.log('form en hook variables', form);
    const recursiveBlocksVal = document.getElementById('recursiveBlocks').checked;
    const flagBrutoNetoVal = document.getElementById('flag_bruto_neto').checked;
    
    const formData = new FormData(form.current);
  
    const expresiones = editPlayerContext.variableExpressions;
    //procesar expresiones para quitar las condiciones a aquellas que no tengan por ser tipo bonus
    const findNoComb = expresiones.filter(item => item.bonus_prima !== 1);

    const newExpresiones = [...expresiones]
    findNoComb.map(item => {
      newExpresiones[item.id_ExprComb -1]['condiciones'] = []
    })

    const data = {
      expresiones: newExpresiones,
      flag_bloque_recursivo: recursiveBlocksVal ? 1 : 0,
      desc_alias: formData.get('descripcion'),
      bloque: formData.get('bloque') === null ? '' : formData.get('bloque'),
      tipo_importe: formData.get('tipo_importe'),
      fecha_desde: formData.get('dateSince'),
      fecha_hasta: formData.get('dateTo'),
      // amortizable: amortizableVal ? 1 : 0,
      flag_bruto_neto: flagBrutoNetoVal ? 1 : 0,
      num_importe: formData.get('variableAmount'),
      id_beneficiario: formData.get('variableBeneficiary'),
      id_anexo: formData.get('variableAnexoVI'),
      new:true
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
      console.log ("save clausula", saveClausula.responseUpload);
      if (saveClausula.responseUpload.status === 'ok') {
        editPlayerContext.setShowNewVariableLayer(false);
        editPlayerContext.setVariableExpressions([{id_ExprComb:1,bonus_prima:'',id_expresion:'',id_expresion_operador:'',id_expresion_valor:'',condiciones:[{id_condicion:'',id_condicion_operador:'',id_condicion_tipo:'',id_condicion_valor:''}]}]);
        //vuelve a pedir el detalle de clausula con el listado de arriba
        getClausulasList(globalContext.activeContractId); 
        //borrar el error
        editPlayerContext.setCreatingClauseError(null);
      } else {
        editPlayerContext.setCreatingClauseError('Existe un error en el formulario, inténtelo de nuevo')
      }
    }
  },[saveClausula.responseUpload])

  //edit variale existente
  const editClausula = useSaveData();

  const handleSaveExistingVariable = (e) => {
    e.preventDefault();
    //console.log('form en hook variables', form);
    const recursiveBlocksVal = document.getElementById('recursiveBlocks').checked;
    const flagBrutoNetoVal = document.getElementById('flag_bruto_neto').checked;
    
    const formData = new FormData(form.current);
  
    const expresiones = editPlayerContext.variableExpressions;
    //procesar expresiones para quitar las condiciones a aquellas que no tengan por ser tipo bonus
    const findNoComb = expresiones.filter(item => item.bonus_prima !== 1);

    const newExpresiones = [...expresiones]
    findNoComb.map(item => {
      newExpresiones[item.id_ExprComb -1]['condiciones'] = []
    })

    const data = {
      expresiones: newExpresiones,
      flag_bloque_recursivo: recursiveBlocksVal ? 1 : 0,
      desc_alias: formData.get('descripcion'),
      bloque: formData.get('bloque') === null ? '' : formData.get('bloque'),
      tipo_importe: formData.get('tipo_importe'),
      fecha_desde: formData.get('dateSince'),
      fecha_hasta: formData.get('dateTo'),
      // amortizable: amortizableVal ? 1 : 0,
      flag_bruto_neto: flagBrutoNetoVal ? 1 : 0,
      num_importe: formData.get('variableAmount'),
      id_beneficiario: formData.get('variableBeneficiary'),
      id_anexo: formData.get('variableAnexoVI'),
      new:true
    }

    const dataSent = {
      'id_clausula': editPlayerContext.detailEditVariableData[0].id_clausula,
      'variable': data,
    }

    // console.log('variable que guardo', data);
    console.log('variable que mando', dataSent);
    saveClausula.uploadData('players/editClausula', dataSent);
    // setSavedVariables([...savedVariables, dataSent]);    
  }

  useEffect(()=>{
    if (editClausula.responseUpload) {
      console.log ("edit clausula", editClausula.responseUpload);
      if (editClausula.responseUpload.status === 'ok') {
        editPlayerContext.setShowEditVariableLayer(false);
        editPlayerContext.setVariableExpressions([{id_ExprComb:1,bonus_prima:'',id_expresion:'',id_expresion_operador:'',id_expresion_valor:'',condiciones:[{id_condicion:'',id_condicion_operador:'',id_condicion_tipo:'',id_condicion_valor:''}]}]);
        //vuelve a pedir el detalle de clausula con el listado de arriba
        getClausulasList(globalContext.activeContractId); 
        //borrar el error
        editPlayerContext.setCreatingClauseError(null);
      } else {
        editPlayerContext.setCreatingClauseError('Existe un error en el formulario, inténtelo de nuevo')
      }
    }
  },[editClausula.responseUpload])


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
    handleEditClausula,
    handleDeleteClausula,
    handleSaveNewVariable,
    handleSaveExistingVariable,
    getClausulasList,
    handleAddNewDetailVariableExpression,
    handleChangesOnDetailVariableExpression,
    handleChangesOnDetailVariableExpressionToggle,
    handleDeleteDetailVariableExpression,
    handleAddNewDetailCond,
    handleDeleteDetailCond
  }
}