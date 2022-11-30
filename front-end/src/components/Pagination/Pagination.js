import { useEffect } from "react";
import classes from "./Pagination.module.css";
const Pagination = ({
  data,
  RenderComponent,
  title,
  userId,
  currentPage,
  pageLimit,
  pages,
  onPageChange,
  onNextChange,
  onPrevChange,
}) => {
  //const [pages] = useState(Math.round(data.length / dataLimit));
  // const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: "0px" });
  }, [currentPage]);
  function goToNextPage() {
    //setCurrentPage((page) => page + 1);
    onNextChange();
  }

  function goToPreviousPage() {
    //setCurrentPage((page) => page - 1);
    onPrevChange();
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    // setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  }

  function getPaginationGroup() {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    //console.log("getPaginationGroup" + data);
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  }
  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>{title}</h1>
        {data.map((d, idx) => (
          <RenderComponent key={idx} data={d} userId={userId}></RenderComponent>
        ))}
      </div>
      <div className={classes.pagination}>
        <button
          onClick={goToPreviousPage}
          className={`${classes.prev} ${
            currentPage === 1 ? classes.disabled : ""
          }`}
        >
          prev
        </button>
        {getPaginationGroup().map((item, idx) => (
          <button
            key={idx}
            onClick={changePage}
            className={`${classes.paginationItem} ${
              currentPage === item ? classes.active : null
            }`}
          >
            <span>{item}</span>
          </button>
        ))}
        <button
          onClick={goToNextPage}
          className={`${classes.next}  ${
            currentPage === pages ? classes.disabled : ""
          }`}
        >
          next
        </button>
      </div>
    </>
  );
};

export default Pagination;
