import { FieldData, Coords, MAX_COLS, MAX_ROWS } from "./types";
export function getNestedCells(
  field: FieldData,
  cell: Coords,
  diagonal = false
): Coords[] {
  const res: Coords[] = [];
  for (let i = -1; i < 2; i++)
    for (let j = -1; j < 2; j++) {
      if (i === 0 && j === 0) continue;
      if (!diagonal && Number(i !== 0) + Number(j !== 0) > 1) continue;
      if (
        cell.col + i >= 0 &&
        cell.col + i < MAX_COLS &&
        cell.row + j >= 0 &&
        cell.row + j < MAX_ROWS
      ) {
        res.push({ row: cell.row + j, col: cell.col + i });
      }
    }
  return res;
}

export function getShipCells(field: FieldData, coords: Coords): Coords[] {
  const queue = [coords];
  let i = 0;
  while (i < queue.length) {
    const cellCoords = queue[i];
    const nestedCells = getNestedCells(field, cellCoords);
    for (let cell of nestedCells) {
      if (
        field.rows[cell.row].cells[cell.col].ship &&
        !queue.find((value) => value.col === cell.col && value.row === cell.row)
      )
        queue.push(cell);
    }
    i += 1;
  }
  return queue;
}

export function shipIsDead(field: FieldData, shipCells: Coords[]) {
  return shipCells.every(
    (value) => field.rows[value.row].cells[value.col].shelled
  );
}

export function setupIsCorrect(field: FieldData, exactly: boolean): boolean {
  const properShipCount: { [key: string]: number } = {
    "1": 4,
    "2": 3 * 2,
    "3": 2 * 3,
    "4": 1 * 4,
  };
  //count number of ships, every ship will be counted as many times
  //as many cells it has
  for (let i = 0; i < MAX_COLS; i++)
    for (let j = 0; j < MAX_ROWS; j++) {
      const cell = field.rows[j].cells[i];
      if (cell.ship) {
        const shipCells = getShipCells(field, { row: j, col: i });
        let count = properShipCount[shipCells.length] || 0;

        properShipCount[shipCells.length] = count - 1;
        //check if there is another ship on diagonal
        const notHasOtherShipsOnDiagonal = shipCells.every((coords) =>
          getNestedCells(field, coords, true).every(
            (value) =>
              field.rows[value.row].cells[value.col].ship !== true ||
              value.row === coords.row ||
              value.col === coords.col
          )
        );
        if (!notHasOtherShipsOnDiagonal) return false;
      }
    }
  for (let key in properShipCount) {
    if (exactly && properShipCount[key] < 0) return false;
    if (exactly && properShipCount[key] > 0) return false;
    if (key > "4") return false;
  }
  let sum = 0;
  for (let i = 5; i--; i > 1) {
    sum += Math.round(properShipCount[i] / i);
    console.log(i, sum, Math.round(properShipCount[i] / i));
    if (sum < 0) return false;
  }
  return true;
}

function shipIncludes(shipCells: Coords[], coord: Coords) {
  return shipCells.find(
    (value) => value.col === coord.col && value.row === coord.row
  );
}

export function allShipsDestroyed(field: FieldData) {
  for (let i = 0; i < MAX_COLS; i++)
    for (let j = 0; j < MAX_ROWS; j++) {
      const cell = field.rows[j].cells[i];
      if (cell.ship && !cell.shelled) return false;
    }
  return true;
}
