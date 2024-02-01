export const FormSimple = ({ children, className, id, innerRef }) => {
  return (
    <form 
      className={`cm-c-form-simple cm-l-form-simple ${className}`} 
      id={id}
      ref={innerRef} >
      { children }
    </form>
  );
}

export const FormSimpleRow = ({ children, className }) => {
  return (
    <div className={`cm-c-form-simple__row cm-l-form-simple__row ${className}`}>
      { children }
    </div>
  );
}

export const LabelElement = ({ children, style, className, htmlFor, type, placeholder, value, handleOnChange, required, disabled, readOnly }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={className}
      style={style} >
      <span>{ children }</span>
      <input
        className={className}
        type={type}
        name={htmlFor}
        id={htmlFor}
        onChange={handleOnChange}
        placeholder={placeholder}
        defaultValue={value}
        required={required}
        disabled={disabled}
        readOnly={readOnly} />
    </label>
  );
} 

export const LabelElementAssist = ({ children, style, className, htmlFor , type, placeholder, value, handleOnChange, required, disabled, readOnly, assistanceText }) => {
  <label
    htmlFor={htmlFor}
    className={className}
    style={style} >
    <span>{ children }</span>
    <input
      className={className}
      type={type}
      name={htmlFor}
      id={htmlFor}
      onChange={handleOnChange}
      placeholder={placeholder}
      defaultValue={value}
      required={required}
      disabled={disabled}
      readOnly={readOnly} />
    <span className='assistance' aria-live='polite'>
      { assistanceText }
    </span>
  </label>
} 
