import { createContext, useContext, useEffect, useRef, useState } from "react";

const DropdownContext = createContext();

const useDropdownContext = () => {
  return useContext(DropdownContext);
};

const DropdownProvider = ({ children, value }) => {
  return (
    <DropdownContext.Provider value={value}>
      {children}
    </DropdownContext.Provider>
  );
};

const DropdownItem = ({ children, onClick }) => {
  const { closeMenu } = useDropdownContext();

  const handleClick = () => {
    onClick();
    closeMenu();
  };

  return (
    <li onClick={handleClick} style={styles.menuItem}>
      {children}
    </li>
  );
};

const styles = {
  menuItem: {
    padding: '10px 20px',
    cursor: 'pointer',
    listStyleType: 'none',
  },
};


const DropdownMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom,
        left: rect.left,
      });
    }
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <DropdownProvider value={{ closeMenu: () => setIsOpen(false) }}>
      <div style={styles.container}>
        <div ref={buttonRef}>
          <DropdownButton onClick={toggleMenu} />
        </div>
        {isOpen && (
          <div ref={menuRef} style={{ ...styles2.dropdownMenu, top: menuPosition.top, left: menuPosition.left }}>
            <ul style={styles.menuList}>
              {children}
            </ul>
          </div>
        )}
      </div>
    </DropdownProvider>
  );
};

const styles2 = {
  container: {
    display: 'inline-block',
  },
  dropdownMenu: {
    position: 'fixed',
    background: 'white',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    zIndex: 1000,
  },
  menuList: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
};


const DropdownButton = ({ onClick }) => (
  <button onClick={onClick} style={styles3.button}>
    <span role="img" aria-label="menu">☰</span> {/* Icono del menú */}
  </button>
);

const styles3 = {
  button: {
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
  },
};


//-------------------------------------------


export const TableExample = () => {
  return (
    <div style={styles4.container}>
      <h1>Mi Aplicación</h1>
      <div style={styles4.tableContainer}>
        <table style={styles4.table}>
          <tbody>
            <tr>
              <td style={styles4.cell}>
                <DropdownMenu>
                  <DropdownItem onClick={() => alert('Item 1 clicked!')}>Item 1</DropdownItem>
                  <DropdownItem onClick={() => alert('Item 2 clicked!')}>Item 2</DropdownItem>
                  <DropdownItem onClick={() => alert('Item 3 clicked!')}>Item 3</DropdownItem>
                </DropdownMenu>
              </td>
              {/* Añade más celdas según sea necesario */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}


const styles4 = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  tableContainer: {
    width: '50%',
    overflowX: 'auto', // Permite el scroll horizontal si es necesario
  },
  table: {
    width: '100%',
    border: '1px solid black',
    borderCollapse: 'collapse',
  },
  cell: {
    position: 'relative', // Asegúrate de que la celda tiene position: relative
    padding: '20px',
    border: '1px solid black', // Añade bordes para visualizar mejor las celdas
  },
};





