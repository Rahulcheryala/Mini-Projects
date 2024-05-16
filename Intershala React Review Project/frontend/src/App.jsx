import { React } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReviewHighlighter from "./components/ReviewHighlighter";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ReviewHighlighter />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
