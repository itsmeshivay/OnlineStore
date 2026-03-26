import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const context = useContext(CartContext);

  if (!context) return null;

  const { addToCart } = context;

  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    fetch("https://fakestoreapi.com/products/" + id)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/")}
        className="bg-gray-200 px-3 py-1 rounded"
      >
        Back
      </button>

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className="flex justify-center">
          <img
            src={product.image}
            alt=""
            className="h-52 object-contain"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="mt-3 font-bold">₹ {product.price}</p>

          <button
            onClick={() =>
              addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
              })
            }
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