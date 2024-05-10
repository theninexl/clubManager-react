import { useGlobalContext } from "../../providers/globalContextProvider";
import { useEditPlayerDataContext } from "../../providers/EditPlayeProvider";
import { FormSimplePanel, FormSimplePanelRow, LabelElement, LabelElementAssist, LabelElementToggle2Sides, LabelSelectElement, LabelSelectElementAssist, LabelSelectShorterElement } from "../../components/UI/components/form simple/formSimple";
import { SimpleAccordion, SimpleAccordionContent, SimpleAccordionTrigger } from "../../components/UI/components/simpleAccordion/simpleAccordion";
import { ButtonMouseGhost, ButtonMousePrimary, IconButtonSmallPrimary, IconButtonSmallSecondary, IconButtonSmallerPrimary } from "../../components/UI/objects/buttons";
import { SymbolAdd, SymbolDelete, SymbolEdit } from "../../components/UI/objects/symbols";
import { TableCellMedium, TableCellShort, TableDataHeader, TableDataRow } from "../../components/UI/layout/tableData";
import { HeadContentTitleBar, TitleBar__Title, TitleBar__Tools } from "../../components/UI/layout/centralContentComponents";



//buscar nombre de equipo para rellenar beneficiarios 
const searchName = (id,stateList,keyId,keyName ) => {
  const result = stateList.find(item => item[keyId] == id);
  return result[keyName];
}

export const ListPlayerContracts = ({ handleDeleteContract,handleEditContract }) => {
  const globalContext = useGlobalContext();
  const editPlayerContext = useEditPlayerDataContext();

  return (
    <>
      <TableDataHeader>
          <TableCellShort className='cm-u-centerText'>Selec.</TableCellShort>
          <TableCellMedium>Descripción</TableCellMedium>
          <TableCellMedium>Tipo de Contrato</TableCellMedium>
          <TableCellMedium>Tipo de Procedimiento</TableCellMedium>
          <TableCellMedium>Fecha Inicio - Fecha Fin</TableCellMedium>                          
          <TableCellShort className='cm-u-centerText'>Editar</TableCellShort>
          <TableCellShort className='cm-u-centerText'>Borrar</TableCellShort>
        </TableDataHeader>
      { (editPlayerContext.playerDataContracts != null && editPlayerContext.playerDataContracts.length > 0 ) ? 
          <>
            {
              editPlayerContext.playerDataContracts?.map(item => {                   
                return (
                  <TableDataRow key={item.id_contrato}>
                    <TableCellShort className='cm-u-centerText'>
                      <input 
                        type='radio' 
                        name='selected'
                        checked={(item.id_contrato == globalContext.activeContractId) ? true : ''} 
                        onClick={() => {
                          globalContext.setActiveContractId(item.id_contrato);
                        }} />
                    </TableCellShort>
                    <TableCellMedium>{item.desc_descripcion}</TableCellMedium>
                    <TableCellMedium>{item.desc_tipo_contrato}</TableCellMedium>
                    <TableCellMedium>{item.desc_tipo_procedimiento}</TableCellMedium>
                    <TableCellMedium>{item.fecha_ini_fin}</TableCellMedium>
                    
                    <TableCellShort className='cm-u-centerText'>
                      <IconButtonSmallerPrimary
                        onClick={(e) => {
                          e.preventDefault();
                          editPlayerContext.setEditedContractId(item.id_contrato);
                          handleEditContract(item.id_contrato);
                        }}>
                        <SymbolEdit />
                      </IconButtonSmallerPrimary>
                    </TableCellShort>
                    <TableCellShort className='cm-u-centerText'>
                      <IconButtonSmallerPrimary
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteContract(item.id_contrato);
                        }}>
                        <SymbolDelete />
                      </IconButtonSmallerPrimary>
                    </TableCellShort>
                  </TableDataRow>
                )
              })
            }
          </>
          : 
          <>
            <FormSimplePanelRow className='cm-u-centerText'>
              <span className='error'>No hay ningún contrato añadido</span>
            </FormSimplePanelRow>
          </>
        }
        {
          globalContext.activeContractId === null && editPlayerContext.playerDataContracts.length > 0 ? 
          <>
            <TableDataRow className='cm-u-spacer-mb-bigger cm-u-centerText'>
              <p className="warning">Seleccione un contrato como activo para ver las cláusulas</p>
            </TableDataRow>
          </>
          :
          ''
        }
    </>
  )
}

export const ContractDataLayer = ({ form, idJugador, teams, intermediaries, handleAddNewSalaryComb, handleChangesOnNewSalaryComb,handleDeleteNewSalaryComb,handleAddNewFixedSalaryLine,handleDeleteNewFixedSalaryLine, handleAddNewTerminationClause, handleDeleteNewTerminationClause, handleChangesOnNewTerminationClause, handleChangesOnNewTerminationClauseIfToggle, handleAddNewContract  }) => {

  const editPlayerContext = useEditPlayerDataContext();
    
  return (
    <>      
      {/* Acordeon crear o editar contrato */}
      <SimpleAccordion>
          <SimpleAccordionTrigger
            className='cm-u-spacer-mb-bigger'>
            <HeadContentTitleBar>
              <TitleBar__Title></TitleBar__Title>
              <TitleBar__Tools>
                <IconButtonSmallPrimary
                  onClick={(e) => {
                    e.preventDefault();
                    editPlayerContext.setNewContract(true);
                    editPlayerContext.setEditContract(false);
                    editPlayerContext.setDetailContractData(null);
                    editPlayerContext.setDetailSalaryData(null);
                  }} >
                    <SymbolAdd />
                </IconButtonSmallPrimary>
              </TitleBar__Tools>
            </HeadContentTitleBar>
          </SimpleAccordionTrigger>
          { editPlayerContext.newContract && 
            <NewContractForm
              form={form}
              idJugador={idJugador}
              teams={teams}
              intermediaries={intermediaries}
              handleAddNewSalaryComb={handleAddNewSalaryComb}
              handleChangesOnNewSalaryComb={handleChangesOnNewSalaryComb}
              handleDeleteNewSalaryComb={handleDeleteNewSalaryComb}
              handleAddNewFixedSalaryLine={handleAddNewFixedSalaryLine}
              handleDeleteNewFixedSalaryLine={handleDeleteNewFixedSalaryLine}
              handleAddNewTerminationClause={handleAddNewTerminationClause}
              handleDeleteNewTerminationClause={handleDeleteNewTerminationClause}
              handleChangesOnNewTerminationClause={handleChangesOnNewTerminationClause}
              handleChangesOnNewTerminationClauseIfToggle={handleChangesOnNewTerminationClauseIfToggle}
              handleAddNewContract={handleAddNewContract}
            />
          }
          { editPlayerContext.editContract && 
            <EditContractForm
              teams={teams}
              intermediaries={intermediaries}
            />
          }
          {/* {renderEditContractLayer()} */}
        </SimpleAccordion>
    </>
  );
}

const NewContractForm = ({ handleAddNewSalaryComb, handleChangesOnNewSalaryComb,handleDeleteNewSalaryComb,handleAddNewFixedSalaryLine,handleDeleteNewFixedSalaryLine,handleAddNewTerminationClause,handleDeleteNewTerminationClause, handleChangesOnNewTerminationClause, handleChangesOnNewTerminationClauseIfToggle, handleAddNewContract, teams, intermediaries, idJugador }) => {

  const editPlayerContext = useEditPlayerDataContext();
  
  

  return (
    <>
      <SimpleAccordionContent>
        <header className="cm-l-body-static-header--inTab" style={{marginTop:'0'}}>
          <p className="cm-u-text-black-cat">Añadir nuevo contrato</p>
        </header>
        <FormSimplePanelRow>
          <LabelElementAssist
            htmlFor='contractDescription'
            type='text'
            className='panel-field-long'
            autoComplete='off'
            placeholder='Descripción corta'
            required={true}
            assistanceText=''
            >
            Descripcion*
          </LabelElementAssist>
        </FormSimplePanelRow>
        <FormSimplePanelRow>
          <LabelElementAssist
            htmlFor='contractDorsal'
            type='number'
            className='panel-field-long'
            autoComplete='off'
            placeholder='Dorsal'
            required={true}
            assistanceText=''
            >
            Dorsal*
          </LabelElementAssist>
        </FormSimplePanelRow>
        <FormSimplePanelRow>                   
          <LabelSelectElementAssist
            htmlFor='contractType'
            labelText='Tipo de contrato*'
            required={true}
            assistanceText=''
            defaultValue={editPlayerContext.newContractDataForSalaryComb.descType || ''}
            handleOnChange={e => {
              editPlayerContext.setNewContractDataForSalaryComb({...editPlayerContext.newContractDataForSalaryComb, descType: e.target.selectedIndex});
              //resetear contenidos salario fijo
              editPlayerContext.setContractSalary(editPlayerContext.defaultContractSalaryArray);
              }
            }
            >
              <option value=''>Selecciona</option>
              {editPlayerContext.contractTypes?.map(item => {
                  const selected = editPlayerContext.newContractDataForSalaryComb.descType == item.id ? 'selected' : '';
                  return (
                    <option key={item.id} value={item.desc_tipo_contrato} selected={selected}>{item.desc_tipo_contrato}</option>
                  );
                })
              }
          </LabelSelectElementAssist>
        </FormSimplePanelRow>
        <FormSimplePanelRow>                   
          <LabelSelectElementAssist
            htmlFor='procedureType'
            labelText='Tipo de procedimiento*'
            required={true}
            assistanceText=''>
              <option value=''>Selecciona</option>
              {
                editPlayerContext.procedureTypes.map((item,index) => {
                  return (
                    <option key={index} value={item.desc_tipo_procedimiento}>{item.desc_tipo_procedimiento}</option>
                  );
                })
              }
          </LabelSelectElementAssist>
        </FormSimplePanelRow>
        <FormSimplePanelRow>
          <LabelSelectElementAssist
            htmlFor='playerTeamOrigin'
            labelText='Club Origen*'
            assistanceText=''
            required={true}
            defaultValue={editPlayerContext.newContractDataForSalaryComb.originClub || ''}
            handleOnChange={e => {
              editPlayerContext.setNewContractDataForSalaryComb({...editPlayerContext.newContractDataForSalaryComb, originClubId:e.target.value})
              }
            }
            >
              <option value=''>Selecciona</option>
              { teams?.map(item => {
                const selected = editPlayerContext.newContractDataForSalaryComb.originClubId == item.id_equipo ? 'selected': '';
                return (
                  <option key={item.id_equipo} value={item.id_equipo} selected={selected}>{item.desc_nombre_club}</option>
                );
              })}
          </LabelSelectElementAssist>
        </FormSimplePanelRow>
        <FormSimplePanelRow>
          <LabelSelectElementAssist
            htmlFor='playerTeamDestination'
            labelText='Club Destino*'
            assistanceText=''
            required={true}
            defaultValue={editPlayerContext.newContractDataForSalaryComb.destinationClub || ''}
            handleOnChange={e => {
              editPlayerContext.setNewContractDataForSalaryComb({...editPlayerContext.newContractDataForSalaryComb, destinationClubId: e.target.value})
              }
            }
            >
              <option value=''>Selecciona</option>
              { teams?.map(item => {
                const selected = editPlayerContext.newContractDataForSalaryComb.destinationClubId == item.id_equipo ? 'selected': '';
                return (
                  <option key={item.id_equipo} value={item.id_equipo} selected={selected}>{item.desc_nombre_club}</option>
                );
              })}
          </LabelSelectElementAssist>
        </FormSimplePanelRow>
        <FormSimplePanelRow>
          <LabelElementAssist
            htmlFor='contractStartDate'
            type='date'
            className='panel-field-long'
            autoComplete='off'
            placeholder='dd/mm/yyyy'
            format={'dd-mm-yyyy'}
            required={true}
            assistanceText=''
            >
            Fecha inicio contrato*
          </LabelElementAssist>
        </FormSimplePanelRow>
        <FormSimplePanelRow>
          <LabelElementAssist
            htmlFor='contractRealStartDate'
            type='date'
            className='panel-field-long'
            autoComplete='off'
            placeholder='dd/mm/yyyy'
            format={'dd-mm-yyyy'}
            required={true}
            assistanceText=''
            >
            Fecha inicio contrato real*
          </LabelElementAssist>
        </FormSimplePanelRow>
        <FormSimplePanelRow>
          <LabelElementAssist
            htmlFor='contractEndDate'
            type='date'
            className='panel-field-long'
            autoComplete='off'
            placeholder='dd/mm/yyyy'
            format={'dd-mm-yyyy'}
            required={true}
            assistanceText=''
            >
            Fecha fin contrato*
          </LabelElementAssist>
        </FormSimplePanelRow>
        <FormSimplePanelRow>
          <LabelElementAssist
            htmlFor='clubPercentage'
            type='number'
            className='panel-field-long'
            autoComplete='off'
            placeholder='Porcentaje (%)'
            required={true}
            assistanceText=''
            >
            Porcentaje pago club*
          </LabelElementAssist>
        </FormSimplePanelRow>
        <FormSimplePanelRow>
          <LabelSelectElement
            htmlFor='contractIntermediary1'
            labelText='Intermediario 1*'
            required={true}
            defaultValue={editPlayerContext.newContractDataForSalaryComb.intermediary1 || ''}
            handleOnChange={e => {
              editPlayerContext.setNewContractDataForSalaryComb({...editPlayerContext.newContractDataForSalaryComb, intermediary1Id: e.target.value})
              }
            }
            >
              <option value=''>Selecciona</option>
              { intermediaries?.map(item => {
                const selected = editPlayerContext.newContractDataForSalaryComb.intermediary1 == item.id_intermediario ? 'selected': '';
                return (
                  <option key={item.id_intermediario} value={item.id_intermediario} selected={selected}>{item.nombre}</option>
                );
              })}
          </LabelSelectElement>
        </FormSimplePanelRow>
        <FormSimplePanelRow>
          <LabelSelectElement
            htmlFor='contractIntermediary2'
            labelText='Intermediario 2'
            defaultValue={editPlayerContext.newContractDataForSalaryComb.intermediary2 || ''}
            handleOnChange={e => {
              editPlayerContext.setNewContractDataForSalaryComb({...editPlayerContext.newContractDataForSalaryComb, intermediary2Id: e.target.value})
              }
            }
            >
              <option value=''>Selecciona</option>
              { intermediaries?.map(item => {
                const selected = editPlayerContext.newContractDataForSalaryComb.intermediary2 == item.id_intermediario ? 'selected': '';
                return (
                  <option key={item.id_intermediario} value={item.id_intermediario} selected={selected}>{item.nombre}</option>
                );
              })}
          </LabelSelectElement>
        </FormSimplePanelRow>
        <FormSimplePanelRow>
          <LabelSelectElement
            htmlFor='contractIntermediary3'
            labelText='Intermediario 3'
            defaultValue={editPlayerContext.newContractDataForSalaryComb.intermediary3 || ''}
            handleOnChange={e => {
              editPlayerContext.setNewContractDataForSalaryComb({...editPlayerContext.newContractDataForSalaryComb, intermediary3Id: e.target.value})
              }
            }
            >
              <option value=''>Selecciona</option>
              { intermediaries?.map(item => {
                const selected = editPlayerContext.newContractDataForSalaryComb.intermediary3 == item.id_intermediario ? 'selected': '';
                return (
                  <option key={item.id_intermediario} value={item.id_intermediario} selected={selected}>{item.nombre}</option>
                );
              })}
          </LabelSelectElement>
        </FormSimplePanelRow>
        <FormSimplePanelRow>
          <LabelElementAssist
            htmlFor='amountTotalSalary'
            type='text'
            className='panel-field-long'
            autoComplete='off'
            placeholder='Introduce euros'
            required={true}
            assistanceText=''
            >
            Importe Salario Total*
          </LabelElementAssist>
        </FormSimplePanelRow>
        <FormSimplePanelRow>
          <p><strong>
            { (editPlayerContext.newContractDataForSalaryComb.descType === 1 || editPlayerContext.newContractDataForSalaryComb.descType === 0) ? 'Salario fijo' : 'Importe fijo'}
            </strong></p>
        </FormSimplePanelRow>

        <NewSalaryLine
          handleAddNewSalaryComb={handleAddNewSalaryComb}
          handleChangesOnNewSalaryComb={handleChangesOnNewSalaryComb}
          handleDeleteNewSalaryComb={handleDeleteNewSalaryComb}
          handleAddNewFixedSalaryLine={handleAddNewFixedSalaryLine}
          handleDeleteNewFixedSalaryLine={handleDeleteNewFixedSalaryLine}
          teams={teams}
          intermediaries={intermediaries}
          idJugador={idJugador}
         />
        
        <FormSimplePanelRow>
          <p><strong>Clausula rescisión</strong></p>
        </FormSimplePanelRow>
        
        <NewTerminationClauseLine
          handleAddNewTerminationClause={handleAddNewTerminationClause}
          handleDeleteNewTerminationClause={handleDeleteNewTerminationClause}
          handleChangesOnNewTerminationClause={handleChangesOnNewTerminationClause}
          handleChangesOnNewTerminationClauseIfToggle={handleChangesOnNewTerminationClauseIfToggle}
        />

        { editPlayerContext.creatingContractError ? 
          <FormSimplePanelRow
          className='cm-u-centerText'>
            <span className='error'>{editPlayerContext.creatingContractError}</span>
          </FormSimplePanelRow>
          : ''
        }
        <FormSimplePanelRow
          className='cm-u-centerText'>
          <ButtonMousePrimary
            onClick={(e) => {
              e.preventDefault();
              handleAddNewContract(idJugador);
            }}
            >Guardar</ButtonMousePrimary>
          <ButtonMouseGhost
            onClick={() => {
              editPlayerContext.setNewContract(false);
              //resetear contenidos salario fijo
              editPlayerContext.setContractSalary(editPlayerContext.defaultContractSalaryArray);
              //resetear contenidos clausula rescisión
              editPlayerContext.setContractTermination(editPlayerContext.defaultContractTerminationArray) ; 
              window.scrollTo(0,0);
            }}
            >Cancelar</ButtonMouseGhost>
        </FormSimplePanelRow>
      </SimpleAccordionContent>
    </>
  )
  
}

const EditContractForm = ({ teams, intermediaries }) => {
  const editPlayerContext = useEditPlayerDataContext();

  return (
    <>
      <SimpleAccordionContent>
        <header className="cm-l-body-static-header--inTab" style={{marginTop:'0'}}>
          <p className="cm-u-text-black-cat">Editar contrato seleccionado</p>
        </header>
        <FormSimplePanelRow>
          <LabelElementAssist
            htmlFor='contractDescription'
            type='text'
            className='panel-field-long'
            autoComplete='off'
            placeholder='Descripción corta'
            required={true}
            assistanceText=''
            defaultValue={editPlayerContext.detailContractData[0].desc_descripcion || ''}
            handleOnChange={e => {
              let onChangeValue = [...editPlayerContext.detailContractData];
              onChangeValue[0]["descripcion"] = e.target.value;
              editPlayerContext.setDetailContractData(onChangeValue); }}
            >
            Descripcion*
          </LabelElementAssist>
        </FormSimplePanelRow>
        <FormSimplePanelRow>
          <LabelElementAssist
            htmlFor='contractDorsal'
            type='number'
            className='panel-field-long'
            autoComplete='off'
            placeholder='Dorsal'
            required={true}
            assistanceText=''
            defaultValue={editPlayerContext.detailContractData[0].int_dorsal || ''}
            handleOnChange={e => {
              let onChangeValue = [...editPlayerContext.detailContractData];
              onChangeValue[0]["int_dorsal"] = e.target.value;
              editPlayerContext.setDetailContractData(onChangeValue); }}
            >
            Dorsal*
          </LabelElementAssist>
        </FormSimplePanelRow>
        <FormSimplePanelRow>                   
          <LabelSelectElementAssist
            htmlFor='contractType'
            labelText='Tipo de contrato*'
            required={true}
            assistanceText=''
            defaultValue={editPlayerContext.detailContractData[0].desc_tipo_contrato || ''}
            handleOnChange={e => {
              let onChangeValue = [...editPlayerContext.detailContractData];
              onChangeValue[0]["desc_tipo_contrato"] = e.target.value;
              editPlayerContext.setDetailContractData(onChangeValue); }}
            >
              <option value=''>Selecciona</option>
              {editPlayerContext.contractTypes?.map((item, index) => {
                  const selected = editPlayerContext.detailContractData[0].desc_tipo_contrato == item.desc_tipo_contrato ? 'selected' : '';
                  return (
                    <option key={index} value={item.desc_tipo_contrato} selected={selected}>{item.desc_tipo_contrato}</option>
                  );
                })
              }
          </LabelSelectElementAssist>
        </FormSimplePanelRow>
        <FormSimplePanelRow>                   
          <LabelSelectElementAssist
            htmlFor='procedureType'
            labelText='Tipo de procedimiento*'
            required={true}
            assistanceText=''
            defaultValue={editPlayerContext.detailContractData[0].desc_tipo_procedimiento || ''}
            handleOnChange={e => {
              let onChangeValue = [...editPlayerContext.detailContractData];
              onChangeValue[0]["desc_tipo_procedimiento"] = e.target.value;
              editPlayerContext.setDetailContractData(onChangeValue); }}
            >
              <option value=''>Selecciona</option>
              {
                editPlayerContext.procedureTypes?.map((item,index) => {
                  const selected = editPlayerContext.detailContractData[0].desc_tipo_procedimiento == item.desc_tipo_procedimiento ? 'selected' : '';
                  return (
                    <option key={index} value={item.desc_tipo_procedimiento} selected={selected}>{item.desc_tipo_procedimiento}</option>
                  );
                })
              }
          </LabelSelectElementAssist>
        </FormSimplePanelRow>
        <FormSimplePanelRow>
          <LabelSelectElementAssist
            htmlFor='playerTeamOrigin'
            labelText='Club Origen*'
            assistanceText=''
            required={true}
            defaultValue={editPlayerContext.detailContractData[0].id_club_origen || ''}
            handleOnChange={e => {
              let onChangeValue = [...editPlayerContext.detailContractData];
              onChangeValue[0]["id_club_origen"] = e.target.value;
              editPlayerContext.setDetailContractData(onChangeValue); }}
            >
              <option value=''>Selecciona</option>
              { teams?.map(item => {
                const selected = editPlayerContext.detailContractData[0].id_club_origen == item.id_equipo ? 'selected' : '';
                return (
                  <option key={item.id_equipo} value={item.id_equipo} selected={selected}>{item.desc_nombre_club}</option>
                );
              })}
          </LabelSelectElementAssist>
        </FormSimplePanelRow>
        <FormSimplePanelRow>
          <LabelSelectElementAssist
            htmlFor='playerTeamDestination'
            labelText='Club Destino*'
            assistanceText=''
            required={true}
            defaultValue={editPlayerContext.detailContractData[0].id_club_destino || ''}
            handleOnChange={e => {
              let onChangeValue = [...editPlayerContext.detailContractData];
              onChangeValue[0]["id_club_destino"] = e.target.value;
              editPlayerContext.setDetailContractData(onChangeValue); }}
            >
              <option value=''>Selecciona</option>
              { teams?.map(item => {
                const selected = editPlayerContext.detailContractData[0].id_club_destino == item.id_equipo ? 'selected' : '';
                return (
                  <option key={item.id_equipo} value={item.id_equipo} selected={selected}>{item.desc_nombre_club}</option>
                );
              })}
          </LabelSelectElementAssist>
        </FormSimplePanelRow>
        <FormSimplePanelRow>
          <LabelElementAssist
            htmlFor='contractStartDate'
            type='date'
            className='panel-field-long'
            autoComplete='off'
            placeholder='dd/mm/yyyy'
            required={true}
            assistanceText=''
            value={editPlayerContext.detailContractData[0].dt_inicio_contrato || ''}
            handleOnChange={e => {
              let onChangeValue = [...editPlayerContext.detailContractData];
              onChangeValue[0]["dt_inicio_contrato"] = e.target.value;
              editPlayerContext.setDetailContractData(onChangeValue); }}
            >
            Fecha inicio contrato*
          </LabelElementAssist>
        </FormSimplePanelRow>
        <FormSimplePanelRow>
          <LabelElementAssist
            htmlFor='contractRealStartDate'
            type='date'
            className='panel-field-long'
            autoComplete='off'
            placeholder='dd/mm/yyyy'
            required={true}
            assistanceText=''
            value={editPlayerContext.detailContractData[0].dt_inicio_contrato_real || ''}
            handleOnChange={e => {
              let onChangeValue = [...editPlayerContext.detailContractData];
              onChangeValue[0]["dt_inicio_contrato_real"] = e.target.value;
              editPlayerContext.setDetailContractData(onChangeValue); }}
            >
            Fecha inicio contrato real*
          </LabelElementAssist>
        </FormSimplePanelRow>
        <FormSimplePanelRow>
          <LabelElementAssist
            htmlFor='contractEndDate'
            type='date'
            className='panel-field-long'
            autoComplete='off'
            placeholder='dd/mm/yyyy'
            required={true}
            assistanceText='*'
            value={editPlayerContext.detailContractData[0].dt_fin_contrato || ''}
            handleOnChange={e => {
              let onChangeValue = [...editPlayerContext.detailContractData];
              onChangeValue[0]["dt_fin_contrato"] = e.target.value;
              editPlayerContext.setDetailContractData(onChangeValue); }}
            >
            Fecha fin contrato*
          </LabelElementAssist>
        </FormSimplePanelRow>
        <FormSimplePanelRow>
          <LabelElementAssist
            htmlFor='clubPercentage'
            type='number'
            className='panel-field-long'
            autoComplete='off'
            placeholder='Porcentaje (%)'
            required={true}
            assistanceText=''
            value={editPlayerContext.detailContractData[0].val_pct_pago_atm || ''}
            handleOnChange={e => {
              let onChangeValue = [...editPlayerContext.detailContractData];
              onChangeValue[0]["val_pct_pago_atm"] = e.target.value;
              editPlayerContext.setDetailContractData(onChangeValue); }}
            >
            Porcentaje pago club*
          </LabelElementAssist>
        </FormSimplePanelRow>
        <FormSimplePanelRow>
          <LabelSelectElement
            htmlFor='contractIntermediary1'
            labelText='Intermediario 1'
            required={true}
            defaultValue={editPlayerContext.detailContractData[0].id_intermediario_1 || ''}
            handleOnChange={e => {
              let onChangeValue = [...editPlayerContext.detailContractData];
              onChangeValue[0]["id_intermediario_1"] = e.target.value;
              editPlayerContext.setDetailContractData(onChangeValue); }}
            >
              <option value=''>Selecciona</option>
              { intermediaries?.map(item => {
                const selected = editPlayerContext.detailContractData[0].id_intermediario_1 == item.id_intermediario ? 'selected' : ''
                return (
                  <option key={item.id_intermediario} value={item.id_intermediario} selected={selected}>{item.nombre}</option>
                );
              })}
          </LabelSelectElement>
        </FormSimplePanelRow>
        <FormSimplePanelRow>
          <LabelSelectElement
            htmlFor='contractIntermediary2'
            labelText='Intermediario'
            defaultValue={editPlayerContext.detailContractData[0].id_intermediario_2 || ''}
            handleOnChange={e => {
              let onChangeValue = [...editPlayerContext.detailContractData];
              onChangeValue[0]["id_intermediario_2"] = e.target.value;
              editPlayerContext.setDetailContractData(onChangeValue); }}
            >
              <option value=''>Selecciona</option>
              { intermediaries?.map(item => {
                const selected = editPlayerContext.detailContractData[0].id_intermediario_2 == item.id_intermediario ? 'selected' : ''
                return (
                  <option key={item.id_intermediario} value={item.id_intermediario} selected={selected}>{item.nombre}</option>
                );
              })}
          </LabelSelectElement>
        </FormSimplePanelRow>
        <FormSimplePanelRow>
          <LabelSelectElement
            htmlFor='contractIntermediary3'
            labelText='Intermediario'
            defaultValue={editPlayerContext.detailContractData[0].id_intermediario_3 || ''}
            handleOnChange={e => {
              let onChangeValue = [...editPlayerContext.detailContractData];
              onChangeValue[0]["id_intermediario_3"] = e.target.value;
              editPlayerContext.setDetailContractData(onChangeValue); }}
            >
              <option value=''>Selecciona</option>
              { intermediaries?.map(item => {
                const selected = editPlayerContext.detailContractData[0].id_intermediario_3 == item.id_intermediario ? 'selected' : ''
                return (
                  <option key={item.id_intermediario} value={item.id_intermediario} selected={selected}>{item.nombre}</option>
                );
              })}
          </LabelSelectElement>
        </FormSimplePanelRow>
        <FormSimplePanelRow>
          <LabelElementAssist
            htmlFor='amountTotalSalary'
            type='text'
            className='panel-field-long'
            autoComplete='off'
            placeholder='Introduce euros'
            required={true}
            assistanceText=''
            value={editPlayerContext.detailContractData[0].val_imp_salario_total || ''}
            handleOnChange={e => {
              let onChangeValue = [...editPlayerContext.detailContractData];
              onChangeValue[0]["val_imp_salario_total"] = e.target.value;
              editPlayerContext.setDetailContractData(onChangeValue); }}
            >
            Importe Salario Total*
          </LabelElementAssist>
        </FormSimplePanelRow>
        <FormSimplePanelRow>
          <p><strong>
            { (editPlayerContext.detailContractData[0].desc_tipo_contrato === 'Laboral') ? 'Salario fijo' : 'Importe fijo'}
            </strong></p>
        </FormSimplePanelRow>
        
        {
          editPlayerContext.detailSalaryData.map((item,index) => {
            console.log('item detail Salary', item)
            return (
              <div key={index} className='cm-u-spacer-mb-bigger'>
                <FormSimplePanelRow >
                  <LabelElement
                    htmlFor='val_salario_fijo'
                    type='number'
                    className='panel-field-short'
                    autoComplete='off'
                    placeholder='Importe en euros'
                    required={true}
                    value={item.val_salario_fijo || ''}
                    handleOnChange={e => {
                      let onChangeValue = [...editPlayerContext.detailSalaryData];
                      onChangeValue[index]["val_salario_fijo"] = e.target.value;
                      editPlayerContext.setDetailSalaryData(onChangeValue); }}
                    >
                    
                  </LabelElement>
                  <LabelElementToggle2Sides
                    htmlFor='flag_bruto_neto'
                    titleClassNameLeft='cm-u-textRight'
                    textLeft='Bruto'
                    titleClassNameRight='cm-u-spacer-mr-medium'
                    textRight='Neto'
                    required={true}
                    checked={(item.flag_bruto_neto == 1) || (item.flag_bruto_neto === true)  ? true : false}
                    handleOnChange={e => {
                      let onChangeValue = [...editPlayerContext.detailSalaryData];
                      onChangeValue[index]["flag_bruto_neto"] = e.target.checked;
                      editPlayerContext.setDetailSalaryData(onChangeValue); }}
                    ></LabelElementToggle2Sides>
                  <LabelElement
                    htmlFor='dt_inicio'
                    type='date'
                    className='panel-field-flexible'
                    autoComplete='off'
                    placeholder='dd/mm/yyyy'
                    required={true}
                    value={item.dt_inicio || ''}
                    handleOnChange={e => {
                      let onChangeValue = [...editPlayerContext.detailSalaryData];
                      onChangeValue[index]["dt_inicio"] = e.target.value;
                      editPlayerContext.setDetailSalaryData(onChangeValue); }}
                    >
                    Fecha inicio
                  </LabelElement>
                  <LabelElement
                    htmlFor='dt_fin'
                    type='date'
                    className='panel-field-flexible'
                    autoComplete='off'
                    placeholder='dd/mm/yyyy'
                    required={true}
                    value={item.dt_fin || ''}
                    handleOnChange={e => {
                      let onChangeValue = [...editPlayerContext.detailSalaryData];
                      onChangeValue[index]["dt_fin"] = e.target.value;
                      editPlayerContext.setDetailSalaryData(onChangeValue); }}
                    >
                    Fecha fin
                  </LabelElement>
                  {(index !== 0) ?                   
                    <IconButtonSmallSecondary
                      onClick={(e) => {
                        e.preventDefault();
                        const newSalariesArray = [...editPlayerContext.detailSalaryData];
                        newSalariesArray.splice(index,1);
                        editPlayerContext.setDetailSalaryData(newSalariesArray);
                      }} >
                        <SymbolDelete />
                    </IconButtonSmallSecondary>
                    : ''}
                  {index+1 == editPlayerContext.detailSalaryData.length ?                   
                    <IconButtonSmallSecondary
                      onClick={(e) => {
                        e.preventDefault();
                        // handleAddNewSalary(index+1);
                        editPlayerContext.setDetailSalaryData([...editPlayerContext.detailSalaryData, {id_salario_fijo:index+1,flag_bruto_neto:0,fch_inicio:'',fch_fin:'',num_salario_fijo:''}]) 
                      }} >
                        <SymbolAdd />
                    </IconButtonSmallSecondary>
                    : ''}
                </FormSimplePanelRow>
                
              </div>
            );
          })
        }
        <FormSimplePanel><p><strong>Clausula de rescisión</strong></p></FormSimplePanel>
        {/* { renderEditTerminationClause() } */}
        { editPlayerContext.creatingContractError? 
          <FormSimplePanelRow
          className='cm-u-centerText'>
            <span className='error'>{editPlayerContext.creatingContractError}</span>
          </FormSimplePanelRow>
          : ''
        }
        <FormSimplePanelRow
          className='cm-u-centerText'>
          <ButtonMousePrimary
            // onClick={handleSaveEditedContract}
            >Guardar</ButtonMousePrimary>
          <ButtonMouseGhost
            onClick={() => {
              editPlayerContext.setEditContract(false);
              editPlayerContext.setDetailContractData(null);
              editPlayerContext.setDetailSalaryData(null);
              window.scrollTo(0,0);
            }}
            >Cancelar</ButtonMouseGhost>
        </FormSimplePanelRow>
      </SimpleAccordionContent>
    </>
  );
}


const NewSalaryLine = ({ handleAddNewSalaryComb, handleChangesOnNewSalaryComb, handleDeleteNewSalaryComb,handleAddNewFixedSalaryLine,handleDeleteNewFixedSalaryLine, teams,intermediaries, idJugador }) => {

  const editPlayerContext = useEditPlayerDataContext();

  return (
    <>
      {
        editPlayerContext.contractSalary.map((item,index) => {
          const SalaryComb = item.id_salaryComb; 

          return (
            <div key={item.id_salaryComb} data-id={item.id_salaryComb}  className='cm-u-spacer-mb-bigger'>
              { editPlayerContext.newContractDataForSalaryComb.descType === 5 &&
                <>
                  <FormSimplePanelRow>
                    <LabelElementAssist
                      htmlFor='importe_fijo'
                      type='number'
                      className='panel-field-long'
                      autoComplete='off'
                      placeholder='introduce importe'
                      required={true}
                      assistanceText=''
                      // defaultValue={contractSalary[index].importe_fijo}
                      // handleOnChange={e => {
                      //   handleChangesOnNewSalaryComb(e, index)
                      //   }
                      // }
                      >
                      Importe en euros*
                    </LabelElementAssist>
                  </FormSimplePanelRow>
                </>
              }
              <BeneficiaryItem 
                item={item}
                index={index}
                handleAddNewSalaryComb={handleAddNewSalaryComb}
                handleChangesOnNewSalaryComb={handleChangesOnNewSalaryComb}
                handleDeleteNewSalaryComb={handleDeleteNewSalaryComb}
                teams={teams}
                intermediaries={intermediaries}
                idJugador={idJugador}
              />
              <SalaryLineItem
                index={index}
                handleAddNewFixedSalaryLine={handleAddNewFixedSalaryLine}
                handleDeleteNewFixedSalaryLine={handleDeleteNewFixedSalaryLine}
                 />
            </div>
          );
        })
      }
    </>
  )
}

// const EditSalaryLine = () => {
//   const editPlayerContext = useEditPlayerDataContext();
//   return (
//     {
//       editPlayerContext.detailSalaryData.map((item,index) => {
//         const SalaryComb = item.id_salaryComb; 

//         return (
//           <div key={item.id_salaryComb} data-id={item.id_salaryComb}  className='cm-u-spacer-mb-bigger'>
//             { editPlayerContext.newContractDataForSalaryComb.descType === 5 &&
//               <>
//                 <FormSimplePanelRow>
//                   <LabelElementAssist
//                     htmlFor='importe_fijo'
//                     type='number'
//                     className='panel-field-long'
//                     autoComplete='off'
//                     placeholder='introduce importe'
//                     required={true}
//                     assistanceText=''
//                     // defaultValue={contractSalary[index].importe_fijo}
//                     // handleOnChange={e => {
//                     //   handleChangesOnNewSalaryComb(e, index)
//                     //   }
//                     // }
//                     >
//                     Importe en euros*
//                   </LabelElementAssist>
//                 </FormSimplePanelRow>
//               </>
//             }
//             <BeneficiaryItem 
//               item={item}
//               index={index}
//               handleAddNewSalaryComb={handleAddNewSalaryComb}
//               handleChangesOnNewSalaryComb={handleChangesOnNewSalaryComb}
//               handleDeleteNewSalaryComb={handleDeleteNewSalaryComb}
//               teams={teams}
//               intermediaries={intermediaries}
//               idJugador={idJugador}
//             />
//             <SalaryLineItem
//               index={index}
//               handleAddNewFixedSalaryLine={handleAddNewFixedSalaryLine}
//               handleDeleteNewFixedSalaryLine={handleDeleteNewFixedSalaryLine}
//                />
//           </div>
//         );
//       })
//     }
//   );
// }

const BeneficiaryItem = ({ item, index, SalaryComb, handleAddNewSalaryComb, handleChangesOnNewSalaryComb, handleDeleteNewSalaryComb, teams, intermediaries, idJugador }) => {

  const editPlayerContext = useEditPlayerDataContext();

  if (editPlayerContext.newContractDataForSalaryComb.descType > 1) {
    return (
      <>
        <FormSimplePanelRow>
          <LabelSelectShorterElement
            htmlFor='beneficiario'
            labelText='Beneficiario'
            required={true}
            defaultValue={editPlayerContext.contractSalary[index].beneficiario}
            handleOnChange={e => {
              // console.log('event beneficiario', e.target);
              handleChangesOnNewSalaryComb(e, index)
              }
            }
            >
              <option value=''>Selecciona</option>
              <BeneficiaryOptions
                teams={teams}
                intermediaries={intermediaries}
                idJugador={idJugador}
              />
          </LabelSelectShorterElement>
          {(item.id_salaryComb !== 1) ?                   
            <IconButtonSmallSecondary
              onClick={() => {
                handleDeleteNewSalaryComb(index);
              }} >
                <SymbolDelete />
            </IconButtonSmallSecondary>
            : ''}
          {(index+1 == editPlayerContext.contractSalary.length && editPlayerContext.newContractDataForSalaryComb.descType > 3 && editPlayerContext.contractSalary.length <= 2 ) ?  
            <IconButtonSmallSecondary
              onClick={() => {
                handleAddNewSalaryComb(SalaryComb+1);
              }} >
                <SymbolAdd />
            </IconButtonSmallSecondary>
            : ''}
        </FormSimplePanelRow>
      </>
    )
  }
}

const BeneficiaryOptions = ({ teams, intermediaries, idJugador }) => {

  const editPlayerContext = useEditPlayerDataContext();

  return (
    <>
      {editPlayerContext.newContractDataForSalaryComb.descType < 4 ?
        <>
          { editPlayerContext.newContractDataForSalaryComb.originClubId && 
          <option 
            key={editPlayerContext.newContractDataForSalaryComb.originClubId} 
            value={editPlayerContext.newContractDataForSalaryComb.originClubId}
          >
            {searchName(editPlayerContext.newContractDataForSalaryComb.originClubId,teams,'id_equipo','desc_nombre_club')}
          </option>
          }
          { editPlayerContext.newContractDataForSalaryComb.destinationClubId && 
            <option 
              key={editPlayerContext.newContractDataForSalaryComb.destinationClubId} 
              value={editPlayerContext.newContractDataForSalaryComb.destinationClubId}
            >
              {searchName(editPlayerContext.newContractDataForSalaryComb.destinationClubId,teams,'id_equipo','desc_nombre_club')}
            </option> 
          }                   
        </>
        :
        <>          
          { editPlayerContext.newContractDataForSalaryComb.descType < 5 ? 
            <>
              { editPlayerContext.newContractDataForSalaryComb.intermediary1Id && 
                <option 
                  key={editPlayerContext.newContractDataForSalaryComb.intermediary1Id} 
                  value={`${editPlayerContext.newContractDataForSalaryComb.intermediary1Id}`} 
                >
                  {searchName(editPlayerContext.newContractDataForSalaryComb.intermediary1Id,intermediaries,'id_intermediario','nombre')}
                </option>
              }
              { editPlayerContext.newContractDataForSalaryComb.intermediary2Id && 
                <option 
                  key={editPlayerContext.newContractDataForSalaryComb.intermediary2Id} 
                  value={`${editPlayerContext.newContractDataForSalaryComb.intermediary2Id}`} 
                >
                  {searchName(editPlayerContext.newContractDataForSalaryComb.intermediary2Id,intermediaries,'id_intermediario','nombre')}
                </option>
              }
              { editPlayerContext.newContractDataForSalaryComb.intermediary3Id && 
                <option 
                  key={editPlayerContext.newContractDataForSalaryComb.intermediary3Id} 
                  value={`${editPlayerContext.newContractDataForSalaryComb.intermediary3Id}}`} 
                >
                  {searchName(editPlayerContext.newContractDataForSalaryComb.intermediary3Id,intermediaries,'id_intermediario','nombre')}
                </option>
              }
            </>
            :
            <>
              <option 
                key={idJugador} 
                value={`${idJugador}#Jugador`} 
              >
                {`${editPlayerContext.playerDataDetails.desc_nombre} ${editPlayerContext.playerDataDetails.desc_apellido1}`}
              </option>
              { editPlayerContext.newContractDataForSalaryComb.intermediary1Id && 
                <option 
                  key={editPlayerContext.newContractDataForSalaryComb.intermediary1Id} 
                  value={`${editPlayerContext.newContractDataForSalaryComb.intermediary1Id}#Intermediario`} 
                >
                  {searchName(editPlayerContext.newContractDataForSalaryComb.intermediary1Id,intermediaries,'id_intermediario','nombre')}
                </option>
              }
              { editPlayerContext.newContractDataForSalaryComb.intermediary2Id && 
                <option 
                  key={editPlayerContext.newContractDataForSalaryComb.intermediary2Id} 
                  value={`${editPlayerContext.newContractDataForSalaryComb.intermediary2Id}#Intermediario`} 
                >
                  {searchName(editPlayerContext.newContractDataForSalaryComb.intermediary2Id,intermediaries,'id_intermediario','nombre')}
                </option>
              }
              { editPlayerContext.newContractDataForSalaryComb.intermediary3Id && 
                <option 
                  key={editPlayerContext.newContractDataForSalaryComb.intermediary3Id} 
                  value={`${editPlayerContext.newContractDataForSalaryComb.intermediary3Id}#Intermediario}`} 
                >
                  {searchName(editPlayerContext.newContractDataForSalaryComb.intermediary3Id,intermediaries,'id_intermediario','nombre')}
                </option>
              }
              { editPlayerContext.newContractDataForSalaryComb.originClubId && 
                <option 
                  key={editPlayerContext.newContractDataForSalaryComb.originClubId} 
                  value={`${editPlayerContext.newContractDataForSalaryComb.originClubId}#Club`} 
                >
                  {searchName(editPlayerContext.newContractDataForSalaryComb.originClubId,teams,'id_equipo','desc_nombre_club')}
                </option>
              }
              { editPlayerContext.newContractDataForSalaryComb.destinationClubId && 
                <option 
                  key={editPlayerContext.newContractDataForSalaryComb.destinationClubId} 
                  value={`${editPlayerContext.newContractDataForSalaryComb.destinationClubId}#Club`} 
                >
                  {searchName(editPlayerContext.newContractDataForSalaryComb.destinationClubId,teams,'id_equipo','desc_nombre_club')}
                </option> 
              }   
            </>
          }
        </>
      }
    </>
  )
}

const SalaryLineItem = ({ index, handleAddNewFixedSalaryLine, handleDeleteNewFixedSalaryLine }) => {
  const editPlayerContext = useEditPlayerDataContext();

  if ( editPlayerContext.newContractDataForSalaryComb.descType < 5 ) {
    // console.log('contractSalary',contractSalary, index)
    return (
      <>
        {
          editPlayerContext.contractSalary[index].salaryComb?.map((item,index2) => {
            return (
              <>
                <FormSimplePanelRow key={index}>
                  <LabelElement
                    htmlFor='val_salario_fijo'
                    type='number'
                    className='panel-field-short'
                    autoComplete='off'
                    placeholder='Importe en €'
                    required={true}
                    value={editPlayerContext.contractSalary[index].salaryComb[index2].val_salario_fijo || ''}
                    handleOnChange={(e) => {
                      let onChangeValue = [...editPlayerContext.contractSalary];
                      onChangeValue[index]["salaryComb"][index2]["val_salario_fijo"] = e.target.value;
                      editPlayerContext.setContractSalary(onChangeValue);                            
                    }}
                    >
                    
                  </LabelElement>
                  <LabelElementToggle2Sides
                    htmlFor='flag_bruto_neto'
                    titleClassNameLeft='cm-u-textRight'
                    textLeft='Bruto'
                    titleClassNameRight='cm-u-spacer-mr-medium'
                    textRight='Netor'
                    required={true}
                    checked={editPlayerContext.contractSalary[index].salaryComb[index2].flag_bruto_neto == '1' ? true : ''}
                    handleOnChange={(event) => {
                      let {name, checked} = event.target;
                      let onChangeValue = [...editPlayerContext.contractSalary];
                      onChangeValue[index]["salaryComb"][index2][name] = checked ? '1' : '0';
                      editPlayerContext.setContractSalary(onChangeValue);
                    }} 
                    handleClick={e => { e.preventDefault; console.log('toggle');}}
                    />
                  <LabelElement
                    htmlFor='dt_inicio'
                    type='date'
                    className='panel-field-flexible'
                    autoComplete='off'
                    placeholder='dd/mm/yyyy'
                    required={true}
                    value={editPlayerContext.contractSalary[index].salaryComb[index2].dt_inicio || ''}
                    handleOnChange={(e) => {
                      let onChangeValue = [...editPlayerContext.contractSalary];
                      onChangeValue[index]["salaryComb"][index2]["dt_inicio"] = e.target.value;
                      editPlayerContext.setContractSalary(onChangeValue);                            
                    }}
                    >
                    Fecha inicio
                  </LabelElement>
                  <LabelElement
                    htmlFor='dt_fin'
                    type='date'
                    className='panel-field-flexible'
                    autoComplete='off'
                    placeholder='dd/mm/yyyy'
                    required={true}
                    value={editPlayerContext.contractSalary[index].salaryComb[index2].dt_fin || ''}
                    handleOnChange={(e) => {
                      let onChangeValue = [...editPlayerContext.contractSalary];
                      onChangeValue[index]["salaryComb"][index2]["dt_fin"] = e.target.value;
                      editPlayerContext.setContractSalary(onChangeValue);                            
                    }} 
                    >
                    Fecha fin
                  </LabelElement>
                  {(index2 !== 0) ?                   
                    <IconButtonSmallSecondary
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteNewFixedSalaryLine(index, index2);
                      }} >
                        <SymbolDelete />
                    </IconButtonSmallSecondary>
                    : ''}
                  {index2+1 == editPlayerContext.contractSalary[index].salaryComb.length ?                   
                    <IconButtonSmallSecondary
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddNewFixedSalaryLine(index, index2+1);
                      }} >
                        <SymbolAdd />
                    </IconButtonSmallSecondary>
                    : ''}
                </FormSimplePanelRow>
              </>
            );
          })
        }
      </>
    );
  }
}

//render linea clausula rescision
const NewTerminationClauseLine = ({ handleAddNewTerminationClause, handleDeleteNewTerminationClause, handleChangesOnNewTerminationClause, handleChangesOnNewTerminationClauseIfToggle }) => {
  const editPlayerContext = useEditPlayerDataContext();

  return (
    <>
      {
        editPlayerContext.contractTermination.map((item,index) => {
          const TermComb = item.id_clau_rescision;  
          return (
            <div key={item.id_clau_rescision} data-id={item.id_clau_rescision}  className='cm-u-spacer-mb-bigger'>
              <FormSimplePanelRow >
                <LabelElement
                  htmlFor='val_clau_rescision'
                  type='number'
                  className='panel-field-short'
                  autoComplete='off'
                  placeholder='Importe en €'
                  required={true}
                  value={item.val_clau_rescision}
                  handleOnChange={(event) => {
                    handleChangesOnNewTerminationClause(event,index)
                  }}
                  >
                  
                </LabelElement>
                <LabelElementToggle2Sides
                  htmlFor='flag_bruto_neto'
                  titleClassNameLeft='cm-u-textRight'
                  textLeft='Bruto'
                  titleClassNameRight='cm-u-spacer-mr-medium'
                  textRight='Neto'
                  required={true}
                  checked={item.flag_bruto_neto}
                  handleOnChange={(event) => {
                    handleChangesOnNewTerminationClauseIfToggle(event,index)
                  }} />
                <LabelElement
                  htmlFor='dt_inicio'
                  type='date'
                  className='panel-field-flexible'
                  autoComplete='off'
                  placeholder='dd/mm/yyyy'
                  required={true}
                  value={item.dt_inicio}
                  handleOnChange={(event) => {
                    handleChangesOnNewTerminationClause(event,index)
                  }}   >
                  Fecha inicio
                </LabelElement>
                <LabelElement
                  htmlFor='dt_fin'
                  type='date'
                  className='panel-field-flexible'
                  autoComplete='off'
                  placeholder='dd/mm/yyyy'
                  required={true}
                  value={item.dt_fin}
                  handleOnChange={(event) => {
                    handleChangesOnNewTerminationClause(event,index)
                  }}   >
                  Fecha fin
                </LabelElement>
                {(item.id_clau_rescision !== 1) ?                   
                  <IconButtonSmallSecondary
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteNewTerminationClause(index);
                    }} >
                      <SymbolDelete />
                  </IconButtonSmallSecondary>
                  : ''}
                {index+1 == editPlayerContext.contractTermination.length ?                   
                  <IconButtonSmallSecondary
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddNewTerminationClause(TermComb+1);
                    }} >
                      <SymbolAdd />
                  </IconButtonSmallSecondary>
                  : ''}
              </FormSimplePanelRow>
              
            </div>
          );
        })
      }
    </>
  )
}