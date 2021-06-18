import ReactPaginate from 'react-paginate';

interface Props {
  count: number;
  handlePageChange: (data: { selected: number }) => void;
};

const Paginate: React.FC<Props> = ({ count, handlePageChange }) => {
  return (
    <ReactPaginate
      containerClassName="pagination"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      activeClassName="active"
      pageCount={count / 10}
      pageRangeDisplayed={4}
      marginPagesDisplayed={1}
      onPageChange={handlePageChange}
      previousLabel={"<"}
      nextLabel={">"}
    />
  )
}

export default Paginate;