import { useEffect, useMemo, useState } from "react";
import {
  FaCartShopping,
  FaLocationDot,
  FaPhone,
  FaStore,
} from "react-icons/fa6";
import Search from "../components/Search";
import { getProductsAPI, getStoresAPI } from "../Services/MarketServices";
import { Link, useNavigate } from "react-router-dom";
import { sendAddToCart } from "../Services/CartServices";
import toast from "react-hot-toast";

export default function Market() {
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingStores, setLoadingStores] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()

  // get store data
  const getStores = async () => {
    try {
      const response = await getStoresAPI()
      console.log(response)
      if (response.success) {
        setStores(response.data)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingStores(false);
    }
  };

  // get products
  const getProducts = async () => {
    try {
      const response = await getProductsAPI()
      console.log(response)
      if (response.success) {
        setProducts(response.data)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    getStores();
    getProducts();
  }, []);


  const addToCart = async (id) => {
    const response = await sendAddToCart(id);
    if (response && response.success) {
      toast.success('Item Added Suuccessfully To Cart')
      navigate('/cart')
    }
  };

  // filterd stores
  const filteredStores = useMemo(() => {
    return stores.filter((store) =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [stores, searchTerm]);

  // filterd products
  const filteredProducts = useMemo(() => {
    return products?.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  console.log(filteredProducts)


  return (
    <section className="container mx-auto px-4 lg:px-8 py-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 to-emerald-500 p-8 md:p-12 text-white mb-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Natural Herbs & Stores
          </h1>

          <p className="text-lg opacity-90">
            Explore trusted herbal stores and premium natural products all in
            one place.
          </p>
        </div>

        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="absolute right-20 bottom-0 w-24 h-24 bg-white/10 rounded-full"></div>
      </div>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search stores or products..."
          className="w-full p-4 rounded-2xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Stores */}
      <div className="mb-14">
        <h2 className="text-3xl font-bold mb-6 dark:text-white flex items-center gap-2">
          <FaStore />
          Herbal Stores
        </h2>

        {loadingStores ? (
          <div className="min-h-70 w-full flex items-center justify-center">
            <span class="loader"></span>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredStores.map((store) => (
              <Link
                to={`${store?.storeId}`}
                key={store.storeId}
                className="group bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700"
              >
                <div className="w-14 h-14 rounded-2xl bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                  <FaStore className="text-2xl text-green-700" />
                </div>

                <h3 className="font-bold text-xl dark:text-white mb-3">
                  {store.name}
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <FaPhone className="text-green-600" />
                    {store.contactInfo}
                  </div>

                  <div className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                    <FaLocationDot className="text-green-600 mt-1" />
                    <span>
                      {store.locations?.join(", ") || "No location"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Products */}
      <div>
        <h2 className="text-3xl font-bold mb-6 dark:text-white">
          Herbal Products
        </h2>

        {loadingProducts ? (
          <div className="min-h-70 w-full flex items-center justify-center">
            <span class="loader"></span>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-12">
            {filteredProducts.map((product, index) => (
              <div
                key={product.productId}
                className={`group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700 col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 ${index == 1 && 'col-span-12! sm:col-span-5!'} ${index == 0 && 'col-span-12! sm:col-span-7!'}`}
              >
                <div className="overflow-hidden">
                  <img
                    src={
                      product.image ||
                      "https://via.placeholder.com/400x300?text=Herb"
                    }
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg dark:text-white line-clamp-1">
                    {product.name}
                  </h3>

                  <div className=" mt-2">
                    <span className="text-green-700 dark:text-green-400 font-bold text-lg">
                      {product.price} EGP
                    </span>

                    <button onClick={() => { addToCart(product.productId) }} className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl transition w-full mt-2">
                      <FaCartShopping />
                      Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}