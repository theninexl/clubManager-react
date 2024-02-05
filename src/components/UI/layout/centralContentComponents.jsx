export const HeadTool = ({ children, className }) => {
  return (
    <header
      className={`cm-l-headtool ${className}`} >
      { children }
    </header>
  );
}

export const HeadToolTitle = ({ children, className }) => {
  return (
    <div className={`cm-l-headtool__title ${className}`}>
      <h1 className='cm-u-text-bear'>
        { children }
      </h1>
    </div>
  );
}

export const HeadContent = ({ children }) => {
  return (
    <div className='cm-l-contentHeader'>{ children }</div>
  );
}

export const HeadContentTitleBar = ({ children }) => {
  return (
    <div className='cm-l-contentHeader__titleBar'>{ children }</div>
  );
}

export const HeadContentToolBar = ({ children }) => {
  return (
    <div className='cm-l-contentHeader__toolBar cm-u-spacer-mt-big'>{ children }</div>
  );
}

export const HeadContentWidgetBar = ({ children }) => {
  return (
    <div className='cm-l-contentHeader__widgetBar cm-u-spacer-mt-big'>{ children }</div>
  );
}

export const TitleBar__Title = ({ children }) => {
  return (
    <div className='titleBar__title'>
      <h1 className='cm-u-text-bear'>{ children }</h1>
    </div>
  );
}

export const TitleBar__TitleAvatar = ({ children, avatarText }) => {
  return (
    <div className='titleBar__title'>
      <div id='userDetailsImageContainer'>
        <img src={`https://placehold.co/200x200?text=${avatarText}`} />
      </div>
      <h1 className='cm-u-text-bear'>{ children }</h1>
    </div>
  );
}

export const TitleBar__TitleWBtns = ({ children }) => {
  return (
    <div className='titleBar__title'>
      { children }
    </div>
  );
}

export const TitleBar__Tools = ({ children }) => {
  return (
    <div className='titleBar__tools'>{ children }</div>
  );
}

export const CentralBody = ({ children, style, id }) => {
  return (
    <section 
      className='cm-l-body'
      style={style}
      id={id}>
      { children }
    </section>
  );
}

export const CentralBody__Header = ({ children }) => {
  return (
    <section className='cm-l-body-static-header cm-u-spacer-mb-bigger'>
      <p className="cm-u-text-black-cat">{ children }</p>
    </section>
  );
}