export const SimpleAccordion = ({children, className}) => {
  return (
    <div className={`cm-c-simpleAccordion ${className}`}>
      { children }
    </div>
  );
}

export const SimpleAccordionTrigger = ({children}) => {
  return (
    <div className={`cm-c-simpleAccordion__trigger`}>
      { children }
    </div>
  );
}

export const SimpleAccordionLink = ({ children, className, target }) => {
  return (
    <button 
      className={`accordionLink ${className}`}
      data-target={target} >
        { children }
      </button>
  );
}

export const SimpleAccordionContent = ({ children, className, id}) => {
  return (
    <div 
      className={`cm-c-simpleAccordion__content accordionContent ${className}`}
      id={id} >
      { children }
    </div>
  );
}