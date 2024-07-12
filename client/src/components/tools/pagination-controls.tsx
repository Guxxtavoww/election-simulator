'use client';

import { useCallback } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { basePaginationItems } from '@/utils/create-pagination-schema.utils';
import { useSearchParamsManager } from '@/hooks/use-search-params-manager.hook';

export function PaginationControls({
  currentPage,
  totalPages,
}: Pick<iPaginationMeta, 'currentPage' | 'totalPages'>) {
  const { setSearchParam } = useSearchParamsManager([...basePaginationItems]);

  const getPaginationItems = useCallback(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) return [1, 2, 3, 4, 'ellipsis', totalPages];

    if (currentPage > totalPages - 3) {
      return [
        1,
        'ellipsis',
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      'ellipsis',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      'ellipsis',
      totalPages,
    ];
  }, [currentPage, totalPages]);

  const handlePageChange = useCallback(
    (page: number | string) => {
      if (typeof page === 'number') {
        setSearchParam('page', `${page}`);
      }
    },
    [setSearchParam]
  );

  const paginationItems = getPaginationItems();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          />
        </PaginationItem>
        {paginationItems.map((page, index) =>
          page === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => handlePageChange(+page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
