import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
const context = useContext(CartContext);

if (!context) {
  throw new Error("CartContext not found");
}

const { cart } = context;  return (
    <nav className="bg-black text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold cursor-pointer">Online Store</h1>

        <div className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-gray-300 transition-colors">
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-gray-300 transition-colors"
          >
            Products
          </Link>
          <Link to="/cart" className="hover:text-gray-300 transition-colors">
            Cart ({cart.length})
          </Link>
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="flex flex-col mt-4 gap-3 md:hidden bg-black p-4 rounded-md">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="hover:text-gray-300"
          >
            Home
          </Link>

          <Link
            to="/products"
            onClick={() => setIsOpen(false)}
            className="hover:text-gray-300"
          >
            Products
          </Link>

          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="hover:text-gray-300"
          >
            Cart ({cart.length})
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
