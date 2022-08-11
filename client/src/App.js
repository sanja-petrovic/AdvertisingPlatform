import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from "./components/home/Home"
import Login from "./components/login/Login";
import SignUp from "./components/login/SignUp";
import store from './store'
import {Provider} from 'react-redux'

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/advertisements/:id" element={<SignUp/>}/>
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
