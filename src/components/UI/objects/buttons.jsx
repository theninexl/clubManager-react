//NORMAL TEXT BUTTONS

export const Button = ({ children, type, className, defaultValue, id, onClick}) => {
  return (
    <button
      type={type}
      className={className}
      value={defaultValue}
      id={id}
      onClick={onClick}>
        { children }
    </button>
  );
}

export const ButtonCatPrimary = ({ children, className, id, onClick }) => {
  return (
    <button
      className={`cm-o-button-cat--primary ${className}`}
      id={id}
      onClick={onClick} >
      { children }
    </button>
  );
}

export const ButtonCatTransparent = ({ children, className, id, onClick }) => {
  return (
    <button
      className={`cm-o-button-cat--transparent ${className}`}
      id={id}
      onClick={onClick} >
      { children }
    </button>
  );
}

export const ButtonCatGhost = ({ children, className, id, onClick }) => {
  return (
    <button
      className={`cm-o-button-cat--ghost ${className}`}
      id={id}
      onClick={onClick} >
      { children }
    </button>
  );
}

export const ButtonCatGhostDisabled = ({ children, className, id, onClick }) => {
  return (
    <button
      className={`cm-o-button-cat--ghost-inactive ${className}`}
      id={id}
      onClick={onClick} >
      { children }
    </button>
  );
}

export const ButtonMouse = ({ children, className, id, onClick, disabled }) => {
  return (
    <button
      className={`${className}`}
      id={id}
      onClick={onClick}
      disabled={disabled} >
      { children }
    </button>
  );
}

export const ButtonMousePrimary = ({ children, className, id, onClick }) => {
  return (
    <button
      className={`cm-o-button-mouse--primary ${className}`}
      id={id}
      onClick={onClick} >
      { children }
    </button>
  );
}

export const ButtonMouseTransparent = ({ children, className, id, onClick }) => {
  return (
    <button
      className={`cm-o-button-mouse--transparent ${className}`}
      id={id}
      onClick={onClick} >
      { children }
    </button>
  );
}

export const ButtonMouseGhost = ({ children, className, id, onClick }) => {
  return (
    <button
      className={`cm-o-button-mouse--ghost ${className}`}
      id={id}
      onClick={onClick} >
      { children }
    </button>
  );
}

export const ButtonMouseDisabled = ({ children, className, id, onClick }) => {
  return (
    <button
      className={`cm-o-button-mouse--inactive ${className}`}
      id={id}
      onClick={onClick} >
      { children }
    </button>
  );
}



// ICON BUTTONS

export const IconButtonSmallPrimary = ({ children, className, onClick, style }) => {
  return (
    <button 
      className={`cm-o-icon-button-small--primary ${className}`}
      style={style}
      onClick={onClick} >
      { children }
    </button>
  );
}

export const IconButtonSmallSecondary = ({ children, className, onClick }) => {
  return (
    <button 
      className={`cm-o-icon-button-small--secondary ${className}`}
      onClick={onClick} >
      { children }
    </button>
  );
}

export const IconButtonSmallerPrimary = ({ children, className, style, onClick, dataValue }) => {
  return (
    <button
      data-value={dataValue}
      className={`cm-o-icon-button-smaller--primary ${className}`}
      onClick={onClick}
      style={style}
    >
      { children }
    </button>
  );
}

export const IconButtonSmallerSuccess = ({ children, className, onClick }) => {
  return (
    <button 
      className={`cm-o-icon-button-smaller--success ${className}`}
      onClick={onClick} >
      { children }
    </button>
  );
}

export const IconButtonSmallerError = ({ children, className, onClick }) => {
  return (
    <button 
      className={`cm-o-icon-button-smaller--error ${className}`}
      onClick={onClick} >
      { children }
    </button>
  );
}