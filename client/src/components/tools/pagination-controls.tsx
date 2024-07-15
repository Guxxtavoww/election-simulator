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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { ScrollArea } from '../ui/scroll-area';
import { Label } from '../ui/label';

export function PaginationControls({
  currentPage,
  totalPages,
  itemsPerPage,
}: Pick<iPaginationMeta, 'currentPage' | 'totalPages' | 'itemsPerPage'>) {
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
    <div className="w-full flex justify-between">
      <Select
        defaultValue={itemsPerPage.toString()}
        onValueChange={(value) => setSearchParam('limit', value)}
      >
        <div className="flex items-center gap-2">
          <Label className="min-w-fit">Por Página</Label>
          <SelectTrigger className="max-w-xs">
            <SelectValue placeholder="Limite Por Página" />
          </SelectTrigger>
        </div>
        <SelectContent>
          <ScrollArea className="h-52">
            <SelectItem value="5">5</SelectItem>
            {[...Array(10).keys()].map((page, index) => {
              const fixedPage = ((page + 1) * 10).toString();

              return (
                <SelectItem value={fixedPage} key={index}>
                  {fixedPage}
                </SelectItem>
              );
            })}
          </ScrollArea>
        </SelectContent>
      </Select>
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
    </div>
  );
}
