import { memo, useCallback, useEffect, useState } from "react";
import { LabelElement } from "../../components/UI/components/form simple/formSimple";

const EditableClauseCell = ({ initialClauseText, getValue, row, table, onValueChange }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const [fieldTxt, setFieldTxt] = useState();
  const { updateClause } = table.options.meta;

  const handleFieldTxtChange = useCallback(
    (e) => { 
      const text = e.target.value;
      console.log('escribo');
      setFieldTxt(text);
      onValueChange(text);
    }, [onValueChange]
  )

  useEffect(()=> {
    setValue(initialValue)
  },[initialValue])

  useEffect(() => {
    setFieldTxt(initialClauseText)
  },[initialClauseText])


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
                  value={fieldTxt}
                  placeholder='Concepto'
                  handleOnChange={handleFieldTxtChange}
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