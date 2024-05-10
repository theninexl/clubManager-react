import { useManageContractForm } from "./useManageContractForm";
import { ListPlayerContracts, ContractDataLayer } from "./EditContractsUtils";
import { TableDataWrapper } from "../../components/UI/layout/tableData";



export const EditContractsTab = ({ form, idJugador, teams, intermediaries }) => { 
  
  //hook contratos 
  const {
    handleAddNewSalaryComb,
    handleChangesOnNewSalaryComb,
    handleDeleteNewSalaryComb,
    handleAddNewFixedSalaryLine,
    handleDeleteNewFixedSalaryLine,
    handleAddNewTerminationClause,
    handleDeleteNewTerminationClause,
    handleChangesOnNewTerminationClause,
    handleChangesOnNewTerminationClauseIfToggle,
    handleAddNewContract,
    handleDeleteContract,
    handleEditContract,
  } = useManageContractForm(form, idJugador);

  return (
    <>
      <TableDataWrapper className='cm-u-spacer-mt-big'>       
        <ListPlayerContracts 
          handleDeleteContract={handleDeleteContract}
          handleEditContract={handleEditContract}
        />
        <ContractDataLayer
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
          teams={teams}
          intermediaries={intermediaries}
          idJugador={idJugador}
        />
      </TableDataWrapper>
    </>
  );

}