import { Dispatch, SetStateAction, useEffect } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from './ui/pagination';
import { Disc } from '@/types/disc';
import { cn, getPaginationRange } from '@/lib/utils';

type Props = {
  discs: Array<Disc>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  perPage: number;
};

export default function DiscPagination({
  discs,
  page,
  setPage,
  perPage
}: Props) {
  const totalPages = Math.ceil(discs.length / perPage);

  // keep the current page within valid bounds
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages === 0 ? 1 : totalPages);
    }
  }, [totalPages, page, setPage]);

  if (!discs.length) return null;

  const paginationRange = getPaginationRange(page, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={page === 1}
            onClick={() => {
              if (page > 1) setPage((prev) => prev - 1);
            }}
          />
        </PaginationItem>
        {paginationRange.map((item, index) => (
          <PaginationItem key={index}>
            {item === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                className={cn({ 'bg-primary-foreground': page === item })}
                isActive={page === item}
                href="#"
                onClick={() => {
                  setPage(item);
                }}
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={page === totalPages}
            onClick={() => {
              if (page < totalPages) setPage((prev) => prev + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
