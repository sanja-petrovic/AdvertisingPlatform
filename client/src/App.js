import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from "./components/home/Home"
import Login from "./components/login/Login";
import SignUp from "./components/login/SignUp";
import store from './store'
import {Provider} from 'react-redux'
import SingleAdvertisement from "./components/advertisement/SingleAdvertisement";
import NewAdvertisement from "./components/advertisement/NewAdvertisement";
import NavigationBar from "./components/common/NavigationBar";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <NavigationBar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/advertisements/:id" element={<SingleAdvertisement/>}/>
                    <Route path="/advertisements/new" element={<NewAdvertisement/>}/>
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
