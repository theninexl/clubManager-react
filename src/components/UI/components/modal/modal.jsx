export const ModalContainer = ({children, className}) => {
  return (
    <div className={`cm-c-modal ${className}`}>
      { children }
      <div className="cm-c-modal-background"></div>
    </div>
  )
}

export const ModalContent__Big = ({children, className, id}) => {
  return (
    <div 
      className={`cm-c-modal__bigContent ${className}`}
      id={id} >
      { children }
    </div>
  )
}

export const ModalContent__Small = ({children, className, id}) => {
  return (
    <div 
      className={`cm-c-modal__smallContent ${className}`}
      id={id} >
      { children }
    </div>
  )
}

export const ModalBody = ({children, className}) => {
  return (
    <div 
      className={`modal-body ${className}`} >
      { children }
    </div>
  )
}

export const ModalFooter = ({children, className}) => {
  return (
    <div 
      className={`modal-footer ${className}`} >
      { children }
    </div>
  )
}

