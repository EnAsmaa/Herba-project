import React, { useEffect, useMemo, useState } from 'react'
import { getMarketProductsAPI } from '../Services/MarketServices';
import toast from 'react-hot-toast';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';
import { sendAddToCart } from '../Services/CartServices';
import { FaSearch } from 'react-icons/fa';


export default function SpecificMarketProducts() {
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const { storeId } = useParams()
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("");

    // get products
    const getMarketProducts = async () => {
        try {
            const response = await getMarketProductsAPI(storeId)
            if (response.success) {
                setProducts(response?.data)
            }
        } catch (error) {
            toast.error(error?.message);
        } finally {
            setLoadingProducts(false);
        }
    };

    useEffect(() => {
        getMarketProducts()
    }, [])

    // add to cart
    const addToCart = async (id) => {
        const response = await sendAddToCart(id);
        if (response && response.success) {
            toast.success('Item Added Suuccessfully To Cart')
            navigate('/cart')
        }
    };

    // filterd stores

    // filterd products
    const filteredProducts = useMemo(() => {
        return products?.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);


    return (
        <section className="container mx-auto px-4 lg:px-8 py-8">
            {/* Hero */}
            <div className="">
                <div className="">
                    <h1 className="text-4xl md:text-4xl font-bold mb-10 text-center text-green-800">
                        Welcome To Our Store
                    </h1>
                </div>
            </div>

            {/* Search */}
            <div className='search-wrapper bg-green-800/10 py-8 rounded-lg mb-7'>
                <div className='search-box relative mx-auto w-2xs sm:w-sm md:w-md lg:w-lg'>
                    <FaSearch className='absolute text-gray-500 -translate-y-1/2 top-1/2 left-3 cursor-pointer fs-4' />
                    <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type="search"
                        className='placeholder:text-gray-500 dark:placeholder:text-[#8696A0] placeholder:italic bg-gray-50 text-gray-900 border border-gray-300 dark:border-[#2E3B42] dark:bg-[#1F2C32] dark:text-white focus:outline-0 rounded-lg py-2 px-8 w-full '
                        placeholder={`Search stores or products...`}
                    />
                </div>
            </div>

            {/* products */}
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
                        {filteredProducts?.map((product, index) => (
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

                                    <div className="">
                                        <span className="text-green-700 dark:text-green-400 font-bold text-lg w-full">
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
    )
}
