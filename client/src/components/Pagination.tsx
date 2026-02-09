import { ChevronLeft, ChevronRight } from "lucide-react";
import { useUrl } from "../hooks/useUrl";
import { usePagination } from "../hooks/usePagination";

export default function Pagination() {
  const { totalPages } = useUrl();
  const { currentPage, handleUpdatePage } = usePagination();
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  console.log("total de paginas: " + totalPages);
  const isLast = currentPage === totalPages;
  const isFirst = currentPage === 1;

  const handlePrevPage = () => {
    console.log(currentPage);
    if (!isFirst) {
      const updatedPage = currentPage - 1;
      handleUpdatePage(updatedPage);
    }
  };

  const handleNextPage = () => {
    console.log("pagina actual en el next: " + currentPage);
    if (!isLast) {
      const updatedPage = currentPage + 1;
      console.log("pagina actualizada: " + updatedPage);
      handleUpdatePage(updatedPage);
    }
  };

  const handleChangePage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const page = Number(e.currentTarget.dataset.page);
    if (currentPage !== page) {
      handleUpdatePage(page);
    }
  };

  return (
    <>
      <div className='justify-center m-auto flex p-10'>
        <button className='prev-btn cursor-pointer' onClick={handlePrevPage}>
          <ChevronLeft />
        </button>
        {pages.map((page) => (
          <a
            data-page={page}
            className={
              currentPage == page
                ? "cursor-pointer p-4 text-blue-500"
                : "cursor-pointer p-4"
            }
            key={page}
            onClick={handleChangePage}
          >
            {page}
          </a>
        ))}
        <button className='next-page cursor-pointer' onClick={handleNextPage}>
          <ChevronRight />
        </button>
      </div>
    </>
  );
}
