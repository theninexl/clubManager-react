import { useEffect, useState } from "react";

export const EditableCell = ({ getValue, row, column, table, }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue)

  const onBlur = () => {
    table.options.meta?.updateData(
      row.index,
      column.id,
      value 
    )
  }

  useEffect(()=> {
    setValue(initialValue)
  },[initialValue])

  console.log('meta', column.columnDef.meta)

  return (
    <>
      {row.index < 8 ? 
        <>
          {initialValue} <button onClick={()=> {
            column.columnDef.meta?.setEditState(false);
            column.columnDef.meta?.setColumnVisibility({...column.columnDef.meta?.columnVisibility, 'Select': false, 'Importe': false})
            }}>ST</button>
        </> :
        <>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
          />
        </> 
      }
    </>
  )
}