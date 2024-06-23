import { memo, useEffect, useState } from "react";
import { LabelElement } from "../../components/UI/components/form simple/formSimple";



const EditableClauseCell = ({ getValue, row, table, onValueChange }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const [fieldTxt, setFieldTxt] = useState();
  const { updateClause } = table.options.meta;

  useEffect(()=> {
    setValue(initialValue)
  },[initialValue])

  const handleFieldTxtChange = (e) => { 
    console.log('escribo');
    onValueChange(e.target.value);
  }

  console.log('pintoEditableClauseCell');

  return (
    <>
      <div className='cell-clause'>
      {/* {console.log(table.getState())} */}
        { !table.getState().insertState
          || table.getState().insertState && !table.getState().regularState && row.id != table.getRowCount()-1
          ? 
          <>
            {`${row.original.TipoClausula != undefined ? row.original.TipoClausula : ''} ${value}`}
          </>
          :
          <>
            { table.getState().insertState &&
              (table.getState().advancePayState || table.getState().deferredPayState || table.getState().subtractState || table.getState().seizureState) && row.id == table.getRowCount()-1
               && 
              <>
                
                { row.original.TipoClausula }
                <LabelElement
                  style={{
                    borderRadius: '4px',
                    display: 'flex',
                    flexGrow: 0,
                    width: '100%',
                    height: '28px',
                  }}
                  // value={table.options.state.clauseTxt}
                  placeholder='Concepto'
                  handleOnChange={handleFieldTxtChange}
                  // handleOnChange={(e) => {
                  //   column.columnDef.meta.setClauseTxt(e.target.value)
                    
                  // }}
                  // onBlur={() => {
                  //   console.log('value', value);
                  //   updateClause(row.index, column.id, value)
                  // }}
                ></LabelElement>
              </>         
            }
          </>
        }      
      </div>
      
    </> 
  )
}

export default memo(EditableClauseCell);