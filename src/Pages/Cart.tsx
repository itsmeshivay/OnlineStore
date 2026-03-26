import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const context = useContext(CartContext);
  if (!context) return null;

  const { cart, removeFromCart } = context;

  const totalItems = cart.length;
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4"> Cart</h1>

      {cart.length === 0 ? (
        <p> cart is empty</p>
      ) : (
        cart.map((item) => (
          <div
            key={item.id}
            className="border p-4 mb-3 flex items-center gap-4 rounded"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-16 w-16 object-contain"
            />

            <div className="flex-1">
              <h2 className="text-sm font-semibold">{item.title}</h2>
              <p>₹ {item.price}</p>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-black text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))
      )}

      <div className="mt-6 border-t pt-4">
        <p className="font-semibold">Total Items: {totalItems}</p>
        <p className="text-lg font-bold mt-2">
          Total Price: ₹ {totalPrice.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default Cart;
