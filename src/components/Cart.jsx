import React, { useEffect, useState } from "react";
import {
  sendAddToCart,
  sendGetCartData,
  sendRemoveFromCart,
} from "../Services/CartServices";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  // Get Cart Data
  const getCartItems = async () => {
    try {
      setIsLoading(true);
      const res = await sendGetCartData();

      if (res && res.success) {
        setCartItems(res?.data?.items || []);
        setTotalAmount(res?.data?.totalAmount || 0);
      }
    } catch (error) {
      console.error("Failed to fetch cart data:", error);
    } finally {
      setIsLoading(false);
      
    }
  };

  // Change Quantity (Handles both Increase and Decrease)
  const updateQuantity = async (productId, amount) => {
    const res = await sendAddToCart(productId, amount);   
    if (res?.success) {
      await getCartItems();
    }
  };

  // Remove Item
  const removeItem = async (productId) => {
    const res = await sendRemoveFromCart(productId);
    if (res?.success) {
      getCartItems();
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  if (isLoading && cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="size-8 border-2 border-neutral-300 dark:border-neutral-700 border-t-[#14532D] dark:border-t-green-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-transparent min-h-screen text-neutral-800 dark:text-neutral-200 antialiased">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        
        {/* Header */}
        <div className="border-b border-neutral-300 dark:border-neutral-700/50 pb-5 mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-[#14532D] dark:text-green-500">
            Shopping Cart
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {/* Empty Cart State */}
        {cartItems.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-green-400/60 dark:border-green-900/90 rounded-xl bg-green-50/10 dark:bg-green-950/10">
            <h3 className="text-xl font-medium text-[#14532D] dark:text-green-500">Your shopping cart is empty</h3>
            <p className="text-neutral-500 dark:text-neutral-400 mt-2 text-sm">Add some of our amazing herbs and products to start shopping.</p>
            <button 
              onClick={() => navigate('/herbas')}
              className="mt-6 cursor-pointer inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-[#14532D] dark:bg-green-600 hover:bg-green-800 dark:hover:bg-green-700 transition-colors duration-200 rounded-md shadow-sm"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Main Layout: Multi-Column Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Side: Cart Items List (8 Columns) */}
            <div className="lg:col-span-8 divide-y divide-neutral-100 dark:divide-neutral-800">
              {cartItems.map((item, idx) => (
                <div
                  key={item.productId || idx}
                  className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-[#14532D] dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 cursor-pointer transition-colors truncate">
                      {item.productName}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                      ${item.unitPrice?.toFixed(2)} each
                    </p>
                  </div>

                  {/* Quantity Actions & Price Block */}
                  <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto">
                    
                    {/* Modern Counter Capsule */}
                    <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 overflow-hidden shadow-sm h-9">
                      <button
                        onClick={() => updateQuantity(item.productId, -1)}
                        className="px-3 cursor-pointer text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-[#14532D] dark:hover:text-green-400 h-full transition-colors font-medium text-sm"
                        title="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-sm font-semibold text-neutral-900 dark:text-neutral-100 select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, 1)}
                        className="px-3 cursor-pointer text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-[#14532D] dark:hover:text-green-400 h-full transition-colors font-medium text-sm"
                        title="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Total Item Price */}
                    <div className="w-24 text-right">
                      <span className="text-base font-semibold text-green-700 dark:text-green-400">
                        ${(item.totalPrice || item.unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* Minimalist Remove Link */}
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-xs cursor-pointer text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium underline underline-offset-4 transition-colors duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side: Sticky Summary Panel */}
            <div className="lg:col-span-4 bg-green-50/40 dark:bg-neutral-900/50 border border-green-100/40 dark:border-neutral-800 rounded-xl p-6 lg:sticky lg:top-8 shadow-sm">
              <h2 className="text-lg font-semibold text-[#14532D] dark:text-green-500 mb-4">Order Summary</h2>
              
              <div className="space-y-3 pb-4 border-b border-green-200/40 dark:border-neutral-800 text-sm text-neutral-600 dark:text-neutral-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-neutral-400 dark:text-neutral-500">
                  <span>Shipping & taxes</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-4 mb-6">
                <span className="text-base font-medium text-neutral-800 dark:text-neutral-300">Estimated Total</span>
                <span className="text-2xl font-semibold text-green-700 dark:text-green-400">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => alert("Proceeding to checkout...")}
                className="w-full cursor-pointer bg-[#14532D] dark:bg-green-600 hover:bg-green-800 dark:hover:bg-green-700 text-white font-medium py-3.5 px-4 rounded-md text-sm transition-all duration-200 shadow-sm active:scale-[0.99]"
              >
                Check Out
              </button>

              <div className="mt-4 text-center">
                <p className="text-xs text-green-800/70 dark:text-neutral-500">
                  🛡️ Secure Checkout • Easy returns within 30 days
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}