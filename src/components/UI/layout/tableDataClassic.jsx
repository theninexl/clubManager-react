export const TableDataCls = ({ children, className }) => {
  return (
    <table className={`cm-l-tabledata-cls ${className}`}>
      {children}
    </table>
  )
}

export const TableDataClsHead = ({ children, className }) => {
  return (
    <thead className={`cm-l-tabledata-cls__header ${className}`}>
      {children}
    </thead>
  )
}

export const TableDataClsHead__cell = ({ children, className }) => {
  return (
    <th className={`table-bg ${className}`}>
      {children}
    </th>
  )
}

export const TableDataClsBody = ({ children, className }) => {
  return (
    <tbody className={`cm-l-tabledata-cls__body ${className}`}>
      {children}
    </tbody>
  )
}

export const TableDataClsBody__row = ({ children, className }) => {
  return (
    <tr className={`${className}`}>
      {children}
    </tr>
  )
}

export const TableDataClsBody__cell = ({ children, className }) => {
  return (
    <td className={`${className}`}>
      {children}
    </td>
  )
}