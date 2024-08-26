import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Button } from "../ui/button";

type Props = {
  caption: string;
  headers: { title: string; className?: string }[];
  rows: any[];
};

export function TableGeneric({ caption, headers, rows }: Props) {
  return (
    <Table>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {headers.map((h, idx) => (
            <TableHead key={idx} className={h.className}>
              {h.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r, idx) => {
          return (
            <TableRow key={idx}>
              {(() => {
                const cells = [];
                for (let [k, v] of Object.entries(r)) {
                  if (typeof v == "string") {
                    cells.push(<TableCell key={`string-${k}`}>{v}</TableCell>);
                  } else if (typeof v == "function") {
                    cells.push(
                      <TableCell key={`func-${k}`}>
                        {v(r.object_raw_data)}
                      </TableCell>
                    );
                  }
                }
                return cells;
              })()}
            </TableRow>
          );
        })}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}

export const TableActions = ({
  actions,
  data,
}: {
  actions: any[];
  data: any;
}) => {
  return (
    <div className="flex ">
      {actions.map((action, idx) => (
        <Button
          key={`action-${idx}`}
          className="mr-4"
          onClick={() => action.onClick(data)}
          disabled={action.disabled ? action.disabled(data) : false}
        >
          {action.title}
        </Button>
      ))}
    </div>
  );
};
