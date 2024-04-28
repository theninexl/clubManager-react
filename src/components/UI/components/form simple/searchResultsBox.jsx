export const SearchResultsBox = ({ state, setState, results, setOnField, setSelected }) => {
  
  if (state && results?.length == 0) {
    return (
      <div 
        className='cm-c-dropdown-select__results-box'
        style={{left:'0', width:'98%'}}
      ><span>No hay resultados</span></div>
    );
  } else if (state && results?.length > 0) {
    return (
      <div 
          className='cm-c-dropdown-select__results-box'
          style={{left:'0', width:'98%'}}
        >
          {
            results?.map(item => {
              return (
                <span
                  className='result'
                  key={item.id_jugador}
                  onClick={e => {
                    e.preventDefault();
                    setOnField(item.nombre)
                    setSelected(item);
                    setState(false);
                  }}  >
                    {item.nombre}
                </span>
              );
            })
          }
        </div>
    )
  }
}