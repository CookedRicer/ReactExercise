import "./App.css";
import DarkModeToggle from "./feature/darkMode/DarkModeToggle";
import { useState } from "react";
import Home from "./page/Home";
import History from "./page/History";

function App() {
  type View = "Home" | "History";
  const [darkMode, setDarkMode] = useState(true);
  const [view, setView] = useState<View>("Home");
  const [theme, setTheme] = useState("dark");
  const [bgImg, setBgImg] = useState(
    "bg-[url('https://wallpapercave.com/wp/wp9211427.jpg')]",
  );
  const switchMode = (mode: boolean) => {
    if (mode) {
      setTheme("light");
      setBgImg("bg-[url('https://wallpapercave.com/wp/wp9211103.jpg')]");
    } else {
      setTheme("dark");
      setBgImg("bg-[url('https://wallpapercave.com/wp/wp9211427.jpg')]");
    }
    setDarkMode(!mode);
  };

  return (
    <>
      <main data-theme={theme} className={`bg-cover bg-center ${bgImg}`}>
        <nav className="w-full flex justify-end p-10">
          <DarkModeToggle onChange={() => switchMode(darkMode)} />
        </nav>

        <div className="App min-w-sm min-h-screen py-48">
          <nav className="flex mb-5">
            <ul className="menu menu-horizontal bg-base-100/30 rounded-box mx-auto border border-primary max-w-xl">
              <li onClick={() => setView("Home")}>
                <i className="material-symbols-outlined">view_list</i>
              </li>
              <li onClick={() => setView("History")}>
                <i className="material-symbols-outlined">history</i>
              </li>
            </ul>
          </nav>

          {view === "Home" && <Home />}
          {view === "History" && <History />}
        </div>
      </main>
    </>
  );
}

export default App;
