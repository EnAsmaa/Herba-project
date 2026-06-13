import React, { useEffect, useMemo, useState } from "react";
import { getMarketProductsAPI } from "../Services/MarketServices";
import toast from "react-hot-toast";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { sendAddToCart } from "../Services/CartServices";
import { FaSearch } from "react-icons/fa";

export default function SpecificMarketProducts() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // get products
  const getMarketProducts = async () => {
    try {
      const response = await getMarketProductsAPI(storeId);
      if (response.success) {
        setProducts(response?.data);
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    getMarketProducts();
  }, []);

  // add to cart
  const addToCart = async (id) => {
    const response = await sendAddToCart(id);
    if (response && response.success) {
      toast.success("Item Added Suuccessfully To Cart");
      navigate("/cart");
    }
  };

  // filterd stores

  // filterd products
  const filteredProducts = useMemo(() => {
    return products?.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [products, searchTerm]);

  return (
    <section className="container mx-auto px-4 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-center text-[#446C4F] dark:text-[#94C973]">
          Welcome To Our Store
        </h1>
      </div>

      {/* Search Section */}
      <div className="search-wrapper bg-[#E8F3EE] dark:bg-[#1A1F1C] py-8 px-6 rounded-2xl mb-10 border border-[#446C4F]/10">
        <div className="search-box relative mx-auto w-full max-w-lg">
          <FaSearch className="absolute text-[#446C4F] -translate-y-1/2 top-1/2 left-4 text-lg" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="search"
            className="placeholder:text-[#446C4F]/50 dark:placeholder:text-[#94A3B8] placeholder:italic bg-white dark:bg-[#232925] border border-[#E8F3EE] dark:border-[#2C3530] text-[#3E4E36] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#446C4F] rounded-xl py-3 pl-12 pr-4 w-full transition-all shadow-sm"
            placeholder="Search stores or products..."
          />
        </div>
      </div>

      {/* Products Section */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-[#446C4F] dark:text-[#E2E8F0]">
          Herbal Products
        </h2>

        {loadingProducts ? (
          <div className="min-h-70 w-full flex items-center justify-center">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-12 ">
            {filteredProducts?.map((product, index) => (
              <div
                key={product.productId}
                className={`group  bg-white dark:bg-[#232925] rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[#E8F3EE] dark:border-[#2C3530] col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 ${index === 0 ? "lg:col-span-7!" : index === 1 ? "lg:col-span-5!" : ""}`}
              >
                <div className="overflow-hidden h-60">
                  <img
                    src={
                      product.image ||
                      "https://via.placeholder.com/400x300?text=Herb"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-bold text-lg text-[#3E4E36] dark:text-[#E2E8F0] truncate">
                    {product.name}
                  </h3>

                    <span className="text-[#446C4F] block dark:text-[#94C973] font-black text-xl w-full">
                      {product.price} EGP
                    </span>

                    <button
                      onClick={() => addToCart(product.productId)}
                      className="flex items-center justify-center gap-2 bg-[#446C4F] w-full dark:bg-[#528B63] hover:opacity-90 text-white px-6 py-2.5 rounded-xl transition font-bold text-sm shadow-sm"
                    >
                      <FaCartShopping />
                      Add to Cart
                    </button>
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
