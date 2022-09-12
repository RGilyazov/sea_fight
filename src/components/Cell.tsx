import { getCls } from "../utils/utils";
export type CellProps = { shelled?: boolean; ship?: boolean };

export default function Cell({ shelled = false, ship = false }: CellProps) {
  const classes = getCls({
    ship: ship,
    cross: ship && shelled,
    point: !ship && shelled,
    cell: !ship,
  });
  return (
    <>
      <div className={classes} style={{ width: 30, height: 30 }}></div>
    </>
  );
}
