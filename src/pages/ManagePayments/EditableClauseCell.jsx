import { useEffect, useState } from "react";
import { LabelElement } from "../../components/UI/components/form simple/formSimple";



export const EditableClauseCell = ({ getValue, row, column, table, }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue)
  const { updateClause } = table.options.meta;

  useEffect(()=> {
    setValue(initialValue)
  },[initialValue])

  return (
    <>
      <div className='cell-clause'>
      {console.log(table.getState())}
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
                  value={table.options.state.clauseTxt}
                  placeholder='Concepto'
                  handleOnChange={(e) => {
                    column.columnDef.meta.setClauseTxt(e.target.value)
                    
                  }}
                  onBlur={() => {
                    console.log('value', value);
                    updateClause(row.index, column.id, value)
                  }}
                ></LabelElement>
              </>         
            }
          </>
        }      
      </div>
      
    </> 
  )
}