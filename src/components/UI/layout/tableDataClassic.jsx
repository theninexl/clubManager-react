export const TableDataCls = ({ children, className, style }) => {
  return (
    <table 
      className={`cm-l-tabledata-cls ${className}`}
      style={style}
    >
      {children}
    </table>
  )
}

export const TableDataClsHead = ({ children, className, style }) => {
  return (
    <thead 
      className={`cm-l-tabledata-cls__header ${className}`}
      style={style}
    >
      {children}
    </thead>
  )
}

export const TableDataClsHead__cell = ({ children, className, style }) => {
  return (
    <th 
      className={`table-bg ${className}`}
      style={style}
    >
      {children}
    </th>
  )
}

export const TableDataClsBody = ({ children, className, style }) => {
  return (
    <tbody 
      className={`cm-l-tabledata-cls__body ${className}`}
      style={style}
    >
      {children}
    </tbody>
  )
}

export const TableDataClsBody__row = ({ children, className, style }) => {
  return (
    <tr 
      className={`${className}`}
      style={style}
    >
      {children}
    </tr>
  )
}

export const TableDataClsBody__cell = ({ children, className, style }) => {
  return (
    <td 
      className={`${className}`}
      style={style}
    >
      {children}
    </td>
  )
}