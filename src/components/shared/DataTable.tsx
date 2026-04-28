import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableProps<T> {
  columns: {
    header: React.ReactNode;
    accessorKey: keyof T | string;
    cell?: (item: T) => React.ReactNode;
  }[];
  data: T[];
  onRowClick?: (item: T) => void;
  className?: string;
}

const DataTable = <T,>({ columns, data, onRowClick, className }: DataTableProps<T>) => {
  return (
    <div className={cn("rounded-xl border border-gray-800 bg-[#1A1C1E] overflow-hidden", className)}>
      <Table>
        <TableHeader className="bg-[#24272B]">
          <TableRow className="border-gray-800 hover:bg-transparent">
            {columns.map((column, index) => (
              <TableHead key={index} className="text-gray-400 font-medium py-4">
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, rowIndex) => (
            <TableRow 
              key={rowIndex} 
              className={cn(
                "border-gray-800 hover:bg-white/5 cursor-pointer transition-colors",
                onRowClick && "cursor-pointer"
              )}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex} className="py-4 text-gray-300">
                  {column.cell ? column.cell(item) : (item[column.accessorKey as keyof T] as React.ReactNode)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
