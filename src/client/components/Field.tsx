import { RowData, Coords } from "../../types";
import Row from "./Row";

export type FieldProps = {
  rows: RowData[];
  onCellClick?: (coords: Coords) => void;
};

export default function Field({ rows, onCellClick }: FieldProps) {
  return (
    <div className="flex flex-col  bg-teal-50 rounded-lg p-4 shadow-lg h-fit">
      {rows.map((row, index) => (
        <Row
          key={index}
          cells={row.cells}
          row={index}
          onCellClick={onCellClick}
        />
      ))}
    </div>
  );
}
