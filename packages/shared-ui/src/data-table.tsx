import * as React from "react";

import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { Input } from "./input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";

type DataTableRow = Record<string, unknown>;

type DataTableColumn = {
  id: string;
  header: string;
  accessorKey: string;
  enableSorting?: boolean;
  enableHiding?: boolean;
  cell?: (value: unknown, row: DataTableRow) => React.ReactNode;
};

type SortState = {
  columnId: string;
  direction: "asc" | "desc";
} | null;

interface DataTableProps {
  columns: DataTableColumn[];
  data: DataTableRow[];
  searchPlaceholder?: string;
  pageSize?: number;
}

function DataTable({ columns, data, searchPlaceholder = "Search records...", pageSize = 5 }: DataTableProps) {
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<SortState>(null);
  const [page, setPage] = React.useState(1);
  const [visibleColumns, setVisibleColumns] = React.useState(() =>
    Object.fromEntries(columns.map((column) => [column.id, true])) as Record<string, boolean>,
  );

  const columnsToRender = columns.filter((column) => visibleColumns[column.id] !== false);
  const normalizedQuery = query.trim().toLowerCase();

  const filteredRows = data.filter((row) => {
    if (!normalizedQuery) return true;
    return columns.some((column) => String(row[column.accessorKey] ?? "").toLowerCase().includes(normalizedQuery));
  });

  const sortedRows = [...filteredRows].sort((left, right) => {
    if (!sort) return 0;
    const column = columns.find((item) => item.id === sort.columnId);
    if (!column) return 0;
    const leftValue = String(left[column.accessorKey] ?? "");
    const rightValue = String(right[column.accessorKey] ?? "");
    return sort.direction === "asc" ? leftValue.localeCompare(rightValue) : rightValue.localeCompare(leftValue);
  });

  const pageCount = Math.max(1, Math.ceil(sortedRows.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const pageRows = sortedRows.slice((safePage - 1) * pageSize, safePage * pageSize);

  function toggleSort(column: DataTableColumn) {
    if (!column.enableSorting) return;
    setPage(1);
    setSort((current) => {
      if (current?.columnId !== column.id) return { columnId: column.id, direction: "asc" };
      if (current.direction === "asc") return { columnId: column.id, direction: "desc" };
      return null;
    });
  }

  return (
    <div className="flex flex-col gap-4" data-slot="data-table">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
          placeholder={searchPlaceholder}
          className="md:max-w-sm"
          data-slot="data-table-search"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Columns</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Visible columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {columns.map((column) => (
              <DropdownMenuItem
                key={column.id}
                onSelect={(event) => {
                  event.preventDefault();
                  if (column.enableHiding === false) return;
                  setVisibleColumns((current) => ({ ...current, [column.id]: !current[column.id] }));
                }}
                disabled={column.enableHiding === false}
              >
                <Checkbox checked={visibleColumns[column.id] !== false} aria-label={`Toggle ${column.header}`} />
                {column.header}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {columnsToRender.map((column) => (
              <TableHead key={column.id}>
                <button
                  type="button"
                  onClick={() => toggleSort(column)}
                  className="inline-flex items-center gap-1 font-semibold disabled:cursor-default"
                  disabled={!column.enableSorting}
                >
                  {column.header}
                  {sort?.columnId === column.id ? <span aria-hidden="true">{sort.direction === "asc" ? "↑" : "↓"}</span> : null}
                </button>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageRows.length ? (
            pageRows.map((row, rowIndex) => (
              <TableRow key={String(row.id ?? rowIndex)}>
                {columnsToRender.map((column) => (
                  <TableCell key={column.id}>{column.cell ? column.cell(row[column.accessorKey], row) : String(row[column.accessorKey] ?? "")}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columnsToRender.length} className="h-24 text-center text-muted-foreground">
                No records found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex flex-col gap-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>
          Showing <span className="tabular-nums">{pageRows.length}</span> of <span className="tabular-nums">{filteredRows.length}</span> records
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled={safePage <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>
            Previous
          </Button>
          <span className="text-xs tabular-nums">
            Page {safePage} / {pageCount}
          </span>
          <Button variant="outline" size="sm" disabled={safePage >= pageCount} onClick={() => setPage((current) => Math.min(pageCount, current + 1))}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export { DataTable, type DataTableColumn, type DataTableRow };
