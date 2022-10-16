import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import Todo from "./Todo";
import Join from "./Join";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
