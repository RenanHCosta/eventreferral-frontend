import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import apiInstance from "@/services/http-service";
import { LEADERBOARD_PAGE_SIZE } from "@/constants";

interface LeaderboardProps {
  page: number;
}

export async function Leaderboard({ page }: LeaderboardProps) {
  const { data: leaderboard } = await apiInstance.eventMembers.getLeaderboard(
    page - 1,
    LEADERBOARD_PAGE_SIZE
  );

  const hasPrevious = page > 1;
  const hasNext = leaderboard && leaderboard?.totalPages > page;

  const getPaginationRange = () => {
    if (!leaderboard) {
      return [];
    }

    const totalPages = leaderboard.totalPages;
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);

    const range = [];

    if (start > 1) {
      range.push(1);
      if (start > 2) {
        range.push("...");
      }
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        range.push("...");
      }
      range.push(totalPages);
    }

    return range;
  };

  return (
    <>
      <Table className="caption-top">
        <TableCaption>Ranking de indicação.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead className="w-full text-right">Pontos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboard?.content.map((user, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium whitespace-nowrap">
                {index + 1 + (page - 1) * LEADERBOARD_PAGE_SIZE}
              </TableCell>
              <TableCell className="font-medium whitespace-nowrap">
                {user.name}
              </TableCell>
              <TableCell className="w-full text-right">{user.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="mt-8">
        <PaginationContent>
          {hasPrevious && (
            <PaginationItem>
              <PaginationPrevious
                href={`${page - 1 === 0 ? "/" : `?page=${page - 1}`}`}
              />
            </PaginationItem>
          )}
          {getPaginationRange().map((pageNumber, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={typeof pageNumber === "number" && pageNumber === page}
                className={`${
                  typeof pageNumber === "string" ? "cursor-default" : ""
                }`}
                href={`${
                  typeof pageNumber === "number" && pageNumber === 0
                    ? "/"
                    : typeof pageNumber === "number"
                    ? `?page=${pageNumber}`
                    : "#"
                }`}
              >
                {typeof pageNumber === "string" ? (
                  <PaginationEllipsis />
                ) : (
                  pageNumber
                )}
              </PaginationLink>
            </PaginationItem>
          ))}
          {hasNext && (
            <PaginationItem>
              <PaginationNext href={`?page=${page + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
}
