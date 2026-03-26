import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ProductDetail from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
                <Route path="/products" element={<Home />} />


        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;