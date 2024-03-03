export const FormSimple = ({ children, className, id, innerRef, autoComplete }) => {
  return (
    <form 
      className={`cm-c-form-simple cm-l-form-simple ${className}`} 
      id={id}
      autoComplete={autoComplete}
      ref={innerRef} >
      { children }
    </form>
  );
}

export const FormSimplePanel = ({ children, className, id, innerRef, autoComplete }) => {
  return (
    <form 
      className={`cm-c-form-simple cm-l-form-panel ${className}`} 
      id={id}
      autoComplete={autoComplete}
      ref={innerRef} >
      { children }
    </form>
  );
}

export const FormSimpleHrz = ({ children, className, id, innerRef, autoComplete }) => {
  return (
    <form 
      className={`cm-c-form-simple-hrz ${className}`} 
      id={id}
      autoComplete={autoComplete}
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

export const FormSimplePanelRow = ({ children, className }) => {
  return (
    <div className={`cm-l-form-panel__row ${className}`}>
      { children }
    </div>
  );
}

export const LabelElement = ({ children, style, className, htmlFor, type, placeholder, value, handleOnChange, required, disabled, readOnly, autoComplete, role }) => {
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
        autoComplete={autoComplete}
        role={role}
        value={value}
        required={required}
        disabled={disabled}
        readOnly={readOnly} />
    </label>
  );
} 

export const LabelElementAssist = ({ children, style, className, htmlFor , type, placeholder, value, handleOnChange, required, disabled, readOnly, assistanceText,autoComplete, role, format, defaultValue }) => {
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
        autoComplete={autoComplete}
        role={role}
        value={value}
        defaultValue={defaultValue}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        format={format} />
      <span className='assistance' aria-live='polite'>
        { assistanceText }
      </span>
    </label>
  );
}


export const LabelSelectElement = ({ children, style, className, htmlFor, labelText, placeholder, value, defaultValue, handleOnChange, required, selected, disabled }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`panel-field-long ${className}`}
      style={style} >
      <span>{labelText}</span>
      <div className='cm-c-select-icon'>
        <select
          className='cm-c-select-icon__select'
          name={htmlFor}
          id={htmlFor}
          onChange={handleOnChange}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          required={required}
          selected={selected}
          disabled={disabled}>
          { children }
        </select>
      </div>
    </label>
  );
} 

export const LabelSelectShorterElement = ({ children, style, className, htmlFor, labelText, placeholder, value, defaultValue, handleOnChange, required, selected, disabled }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`panel-field-short ${className}`}
      style={style} >
      <span>{labelText}</span>
      <div className='cm-c-select-icon cm-c-select-icon--shorter'>
        <select
          className='cm-c-select-icon__select'
          name={htmlFor}
          id={htmlFor}
          onChange={handleOnChange}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          required={required}
          selected={selected}
          disabled={disabled}>
          { children }
        </select>
      </div>
    </label>
  );
} 



export const LabelElementToggle = ({ children, style, className, htmlFor , checked, value, handleOnChange, disabled }) => {
  return (
    <label
      htmlFor={htmlFor}
      className='panel-field-short'
      style={style} >
      <span>{ children }</span>
      <div
        className='cm-c-form-simple__radio-toggle'>
           <input
            className={className}
            type='checkbox'
            name={htmlFor}
            id={htmlFor}
            onChange={handleOnChange}
            value={value}
            checked={checked}
            disabled={disabled}
            />
        </div>
    </label>
  );
} 

export const SelectIconShorter = ({ children, style, id, placeholder, name, value, defaultValue, selected, handleOnChange, disabled }) => {
  return (
    <div className='cm-c-select-icon  cm-c-select-icon--shorter'>
      <select
        className='cm-c-select-icon__select'
        style={style}
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        defaultValue={defaultValue}
        selected={selected}
        onChange={handleOnChange}
        disabled={disabled} >
        { children }
      </select>
    </div>
  )
}

export const SelectIcon = ({ children, style, id, placeholder, name, value, defaultValue, selected, onChange, disabled }) => {
  return (
    <div className='cm-c-select-icon'>
      <select
        className='cm-c-select-icon__select'
        style={style}
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        defaultValue={defaultValue}
        selected={selected}
        onChange={onChange}
        disabled={disabled} >
        { children }
      </select>
    </div>
  )
}

export const FieldWithIcon = ({ children }) => {
  return (
    <div className='cm-c-field-icon'>{ children }</div>
  );
}

export const FieldWithIcon__input =({ children, name, placeholder }) => {
  return (
    <input className='cm-c-field-icon__input' name={name} id={name} placeholder={placeholder} />
  );
}
