import React, { useEffect, useState } from "react";
import {
  sendAddToCart,
  sendGetCartData,
  sendRemoveFromCart,
} from "../Services/CartServices";
import { useNavigate } from "react-router-dom";
import { sendCheckout } from "../Services/OrderServices";
import toast from "react-hot-toast";

export default function Cart() {
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // get user location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLocation(`${lat},${lng}`);
      },
      (error) => {
        console.error(error);
        alert("Location permission denied");
      },
    );
  };

  // Get Cart Data
  const getCartItems = async () => {
    try {
      setIsLoading(true);
      const res = await sendGetCartData();

      if (res && res.success) {
        setCartItems(res?.data?.items || []);
        setTotalAmount(res?.data?.totalAmount || 0);
        setCartId(res?.data?.cartId);
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
      toast.success("Quantity Updated Successfully");
    }
  };

  // Remove Item
  const removeItem = async (productId) => {
    const res = await sendRemoveFromCart(productId);
    if (res?.success) {
      getCartItems();
      toast.success("Quantity Removed Successfully");
    }
  };

  // checkout
  const handleCheckout = async (cartId, location, paymentMethod) => {
    setIsCheckoutLoading(true);
    try {
      if (!location) {
        alert("Please allow location access first");
        return;
      }
      const res = await sendCheckout(cartId, location, paymentMethod);

      if (res.success) {
        navigate(`/order-success`);
        toast.success("Checkout Successfully");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  if (isLoading && cartItems.length === 0) {
    return (
      <div className="min-h-150 w-full flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="bg-transparent min-h-screen text-neutral-800 dark:text-neutral-200 antialiased">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="border-b border-[#446C4F]/20 pb-5 mb-10">
          <h1 className="text-3xl font-black text-[#446C4F] dark:text-[#528B63]">
            Shopping Cart
          </h1>
          <p className="text-sm text-[#3E4E36] dark:text-neutral-400 mt-1">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>

        {/* Empty Cart State */}
        {cartItems.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-[#446C4F]/40 dark:border-[#2C3530] rounded-xl bg-[#E8F3EE]/20 dark:bg-[#232925]">
            <h3 className="text-xl font-bold text-[#446C4F] dark:text-[#528B63]">
              Your shopping cart is empty
            </h3>
            <p className="text-[#3E4E36] dark:text-neutral-400 mt-2 text-sm">
              Add some of our amazing herbs and products to start shopping.
            </p>
            <button
              onClick={() => navigate("/market")}
              className="mt-6 cursor-pointer inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-[#446C4F] dark:bg-[#528B63] hover:opacity-90 transition-all rounded-md shadow-sm"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Side: Cart Items List */}
            <div className="lg:col-span-8 divide-y divide-[#E8F3EE] dark:divide-[#2C3530]">
              {cartItems.map((item, idx) => (
                <div
                  key={item.productId || idx}
                  className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-[#446C4F] dark:text-[#94C973] hover:opacity-80 cursor-pointer transition-colors truncate">
                      {item.productName}
                    </h3>
                    <p className="text-sm text-[#3E4E36] dark:text-neutral-400 mt-1">
                      ${item.unitPrice?.toFixed(2)} each
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto">
                    <div className="flex items-center border border-[#E8F3EE] dark:border-[#2C3530] rounded-md bg-white dark:bg-[#1A1F1C] overflow-hidden shadow-sm h-9">
                      <button
                        onClick={() => updateQuantity(item.productId, -1)}
                        className="px-3 cursor-pointer text-[#446C4F] dark:text-[#94C973] hover:bg-[#E8F3EE] dark:hover:bg-[#2C3530] h-full transition-colors font-bold text-sm"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-sm font-bold text-neutral-900 dark:text-neutral-100 select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, 1)}
                        className="px-3 cursor-pointer text-[#446C4F] dark:text-[#94C973] hover:bg-[#E8F3EE] dark:hover:bg-[#2C3530] h-full transition-colors font-bold text-sm"
                      >
                        +
                      </button>
                    </div>

                    <div className="w-24 text-right">
                      <span className="text-base font-bold text-[#446C4F] dark:text-[#528B63]">
                        $
                        {(
                          item.totalPrice || item.unitPrice * item.quantity
                        ).toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-xs cursor-pointer text-[#D34040] hover:underline font-medium underline-offset-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side: Sticky Summary Panel */}
            <div className="lg:col-span-4 bg-[#F5F7F3] dark:bg-[#1A1F1C] border border-[#E8F3EE] dark:border-[#2C3530] rounded-xl p-6 lg:sticky lg:top-8 shadow-sm">
              <h2 className="text-lg font-bold text-[#446C4F] dark:text-[#528B63] mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 pb-4 border-b border-[#E8F3EE] dark:border-[#2C3530] text-sm text-[#3E4E36] dark:text-neutral-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-4 mb-6">
                <span className="text-base font-bold text-neutral-800 dark:text-neutral-300">
                  Total
                </span>
                <span className="text-2xl font-black text-[#446C4F] dark:text-[#528B63]">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => {
                  setShowCheckoutModal(true);
                }}
                className="w-full cursor-pointer bg-[#446C4F] dark:bg-[#528B63] hover:opacity-90 text-white font-bold py-3.5 px-4 rounded-md text-sm transition-all shadow-sm active:scale-[0.99]"
              >
                Check Out
              </button>
            </div>
          </div>
        )}

        {/* Checkout Modal */}
        {showCheckoutModal && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white dark:bg-[#1A1F1C] border border-[#2C3530] rounded-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-5 text-[#446C4F] dark:text-[#E2E8F0]">
                Checkout
              </h3>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-[#3E4E36] dark:text-neutral-400">
                  Delivery Location
                </label>
                <button
                  onClick={getUserLocation}
                  className="w-full mb-2 bg-[#446C4F] dark:bg-[#528B63] text-white py-2 rounded font-bold cursor-pointer hover:opacity-90"
                >
                  Use Current Location
                </button>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Or enter address manually"
                  className="w-full border border-[#E8F3EE] dark:border-[#2C3530] rounded px-3 py-2 dark:bg-[#232925]"
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 text-sm font-bold text-[#3E4E36] dark:text-neutral-400">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full border border-[#E8F3EE] dark:border-[#2C3530] rounded px-3 py-2 dark:bg-[#232925]"
                >
                  <option value="Cash">Cash</option>
                  <option value="Visa">Visa</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="flex-1 border rounded py-2 cursor-pointer font-bold"
                >
                  Cancel
                </button>
                <button
                  disabled={isCheckoutLoading}
                  onClick={() =>
                    handleCheckout(cartId, location, paymentMethod)
                  }
                  className="flex-1 bg-[#446C4F] dark:bg-[#528B63] text-white rounded py-2 font-bold cursor-pointer hover:opacity-90"
                >
                  {isCheckoutLoading ? "Processing..." : "Confirm Order"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
