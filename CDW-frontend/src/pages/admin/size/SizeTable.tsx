import ComponentCard from '@/components/ComponentCard.tsx';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/table';
import { FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { toastError, toastSuccess } from '@/utils/showToast.ts';
import { SizeModal } from './SizeModal.tsx';
import { Size } from '@/type';
import { deleteSize, getSizesWithPages } from '../../../services/size.ts';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/constant.ts';
import Swal from 'sweetalert2';

export default function SizeTable() {
  const [sizes, setSizes] = useState<Size[]>([]);
  const [sizeSelected, setSizeSelected] = useState<number | null>(null);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const pageParam = new URLSearchParams(window.location.search).get('page') || 1;
    setCurrentPage(Number(pageParam));
  }, []);

  useEffect(() => {
    getSizesWithPages(currentPage, 15).then((data) => {
      setSizes(data.data);
      setTotalPage(data.totalPage);
    });
  }, [currentPage]);

  const renderPagination = () => {
    const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

    const selectedStyle = 'relative z-10 inline-flex items-center bg-[#291D4C] px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#291D4C]';
    const unSelectedStyle = 'relative cursor-pointer inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0';
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

  const handlePageChange = (page: number) => {
    if (page < 1) {
      return;
    }

    if (page > totalPage) {
      return;
    }

    if (page === currentPage) {
      return;
    }
    setCurrentPage(page);
    navigate({
      pathname: ROUTES.ADMIN_SIZE,
      search: `?page=${page}`,
    });
  };

  const removeSize = (id: number) => {
    Swal.fire({
      title: 'Hành động này sẽ xóa kích thước với ID: ' + id,
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: `Hủy`,
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }
      deleteSize(id).then(() => {
        setSizes(sizes.filter((category) => category.id !== id));
        toastSuccess('Xóa kích thước thành công');
      }).catch((error) => {
        console.error(error);
        toastError('Xóa kích thước thất bại');
      });
    });


  };

  const updateItem = (size: Size) => {
    setSizes((prevSizes) => {
      const exists = prevSizes.some((item) => item.id === size.id);
      if (exists) {
        return prevSizes.map((item) =>
          item.id === size.id ? size : item,
        );
      } else {
        return [size, ...prevSizes];
      }
    });
  };


  return (
    <>
      <div className="space-y-6">
        <ComponentCard title="Danh sách kích cỡ">
          <Button
            type="primary"
            className=" h-10"
            style={{ backgroundColor: '#291D4C' }}
            size="large"
            onClick={() => {
              setSizeSelected(null);
              setShowModal(true);
            }}
          >
            Thêm mới kích cỡ
          </Button>

          <div>
            <div
              className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
              <div className="max-w-full overflow-x-auto">
                <Table>
                  {/* Table Header */}
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        ID
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Tên kích cỡ
                      </TableCell>
                      <TableCell
                        isHeader
                      >
                        {''}
                      </TableCell>
                    </TableRow>
                  </TableHeader>

                  {/* Table Body */}
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {sizes.map((size) => (
                      <TableRow key={size.id}>
                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                          <div className="flex items-center gap-3">
                            {size.id}
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {size.name}
                        </TableCell>
                        <TableCell className="text-gray-500 ">
                          <div className="flex gap-4">
                            <button className="p-3 hover:text-red-500"
                                    onClick={() => {
                                      setSizeSelected(size.id);
                                      setShowModal(true);
                                    }}
                            >
                              <FaPencilAlt />
                            </button>
                            <button className="p-3 hover:text-red-500"
                                    onClick={() => removeSize(size.id)}
                            >
                              <FaRegTrashAlt />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

              </div>
            </div>
            <div className="mt-12 flex justify-center">
              {renderPagination()}
            </div>
          </div>
        </ComponentCard>
      </div>

      <SizeModal isOpen={showModal}
                 closeModal={() => setShowModal(false)}
                 sizeId={sizeSelected}
                 callback={updateItem}
      />
    </>
  );
}
