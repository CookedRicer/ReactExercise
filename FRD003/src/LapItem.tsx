import { Time } from "./StopWatch";

export interface LapItemProps {
  index: number;
  lap: Time;
}

function LapItem(props: LapItemProps) {
  return (
    <div className="py-2">
      <span className="text-accent me-2">{props.index}</span>
      <span className="text-xl">{`${props.lap.M.toString().padStart(
        2,
        "0"
      )}:${props.lap.S.toString().padStart(
        2,
        "0"
      )}:${props.lap.MS.toString().padStart(2, "0")}`}</span>
    </div>
  );
}

export default LapItem;
