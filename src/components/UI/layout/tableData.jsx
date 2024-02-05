export const TableDataWrapper = ({ children, className }) => {
  return (
    <div className={`cm-l-tabledata ${className}`}>
      { children }
    </div>
  );
} 

export const TableDataHeader = ({ children }) => {
  return (
    <div className='cm-l-tabledata__header'>
      { children }
    </div>
  );
}

export const TableDataRow = ({ children, className }) => {
  return (
    <div className={`cm-l-tabledata__row ${className}`}>
      { children }
    </div>
  );
}

export const TableCellShort = ({ children, className, id }) => {
  return (
    <div 
      className={`tablecell-short ${className}`}
      data-notifid={id} >
      { children }
    </div>
  );
}

export const TableCellMedium = ({ children, className }) => {
  return (
    <div className={`tablecell-medium ${className}`}>
      { children }
    </div>
  );
}

export const TableCellLong = ({ children, className }) => {
  return (
    <div className={`tablecell-long ${className}`}>
      { children }
    </div>
  );
}