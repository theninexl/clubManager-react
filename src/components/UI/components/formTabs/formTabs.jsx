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

export const TabLink = ({ children, className, id, target, handleOnClick }) => {
  return (
    <button 
      className={`tabLink ${className}`}
      id={id}
      data-target={target}
      onClick={handleOnClick} >
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

export const TabContent = ({ children, id, className }) => {
  return (
    <div 
      className={`tabContent ${className}`}
      id={id} >
        { children }
      </div>
  );
}