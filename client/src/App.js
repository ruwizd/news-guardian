import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/index.css';
import Feeds from "./components/Feeds";
import Admin from "./components/Admin";
import Login from "./components/Login";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Feeds />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
