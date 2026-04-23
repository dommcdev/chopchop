"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { use } from "react";

export function PaginationBar({
  currentPage,
  totalPagesPromise,
}: {
  currentPage: number;
  totalPagesPromise: Promise<number>;
}) {
  const getPageUrl = (page: number) => `?page=${page}`;
  const totalPages = use(totalPagesPromise);

  // Don't show bar if there is only 1 page
  if (totalPages <= 1) return null;

  // Ellipses logic
  const getPagesToShow = () => {
    const pages: (number | "ellipsis")[] = [];
    const neighbors = 1; // How many pages to show on each side of current

    // Always show first page
    pages.push(1);

    if (currentPage > neighbors + 2) {
      pages.push("ellipsis");
    }

    // Show neighbors around current page
    const start = Math.max(2, currentPage - neighbors);
    const end = Math.min(totalPages - 1, currentPage + neighbors);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - neighbors - 1) {
      pages.push("ellipsis");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? getPageUrl(currentPage - 1) : "#"}
          />
        </PaginationItem>

        {getPagesToShow().map((page, index) => (
          <PaginationItem key={index}>
            {page === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={getPageUrl(page)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={currentPage < totalPages ? getPageUrl(currentPage + 1) : "#"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
