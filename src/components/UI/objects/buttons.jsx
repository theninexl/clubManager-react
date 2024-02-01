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