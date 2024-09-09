import { useManageContractForm } from "./useManageContractForm";
import { ListPlayerContracts, ContractDataLayer } from "./EditContractsUtils";
import { TableDataWrapper } from "../../components/UI/layout/tableData";


export const EditContractsTab = ({ form, idJugador, teams, intermediaries }) => { 
  
  //hook contratos 
  const {
    handleAddNewSalaryComb,
    handleChangesOnNewSalaryComb,
    handleChangesOnEditSalaryComb,
    handleDeleteNewSalaryComb,
    handleAddNewSalaryCombEdit,
    handleDeleteNewSalaryCombEdit,
    handleAddNewFixedSalaryLine,
    handleDeleteNewFixedSalaryLine,
    handleAddNewFixedSalaryLineEdit,
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
  } = useManageContractForm(form, idJugador);

  return (
    <>
      <TableDataWrapper className='cm-u-spacer-mt-big'>       
        <ListPlayerContracts 
          handleDeleteContract={handleDeleteContract}
          handleEditContract={handleEditContract}
          handleSetActiveContract={handleSetActiveContract}
        />
        <ContractDataLayer
          handleAddNewSalaryComb={handleAddNewSalaryComb}
          handleAddNewSalaryCombEdit={handleAddNewSalaryCombEdit}
          handleChangesOnNewSalaryComb={handleChangesOnNewSalaryComb}
          handleChangesOnEditSalaryComb={handleChangesOnEditSalaryComb}
          handleDeleteNewSalaryComb={handleDeleteNewSalaryComb}
          handleDeleteNewSalaryCombEdit={handleDeleteNewSalaryCombEdit}
          handleAddNewFixedSalaryLine={handleAddNewFixedSalaryLine}
          handleDeleteNewFixedSalaryLine={handleDeleteNewFixedSalaryLine}
          handleAddNewFixedSalaryLineEdit={handleAddNewFixedSalaryLineEdit}
          handleDeleteNewFixedSalaryLineEdit={handleDeleteNewFixedSalaryLineEdit}
          handleAddNewTerminationClause={handleAddNewTerminationClause}
          handleDeleteNewTerminationClause={handleDeleteNewTerminationClause}
          handleAddEditTerminationClause={handleAddEditTerminationClause}
          handleDeleteEditTerminationClause={handleDeleteEditTerminationClause}
          handleChangesOnNewTerminationClause={handleChangesOnNewTerminationClause}
          handleChangesOnNewTerminationClauseIfToggle={handleChangesOnNewTerminationClauseIfToggle}
          handleChangesOnEditTerminationClause={handleChangesOnEditTerminationClause}
          handleChangesOnEditTerminationClauseIfToggle={handleChangesOnEditTerminationClauseIfToggle}
          handleAddNewContract={handleAddNewContract}
          handleSaveEditedContract={handleSaveEditedContract}
          teams={teams}
          intermediaries={intermediaries}
          idJugador={idJugador}
        />
      </TableDataWrapper>
    </>
  );

}