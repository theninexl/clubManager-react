export const manageTabs = () => {
  const tabContentLinks = document.querySelectorAll('.tabLink');
  const tabContentLayers = document.querySelectorAll('.tabContent');
  const hideAllTabs = () => {
      tabContentLayers.forEach(tabContentLayer => {
          tabContentLayer.setAttribute('style','opacity:0; height:0; overflow:hidden;')
      });
      tabContentLinks.forEach(tabContentLink => tabContentLink.classList.remove('active'));
  };
  tabContentLinks.forEach(tabContentLink => {
      tabContentLink.addEventListener('click', (e) => {
          e.preventDefault();
          const targetData = tabContentLink.getAttribute('data-target');
          const targetTab = document.getElementById(targetData);
          hideAllTabs();
          tabContentLink.classList.add('active');
          targetTab.setAttribute('style','opacity:1; height:auto; overflow:hidden;');
          window.scrollTo(0,0);
      });
  })
  hideAllTabs();
  tabContentLayers[0].setAttribute('style','opacity:1; height:auto; overflow:visible;');
  tabContentLinks[0].classList.add('active');
}