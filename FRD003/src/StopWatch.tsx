import { useEffect, useState } from "react";
import LapItem, { LapItemProps } from "./LapItem";

export interface Time {
  M: number;
  S: number;
  MS: number;
}
interface StopWatchProps {
  isCounting: boolean;
}

function StopWatch(props: StopWatchProps) {
  const [lapCounter, setLapCounter] = useState<number>(0);
  const [timer, setTimer] = useState<Time>({ M: 0, S: 0, MS: 0 });
  const [lapList, setLapList] = useState<LapItemProps[]>([]);
  const [isPlaying, setIsPlaying] = useState(props.isCounting);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimer((timer) => {
          const newMS = timer.MS + 1;
          const newS = timer.S + Math.floor(newMS / 100);
          const newM = timer.M + Math.floor(newS / 60);
          return { M: newM, S: newS % 60, MS: newMS % 100 };
        });
      }, 10);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying]);

  const saveLap = () => {
    const newLapList = [...lapList];
    newLapList.push({ index: lapCounter, lap: timer });
    setLapList(newLapList);
    setLapCounter(lapCounter + 1);
  };

  return (
    <>
      <div className="rounded-[36px] p-12 mt-5 backdrop-blur-lg bg-black/30 shadow-md">
        <h1 className="text-5xl font-bold mb-5 flex">
          <i className="material-symbols-rounded text-5xl mr-5">timer</i>
          Stop Watch
        </h1>
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max font-mono">
          <div className="flex flex-col bg-neutral rounded-md p-5 font-bold">
            <span className="countdown">
              <span
                className="text-9xl"
                style={{ "--value": timer.M } as React.CSSProperties}
              ></span>
            </span>
          </div>
          <div className="flex flex-col bg-neutral rounded-md p-5 font-bold">
            <span className="countdown">
              <span
                className="text-9xl"
                style={{ "--value": timer.S } as React.CSSProperties}
              ></span>
            </span>
          </div>
          <div className="flex flex-col bg-neutral rounded-md p-5 font-bold w-52">
            <span className="">
              <span className="text-9xl">
                {timer.MS < 10 ? "0" + timer.MS : timer.MS}
              </span>
            </span>
          </div>
        </div>
        <nav className="mt-5 flex justify-around items-center px-10">
          <button
            className="material-symbols-rounded text-3xl w-12 h-12 btn btn-circle btn-ghost flex justify-center items-center"
            onClick={() => saveLap()}
          >
            flag
          </button>
          <button
            className="material-symbols-rounded text-7xl w-24 h-24 btn btn-circle btn-ghost flex justify-center items-center"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? "pause" : "play_arrow"}
          </button>
          <button
            className="material-symbols-rounded text-3xl w-12 h-12 btn btn-circle btn-ghost flex justify-center items-center"
            onClick={() => {
              setTimer({ M: 0, S: 0, MS: 0 });
              setIsPlaying(false);
              setLapList([]);
            }}
          >
            replay
          </button>
        </nav>
      </div>
      {lapList.length > 0 && (
        <footer className="mt-5 border-accent border-2 rounded-[36px] p-12">
          <h3 className="text-3xl font-black">Lap Record</h3>
          <div className="divide-y divide-dashed">
            {lapList.map((lap, index) => (
              <LapItem key={index} index={index + 1} lap={lap.lap} />
            ))}
          </div>
        </footer>
      )}
    </>
  );
}

export default StopWatch;
