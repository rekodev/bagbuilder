import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}

export function getPaginationRange(
  currentPage: number,
  totalPageCount: number,
  siblingCount = 1,
): Array<number | "ellipsis"> {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPageCount <= totalPageNumbers) {
    return Array.from({ length: totalPageCount }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 2);
  const rightSiblingIndex = Math.min(
    currentPage + siblingCount,
    totalPageCount - 1,
  );

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPageCount - 1;

  const pages: (number | "ellipsis")[] = [1];

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    for (let i = 2; i <= leftItemCount; i++) {
      pages.push(i);
    }
    pages.push("ellipsis");
  } else if (showLeftEllipsis && !showRightEllipsis) {
    pages.push("ellipsis");
    const rightItemCount = 3 + 2 * siblingCount;
    for (let i = totalPageCount - rightItemCount + 1; i < totalPageCount; i++) {
      pages.push(i);
    }
  } else if (showLeftEllipsis && showRightEllipsis) {
    pages.push("ellipsis");
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pages.push(i);
    }
    pages.push("ellipsis");
  } else {
    for (let i = 2; i < totalPageCount; i++) {
      pages.push(i);
    }
  }

  pages.push(totalPageCount);

  return pages;
}
