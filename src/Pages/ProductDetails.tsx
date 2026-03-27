import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const context = useContext(CartContext);

  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState("");

  if (!context) return null;
  const { addToCart } = context;

  useEffect(() => {
    if (!id) return;

    fetch("https://fakestoreapi.com/products/" + id)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(() => setError("Failed to load product"));
  }, [id]);

  if (error) return <h2>{error}</h2>;
  if (!product) return <h2 className="text-center mt-10">Loading...</h2>;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });

    alert("Item added to cart");

    navigate("/cart");
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-200 px-3 py-1 rounded"
      >
        Back
      </button>

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="h-52 object-contain"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="mt-3 font-bold">₹ {product.price}</p>

          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-4 py-2 mt-4 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;