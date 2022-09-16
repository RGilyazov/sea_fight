import Cell from "./Cell";
import { CellData, Coords } from "../../types";
export type RowProps = {
  cells: CellData[];
  row: number;
  onCellClick?: (coords: Coords) => void;
};

export default function Row({ cells, row, onCellClick }: RowProps) {
  return (
    <div className="flex flex-row">
      {cells.map((cell, index) => (
        <Cell
          key={index}
          shelled={cell.shelled}
          ship={cell.ship}
          coords={{ row: row, col: index }}
          onClick={onCellClick}
        />
      ))}
    </div>
  );
}
