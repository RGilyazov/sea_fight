import Cell from "./Cell";
import { CellData } from "../utils/types";
export type RowProps = { cells: CellData[] };

export default function Row({ cells }: RowProps) {
  return (
    <div className="flex flex-row">
      {cells.map((cell, index) => (
        <Cell key={index} shelled={cell.shelled} ship={cell.ship} />
      ))}
    </div>
  );
}
