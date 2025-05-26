import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}
type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

export async function tryCatch<T, E = Error>(
  promise: Promise<T>
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error as E };
  }
}

/**
 * Generates a pagination range with ellipsis for UI display
 * @param currentPage - The current active page
 * @param totalPageCount - Total number of pages
 * @param siblingCount - Number of sibling pages to show around current page
 * @returns Array of page numbers and "ellipsis" strings
 */
export function getPaginationRange(
  currentPage: number,
  totalPageCount: number,
  siblingCount = 1
): Array<number | 'ellipsis'> {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPageCount <= totalPageNumbers) {
    return Array.from({ length: totalPageCount }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 2);
  const rightSiblingIndex = Math.min(
    currentPage + siblingCount,
    totalPageCount - 1
  );

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPageCount - 1;

  const pages: (number | 'ellipsis')[] = [1];

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    for (let i = 2; i <= leftItemCount; i++) {
      pages.push(i);
    }
    pages.push('ellipsis');
  } else if (showLeftEllipsis && !showRightEllipsis) {
    pages.push('ellipsis');
    const rightItemCount = 3 + 2 * siblingCount;
    for (let i = totalPageCount - rightItemCount + 1; i < totalPageCount; i++) {
      pages.push(i);
    }
  } else if (showLeftEllipsis && showRightEllipsis) {
    pages.push('ellipsis');
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pages.push(i);
    }
    pages.push('ellipsis');
  } else {
    for (let i = 2; i < totalPageCount; i++) {
      pages.push(i);
    }
  }

  if (pages[pages.length - 1] !== totalPageCount) {
    pages.push(totalPageCount);
  }

  return pages;
}
