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
    page,
    LEADERBOARD_PAGE_SIZE
  );

  return (
    <>
      <Table className="caption-top">
        <TableCaption>Ranking de indicação.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead className="w-full text-right">Pontos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboard?.content.map((user, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium whitespace-nowrap">
                {user.name}
              </TableCell>
              <TableCell className="w-full text-right">{user.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
