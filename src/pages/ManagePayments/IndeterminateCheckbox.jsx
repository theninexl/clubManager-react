import { useEffect, useRef, useState } from "react"

export function IndeterminateCheckbox({ indeterminate, checked, rowSelectedIndex, row, table, column, ...rest}) {
  // const ref = useRef();

  // useEffect(() => {
  //   if (typeof indeterminate === 'boolean') {
  //     ref.current.indeterminate = !rest.checked && indeterminate
  //   }
  // }, [ref, indeterminate])

  // useEffect(()=>{
  //   if (row.getIsSelected() === true) {
  //     console.log('he seleccionado');
  //     column.columnDef.meta.setRowSelectedIndex(row.index)
  //   } else {
  //     column.columnDef.meta.setRowSelectedIndex(null)
  //   }
  // },[table.getSelectedRowModel()])


 return (
  <>
    { table.getIsSomePageRowsSelected() == true ?
      <>
        { row.index === table.getSelectedRowModel().rows[0].index ?               
          <>
            <input
              type="checkbox"
              name="selecCheckbox"
              // ref={ref}
              style={{display: ''}}
              {...rest}
            />
          </>
          :
          <>
            <input
              type="checkbox"
              name="selecCheckbox"
              // ref={ref}
              style={{display: 'none'}}
              {...rest}
            />
          </>
        }
      </>
      :
      <>
        <input
          type="checkbox"
          name="selecCheckbox"
          // ref={ref}
          style={ row.original.flag_fixed_clausula == 1  ?  {} : {display: 'none'}}
          {...rest}
        />
      </>
    }    
  </>
 )
}