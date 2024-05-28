import { React } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Mainpage from "./Mainpage";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/LeaderBoard" element={<Mainpage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
