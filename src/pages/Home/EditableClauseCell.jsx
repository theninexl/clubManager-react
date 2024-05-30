import { useEffect, useState } from "react";



export const EditableClauseCell = ({ getValue, row, column, table, }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue)
  const { updateClause } = table.options.meta;

  useEffect(()=> {
    setValue(initialValue)
  },[initialValue])

  return (
    <>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '8px', 
        padding: '8px',
        height: '100%',
      }}>
        { (table.getState().subtractState && table.getState().insertState && row.id == table.getRowCount()-1) && 
        <>
          { row.original.TipoClausula }
          <input
              value={value}
              placeholder="Introduce nombre sanción"
              onChange={(e) => {
                // console.log('value antes', value);
                let onChangeValue = {...value}
                onChangeValue = e.target.value;
                setValue(onChangeValue)
              }}
              onBlur={() => {
                updateClause(row.index, column.id, value)
              }}
              style={{
                border: '1px solid lightgray',
                borderRadius: '4px',
                display: 'flex',
                flexGrow: 0,
                width: '100%',
                height: '28px',
              }}
            />
        </>         
      }
      { (!table.getState().subtractState || (table.getState().subtractState && table.getState().insertState === false) || ( table.getState().subtractState && table.getState().insertState && row.id != table.getRowCount()-1 ) ) && 
        <>
          {`${row.original.TipoClausula != undefined ? row.original.TipoClausula : ''} ${value}`}
        </>
      }   
      
      </div>
      
    </> 
  )
}