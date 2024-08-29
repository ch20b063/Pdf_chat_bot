import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './componets/Home';
import Chatpage from "./componets/chatpage";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/chat/:pdfName/:projectName" element={<Chatpage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
