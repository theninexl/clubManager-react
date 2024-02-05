export const manageSimpleAcordion = () => {
  const accordionLink = document.querySelectorAll('.accordionLink');
  const accordionContent = document.querySelectorAll('.accordionContent');
  const hideContent = () => {
    accordionContent.forEach(accContentLayer => {
        console.log(accContentLayer);
        accContentLayer.setAttribute('style','opacity:0; height:0; overflow:hidden;')
      });
  };
  accordionLink.forEach(accContentLink => {
    console.log(accContentLink);
    accContentLink.addEventListener('click', (e) => {
      e.preventDefault();
      const targetData = accContentLink.getAttribute('data-target');
      console.log('targetData', targetData)
      const targetContent = document.getElementById(targetData);
      console.log('targetContent', targetContent);
      hideContent();
      accContentLink.classList.add('active');
      targetContent.setAttribute('style','opacity:1; height:auto; overflow:hidden;');
    });
  })
  hideContent();
}