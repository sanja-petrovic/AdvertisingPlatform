import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from "./components/home/Home"
import Login from "./components/login/Login";
import SignUp from "./components/login/SignUp";
import SingleAdvertisement from "./components/advertisement/SingleAdvertisement";
import NewAdvertisement from "./components/advertisement/NewAdvertisement";
import NavigationBar from "./components/common/NavigationBar";

function App() {
    return (
        <Router>
            <NavigationBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/advertisements/:id" element={<SingleAdvertisement editable={false}/>}/>
                <Route path="/advertisements/:id/edit" element={<SingleAdvertisement editable={true}/>}/>
                <Route path="/advertisements/new" element={<NewAdvertisement/>}/>
            </Routes>
        </Router>
    );
}

export default App;
