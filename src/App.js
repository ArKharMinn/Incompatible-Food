import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Browse from "./pages/Browse";

function App() {
  return (
    <div className="App">
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/browse" element={<Browse />}></Route>
        {/* <Route path="*" element={<PageNotFound />}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
