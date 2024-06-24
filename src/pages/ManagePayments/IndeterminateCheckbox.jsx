import { useEffect, useRef } from "react"

export function IndeterminateCheckbox({indeterminate, row, table, ...rest}) {
  const ref = useRef();

  useEffect(() => {
    console.log('rest', rest)
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])


 return (
  <>
    { rest.checked ?
      <>
      a
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
        b
        <input
          type="checkbox"
          name="selecCheckbox"
          ref={ref}
          style={ row.original.flag_fixed_clausula == 1  ?  {} : {display: 'none'}}
          {...rest}
        />
      </>
    }
    {/* { row.original.flag_fixed_clausula == 1 ?
      <>
        { row.index === table.getSelectedRowModel().rows[0].index ?               
          <>
            b<input
              type="checkbox"
              name="selecCheckbox"
              ref={ref}
              style={{display: ''}}
              {...rest}
            />
          </>
          :
          <>
            c<input
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
        a<input
          type="checkbox"
          name="selecCheckbox"
          ref={ref}
          style={ row.original.flag_fixed_clausula == 1  ?  {} : {display: 'none'}}
          {...rest}
        />
      </>
    }     */}
  </>
 )
}