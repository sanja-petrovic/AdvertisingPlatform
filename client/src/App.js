import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"
import Home from "./components/home/Home"
import Login from "./components/login/Login";
import SignUp from "./components/login/SignUp";
import NavigationBar from "./components/common/NavigationBar"
import store from './store'
import { Provider } from 'react-redux'
function App() {
  return (
      <Provider store={store}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </Router>
      </Provider>
  );
}

export default App;
