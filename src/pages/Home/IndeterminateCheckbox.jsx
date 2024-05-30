import { useEffect, useRef } from "react"

export function IndeterminateCheckbox({ indeterminate, row, table, column, ...rest}) {
  const ref = useRef(null);

  useEffect(() => {   
    // console.log(ref.current);
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }

    if (row.getIsSelected() === true) {
      // console.log(row);
      column.columnDef.meta.setRowSelected2(row.index)
    }
  }, [ref, indeterminate])


 return (
  <>
    {row.index < 8 ? 
      <>
        { table.getIsSomePageRowsSelected() == true ?
          <>
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
              style={ row.index < 8  ?  {} : {display: 'none'}}
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