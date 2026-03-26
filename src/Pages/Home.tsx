import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Product{
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;

}



function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h2>Please Wait ...</h2>;

  let filtered = products;

  if (category !== "all") {
    filtered = products.filter((p) => p.category === category);
  }

  if (sort === "low") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Products</h1>

      <div className="flex gap-4 my-4">
        <select onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
        {filtered.map((p) => (
          <div
  key={p.id}
  className="border p-3 flex flex-col justify-between h-full"
>
  <div >
    <img src={p.image} className="h-32 mx-auto" />
    <h2 className="text-sm mt-2">{p.title}</h2>
    <p>₹ {p.price}</p>
  </div>

  <button
    onClick={() => navigate(`/product/${p.id}`)}
    className="bg-black text-white px-2 py-1 mt-3"
  >
    View
  </button>
</div>
        ))}
      </div>
    </div>
  );
}

export default Home;