import { useEffect, useRef } from "react"

export function IndeterminateCheckbox({ indeterminate, ...rest}) {
  const ref = useRef(null);

  useEffect(() => {
    // console.log('ref',ref);
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])

  return (
    <input
      type="checkbox"
      ref={ref}
      style={ rest.index < 8  ?  {} : {display: 'none'}}
      {...rest}
    />
  )
}