//contenedor general del contenido central
export const MainContent = ({ children, className }) => {
  return (
    <main className={className}>
      { children }
    </main>
  );
}
//contenedor estandar de componentes de layout
export const RegularContainer = ({ children, className }) => {
  return (
    <div className={`cm-l-container ${className}`}>
      { children }
    </div>
  );
}
//caja ancho 4 columnas (1/3 total)
export const ThirdContainer = ({ children, className }) => {
  return (
    <section className={`cm-l-4col ${className}`}>
      { children }
    </section>
  );
}