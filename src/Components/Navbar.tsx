import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useContext(CartContext);

  return (
    <nav className="bg-black text-white px-5 py-3">
      <div className="flex justify-between items-center">
        
        <h1 className="text-lg font-semibold">Online Store</h1>

        <div className="hidden md:flex gap-5">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>

          

          <Link to="/cart" className="hover:text-gray-400">
            Cart ({cart.length})
          </Link>
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-2 mt-3 md:hidden">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          

          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            Cart ({cart.length})
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;