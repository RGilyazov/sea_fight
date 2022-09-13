import { RowData, Coords } from "../utils/types";
import Row from "./Row";

export type FieldProps = {
  rows: RowData[];
  onCellClick?: (coords: Coords) => void;
};

export default function Field({ rows, onCellClick }: FieldProps) {
  return (
    <div className="flex flex-col">
      {rows.map((row, index) => (
        <Row
          key={index}
          cells={row.cells}
          row={index}
          onCellClick={onCellClick  }
        />
      ))}
    </div>
  );
}
