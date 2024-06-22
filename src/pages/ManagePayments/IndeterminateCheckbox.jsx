import { useEffect, useRef, useState } from "react"

export function IndeterminateCheckbox({ indeterminate, row, table, column, ...rest}) {
  const ref = useRef();

  // useEffect(() => {
  //   if (typeof indeterminate === 'boolean') {
  //     ref.current.indeterminate = !rest.checked && indeterminate
  //   }
  // }, [ref, indeterminate])

  useEffect(()=>{
    const selectedRows = table.getSelectedRowModel().flatRows.map((row) => row);
    console.log(selectedRows);
    column.columnDef.meta.setRowSelected(selectedRows[0])
  },[table.getSelectedRowModel()])


 return (
  <>
    {row.original.flag_fixed_clausula == 1 ?  
      <>

        {/* { console.log(table.getIsSomePageRowsSelected()) } */}
        { table.getIsSomePageRowsSelected() == true ?
          <>
            {/* {console.log('que seleccionado', column.columnDef.meta.rowSelected2)} */}
            { row.index === column.columnDef.meta.rowSelected2 ? 
              
              <>
                <input
                  type="checkbox"
                  name="selecCheckbox"
                  ref={ref}
                  style={{display: ''}}
                  {...rest}
                />
              </>
              :
              <input
                type="checkbox"
                name="selecCheckbox"
                ref={ref}
                style={{display: 'none'}}
                {...rest}
              />
            }
          </>
          :
          <>
            <input
              type="checkbox"
              name="selecCheckbox"
              ref={ref}
              style={ row.original.flag_fixed_clausula == 1  ?  {} : {display: 'none'}}
              {...rest}
            />
          </>
        }
      </> 
      :
      ''
      }
    
  </>
 )
}