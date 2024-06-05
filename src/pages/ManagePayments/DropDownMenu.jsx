import { createContext, useContext, useEffect, useRef, useState } from "react";
import { MenuMoreVert } from "../../components/UI/objects/symbols";

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

export const DropDownMenu = ({ children }) => {
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
          <div ref={menuRef} style={{ ...styles.dropdownMenu, top: menuPosition.top, left: menuPosition.left }}>
            <ul style={styles.menuList}>
              {children}
            </ul>
          </div>
        )}
      </div>
    </DropdownProvider>
  );
}

const styles = {
  container: {
    display: 'inline-block',
  },
  dropdownMenu: {
    border: '1px solid lightgray',
    position: 'fixed',
    background: 'white',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    zIndex: 9999,
  },
  menuList: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
};


const DropdownButton = ({ onClick }) => (
  <button onClick={onClick} style={styles2.button}>
    <span role="img" aria-label="menu"><MenuMoreVert /></span>
  </button>
);

const styles2 = {
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    cursor: 'pointer',
    background: 'none',
    border: '1px solid lightgray',
    borderRadius: '4px',
    height: '32px',
    width: '32px',
  },
};

export const DropdownItem = ({ children, onClick }) => {
  const { closeMenu } = useDropdownContext();

  const handleClick = () => {
    onClick();
    closeMenu();
  };

  return (
    <li onClick={handleClick} style={styles3.menuItem}>
      {children}
    </li>
  );
};

const styles3 = {
  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    cursor: 'pointer',
    listStyleType: 'none',
  },
};