import { useEffect, useMemo, useState } from "react";
import {
  FaCartShopping,
  FaLocationDot,
  FaPhone,
  FaStore,
} from "react-icons/fa6";
import Search from "../components/Search";
import { getStoresAPI } from "../Services/MarketServices";
import { Link, useNavigate } from "react-router-dom";
import { sendAddToCart } from "../Services/CartServices";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";

export default function Market() {
  const [stores, setStores] = useState([]);
  const [loadingStores, setLoadingStores] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // get store data
  const getStores = async () => {
    try {
      const response = await getStoresAPI();
      if (response.success) {
        setStores(response?.data);
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoadingStores(false);
    }
  };

  useEffect(() => {
    getStores();
  }, []);

  // filterd stores
  const filteredStores = useMemo(() => {
    return stores.filter((store) =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [stores, searchTerm]);

  return (
    <section className="container mx-auto px-4 lg:px-8 pt-12">
      {/* Hero Section */}
      <div className="">
        <h1 className="text-4xl md:text-5xl font-black mb-6 text-center text-[#446C4F] dark:text-[#94C973]">
          Discover Natural Herbs & Stores
        </h1>

        {/* Search Box */}
        <div className="search-wrapper bg-[#E8F3EE]/50 dark:bg-[#1A1F1C] py-6 rounded-2xl mb-10 border border-[#446C4F]/10">
          <div className="search-box relative mx-auto w-full max-w-lg">
            <FaSearch className="absolute text-[#446C4F] -translate-y-1/2 top-1/2 left-4 text-lg" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="search"
              className="placeholder:text-[#3E4E36]/50 dark:placeholder:text-[#94A3B8] placeholder:italic bg-white dark:bg-[#232925] border border-[#E8F3EE] dark:border-[#2C3530] text-[#3E4E36] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#446C4F] rounded-xl py-3 pl-12 pr-4 w-full transition-all"
              placeholder="Search stores or products..."
            />
          </div>
        </div>
      </div>

      {/* Stores Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 dark:text-[#E2E8F0] flex items-center gap-3">
          <FaStore className="text-[#446C4F] dark:text-[#94C973]" />
          Herbal Stores
        </h2>

        {loadingStores ? (
          <div className="min-h-70 w-full flex items-center justify-center">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredStores.map((store) => (
              <Link
                to={`${store?.storeId}`}
                key={store.storeId}
                className="group bg-white dark:bg-[#232925] rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-[#E8F3EE] dark:border-[#2C3530]"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#E8F3EE] dark:bg-[#446C4F]/20 flex items-center justify-center mb-4">
                  <FaStore className="text-2xl text-[#446C4F] dark:text-[#94C973]" />
                </div>
                <h3 className="font-bold text-xl text-[#3E4E36] dark:text-[#E2E8F0] mb-3 group-hover:text-[#446C4F] transition-colors">
                  {store.name}
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-[#3E4E36] dark:text-neutral-400">
                    <FaPhone className="text-[#446C4F] dark:text-[#94C973]" />
                    {store.contactInfo}
                  </div>
                  <div className="flex items-start gap-2 text-[#3E4E36] dark:text-neutral-400">
                    <FaLocationDot className="text-[#446C4F] dark:text-[#94C973] mt-1" />
                    <span>{store.locations?.join(", ") || "No location"}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
