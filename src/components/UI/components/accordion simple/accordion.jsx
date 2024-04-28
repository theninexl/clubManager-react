export const AccordionItem = ({ children, className }) => {
  return (
    <div className={`cm-c-accordion ${className}`}>
      { children }
    </div>
  )
}

export const AccordionItemHeader = ({ children }) => {
  return(
    <div className='cm-c-accordion__button'>
      { children }
    </div>
  )
}

export const AccordionHeaderTitle = ({ children }) => {
  return (
    <div className='accordion-button__text'>
      { children }
    </div>
  )
}

export const AccordionHeaderIcon = ({ children }) => {
 return (
  <div className='accordion-button__icon'>
    { children }
  </div>
 )
}

export const AccordionItemBody = ({ children }) => {
  return (
    <div className='cm-c-accordion__panel'>
      { children }
    </div>
  )
}