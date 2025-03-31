import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pathname: string;
}

export const Pagination: FC<PaginationProps> = ({ totalPage, currentPage, setCurrentPage, pathname }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedStyle = 'relative z-10 inline-flex items-center bg-[#291D4C] px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#291D4C]';
  const unSelectedStyle = 'relative cursor-pointer inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0';
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPage || page === currentPage) {
      return;
    }

    // Lấy query string hiện tại và cập nhật tham số page
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', page.toString());

    setCurrentPage(page);
    navigate({
      pathname: pathname,
      search: `?${searchParams.toString()}`,
    });
  };

  return (

    <nav
      className="isolate inline-flex -space-x-px rounded-md shadow-sm"
      aria-label="Pagination"
    >
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          aria-current={currentPage === page ? 'page' : undefined}
          className={currentPage === page ? selectedStyle : unSelectedStyle}
        >
          {page}
        </button>
      ))}
    </nav>
  );
};