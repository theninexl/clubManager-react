import { useEffect, useRef } from "react"

export function IndeterminateCheckbox({ indeterminate, row, table, column, ...rest}) {
  const ref = useRef(null);

  useEffect(() => {
    console.log('useEffect checkbox')   
    console.log(ref.current);
    if (typeof indeterminate === 'boolean') {
      console.log('entro aqui', typeof(indeterminate));
      ref.current.indeterminate = !rest.checked && indeterminate
    }

    if (row.getIsSelected() === true) {
      console.log('row seleccionada', row.getIsSelected(),' ,cual:',row);
      column.columnDef.meta.setRowSelected2(row.index)
    }
  }, [ref, indeterminate])


 return (
  <>
    {row.original.flag_fixed_clausula == 1 ?  
      <>
        { console.log(table.getIsSomePageRowsSelected()) }
        { table.getIsSomePageRowsSelected() == true ?
          <>
            {console.log('que seleccionado', column.columnDef.meta.rowSelected2)}
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
                style={{display: ''}}
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