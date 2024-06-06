import { useEffect, useState } from "react";
import { useEditPlayerDataContext } from "../../providers/EditPlayeProvider";
import { useGetPlayerData } from "./useGetPlayerData";
import { useSaveData } from "../../hooks/useSaveData";
import { FormSimplePanelRow, FormSimpleRow, LabelElementAssist, LabelElementNumber, LabelElementNumberAssist, LabelElementToggle, LabelSelectElement } from "../../components/UI/components/form simple/formSimple"
import { ButtonMousePrimary } from "../../components/UI/objects/buttons"
import { useGlobalContext } from "../../providers/globalContextProvider";

export const EditPlayerTab = ({ idJugador, playerTypes, countries, positions }) => {
  const globalContext = useGlobalContext();
  const editPlayerContext = useEditPlayerDataContext();

  //error update player
  const [createPlayerError, setCreatePlayerError] = useState(null);

  //pedir datos de jugador
  const {
    getPlayerDetail,
    } = useGetPlayerData(idJugador);

  // Función para formatear el número
  const formatNumber = (inputValue) => {
    const numericValue = inputValue.replace(/\D/g, '');
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formattedValue;
  };

  // Función para manejar cambios en el número formateado
  const handleNumberChange = (event) => {
    const formattedNumber = formatNumber(event.target.value);
    editPlayerContext.setPlayerDataDetails({...editPlayerContext.playerDataDetails, val_valor_mercado: formattedNumber})
  };


  //guardar cambios edicion jugador
  const createNewPlayer = useSaveData();

  const handleSavePlayer = (e) => {
    e.preventDefault();   
    console.log('playerData-Antes:',editPlayerContext.playerDataDetails);
    console.log('id_jugador', editPlayerContext.playerDataDetails.id_jugador);
    // const playerIdToString = playerData.id_jugador.toString();
    // playerData.id_jugador = playerIdToString;
    if (editPlayerContext.playerDataDetails.flag_comunitario === true || editPlayerContext.playerDataDetails.flag_comunitario === 1) editPlayerContext.playerDataDetails.flag_comunitario = 1
    else if (editPlayerContext.playerDataDetails.flag_comunitario === false || editPlayerContext.playerDataDetails.flag_comunitario === 0) editPlayerContext.playerDataDetails.flag_comunitario = 0
    if (editPlayerContext.playerDataDetails.flag_residencia === true || editPlayerContext.playerDataDetails.flag_residencia === 1) editPlayerContext.playerDataDetails.flag_residencia = 1
    else if (editPlayerContext.playerDataDetails.flag_residencia === false || editPlayerContext.playerDataDetails.flag_residencia === 0) editPlayerContext.playerDataDetails.flag_residencia = 0
    if (editPlayerContext.playerDataDetails.flag_cotonu === true || editPlayerContext.playerDataDetails.flag_cotonu === 1) editPlayerContext.playerDataDetails.flag_cotonu = 1
    else if (editPlayerContext.playerDataDetails.flag_cotonu === false || editPlayerContext.playerDataDetails.flag_cotonu === 0) editPlayerContext.playerDataDetails.flag_cotonu = 0
    editPlayerContext.playerDataDetails.id_nacionalidad1 ? editPlayerContext.playerDataDetails.id_nacionalidad1.toString() : null;
    editPlayerContext.playerDataDetails.id_nacionalidad2 ? editPlayerContext.playerDataDetails.id_nacionalidad2.toString() : null;
    editPlayerContext.playerDataDetails.val_valor_mercado ? editPlayerContext.playerDataDetails.val_valor_mercado.toString() : null;

    const dataSent = {
      'desc_alias': editPlayerContext.playerDataDetails.desc_alias,
      'desc_apellido1': editPlayerContext.playerDataDetails.desc_apellido1,
      'desc_apellido2': editPlayerContext.playerDataDetails.desc_apellido2,
      'desc_dni_nie': editPlayerContext.playerDataDetails.desc_dni_nie,
      'desc_nombre': editPlayerContext.playerDataDetails.desc_nombre,
      'desc_nss': editPlayerContext.playerDataDetails.desc_nss,
      'desc_pasaporte1': editPlayerContext.playerDataDetails.desc_pasaporte1,
      'desc_pasaporte2': editPlayerContext.playerDataDetails.desc_pasaporte2,
      'dt_caducidad_dni': editPlayerContext.playerDataDetails.dt_caducidad_dni,
      'dt_caducidad_pasaporte1': editPlayerContext.playerDataDetails.dt_caducidad_pasaporte1,
      'dt_caducidad_pasaporte2': editPlayerContext.playerDataDetails.dt_caducidad_pasaporte2,
      'dt_nacimiento': editPlayerContext.playerDataDetails.dt_nacimiento,
      'flag_comunitario': editPlayerContext.playerDataDetails.flag_comunitario,
      'flag_cotonu': editPlayerContext.playerDataDetails.flag_cotonu, 
      'flag_residencia': editPlayerContext.playerDataDetails.flag_residencia,
      'id_jugador': idJugador,
      'id_nacionalidad1': editPlayerContext.playerDataDetails.id_nacionalidad1,
      'id_nacionalidad2': editPlayerContext.playerDataDetails.id_nacionalidad2,
      'id_posicion': editPlayerContext.playerDataDetails.id_posicion,
      'id_tipo_jugador': editPlayerContext.playerDataDetails.id_tipo_jugador,
      'val_valor_mercado': editPlayerContext.playerDataDetails.val_valor_mercado.toString(),
  }

    if (editPlayerContext.playerDataDetails.desc_nombre === '' || editPlayerContext.playerDataDetails.desc_apellido1 === '') {
      setCreatePlayerError('Debe completar la información de los campos obligatorios');
    } else {
        console.log('dataUpdated',dataSent);
        createNewPlayer.uploadData('players/edit',dataSent);
    }
  }

  //mirar la respuesta de subir datos al crear jugador para setear error
  useEffect(()=> {
    if (createNewPlayer.responseUpload) {
      console.log(createNewPlayer.responseUpload);      
      if (createNewPlayer.responseUpload.status === 'ok') { 
        getPlayerDetail(idJugador);
        window.scrollTo(0,0);        
      } else {
        setCreatePlayerError('Existe un error en el formulario, inténtelo de nuevo')
      }
    }
  },[createNewPlayer.responseUpload])


  //ESTO NO FUNCIONA AHORA PORQUE ESTÁ DESACTIVADO TEMPORALMENTE

  //pedir datos para buscar un jugador
  // const getOptaPlayer = useSaveData();
  // const searchPlayer = (search) => {
  //   getOptaPlayer.uploadData('players/searchPlayerOpta',{'search':search})
  // }
  //guardar datos busqueda jugador
  // useEffect(()=> {
  //   if (getOptaPlayer.responseUpload) {
  //     //console.log('optaPlayer',getOptaPlayer.responseUpload);
  //     setOptaPlayersList(getOptaPlayer.responseUpload.data);
  //     setOptaResultsBox(true);
  //   }
  // },[getOptaPlayer.responseUpload])

  //render caja de resultados busqueda jugador
  // const renderSearchPlayerResults = () => {
  //   if (optaResultsBox && optaPlayersList?.length == 0) {
  //     return (
  //       <div className='cm-c-dropdown-select__results-box'><span>No hay resultados</span></div>
  //     );
  //   } else if (optaResultsBox && optaPlayersList?.length > 0) {
  //     return (
  //       <div className='cm-c-dropdown-select__results-box'>
  //         {
  //           optaPlayersList.map(item => {
  //             return (
  //               <span
  //                 className='result'
  //                 key={item.id_jugador_opta}
  //                 onClick={e => {
  //                   e.preventDefault();
  //                   setOptaSelectedPlayer(item);
  //                   setOptaResultsBox(false);
                    
  //                   setPlayerData({...playerData, desc_apellido1: item.desc_apellido_jugador, nombre: item.desc_nombre_jugador  })
  //                   // setPlayerData({...playerData, nombre: item.desc_nombre_jugador });
  //                 }}  >
  //                   {item.desc_nombre_jugador} {item.desc_apellido_jugador}
  //               </span>
  //             );
  //           })
  //         }
  //       </div>
  //     );
  //   }
  // }

  return (
    <>
      <FormSimplePanelRow>
        <div className='cm-c-dropdown-select'>
          <LabelElementAssist
            htmlFor='playerName'
            type='text'
            className='panel-field-long'
            autoComplete='off'
            placeholder='Escribe para buscar'
            required={true}
            assistanceText=''
            value={editPlayerContext.playerDataDetails.desc_nombre || ''}
            handleOnChange={e => {editPlayerContext.setPlayerDataDetails({...editPlayerContext.playerDataDetails, desc_nombre: e.target.value})}}
            //value={optaSelectedPlayer.desc_nombre_jugador || optaSelectedPlayer.desc_nombre}
            // handleOnChange={(e)=>{
            //   setOptaSelectedPlayer(e.target.value);
            //   if (e.target.value.length > 2 ) {
            //     searchPlayer(e.target.value)
            //   } else if ((e.target.value.length <= 2 )) {
            //     setOptaPlayersList(null);
            //     setOptaSelectedPlayer('');
            //     setOptaResultsBox(false);                                
            //   }
            // }} 
            >
            Nombre*
          </LabelElementAssist>
          {/* {renderSearchPlayerResults()} */}
        </div>

      </FormSimplePanelRow>
      <FormSimplePanelRow>
        <LabelElementAssist
          htmlFor='playerLastname1'
          type='text'
          className='panel-field-long'
          autoComplete='off'
          placeholder='Apellido'
          required='required'
          assistanceText=''
          value={editPlayerContext.playerDataDetails.desc_apellido1 || ''}
          handleOnChange={e => {editPlayerContext.setPlayerDataDetails({...editPlayerContext.playerDataDetails, desc_apellido1: e.target.value})}}
          >
          Apellido*
        </LabelElementAssist>
      </FormSimplePanelRow>
      <FormSimplePanelRow>
        <LabelElementAssist
          htmlFor='playerLastname2'
          type='text'
          className='panel-field-long'
          autoComplete='off'
          placeholder='Segundo apellido'
          assistanceText=''
          value={editPlayerContext.playerDataDetails.desc_apellido2 || ''}
          handleOnChange={e => {editPlayerContext.setPlayerDataDetails({...editPlayerContext.playerDataDetails, desc_apellido2: e.target.value})}}
          >
          Segundo apellido
        </LabelElementAssist>
      </FormSimplePanelRow>
      <FormSimplePanelRow>
        <LabelElementAssist
          htmlFor='playerAlias'
          type='text'
          className='panel-field-long'
          autoComplete='off'
          placeholder='Nombre deportivo'
          value={editPlayerContext.playerDataDetails.desc_alias || ''}
          handleOnChange={e => {editPlayerContext.setPlayerDataDetails({...editPlayerContext.playerDataDetails, desc_alias: e.target.value})}}
          >
          Nombre deportivo
        </LabelElementAssist>
      </FormSimplePanelRow>
      <FormSimplePanelRow>
        <LabelSelectElement
          htmlFor='playerType'
          labelText='Tipo Entidad'
          defaultValue={editPlayerContext.playerDataDetails.id_tipo_jugador || ''}
          handleOnChange={e => {
            editPlayerContext.setPlayerDataDetails({...editPlayerContext.playerDataDetails, id_tipo_jugador: e.target.selectedIndex.toString()})
            }} >
            <option value=''>Selecciona</option>
            { playerTypes?.map(item => {
              const selected = editPlayerContext.playerDataDetails.id_tipo_jugador == item.id_tipo_jugador ? 'selected' : '';
              return (
                <option key={item.id_tipo_jugador} value={item.id_tipo_jugador} selected={selected}>{item.desc_web}</option>
              );
            })}
        </LabelSelectElement>
      </FormSimplePanelRow>
      <FormSimplePanelRow>
        <LabelElementAssist
          htmlFor='playerBornDate'
          type='date'
          className='panel-field-long'
          autoComplete='off'
          format={'dd-mm-yyyy'}
          placeholder='dd/mm/yyyy'
          value={editPlayerContext.playerDataDetails.dt_nacimiento}
          handleOnChange={e => {editPlayerContext.setPlayerDataDetails({...editPlayerContext.playerDataDetails, dt_nacimiento: e.target.value})}}
          >
          Fecha nacimiento
        </LabelElementAssist>
      </FormSimplePanelRow>
      <FormSimplePanelRow>
        <LabelSelectElement
          htmlFor='playerNationality1'
          labelText='Nacionalidad'
          defaultValue={editPlayerContext.playerDataDetails.id_nacionalidad1 || ''}
          handleOnChange={e => {
            editPlayerContext.setPlayerDataDetails({...editPlayerContext.playerDataDetails, id_nacionalidad1: e.target.value.toString()})
            }} >
            <option value=''>Selecciona</option>
            { countries?.map(country => {
              const selected = editPlayerContext.playerDataDetails.id_nacionalidad1 == country.id_pais ? 'selected' : '';
              return (
                <option key={country.id_pais} value={country.id_pais} selected={selected}>{country.desc_pais}</option>
              );
            })}
        </LabelSelectElement>
      </FormSimplePanelRow>
      <FormSimplePanelRow>
        <LabelSelectElement
          htmlFor='playerNationality2'
          labelText='Nacionalidad 2'
          defaultValue={editPlayerContext.playerDataDetails.id_nacionalidad2 || ''}
          handleOnChange={e => {
            editPlayerContext.setPlayerDataDetails({...editPlayerContext.playerDataDetails, id_nacionalidad2: e.target.value.toString()})
            }} >
            <option value=''>Selecciona</option>
            { countries?.map(country => {
              const selected = editPlayerContext.playerDataDetails.id_nacionalidad2 == country.id_pais ? 'selected' : '';
              return (
                <option key={country.id_pais} value={country.id_pais} selected={selected}>{country.desc_pais}</option>
              );
            })}
        </LabelSelectElement>
      </FormSimplePanelRow>
      <FormSimplePanelRow>
        <LabelElementAssist
          htmlFor='playerNSS'
          type='number'
          className='panel-field-long'
          autoComplete='off'
          placeholder='Nº Seguridad Social'
          value={editPlayerContext.playerDataDetails.desc_nss || ''}
          handleOnChange={e => {editPlayerContext.setPlayerDataDetails({...editPlayerContext.playerDataDetails, desc_nss: e.target.value})}} 
          >
          Nº Seguridad Social
        </LabelElementAssist>
      </FormSimplePanelRow>
      <FormSimplePanelRow>
        <LabelElementAssist
          htmlFor='playerDNI'
          type='text'
          className='panel-field-long'
          autoComplete='off'
          placeholder='DNI / NIE'
          value={editPlayerContext.playerDataDetails.desc_dni_nie}
          handleOnChange={e => {editPlayerContext.setPlayerDataDetails({...editPlayerContext.playerDataDetails, desc_dni_nie: e.target.value})}}
          >
          DNI / NIE
        </LabelElementAssist>
      </FormSimplePanelRow>
      <FormSimplePanelRow>
        <LabelElementAssist
          htmlFor='playerDNIdate'
          type='date'
          className='panel-field-long'
          autoComplete='off'
          format={'dd-mm-yyyy'}
          value={editPlayerContext.playerDataDetails.dt_caducidad_dni}
          handleOnChange={e => {editPlayerContext.setPlayerDataDetails({...editPlayerContext.playerDataDetails, dt_caducidad_dni: e.target.value})}}
          >
          Caducidad DNI / NIE
        </LabelElementAssist>
      </FormSimplePanelRow>
      <FormSimplePanelRow>
        <LabelElementAssist
          htmlFor='playerPassport1Nr'
          type='text'
          className='panel-field-long'
          autoComplete='off'
          placeholder='Numero pasaporte'
          value={editPlayerContext.playerDataDetails.desc_pasaporte1 ? editPlayerContext.playerDataDetails.desc_pasaporte1 : ''}
          handleOnChange={e => {editPlayerContext.setPlayerDataDetails({...editPlayerContext.playerDataDetails, desc_pasaporte1: e.target.value})}}
          >
          Pasaporte
        </LabelElementAssist>
      </FormSimplePanelRow>
      <FormSimplePanelRow>
        <LabelElementAssist
          htmlFor='playerPassport1Date'
          type='date'
          className='panel-field-long'
          autoComplete='off'
          format={'dd-mm-yyyy'}
          value={editPlayerContext.playerDataDetails.dt_caducidad_pasaporte1}
          handleOnChange={e => {editPlayerContext.setPlayerDataDetails({...editPlayerContext.playerDataDetails, dt_caducidad_pasaporte1: e.target.value})}}
          >
          Caducidad pasaporte
        </LabelElementAssist>
      </FormSimplePanelRow>
      <FormSimplePanelRow>
        <LabelElementAssist
          htmlFor='playerPassport2Nr'
          type='text'
          className='panel-field-long'
          autoComplete='off'
          placeholder='Numero pasaporte'
          value={editPlayerContext.playerDataDetails.desc_pasaporte2 ? editPlayerContext.playerDataDetails.desc_pasaporte2 : ''}
          handleOnChange={e => {editPlayerContext.setPlayerDataDetails({...editPlayerContext.playerDataDetails, desc_pasaporte2: e.target.value})}}
          >
          Pasaporte 2
        </LabelElementAssist>
      </FormSimplePanelRow>
      <FormSimplePanelRow>
        <LabelElementAssist
          htmlFor='playerPassport1Date'
          type='date'
          className='panel-field-long'
          autoComplete='off'
          format={'dt-mm-yyyy'}
          value={editPlayerContext.playerDataDetails.dt_caducidad_pasaporte2}
          handleOnChange={e => {editPlayerContext.setPlayerDataDetails({...editPlayerContext.playerDataDetails, dt_caducidad_pasaporte2: e.target.value})}}
          >
          Caducidad pasaporte 2
        </LabelElementAssist>
      </FormSimplePanelRow>
      
      <FormSimplePanelRow>
        <LabelSelectElement
          htmlFor='playerPosition'
          labelText='Posicion'
          value={editPlayerContext.playerDataDetails.id_posicion || ''}
          handleOnChange={e => {editPlayerContext.setPlayerDataDetails({...editPlayerContext.playerDataDetails, id_posicion: e.target.value})}}
          >
            <option value=''>Selecciona</option>
            { positions?.map(item => {
              const selected = editPlayerContext.playerDataDetails.id_posicion == item.id_posicion ? 'selected' : '';
              return (
                <option key={item.id_posicion} value={item.id_posicion} selected={selected}>{item.desc_posicion}</option>
              );
            })}
        </LabelSelectElement>
      </FormSimplePanelRow>
      <FormSimplePanelRow>
        <LabelElementNumberAssist
          htmlFor='playerMarketValue'
          suffix={'€'}
          type='text'
          className='panel-field-long'
          autoComplete='off'
          placeholder='Introduce euros'
          assistanceText='valor en euros €'
          value={editPlayerContext.playerDataDetails.val_valor_mercado || ''}
          handleOnChange={(values) => {
            editPlayerContext.setPlayerDataDetails({...editPlayerContext.playerDataDetails, val_valor_mercado: values.value})
          }}
        >
        Valoración económica mercado
        </LabelElementNumberAssist>
      </FormSimplePanelRow>
      <FormSimplePanelRow>
        <LabelElementToggle
          htmlFor='playerComunitario'
          checked={(editPlayerContext.playerDataDetails.flag_comunitario === 1 || editPlayerContext.playerDataDetails.flag_comunitario === '1' || editPlayerContext.playerDataDetails.flag_comunitario === true) ? 'checked':''}
          handleOnChange={e => {
            const checked = e.target.checked === true ? '1' : '0';  
            editPlayerContext.setPlayerDataDetails({...editPlayerContext.playerDataDetails, flag_comunitario: checked})}}
          >
          Jugador comunitario
        </LabelElementToggle>
      </FormSimplePanelRow>
      <FormSimplePanelRow>
        <LabelElementToggle
          htmlFor='playerResidencia'
          checked={(editPlayerContext.playerDataDetails.flag_residencia === 1 || editPlayerContext.playerDataDetails.flag_residencia === '1' || editPlayerContext.playerDataDetails.flag_residencia === true) ? 'checked':''}
          handleOnChange={e => {
            const checked = e.target.checked === true ? '1' : '0';  
            editPlayerContext.setPlayerDataDetails({...editPlayerContext.playerDataDetails, flag_residencia: checked})}}
          >
          Permiso residencia
        </LabelElementToggle>
      </FormSimplePanelRow>
      <FormSimplePanelRow>
        <LabelElementToggle
          htmlFor='playerCotonu'
          checked={(editPlayerContext.playerDataDetails.flag_cotonu === 1 || editPlayerContext.playerDataDetails.flag_cotonu === '1' || editPlayerContext.playerDataDetails.flag_cotonu === true) ? 'checked':''}
          handleOnChange={e => {
            const checked = e.target.checked === true ? '1' : '0';  
            editPlayerContext.setPlayerDataDetails({...editPlayerContext.playerDataDetails, flag_cotonu: checked})}}
          >
          Acuerdo Samoa
        </LabelElementToggle>
      </FormSimplePanelRow>
      {createPlayerError &&
        <FormSimpleRow className='cm-u-centerText'>
          <span className='error'>{createPlayerError}</span>
        </FormSimpleRow>
      }
      <FormSimplePanelRow className='cm-u-centerText cm-u-spacer-mb-huge'>                                              
        <ButtonMousePrimary
          onClick={handleSavePlayer}>
          Actualizar
        </ButtonMousePrimary>                          
      </FormSimplePanelRow>
    </>
  )
}