import { useEffect } from "react";
import { useGlobalContext } from "../../providers/globalContextProvider";
import { useEditPlayerDataContext } from "../../providers/EditPlayeProvider"
import { useSaveData } from "../../hooks/useSaveData";
import { useGetPlayerData } from "./useGetPlayerData";



export const useManageContractForm = (form, idJugador) => {
  const globalContext = useGlobalContext();
  const editPlayerContext = useEditPlayerDataContext();

  //llamar al hook de getPlayerData para poder pedir datos de nuevo una vez guardados/borrados contratos
  const { getPlayerDetail } = useGetPlayerData();

  //añadir una nueva linea de combinación de salario
  const handleAddNewSalaryComb = (number) => {
    editPlayerContext.setContractSalary([...editPlayerContext.contractSalary, {
      id_salaryComb:number,
      importe_fijo:'',
      beneficiario:'',
      salaryComb: [
        {
          id_salario_fijo:1,
          flag_bruto_neto:0,
          dt_inicio:'',
          dt_fin:'',
          val_salario_fijo:0
        },
      ],
    }]) 
  }

  //borrar linea de combinación de salario
  const handleDeleteNewSalaryComb = (index) => {
    const newSalariesArray = [...editPlayerContext.contractSalary];
    newSalariesArray.splice(index,1);
    editPlayerContext.setContractSalary(newSalariesArray);
  }

  //manejar cambios en los campos de la linea de combinación de salario
  const handleChangesOnNewSalaryComb = (event, index) => {
    let {name, value} = event.target;
    let onChangeValue = [...editPlayerContext.contractSalary];
    onChangeValue[index][name] = value;
    editPlayerContext.setContractSalary(onChangeValue);
  }

  const handleChangesOnNewSalaryCombIfToggle = (event, index) => {
    let {name, checked} = event.target;
    let onChangeValue = [...editPlayerContext.contractSalary];
    onChangeValue[index][name] = checked ? 1 : 0;
    editPlayerContext.setContractSalary(onChangeValue);
  }

  //añadir una nueva linea de salario fijo a la combinacion de salario
  const handleAddNewFixedSalaryLine = (indexComb, indexNewFSL) => {
    let onChangeValue = [...editPlayerContext.contractSalary];
    onChangeValue[indexComb]["salaryComb"][indexNewFSL] = {id_salario_fijo:indexNewFSL+1,flag_bruto_neto:'0',dt_inicio:'',dt_fin:'',val_salario_fijo:''};
    console.log(onChangeValue);
    editPlayerContext.setContractSalary(onChangeValue);
  }

  //borrar una linea de salario fijo a la combinación de salario
  const handleDeleteNewFixedSalaryLine = (indexComb, indexNewFSL) => {
    let newSalaryCombArray = [...editPlayerContext.contractSalary];
    let newFSLArray = [...newSalaryCombArray[indexComb].salaryComb];
    newSalaryCombArray[indexComb].salaryComb = [];
    newFSLArray.splice(indexNewFSL, 1);
    newSalaryCombArray[indexComb]["salaryComb"] = newFSLArray;
    editPlayerContext.setContractSalary(newSalaryCombArray);
  }

  //añadir una nueva linea de rescisión
  const handleAddNewTerminationClause = (number) => {
    editPlayerContext.setContractTermination([...editPlayerContext.contractTermination, {id_clau_rescision:number,flag_bruto_neto:0,dt_inicio:'',dt_fin:'',val_clau_rescision:''}]) 
   }

  const handleAddEditTerminationClause = (number) => {
    editPlayerContext.setDetailTerminationData([...editPlayerContext.detailTerminationData, {id_clau_rescision:number,flag_bruto_neto:0,dt_inicio:'',dt_fin:'',val_clau_rescision:''}]) 
  }
  
   //borrar linea de rescisión
   const handleDeleteNewTerminationClause = (index) => {
    const newTerminationArray = [...editPlayerContext.contractTermination];
    newTerminationArray.splice(index,1);
    editPlayerContext.setContractTermination(newTerminationArray);
  }

  const handleDeleteEditTerminationClause = (index) => {
    const newTerminationArray = [...editPlayerContext.detailTerminationData];
    newTerminationArray.splice(index,1);
    editPlayerContext.setDetailTerminationData(newTerminationArray);
  }
  
  //manejar cambios en los campos de la linea de rescisión
  const handleChangesOnNewTerminationClause = (event, index) => {
    let {name, value} = event.target;
    let onChangeValue = [...editPlayerContext.contractTermination];
    onChangeValue[index][name] = value;
    editPlayerContext.setContractTermination(onChangeValue);
  }

  const handleChangesOnEditTerminationClause = (event, index) => {
    let {name, value} = event.target;
    let onChangeValue = [...editPlayerContext.detailTerminationData];
    onChangeValue[index][name] = value;
    editPlayerContext.setDetailTerminationData(onChangeValue);
  }

  const handleChangesOnNewTerminationClauseIfToggle = (event, index) => {
    let {name, checked} = event.target;
    let onChangeValue = [...editPlayerContext.contractTermination];
    onChangeValue[index][name] = checked ? 1 : 0;
    editPlayerContext.setContractTermination(onChangeValue);
  }

  const handleChangesOnEditTerminationClauseIfToggle = (event, index) => {
    let {name, checked} = event.target;
    let onChangeValue = [...editPlayerContext.detailTerminationData];
    onChangeValue[index][name] = checked ? 1 : 0;
    editPlayerContext.setDetailTerminationData(onChangeValue);
  }

  //guardar un nuevo contrato
  const saveNewContract = useSaveData();

  const handleAddNewContract = (idJugador) => {
    const userParamString = idJugador.toString();
    const formData = new FormData(form.current);

    const salarios = editPlayerContext.contractSalary;
    const rescision = editPlayerContext.contractTermination;

    const data = {
      clausula_rescision:rescision,
      id_jugador: userParamString,
      desc_descripcion: formData.get('contractDescription'),
      desc_tipo_contrato: formData.get('contractType'),
      desc_tipo_procedimiento: formData.get('procedureType'),
      id_club_origen: formData.get('playerTeamOrigin'),
      id_club_destino: formData.get('playerTeamDestination'),
      int_dorsal: formData.get('contractDorsal'),
      dt_inicio_contrato: formData.get('contractStartDate'),
      dt_inicio_contrato_real: formData.get('contractRealStartDate'),
      dt_fin_contrato: formData.get('contractEndDate'),
      val_pct_pago_atm: formData.get('clubPercentage'),
      val_imp_salario_total: formData.get('amountTotalSalary'),      
      salario_fijo:salarios,      
    }

    const savedContract = {
      // id_contrato: '',
      id_intermediario_1: formData.get('contractIntermediary1'),
      id_intermediario_2: formData.get('contractIntermediary2'),
      id_intermediario_3: formData.get('contractIntermediary3'),
    }


    if (data) {
      for (const [key, value] of Object.entries(data)) {        
        if (value == '-1' || value == '') {
          console.log('error en ',key,' que tiene value',value)
          editPlayerContext.setCreatingContractError('Es necesario rellenar todos los campos y al menos un intermediario');
          break;
        } else {
          savedContract[key] = value;
        } 
      }

      if (Object.keys(data).length === (Object.keys(savedContract).length - 3)) {
        
        console.log('object keys data', Object.keys(data).length)
        console.log('object keys savedContract', Object.keys(savedContract).length)
        
        console.log('contrato que guardo', data);
        console.log('savedContract', savedContract);
        saveNewContract.uploadData('players/createContract',savedContract);
        editPlayerContext.setNewContract(false);
        //resetear contenidos salario fijo
        editPlayerContext.setContractSalary(editPlayerContext.defaultContractSalaryArray);
        //resetear contenidos clausula rescisión
        editPlayerContext.setContractTermination(editPlayerContext.defaultContractTerminationArray) ;       
        window.scrollTo(0,0);
      }
    } 
  }

  useEffect(()=> {
    if (saveNewContract.responseUpload) {
      //console.log(saveNewContract.responseUpload);
      if (saveNewContract.responseUpload.code === 'ERR_NETWORK') { editPlayerContext.setCreatingContractError('Error de conexión, inténtelo más tarde')
      } else if (saveNewContract.responseUpload.status === 'ok') { 
        console.log('guardo con éxito, pido jugador', idJugador)
        getPlayerDetail(idJugador);
        //resetear contenidos salario fijo
        editPlayerContext.setContractSalary(editPlayerContext.defaultContractSalaryArray);
        //resetear contenidos clausula rescisión
        editPlayerContext.setContractTermination(editPlayerContext.defaultContractTerminationArray);
        //reset errores form
        editPlayerContext.setCreatingContractError(null);
        window.scrollTo(0,0);
      } else {
        editPlayerContext.setCreatingContractError('Existe un error en el formulario, inténtelo de nuevo')
      }
    }
  },[saveNewContract.responseUpload])

   //borrar contrato
   const deleteContract = useSaveData();
   const handleDeleteContract = (id) => {
    console.log('id que quiero borrar', id);
     deleteContract.uploadData('players/removeContract', {id_contrato:id.toString()})
   }
   useEffect(()=>{
     if (deleteContract.responseUpload) {
      console.log('vuelvo a pedir datos de jugador', idJugador);
       getPlayerDetail(idJugador);
     }
   },[deleteContract.responseUpload])

  //editar un contrato que ya existe
  const getDetailContract = useSaveData();

  const handleEditContract = (id) => {
    getDetailContract.uploadData('players/getDetailContract',{'id_contrato':id})
  }

  useEffect(()=>{
    if(getDetailContract.responseUpload) {
      console.log('detailContract',getDetailContract.responseUpload);
      editPlayerContext.setDetailContractData(getDetailContract.responseUpload.contrato);
      editPlayerContext.setDetailSalaryData(getDetailContract.responseUpload.salario_fijo);
      editPlayerContext.setDetailTerminationData(getDetailContract.responseUpload.clausula_rescision);
    }
  },[getDetailContract.responseUpload])

  useEffect(()=>{
    if (editPlayerContext.detailContractData) {
      //console.log(detailContractData);
      editPlayerContext.setNewContract(false);
      editPlayerContext.setContractSalary([{id_salario_fijo:1,flag_bruto_neto:0,fch_inicio:'',fch_fin:'',num_salario_fijo:''}]); 
      // window.scrollTo(0,0);
      editPlayerContext.setEditContract(true);
    }
  },[editPlayerContext.detailContractData])


  //seleccionar activo un contrato del listado de contratos existentes
  useEffect(()=>{
    if (editPlayerContext.playerContracts) {
      editPlayerContext.playerContracts.map(contract => {
        if (contract.seleccionado === 1) globalContext.setActiveContractId (contract.id_contrato);
      })
    }
  },[editPlayerContext.playerContracts])

  useEffect(()=> {
    if (globalContext.activeContractId) {
      handleActivateContract(globalContext.activeContractId);
      const filteredActiveContract = editPlayerContext.playerDataContracts.filter(item => item.id_contrato === globalContext.activeContractId);
      editPlayerContext.setActiveContractData(filteredActiveContract); 
    }
  },[globalContext.activeContractId])

  useEffect(()=>{
    console.log('activeContractData',editPlayerContext.activeContractData)
  },[editPlayerContext.activeContractData])

  //pedir detalle de clausula cuando seleccionamos un contrato
  const getDetalleClausula = useSaveData();
  const handleActivateContract = (id) => {
    getDetalleClausula.uploadData('players/getDetail_clausula',{id_contrato:id.toString()}); 
  }

  useEffect(()=>{
    if (getDetalleClausula.responseUpload) {
      console.log(getDetalleClausula.responseUpload);
      // editPlayerContext.setSavedVariables(getDetalleClausula.responseUpload?.variables)
    }
  },[getDetalleClausula.responseUpload])

  

  return {
    handleAddNewSalaryComb,
    handleDeleteNewSalaryComb,
    handleChangesOnNewSalaryComb,
    handleChangesOnNewSalaryCombIfToggle,
    handleAddNewFixedSalaryLine,
    handleDeleteNewFixedSalaryLine,
    handleAddNewTerminationClause,
    handleDeleteNewTerminationClause,
    handleChangesOnNewTerminationClause,
    handleChangesOnNewTerminationClauseIfToggle,
    handleAddNewContract,
    handleDeleteContract,
    handleEditContract,
  }
}