export const RegularHeader = ({ children, className }) => {
  return (
    <header className={`cm-l-header ${className}`}>
      { children }
    </header>
  );
}

export const StaticBodyHeader = ({ children, className }) => {
  return (
    <header className={`cm-l-body-static-header ${className}`}>
      { children }
    </header>
  );
}