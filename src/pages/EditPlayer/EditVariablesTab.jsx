import { useEffect } from "react";
import { useManageVariablesForm } from "./useManageVariablesForm"
import { ListSelectedContract, ListVariablesForSelectedContract, VariableDataLayer } from "./EditVariablesUtils";
import { TableDataWrapper } from "../../components/UI/layout/tableData";
// import { ModalPlayerCopyVariables } from "../../components/Modals/ModalPlayerCopyVariables";

export const EditVariablesTab = ({ form, idJugador }) => {

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
  } = useManageVariablesForm( form, idJugador )

  useEffect(() => {
    getNewVariableCombos();
  },[])

  return (
    <TableDataWrapper className='cm-u-spacer-mt-big'>
      <ListSelectedContract />
      <ListVariablesForSelectedContract
        handleDeleteClausula={handleDeleteClausula}
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
      />
    </TableDataWrapper>
  );
}