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
  } = useManageVariablesForm( form, idJugador )

  useEffect(() => {
    getNewVariableCombos();
  },[])

  useEffect(() => {
    if (globalContext.activeContractId) {
      console.log('actualizo variables');
      getClausulasList(globalContext.activeContractId);
    }
  },[editPlayerContext.playerDataDetails])


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