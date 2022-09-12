import { RowData } from "../utils/types";
import Row from "./Row";

export type FieldProps = { rows: RowData[] };

export default function Field({ rows }: FieldProps) {
  return (
    <div className="flex flex-col">
      {rows.map((row, index) => (
        <Row key={index} cells={row.cells} />
      ))}
    </div>
  );
}
