import { Routes, Route } from "react-router-dom";

import EntryPoint from "./Pages/EntryPoint";
import ExitPoint from "./Pages/ExitPoint";
import Header from "../src/Layout/Header";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route index path="/" element={<EntryPoint />} />
        <Route path="/exitpoint" element={<ExitPoint />} />
      </Routes>
    </div>
  );
}

export default App;
