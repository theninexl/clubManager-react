import { useEffect } from "react";
import { useManageVariablesForm } from "./useManageVariablesForm"
import { ListSelectedContract, ListVariablesForSelectedContract, VariableDataLayer } from "./EditVariablesUtils";
import { TableDataWrapper } from "../../components/UI/layout/tableData";

export const EditVariablesTab = ({ form, idJugador }) => {
  //hook variables
  const {
    handleAddNewVariableExpression,
    handleChangesOnNewVariableExpression,
    handleChangesOnNewVariableExpressionToggle,
    handleDeleteNewVariableExpression,
    handleAddNewCond,
    handleDeleteNewCond,
    searchExpression,
    handleDeleteClausula,
    getNewVariableCombos,
  } = useManageVariablesForm(form, idJugador);

  useEffect(() => {
    console.log('llamar a getVariableCombos')
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
      />
    </TableDataWrapper>
  );
}