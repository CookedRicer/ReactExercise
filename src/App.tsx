import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import TodoList from "./TodoList";

function App() {
  return (
    <div className="App">
      <TodoList name="Fredi" items={["Buy milk", "Buy banana", "Buy cherry"]} />
    </div>
  );
}

export default App;