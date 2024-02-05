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

//contenedor 2 columnas
export const HalfContainer = ({ children, id }) => {
  return (
    <main className='cm-l-container-2col' id={id}>
      { children }
    </main>
  );
}

//contenedor para el aside de 2 col
export const HalfContainerAside = ({ children }) => {
  return (
    <aside className='cm-l-container-2col__aside' >
      { children }
    </aside>
  );
}

//contenedor para el body de 2 col
export const HalfContainerBody = ({ children, className }) => {
  return (
    <section className={`cm-l-container-2col__body ${className}`}>
      { children }
    </section>
  );
}

//contenedor ancho 4 columnas (1/3 total)
export const ThirdContainer = ({ children, className }) => {
  return (
    <section className={`cm-l-4col ${className}`}>
      { children }
    </section>
  );
}