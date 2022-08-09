import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"
import Home from "./components/home/Home"
import NavigationBar from "./components/common/NavigationBar"

function App() {
  return (
      <Router>
        <NavigationBar username="username" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Home />} />
          <Route path="/contact" element={<Home />} />
          <Route path="/search" element={<Home />} />
        </Routes>
      </Router>
  );
}

export default App;
