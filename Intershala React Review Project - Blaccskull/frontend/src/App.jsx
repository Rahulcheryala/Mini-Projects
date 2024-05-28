import { React } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReviewHighlighter from "./components/ReviewHighlighter";
import ReviewHighlighterCodepen from "./components/Codepen";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/Codepen" element={<ReviewHighlighterCodepen />} />
          <Route path="/" element={<ReviewHighlighter />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
