import ReactPaginate from "react-paginate";
import { SymbolNext, SymbolPrevious } from "../../objects/symbols";

export const Pagination = ({ items, itemsPerPage, rowsCountTotal, setPage }) => {

  // const endOffset = itemOffset + itemsPerPage;
  let currentItems;
  if (items.length > 0) {
    currentItems = items;
  } else {
    currentItems = 0;
  }
  
  const pageCount = rowsCountTotal / itemsPerPage;

  const handlePageClick = (event) => {
    const selected = event.selected+1;
    const newOffset = (selected * itemsPerPage) % rowsCountTotal;
    console.log(
      `User requested page number ${selected}, which is offset ${newOffset}`
    );    
    setPage(selected);
    window.scrollTo({top:0, behavior:'smooth'});
  };

  return (
    <ReactPaginate 
      nextLabel={<SymbolNext />}
      onPageChange={handlePageClick}
      pageRangeDisplayed={itemsPerPage}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      previousLabel={<SymbolPrevious />}
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="cm-o-icon-button-smaller--primary page-link"
      nextClassName="page-item"
      nextLinkClassName="cm-o-icon-button-smaller--primary page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      renderOnZeroPageCount={null}
    />
  )
}