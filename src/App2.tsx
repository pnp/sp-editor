import "./App.css";
import { Routes, Route } from "react-router-dom";
import PopUp from "./popup/PopUp";
//import "./index2.css";


export default function App2() {
  return (
    <Routes>
      <Route path="/popup" element={<PopUp />} />
    </Routes>
  );
}
