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

const users = [
  {
    name: "Renan Henrique",
    points: 5,
  },
  {
    name: "Renan Henrique",
    points: 2,
  },
  {
    name: "Renan Henrique",
    points: 1,
  },
  {
    name: "Renan Henrique",
    points: 1,
  },
  {
    name: "Renan Henrique",
    points: 1,
  },
  {
    name: "Renan Henrique",
    points: 1,
  },
];

export function Leaderboard() {
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
          {users.map((user, index) => (
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
