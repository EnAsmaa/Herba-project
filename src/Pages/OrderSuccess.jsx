import React, { useEffect, useState } from "react";
import { getAllOrders } from "../Services/OrderServices";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function OrderSuccess() {
  const [orders, setOrders] = useState();
  
  const handleGetOrders = async () => {
    const response = await getAllOrders();
    console.log(response);

    if (response && response.success && Array.isArray(response.data)) {
      setOrders(response.data); 
    }
  };

  useEffect(() => {
    handleGetOrders();
  }, []);

  console.log(orders);
  return (
    <div className="min-h-screen bg-gray-50 text-[#3E4E36] dark:bg-[#1A1F1C] dark:text-[#E2E8F0] py-12 px-4 font-sans transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        {orders != null &&
          orders.map((order, orderIdx) => {
            return (
              <div 
                key={order.orderId || orderIdx} 
                className="bg-white dark:bg-[#232925] rounded-2xl shadow-sm p-6 md:p-10 border border-gray-100 dark:border-[#2C3530] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-300"
              >
                {/* Header */}
                <div className="text-center mb-10">
                  <FaCheckCircle
                    size={72}
                    className="mx-auto text-[#446C4F] dark:text-[#528B63] mb-4 drop-shadow-sm"
                  />

                  <h1 className="text-2xl md:text-3xl font-black text-[#3E4E36] dark:text-[#E2E8F0]">
                    Order Placed Successfully 🎉
                  </h1>

                  <p className="text-sm text-gray-400 dark:text-zinc-500 mt-2 max-w-md mx-auto">
                    Thank you for your purchase. Your order is being processed and prepared.
                  </p>
                </div>

                {/* Order Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-[#1A1F1C] rounded-xl p-4 border border-gray-100/50 dark:border-[#2C3530]/50">
                    <p className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">Order ID</p>
                    <p className="font-bold text-sm md:text-base text-[#3E4E36] dark:text-[#E2E8F0] mt-1 truncate">#{order.orderId}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-[#1A1F1C] rounded-xl p-4 border border-gray-100/50 dark:border-[#2C3530]/50">
                    <p className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">Payment ID</p>
                    <p className="font-bold text-sm md:text-base text-[#3E4E36] dark:text-[#E2E8F0] mt-1 truncate">#{order.paymentId}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-[#1A1F1C] rounded-xl p-4 border border-gray-100/50 dark:border-[#2C3530]/50">
                    <p className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">Method</p>
                    <p className="font-bold text-sm md:text-base text-[#3E4E36] dark:text-[#E2E8F0] mt-1 truncate">{order.paymentMethod}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-[#1A1F1C] rounded-xl p-4 border border-gray-100/50 dark:border-[#2C3530]/50">
                    <p className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">Total Amount</p>
                    <p className="font-black text-lg md:text-xl text-[#446C4F] dark:text-[#528B63] mt-0.5">
                      ${order.totalAmount}
                    </p>
                  </div>
                </div>

                {/* Location & Date Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="md:col-span-2 bg-gray-50 dark:bg-[#1A1F1C] rounded-xl p-4 border border-gray-100/50 dark:border-[#2C3530]/50">
                    <h3 className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-1">Delivery Location</h3>
                    <p className="text-sm text-[#3E4E36]/90 dark:text-[#94A3B8] font-medium leading-relaxed">
                      {order.location}
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-[#1A1F1C] rounded-xl p-4 border border-gray-100/50 dark:border-[#2C3530]/50 flex flex-col justify-center">
                    <p className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">Order Date</p>
                    <p className="font-bold text-xs md:text-sm text-[#3E4E36]/90 dark:text-[#94A3B8] mt-1">
                      {new Date(order.date).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Products Table */}
                <div className="pt-2">
                  <h2 className="text-lg font-black text-[#3E4E36] dark:text-[#E2E8F0] mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-[#446C4F] dark:bg-[#528B63] rounded-full block"></span>
                    Ordered Items
                  </h2>

                  <div className="overflow-x-auto border border-gray-100 dark:border-[#2C3530] rounded-xl shadow-sm">
                    <table className="w-full text-sm text-left">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-[#1A1F1C] text-gray-400 dark:text-zinc-500 font-bold border-b border-gray-100 dark:border-[#2C3530]">
                          <th className="p-4 font-bold">Product</th>
                          <th className="p-4 font-bold text-center">Quantity</th>
                          <th className="p-4 font-bold text-right">Price</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-100 dark:divide-[#2C3530]">
                        {order?.items?.map((item, index) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-50/40 dark:hover:bg-[#1A1F1C]/20 transition-colors"
                          >
                            <td className="p-4 font-bold text-[#3E4E36] dark:text-[#E2E8F0]">{item.productName}</td>
                            <td className="p-4 text-center font-semibold text-gray-500 dark:text-zinc-400">{item.quantity}</td>
                            <td className="p-4 text-right font-bold text-[#3E4E36] dark:text-[#E2E8F0]">${item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Actions Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-[#2C3530]">
                  <Link
                    to="/orders"
                    className="flex-1 text-center py-3 rounded-xl border-2 border-[#446C4F] dark:border-[#528B63] text-[#446C4F] dark:text-[#528B63] font-bold text-sm hover:bg-green-50/50 dark:hover:bg-green-950/20 transition-all active:scale-95"
                  >
                    View All Orders
                  </Link>

                  <Link
                    to="/market"
                    className="flex-1 text-center py-3 rounded-xl bg-[#446C4F] dark:bg-[#528B63] text-white font-bold text-sm hover:opacity-95 shadow-sm transition-all active:scale-95"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
