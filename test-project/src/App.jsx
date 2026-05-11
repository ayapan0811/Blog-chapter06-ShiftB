
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Page from "./components/Page/Page"
import Contact from "./components/Contact/Contact"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/posts/:id' element={<Page />}/>
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
);
}

export default App
