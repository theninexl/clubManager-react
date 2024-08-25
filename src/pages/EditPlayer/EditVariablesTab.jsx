import { useEffect } from "react";
import { useManageVariablesForm } from "./useManageVariablesForm"
import { ListSelectedContract, ListVariablesForSelectedContract, VariableDataLayer } from "./EditVariablesUtils";
import { TableDataWrapper } from "../../components/UI/layout/tableData";
import { useEditPlayerDataContext } from "../../providers/EditPlayeProvider";
import { useGlobalContext } from "../../providers/globalContextProvider";

export const EditVariablesTab = ({ form, idJugador }) => {
  const globalContext = useGlobalContext();
  const editPlayerContext = useEditPlayerDataContext();

  const {
    handleAddNewVariableExpression,
    handleChangesOnNewVariableExpression,
    handleChangesOnNewVariableExpressionToggle,
    handleDeleteNewVariableExpression,
    handleAddNewCond,
    handleDeleteNewCond,
    searchExpression,
    searchCondition,
    handleDeleteClausula,
    getNewVariableCombos,
    handleSaveNewVariable,
    getClausulasList,
    handleEditClausula,
    handleAddNewDetailVariableExpression,
    handleChangesOnDetailVariableExpression,
    handleChangesOnDetailVariableExpressionToggle,
    handleDeleteDetailVariableExpression,
    handleAddNewDetailCond,
    handleDeleteDetailCond
  } = useManageVariablesForm( form, idJugador )


  useEffect(() => {
    if (globalContext.activeContractId) {
      // console.log('activeContractId', globalContext.activeContractId);
      editPlayerContext.setVariableCombos2([]);
      getClausulasList(globalContext.activeContractId);
      getNewVariableCombos(globalContext.activeContractId)
    }
  },[globalContext.activeContractId])


  return (
    <TableDataWrapper className='cm-u-spacer-mt-big'>
      <ListSelectedContract />
      <ListVariablesForSelectedContract
        handleDeleteClausula={handleDeleteClausula}
        handleEditClausula={handleEditClausula}
      />
      <VariableDataLayer 
        handleChangesOnNewVariableExpression={handleChangesOnNewVariableExpression}
        handleChangesOnNewVariableExpressionToggle={handleChangesOnNewVariableExpressionToggle}
        handleDeleteNewVariableExpression={handleDeleteNewVariableExpression}
        handleAddNewVariableExpression={handleAddNewVariableExpression}
        handleAddNewCond={handleAddNewCond}
        handleDeleteNewCond={handleDeleteNewCond}
        searchExpression={searchExpression}
        searchCondition={searchCondition}
        handleSaveNewVariable={handleSaveNewVariable}
        handleAddNewDetailVariableExpression={handleAddNewDetailVariableExpression}
        handleChangesOnDetailVariableExpression={handleChangesOnDetailVariableExpression}
        handleChangesOnDetailVariableExpressionToggle={handleChangesOnDetailVariableExpressionToggle}
        handleDeleteDetailVariableExpression={handleDeleteDetailVariableExpression}
        handleAddNewDetailCond={handleAddNewDetailCond}
        handleDeleteDetailCond={handleDeleteDetailCond}
      />
    </TableDataWrapper>
  );
}