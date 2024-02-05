export const FormTabs = ({ children }) => {
  return (
    <div className='cm-c-form-tabs'>
      { children }
    </div>
  )
}

export const FormTabs__LinksWrapper = ({ children, className}) => {
  return (
    <div className={`cm-c-form-tabs__links cm-u-spacer-mb-big ${className}`}>
      { children }
    </div>
  )
}

export const FormTabs__ToolBarWrapper = ({ children, className}) => {
  return (
    <div className={`cm-c-form-tabs__toolbar ${className}`}>
      { children }
    </div>
  )
}

export const TabLink = ({ children, target }) => {
  return (
    <button 
      className='tabLink'
      data-target={target} >
        { children }
      </button>
  );
}

export const FormTabs__ContentWrapper = ({ children }) => {
  return (
    <div className={`cm-c-form-tabs__content`} >
      { children }
    </div>
  )
}

export const TabContent = ({ children, id }) => {
  return (
    <div 
      className='tabContent'
      id={id} >
        { children }
      </div>
  );
}