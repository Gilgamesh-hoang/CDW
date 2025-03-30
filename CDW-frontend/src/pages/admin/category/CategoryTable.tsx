import ComponentCard from '@/components/ComponentCard.tsx';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/table';
import { FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { deleteCategory, getCategories } from '@/services/category.ts';
import { toastError, toastSuccess } from '@/utils/showToast.ts';
import { CategoryModal } from './CategoryModal.tsx';
import { Category } from '@/type';

export default function CategoryTable() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categorySelected, setCategorySelected] = useState<number | null>(null);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getCategories(currentPage, 15).then((data) => {
      setCategories(data);
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
  };

  const removeCategory = (id: number) => {
    deleteCategory(id).then(() => {
      setCategories(categories.filter((category) => category.id !== id));
      toastSuccess('Xóa danh mục thành công', 1500);
    }).catch((error) => {
      console.error(error);
      toastError('Xóa danh mục thất bại', 1500);
    });
  };

  const updateItem = (category: Category) => {
    setCategories((prevCategories) => {
      const exists = prevCategories.some((item) => item.id === category.id);
      if (exists) {
        return prevCategories.map((item) =>
          item.id === category.id ? category : item,
        );
      } else {
        return [category, ...prevCategories];
      }
    });
  };


  return (
    <>
      <div className="space-y-6">
        <ComponentCard title="Danh sách danh mục">
          <Button
            type="primary"
            className=" h-10"
            style={{ backgroundColor: '#291D4C' }}
            size="large"
            onClick={() => {
              setCategorySelected(null);
              setShowModal(true);
            }}
          >
            Thêm mới danh mục
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
                        Mã danh mục
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Tên danh mục
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
                    {categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                          <div className="flex items-center gap-3">
                            {category.id}
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {category.code}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {category.name}
                        </TableCell>
                        <TableCell className="text-gray-500 ">
                          <div className="flex gap-4">
                            <button className="p-3 hover:text-red-500"
                                    onClick={() => {
                                      setCategorySelected(category.id);
                                      setShowModal(true);
                                    }}
                              // onClick={() => setShowModal(prevState => !prevState)}
                            >
                              <FaPencilAlt />
                            </button>
                            <button className="p-3 hover:text-red-500"
                                    onClick={() => removeCategory(category.id)}
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

      <CategoryModal isOpen={showModal}
                 closeModal={() => setShowModal(false)}
                 categoryId={categorySelected}
                 callback={updateItem}
      />;
    </>
  );
}
