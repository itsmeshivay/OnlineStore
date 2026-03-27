import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const context = useContext(CartContext);

  if (!context) return null;

  const { cart, addToCart, decreaseQuantity, removeFromCart, getTotalPrice } =
    context;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
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
              <p className="text-sm mt-1">Qty: {item.quantity}</p>
            </div>

            <div className="flex gap-2 items-center">
              <button
                onClick={() => decreaseQuantity(item.id)}
                className="px-2 py-1 bg-gray-200"
              >
                -
              </button>

              <button
                onClick={() => addToCart(item)}
                className="px-2 py-1 bg-gray-200"
              >
                +
              </button>
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
          Total Price: ₹ {getTotalPrice().toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default Cart;