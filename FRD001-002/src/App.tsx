import "./App.css";
import DarkModeToggle from "./DarkModeToggle";
import TodoList from "./TodoList";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const switchMode = (mode: boolean) => {
    if (mode) {
      document.querySelector(":root")?.setAttribute("data-theme", "nord");
    } else {
      document.querySelector(":root")?.setAttribute("data-theme", "dark");
    }
    setDarkMode(!mode);
  };
  return (
    <>
      <main>
        <nav className="w-full flex justify-end p-10">
          <DarkModeToggle onChange={() => switchMode(darkMode)} />
        </nav>

        <div className="App min-w-sm min-h-screen py-48">
          <TodoList name="Fred" items={[]} />
        </div>
      </main>
    </>
  );
}

export default App;
