import { useEffect, useState } from "react";
import TimeInput from "./TimeInput";
interface CountDownProps {
  isCounting: boolean;
}
interface CountDownTime {
  H: number;
  M: number;
  S: number;
}

function CountDown(props: CountDownProps) {
  const [timer, setTimer] = useState<CountDownTime>({ H: 0, M: 0, S: 0 });
  const [isCounting, setIsCounting] = useState(props.isCounting);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isCounting) {
        setTimer((timer) => {
          if (timer.S === 0) {
            if (timer.M === 0) {
              if (timer.H === 0) {
                setIsCounting(false);
                return { H: 0, M: 0, S: 0 };
              } else {
                return { H: timer.H - 1, M: 59, S: 59 };
              }
            } else {
              return { H: timer.H, M: timer.M - 1, S: 59 };
            }
          } else {
            return { H: timer.H, M: timer.M, S: timer.S - 1 };
          }
        });
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isCounting]);

  function submitTime(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const time = e.currentTarget.querySelectorAll("input");
    const newTimer: CountDownTime = {
      H: Number(time[0].value),
      M: Number(time[1].value),
      S: Number(time[2].value),
    };
    setTimer(newTimer);
  }

  function resetForm() {
    const time = document.querySelectorAll("input");
    time.forEach((input) => {
      input.value = "";
    });
  }

  return (
    <>
      <div className="rounded-[36px] p-12 mt-5 backdrop-blur-lg bg-black/30 shadow-md">
        <h1 className="text-5xl font-bold mb-5 flex">
          <i className="material-symbols-rounded text-5xl mr-5">av_timer</i>
          Count Down
        </h1>
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max font-mono">
          <div className="flex flex-col bg-neutral rounded-md p-5 font-bold">
            <span className="">
              <span className="text-9xl">
                {timer.H >= 10 ? timer.H : "0" + timer.H}
              </span>
            </span>
          </div>
          <div className="flex flex-col bg-neutral rounded-md p-5 font-bold">
            <span className="">
              <span className="text-9xl">
                {timer.M >= 10 ? timer.M : "0" + timer.M}
              </span>
            </span>
          </div>
          <div className="flex flex-col bg-neutral rounded-md p-5 font-bold">
            <span className="">
              <span className="text-9xl">
                {timer.S >= 10 ? timer.S : "0" + timer.S}
              </span>
            </span>
          </div>
        </div>
        <nav className="mt-5 flex justify-around items-center px-10">
          <button
            className="material-symbols-rounded text-3xl w-12 h-12 btn btn-circle btn-ghost flex justify-center items-center"
            onClick={() => setIsCounting(!isCounting)}
          >
            {isCounting ? "pause" : "play_arrow"}
          </button>
          <button
            className="material-symbols-rounded text-3xl w-12 h-12 btn btn-circle btn-ghost flex justify-center items-center"
            onClick={() => {
              setTimer({ H: 0, M: 0, S: 0 });
              setIsCounting(false);
            }}
          >
            replay
          </button>
        </nav>
      </div>
      <form
        className="rounded-[36px] p-12 mt-5 backdrop-blur-sm bg-black/30 shadow-md"
        onSubmit={(e) => {
          submitTime(e);
        }}
      >
        <h3 className="font-bold text-3xl mb-3 flex items-center">
          <i className="material-symbols-rounded text-3xl mr-5">tune</i>
          Set Count
        </h3>
        <div className="flex gap-5 font-mono">
          <TimeInput max={59} />
          <TimeInput max={59} />
          <TimeInput max={59} />
        </div>
        <div className="flex justify-end mt-5 gap-5">
          <button type="submit" className="btn btn-primary w-36">
            Apply
          </button>
          <button
            type="button"
            onClick={() => resetForm()}
            className="btn btn-ghost btn-outline w-36"
          >
            Clear
          </button>
        </div>
      </form>
    </>
  );
}

export default CountDown;
