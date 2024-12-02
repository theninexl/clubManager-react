import { useEffect, useState } from "react";
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
          id_salario_fijo:'',
          flag_bruto_neto:0,
          dt_inicio:'',
          dt_fin:'',
          val_salario_fijo:0
        },
      ],
    }]) 
  }

  //añadir una nueva linea de combinación de salario
  const handleAddNewSalaryCombEdit = () => {
    editPlayerContext.setDetailSalaryData([...editPlayerContext.detailSalaryData, {
      importe_fijo:'',
      id_contraparte:'',
      salaryComb: [
        {
          id_salario_fijo:'',
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

  //borrar linea de combinación de salario
  const handleDeleteNewSalaryCombEdit = (index) => {
    const newSalariesArray = [...editPlayerContext.detailSalaryData];
    newSalariesArray.splice(index,1);
    editPlayerContext.setDetailSalaryData(newSalariesArray);
  } 

  //manejar cambios en los campos de la linea de combinación de salario
  const handleChangesOnNewSalaryComb = (event, index) => {
    let {name, value} = event.target;
    let onChangeValue = [...editPlayerContext.contractSalary];
    onChangeValue[index][name] = value;
    editPlayerContext.setContractSalary(onChangeValue);
  }

  //manejar cambios en los campos de la linea de combinación de salario si es edicion de contrato
  const handleChangesOnEditSalaryComb = (event, index) => {
    let {name, value} = event.target;
    // let onChangeValue = [...editPlayerContext.contractSalary];
    let onChangeValue = [...editPlayerContext.detailSalaryData];
    onChangeValue[index]['id_contraparte'] = value;
    // editPlayerContext.setContractSalary(onChangeValue);
    editPlayerContext.setDetailSalaryData(onChangeValue);
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
    // onChangeValue[indexComb]["salaryComb"][indexNewFSL] = {id_salario_fijo:indexNewFSL+1,flag_bruto_neto:'0',dt_inicio:'',dt_fin:'',val_salario_fijo:''};
    onChangeValue[indexComb]["salaryComb"][indexNewFSL] = {id_salario_fijo:'',flag_bruto_neto:'0',dt_inicio:'',dt_fin:'',val_salario_fijo:''};
    console.log(onChangeValue);
    editPlayerContext.setContractSalary(onChangeValue);
  }

  //añadir una nueva linea de salario fijo a la combinacion de salario
  const handleAddNewFixedSalaryLineEdit = (indexComb, indexNewFSL) => {
    let onChangeValue = [...editPlayerContext.detailSalaryData];
    // onChangeValue[indexComb]["salaryComb"][indexNewFSL] = {id_salario_fijo:indexNewFSL+1,flag_bruto_neto:'0',dt_inicio:'',dt_fin:'',val_salario_fijo:''};
    onChangeValue[indexComb]["salaryComb"][indexNewFSL] = {id_salario_fijo:'',flag_bruto_neto:'0',dt_inicio:'',dt_fin:'',val_salario_fijo:''};
    console.log(onChangeValue);
    editPlayerContext.setDetailSalaryData(onChangeValue);
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

  //borrar una linea de salario fijo a la combinación de salario
  const handleDeleteNewFixedSalaryLineEdit = (indexComb, indexNewFSL) => {
    let newSalaryCombArray = [...editPlayerContext.detailSalaryData];
    let newFSLArray = [...newSalaryCombArray[indexComb].salaryComb];
    newSalaryCombArray[indexComb].salaryComb = [];
    newFSLArray.splice(indexNewFSL, 1);
    newSalaryCombArray[indexComb]["salaryComb"] = newFSLArray;
    editPlayerContext.setDetailSalaryData(newSalaryCombArray);
  }

  //añadir una nueva linea de rescisión
  const handleAddNewTerminationClause = (number) => {
    editPlayerContext.setContractTermination([...editPlayerContext.contractTermination, {id_clau_rescision:'',flag_bruto_neto:0,dt_inicio:'',dt_fin:'',val_clau_rescision:''}]) 
  }

  const handleAddEditTerminationClause = (number) => {
    editPlayerContext.setDetailTerminationData([...editPlayerContext.detailTerminationData, {id_clau_rescision:'',flag_bruto_neto:0,dt_inicio:'',dt_fin:'',val_clau_rescision:''}]) 
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

  //funcion sumar salarios al crear o editar contrato
  const sumContractSalaries = (datos) => {
    console.log('importe salario total sin tocar', datos.val_imp_salario_total)
    const salarioTotal = parseFloat(datos.val_imp_salario_total
      .replace(/\./g, '')  // Elimina todos los puntos que separan los miles
      .replace(',', '.')   // Reemplaza la coma decimal con un punto
      .replace("€", "")    // Elimina el símbolo del euro
      .trim()
    );

    let sumaSalarioFijo = 0;

    if (Array.isArray(datos.salario_fijo)) {
        datos.salario_fijo.forEach(salario => {
            if (Array.isArray(salario.salaryComb)) {
                salario.salaryComb.forEach(salarioItem => {
                    sumaSalarioFijo += parseFloat(salarioItem.val_salario_fijo);
                });
            }
        });
    }

    console.log('salarioTotal', salarioTotal);
    console.log('sumaSalarioFijo', sumaSalarioFijo);

    return salarioTotal == sumaSalarioFijo;
  }

  //funcion comprobar fechas en salariosFijos
  function validarFechasPrincipales(contrato) {
    const { dt_inicio_contrato, dt_inicio_contrato_real, dt_fin_contrato } = contrato;
  
    const fechaInicio = new Date(dt_inicio_contrato);
    const fechaInicioReal = new Date(dt_inicio_contrato_real);
    const fechaFin = new Date(dt_fin_contrato);
  
    // Comprobamos que ninguna de las fechas de inicio sea posterior a la fecha de fin
    if (fechaInicio > fechaFin || fechaInicioReal > fechaFin) {
      return false;
    }
  
    return true;
  }

  // Función para validar las fechas en el array salaryComb
  function validarFechasSalaryComb(contrato) {
    const { desc_tipo_contrato, dt_inicio_contrato, salario_fijo } = contrato;

    // Comprobamos si es necesario validar salaryComb
    if (desc_tipo_contrato === "Laboral" || desc_tipo_contrato === "Liquidación") {
      return true; // No requiere validación
    }

    const fechaInicioContrato = new Date(dt_inicio_contrato);

    // Recorrer salaryComb y validar fechas
    for (const salarioFijo of salario_fijo) {
      for (const salario of salarioFijo.salaryComb) {
        const fechaInicioSalario = new Date(salario.dt_inicio);
        if (fechaInicioSalario < fechaInicioContrato) {
          return false; // Hay una fecha no válida
        }
      }
    }

    return true; // Todas las fechas son válidas
  }

  //función obtener campos obligatorios dependiendo del tipo de contrato
  const getRequiredFields = (contractType) => {
      switch (contractType) {
        case "Laboral":
          return ['clausula_rescision', 'desc_descripcion', 'desc_tipo_contrato', 'desc_tipo_procedimiento', 'id_club_origen', 'id_club_destino', 'int_dorsal', 'dt_inicio_contrato', 'dt_inicio_contrato_real', 'dt_fin_contrato', 'val_imp_salario_total', 'val_pct_pago_atm', 'salario_fijo'];
        case "Transfer. permanente":
          return ['desc_descripcion', 'int_dorsal', 'desc_tipo_contrato', 'desc_tipo_procedimiento', 'id_club_origen', 'id_club_destino',  'dt_inicio_contrato', 'dt_inicio_contrato_real', 'dt_fin_contrato', 'val_pct_pago_atm', 'val_imp_salario_total', 'salario_fijo'];
        case "Transfer. temporal":
          return ['desc_descripcion', 'int_dorsal', 'desc_tipo_contrato', 'desc_tipo_procedimiento', 'id_club_origen', 'id_club_destino',  'dt_inicio_contrato', 'dt_inicio_contrato_real', 'dt_fin_contrato', 'val_pct_pago_atm', 'val_imp_salario_total', 'salario_fijo'];
        case "Intermediación":
          return ['desc_descripcion', 'int_dorsal', 'desc_tipo_contrato', 'desc_tipo_procedimiento', 'dt_inicio_contrato', 'dt_inicio_contrato_real', 'dt_fin_contrato', 'id_intermediario_1', 'salario_fijo','val_imp_salario_total'];
        case "Liquidación": 
           return ['desc_descripcion', 'int_dorsal', 'desc_tipo_contrato', 'desc_tipo_procedimiento', 'id_club_origen', 'id_club_destino', 'dt_inicio_contrato', 'dt_inicio_contrato_real', 'dt_fin_contrato','val_imp_salario_total'];
        case "Renovación inscripción":
          return ['clausula_rescision', 'int_dorsal', 'desc_descripcion', 'desc_tipo_contrato', 'desc_tipo_procedimiento', 'id_club_origen', 'id_club_destino', 'dt_inicio_contrato', 'dt_inicio_contrato_real', 'dt_fin_contrato', 'val_pct_pago_atm', 'val_imp_salario_total', 'salario_fijo'];
        default:
          return []
      }
  }


  //funcion obtener campos opcionales dependiendo del tipo de contrato
  const getOptionalFields = (contractType) => {
    switch (contractType) {
      case "Intermediación":
        return ['id_intermediario_2', 'id_intermediario_3'];
      default:
        return []
    }
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
      val_imp_salario_total: formData.get('amountTotalSalary') == null ? '0€': formData.get('amountTotalSalary'), 
      val_pct_pago_atm: formData.get('clubPercentage') || 0,
      id_intermediario_1: formData.get('contractIntermediary1'),
      id_intermediario_2: formData.get('contractIntermediary2') || '-1',
      id_intermediario_3: formData.get('contractIntermediary3') || '-1',     
      salario_fijo:salarios,      
    };

    const savedContract = {
      id_jugador: userParamString
    };

    const requiredFields = getRequiredFields(data.desc_tipo_contrato);
    const optionalFields = getOptionalFields(data.desc_tipo_contrato);
    const totalExpectedFields = requiredFields.length + optionalFields.length;

    if (data) {
      console.log('tengo data', data);
    
      for (const field of requiredFields) {
        const value = data[field];
      
        if (value === '-1' || value === '' || value == null) {
          console.log('error en ', field, ' que tiene value', value);
          editPlayerContext.setCreatingContractError('Es necesario rellenar todos los campos');
          return;
        }  else {
          savedContract[field] = value;
        }
      }

      for (const field of optionalFields) {
        const value = data[field];
        if (value !== '' && value != null) {
          savedContract[field] = value;
        }
      }
    } 

    console.log('object keys totalExpectedFields', totalExpectedFields)
    console.log('object keys savedContract', Object.keys(savedContract).length)        
    console.log('savedContract', savedContract);
    const esSalarioValido = sumContractSalaries(savedContract);
    const fechasPrincipalesValidas = validarFechasPrincipales(savedContract);
    const fechasSalariosValidas = validarFechasSalaryComb(savedContract);

    //compruebo la suma de salarios coincide si el objeto final está bien construido y si es así lo mando a guardar.
    if ((totalExpectedFields === (Object.keys(savedContract).length - 1 )) && 
      data.desc_tipo_contrato != "Liquidación" &&
      data.desc_tipo_contrato != "Renovación inscripción") { 
      if (!fechasPrincipalesValidas) {
        editPlayerContext.setCreatingContractError('La fecha final del contrato es anterior a la fecha inicial. Revise las fechas del contrato');
      } else {
        if (!fechasSalariosValidas) {
          editPlayerContext.setCreatingContractError('Las fechas de inicio/fin de contrato no coinciden con las fechas introducidas en los salarios');
        } else {
          if (esSalarioValido) {
            saveNewContract.uploadData('players/createContract',savedContract);
          } else if (!esSalarioValido && savedContract.desc_tipo_contrato == 'Laboral'){
            editPlayerContext.setCreatingContractError('La suma de salarios fijos debe ser igual que el valor del importe salario total');
          } else {
            editPlayerContext.setCreatingContractError('La suma de los Importes Fijos debe ser igual que el valor del Importe Total');
          }
        }
      }
    } else if ((totalExpectedFields === (Object.keys(savedContract).length - 1 )) && 
      (data.desc_tipo_contrato == "Liquidación" || data.desc_tipo_contrato == "Renovación inscripción")) {
        if (!fechasPrincipalesValidas) {
          editPlayerContext.setCreatingContractError('La fecha final del contrato es anterior a la fecha inicial. Revise las fechas del contrato');
        } else {
          if (!fechasSalariosValidas) {
            editPlayerContext.setCreatingContractError('Las fechas de inicio/fin de contrato no coinciden con las fechas introducidas en los salarios');
          } else {
            saveNewContract.uploadData('players/createContract',savedContract);
          }
        }
    }
  }

  useEffect(()=> {
    const response = saveNewContract.responseUpload;
    console.log("response create contract", response);
    if (response && response.status == '-1') {
      editPlayerContext.setCreatingContractError('La suma de salarios fijos debe ser igual que el valor del importe salario total');
    } else if (response && response.status == '-2') {
      editPlayerContext.setCreatingContractError('Las fechas de inicio/fin de contrato no coinciden con las fechas introducidas en los salarios');
    }  else if (response && response.status == '-3') {
        editPlayerContext.setCreatingContractError('Las fechas de inicio/fin de contrato no coinciden con las fechas introducidas en la clausula de rescisión');
    } else if (response && response.status === 'ok') {
      //resetear contenidos salario fijo
      editPlayerContext.setContractSalary(editPlayerContext.defaultContractSalaryArray);
      //resetear contenidos clausula rescisión
      editPlayerContext.setContractTermination(editPlayerContext.defaultContractTerminationArray) ;
      //cerrar capa de creacion de contrato
      editPlayerContext.setNewContract(false);
      getPlayerDetail(idJugador);
      //resetear contenidos salario fijo
      editPlayerContext.setContractSalary(editPlayerContext.defaultContractSalaryArray);
      //resetear contenidos clausula rescisión
      editPlayerContext.setContractTermination(editPlayerContext.defaultContractTerminationArray);
      //reset errores form
      editPlayerContext.setCreatingContractError(null);
      window.scrollTo(0,0);
    } else if (response && response.code === 'ERR_NETWORK') {
      editPlayerContext.setCreatingContractError('Error de conexión, inténtelo más tarde')
    } else {
      editPlayerContext.setCreatingContractError('Existe un error en el formulario, inténtelo de nuevo')
    }
  },[saveNewContract.responseUpload])

  //activarDesactivar status contrato
  const activateContract = useSaveData();  

  const handleSetActiveContract = (id) => {
    console.log('id contrato', id);
    activateContract.uploadData('players/changeStatusContract', {id_contrato:id.toString()})
  }

  useEffect(()=>{
    const response = activateContract.responseUpload;
    if (response) {
      // console.log(response);
      getPlayerDetail(idJugador);
    }
  },[activateContract.responseUpload])

  //borrar contrato
  const deleteContract = useSaveData();
  const handleDeleteContract = (id) => {
  console.log('id que quiero borrar', id);
    deleteContract.uploadData('players/removeContract', {id_contrato:id.toString()})
  }
  useEffect(()=>{
    const response = deleteContract.responseUpload;
    console.log('deleteContract.responseUpload',response);
    if (response && response.status == 'ok') {
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
      editPlayerContext.setContractSalary([{id_salario_fijo:'',flag_bruto_neto:0,fch_inicio:'',fch_fin:'',num_salario_fijo:''}]); 
      // window.scrollTo(0,0);
      editPlayerContext.setEditContract(true);
    }
  },[editPlayerContext.detailContractData])

  //guardar un contrato editado
  //guardar un nuevo contrato
  const saveEditedContract = useSaveData();

  const handleSaveEditedContract = (e) => {
    e.preventDefault();
    console.log('guardo contrato editado');
    const userParamString = idJugador.toString();
    const formData = new FormData(form.current);

    const salarios = editPlayerContext.detailSalaryData;
    const rescision = editPlayerContext.detailTerminationData;


    const data = {
      id_plantilla: globalContext.activeEntity.toString(),
      id_jugador: userParamString,
      clausula_rescision:rescision,
      desc_descripcion: formData.get('contractDescription'),
      desc_tipo_contrato: formData.get('contractType'),
      desc_tipo_procedimiento: formData.get('procedureType'),
      id_club_origen: formData.get('playerTeamOrigin'),
      id_club_destino: formData.get('playerTeamDestination'),
      int_dorsal: formData.get('contractDorsal'),
      dt_inicio_contrato: formData.get('contractStartDate'),
      dt_inicio_contrato_real: formData.get('contractRealStartDate'),
      dt_fin_contrato: formData.get('contractEndDate'),
      id_intermediario_1: formData.get('contractIntermediary1'),
      id_intermediario_2: formData.get('contractIntermediary2'),
      id_intermediario_3: formData.get('contractIntermediary3'),
      val_imp_salario_total: formData.get('amountTotalSalary') == null ? '0€': formData.get('amountTotalSalary'), 
      val_pct_pago_atm: formData.get('clubPercentage') || 0,     
      salario_fijo:salarios,    
    }

    const editedContract = {
      id_contrato: editPlayerContext.editedContractId,
      id_jugador: userParamString,      
    }

    const requiredFields = getRequiredFields(data.desc_tipo_contrato);
    const optionalFields = getOptionalFields(data.desc_tipo_contrato);
    const totalExpectedFields = requiredFields.length + optionalFields.length;

    if (data) {
      console.log('tengo data', data);
    
      for (const field of requiredFields) {
        const value = data[field];
      
        if (value === '-1' || value === '' || value == null) {
          console.log('error en ', field, ' que tiene value', value);
          editPlayerContext.setCreatingContractError('Es necesario rellenar todos los campos');
          return;
        }  else {
          editedContract[field] = value;
        }
      }

      for (const field of optionalFields) {
        const value = data[field];
        if (value !== '' && value != null) {
          editedContract[field] = value;
        }
      }
    } 

    console.log('object keys totalExpectedFields', totalExpectedFields)
    console.log('object keys editedContract', Object.keys(editedContract).length)        
    console.log('editedContract', editedContract);
    const esSalarioValido = sumContractSalaries(editedContract);
    const fechasPrincipalesValidas = validarFechasPrincipales(editedContract);
    const fechasSalariosValidas = validarFechasSalaryComb(editedContract);

    console.log('esSalarioValido:',esSalarioValido);
    console.log('fechasPrincipalesValidas:',fechasPrincipalesValidas);
    console.log('fechasSalariosValidas:',fechasSalariosValidas);

    //compruebo la suma de salarios coincide si el objeto final está bien construido y si es así lo mando a guardar.
    if ((totalExpectedFields === (Object.keys(editedContract).length - 2 )) && 
      data.desc_tipo_contrato != "Liquidación" &&
      data.desc_tipo_contrato != "Renovación inscripción") {

        if (!fechasPrincipalesValidas) {
          editPlayerContext.setCreatingContractError('La fecha final del contrato es anterior a la fecha inicial. Revise las fechas del contrato');
        } else {
          if (!fechasSalariosValidas) {
            editPlayerContext.setCreatingContractError('Las fechas de inicio/fin de contrato no coinciden con las fechas introducidas en los salarios');
          } else {
            if (esSalarioValido) {
              saveEditedContract.uploadData('players/editContract',editedContract) 
            } else if (!esSalarioValido && editedContract.desc_tipo_contrato == 'Laboral'){
              editPlayerContext.setCreatingContractError('La suma de salarios fijos debe ser igual que el valor del importe salario total');
            } else {
              editPlayerContext.setCreatingContractError('La suma de los Importes Fijos debe ser igual que el valor del Importe Total');
            }
          }
        }
    
    } else if ((totalExpectedFields === (Object.keys(editedContract).length - 2 )) && 
      (data.desc_tipo_contrato == "Liquidación" || data.desc_tipo_contrato == "Renovación inscripción")) {

        if (!fechasPrincipalesValidas) {
          editPlayerContext.setCreatingContractError('La fecha final del contrato es anterior a la fecha inicial. Revise las fechas del contrato');
        } else {
          if (!fechasSalariosValidas) {
            editPlayerContext.setCreatingContractError('Las fechas de inicio/fin de contrato no coinciden con las fechas introducidas en los salarios');
          } else {
            saveEditedContract.uploadData('players/editContract',editedContract) 
          }
        }
    }
  }

  //mirar la respuesta de subir datos al terminar de guardar el contrato editado
  useEffect(()=> {
    const response = saveEditedContract.responseUpload;
    if (response && response.status == '-1') {
      editPlayerContext.setCreatingContractError('La suma de salarios fijos debe ser igual que el valor del importe salario total');
    } else if (response && response.status == '-2') {
      editPlayerContext.setCreatingContractError('Las fechas de inicio/fin de contrato no coinciden con las fechas introducidas en los salarios');
    } else if (response && response.status == '-3') {
      editPlayerContext.setCreatingContractError('Las fechas de inicio/fin de contrato no coinciden con las fechas introducidas en la clausula de rescisión');
    } else if (response && response.status == 'ok') {
        editPlayerContext.setEditContract(false);
        editPlayerContext.setDetailContractData(null);
        editPlayerContext.setDetailSalaryData(null)
        window.scrollTo(0,0);
        editPlayerContext.setCreatingContractError(null)
        getPlayerDetail(idJugador);
    } else {
      editPlayerContext.setCreatingContractError('Existe un error en el formulario, inténtelo de nuevo');
    }
  },[saveEditedContract.responseUpload])


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

  // useEffect(()=>{
  //   console.log('activeContractData',editPlayerContext.activeContractData)
  //   console.log('activeContractId', globalContext.activeContractId)
  // },[editPlayerContext.activeContractData])

  //pedir detalle de clausula cuando seleccionamos un contrato
  const getDetalleClausula = useSaveData();
  const handleActivateContract = (id) => {
    console.log('pido id contrato seleccionado', id);
    getDetalleClausula.uploadData('players/getAllDetail_clausula',{id_contrato:id.toString()}); 
  }

  useEffect(()=>{
    if (getDetalleClausula.responseUpload) {
      console.log('listado de variables que me devuelve', getDetalleClausula.responseUpload);
      editPlayerContext.setSavedVariables(getDetalleClausula.responseUpload?.clausulas)
    }
  },[getDetalleClausula.responseUpload])

  useEffect(()=>{
    console.log('contract Salary', editPlayerContext.contractSalary);
  },[editPlayerContext.contractSalary])

  useEffect(()=>{
    console.log('detail Salary Data', editPlayerContext.detailSalaryData);
  },[editPlayerContext.detailSalaryData])

  

  return {
    handleAddNewSalaryComb,
    handleDeleteNewSalaryComb,
    handleAddNewSalaryCombEdit,
    handleDeleteNewSalaryCombEdit,
    handleChangesOnNewSalaryComb,
    handleChangesOnEditSalaryComb,
    handleChangesOnNewSalaryCombIfToggle,
    handleAddNewFixedSalaryLine,
    handleAddNewFixedSalaryLineEdit,
    handleDeleteNewFixedSalaryLine,
    handleDeleteNewFixedSalaryLineEdit,
    handleAddNewTerminationClause,
    handleDeleteNewTerminationClause,
    handleAddEditTerminationClause,
    handleDeleteEditTerminationClause,
    handleChangesOnNewTerminationClause,
    handleChangesOnNewTerminationClauseIfToggle,
    handleChangesOnEditTerminationClause,
    handleChangesOnEditTerminationClauseIfToggle,
    handleAddNewContract,
    handleDeleteContract,
    handleEditContract,
    handleSaveEditedContract,
    handleSetActiveContract,
  }
}