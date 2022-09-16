import { getCls } from "../../sever/utils";
import { Coords } from "../../types";

export type CellProps = {
  shelled?: boolean;
  ship?: boolean;
  coords: Coords;
  onClick?: (coords: Coords) => void;
};

export default function Cell({
  shelled = false,
  ship = false,
  onClick,
  coords,
}: CellProps) {
  const handleClick = (e: React.FormEvent<HTMLDivElement>) => {
    if (onClick) onClick(coords);
  };
  const classes = getCls({
    ship: ship,
    cross: ship && shelled,
    point: !ship && shelled,
    cell: !ship,
  });
  return (
    <>
      <div
        onClick={handleClick}
        className={classes}
        style={{ width: 30, height: 30 }}
      ></div>
    </>
  );
}
