import React from "react";
import "./App.css";
import StopWatch from "./StopWatch";
import CountDown from "./CountDown";

function App() {
  const [mode, setMode] = React.useState<"countdown" | "stopwatch">(
    "stopwatch"
  );
  return (
    <div className="App min-h-screen w-full pt-12 bg-cover bg-[url('https://th.bing.com/th/id/R.3e25404e34c902d7edd7ec04ff142da9?rik=LvmI4Y%2bw5jf0AQ&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f10%2fApple-Earth-Photos-1.jpg&ehk=6Oxh19dxIL49zz6PDzM5YAtRAeh4UWFmSgdFqg5zs%2fc%3d&risl=&pid=ImgRaw&r=0')]">
      <main className="h-full max-w-fit mx-auto flex flex-col justify-center">
        <div className="inline-flex justify-center items-center p-3 mx-auto rounded-xl gap-5 backdrop-blur-md bg-white/10">
          <button
            className="btn btn-circle btn-ghost"
            onClick={() => setMode("stopwatch")}
          >
            <i className="material-symbols-rounded">timer</i>
          </button>
          <button
            className="btn btn-circle btn-ghost"
            onClick={() => setMode("countdown")}
          >
            <i className="material-symbols-rounded">av_timer</i>
          </button>
        </div>
        {mode === "stopwatch" && <StopWatch isCounting={false} />}
        {mode === "countdown" && <CountDown isCounting={false} />}
      </main>
    </div>
  );
}

export default App;
