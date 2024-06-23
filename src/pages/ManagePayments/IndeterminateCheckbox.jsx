import { useEffect, useRef } from "react"

export function IndeterminateCheckbox({indeterminate, checked, row, table, column, ...rest}) {
  const ref = useRef();

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])


 return (
  <>
    { checked ?
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
          <>
            <input
              type="checkbox"
              name="selecCheckbox"
              ref={ref}
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
          ref={ref}
          style={ row.original.flag_fixed_clausula == 1  ?  {} : {display: 'none'}}
          {...rest}
        />
      </>
    }    
  </>
 )
}