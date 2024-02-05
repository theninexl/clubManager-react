export const TablePlayers = ({ children, className }) => {
  return (
    <table className={`cm-l-table-players ${className}`}>
      { children }
    </table>
  )
}

export const TablePlayers__Header = ({ children }) => {
  return (
    <thead className='cm-l-table-players__header'>
      { children }
    </thead>
  )
}

export const TablePlayers__Body = ({ children }) => {
  return (
    <tbody className='cm-l-table-players__body'>
      { children }
    </tbody>
  )
}

export const TablePlayers__tdLong = ({ children }) => {
  return (
    <td className='table-players-td-long'>
      { children }
    </td>
  )
}

export const TablePlayers__tdShort = ({ children }) => {
  return (
    <td className='table-players-td-short'>
      { children }
    </td>
  )
}

export const TablePlayers__tdAuto = ({ children }) => {
  return (
    <td className='table-players-td-auto'>
      { children }
    </td>
  )
}