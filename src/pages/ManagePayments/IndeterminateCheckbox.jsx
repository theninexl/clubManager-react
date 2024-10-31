import { useEffect, useRef } from "react"

export function IndeterminateCheckbox({indeterminate, row, table, onRowSelection, ...rest}) {
  const ref = useRef();

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }

    if (row.getIsSelected() === true && ref.current.checked == true) {
      onRowSelection(row.index, row.original)      
    } else {
      if (!table.getIsSomePageRowsSelected()) {
        // console.log('no hay nada seleccionado');
        onRowSelection(null, null)    
      } 
    }
  }, [ref, indeterminate])


 return (
  <>
    { table.getIsSomePageRowsSelected() == true ?
      <>
        { row.index === table.getSelectedRowModel().rows[0].index ? 
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
          // style={ row.index < 8  ?  {} : {display: 'none'}}
          {...rest}
        />
      </>
    }
  </>
 )
}