export const RegularHeader = ({ children, className }) => {
  return (
    <header className={`cm-l-header ${className}`}>
      { children }
    </header>
  );
}