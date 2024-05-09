import { useManageContractForm } from "./useManageContractForm";
import { ListPlayerContracts, NewContractLayer } from "./EditContractsUtils";
import { TableDataWrapper } from "../../components/UI/layout/tableData";



export const EditContractsTab = ({ form, idJugador, teams, intermediaries }) => { 
  
  //pedir datos de contratos del jugador
  // const {
  //   getPlayerDetail,
  //   } = useGetPlayerData(idJugador);
  // useEffect(() => {
  //   getPlayerDetail(idJugador);
  // },[])

  //hook contratos 
  const {
    handleDeleteContract,
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
  } = useManageContractForm(form, idJugador);

  return (
    <>
      <TableDataWrapper className='cm-u-spacer-mt-big'>       
        <ListPlayerContracts 
          handleDeleteContract={handleDeleteContract}
        />
        <NewContractLayer
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