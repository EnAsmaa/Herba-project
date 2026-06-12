import React, { useEffect, useState } from "react";
import { getAllOrders } from "../Services/OrderServices";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function OrderSuccess() {
  const [orders, setOrders] = useState();
  
  const handleGetOrders = async () => {
    const response = await getAllOrders();

    if (response && response.success && Array.isArray(response?.data)) {
      setOrders(response?.data); 
    }
  };

  useEffect(() => {
    handleGetOrders();
  }, []);

 return (
    <div className="min-h-screen bg-gray-50 text-[#3E4E36] dark:bg-[#1A1F1C] dark:text-[#E2E8F0] py-12 px-4 font-sans transition-colors duration-200">
      <div className="max-w-3xl mx-auto space-y-6">
        {orders != null &&
          orders.map((order) => {
            return (
              <div 
                key={order.orderId} 
                className="bg-white dark:bg-[#232925] rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100 dark:border-[#2C3530] animate-in fade-in duration-300"
              >
                {/* Success Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 dark:bg-green-950/20 text-[#446C4F] dark:text-[#528B63] mb-4 border border-green-100 dark:border-green-900/10 shadow-inner">
                    <FaCheckCircle size={36} />
                  </div>

                  <h1 className="text-2xl md:text-3xl font-black text-[#3E4E36] dark:text-[#E2E8F0] tracking-tight">
                    Order Placed Successfully 🎉
                  </h1>

                  <p className="text-sm text-gray-400 dark:text-zinc-500 mt-2">
                    Thank you for your purchase. Your herbal remedies are being processed.
                  </p>
                </div>

                {/* Order Information Grid */}
                <div className="grid grid-cols-2 gap-4 bg-gray-50/60 dark:bg-[#1A1F1C] border border-gray-100 dark:border-[#2C3530]/40 rounded-2xl p-5 mb-6">
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500">Order ID</p>
                    <p className="font-bold text-sm md:text-base text-[#3E4E36] dark:text-[#E2E8F0]">#{order.orderId}</p>
                  </div>

                  <div className="space-y-0.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500">Payment ID</p>
                    <p className="font-bold text-sm md:text-base text-[#3E4E36] dark:text-[#E2E8F0]">#{order.paymentId}</p>
                  </div>

                  <div className="space-y-0.5 pt-3 border-t border-gray-200/50 dark:border-[#2C3530]/50">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500">Payment Method</p>
                    <p className="font-bold text-xs md:text-sm text-[#446C4F] dark:text-[#528B63]">{order.paymentMethod}</p>
                  </div>

                  <div className="space-y-0.5 pt-3 border-t border-gray-200/50 dark:border-[#2C3530]/50">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500">Total Amount</p>
                    <p className="font-black text-lg md:text-xl text-[#446C4F] dark:text-[#528B63]">${order.totalAmount}</p>
                  </div>
                </div>

                {/* Delivery Location & Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-white dark:bg-[#232925] border border-gray-200/60 dark:border-[#2C3530] rounded-xl p-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#446C4F] dark:text-[#528B63] mb-1">
                      Delivery Location
                    </h3>
                    <p className="text-xs md:text-sm text-[#3E4E36]/90 dark:text-[#E2E8F0]/90 leading-relaxed">
                      {order.location}
                    </p>
                  </div>

                  <div className="bg-white dark:bg-[#232925] border border-gray-200/60 dark:border-[#2C3530] rounded-xl p-4 flex flex-col justify-center">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 mb-1">
                      Order Date
                    </h3>
                    <p className="text-xs md:text-sm font-bold text-[#3E4E36] dark:text-[#E2E8F0]">
                      {new Date(order.date).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Ordered Items Table */}
                <div className="space-y-3">
                  <h2 className="text-base font-bold text-[#3E4E36] dark:text-[#E2E8F0] flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-[#446C4F] dark:bg-[#528B63] rounded-full block"></span>
                    Ordered Items
                  </h2>

                  <div className="overflow-x-auto border border-gray-200/70 dark:border-[#2C3530] rounded-xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-[#1A1F1C] border-b border-gray-200/70 dark:border-[#2C3530]">
                          <th className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 p-4">Product</th>
                          <th className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 p-4 text-center">Quantity</th>
                          <th className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 p-4 text-right">Price</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-100 dark:divide-[#2C3530]/50 text-xs md:text-sm">
                        {order?.items?.map((item, index) => (
                          <tr key={index} className="hover:bg-gray-50/40 dark:hover:bg-[#1A1F1C]/40 transition-colors">
                            <td className="p-4 font-bold text-[#3E4E36] dark:text-[#E2E8F0]">{item.productName}</td>
                            <td className="p-4 text-center font-medium text-gray-500 dark:text-zinc-400">{item.quantity}</td>
                            <td className="p-4 text-right font-bold text-[#446C4F] dark:text-[#528B63]">${item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <Link
                    to="/orders"
                    className="flex-1 text-center py-3 rounded-xl border border-[#446C4F] text-[#446C4F] dark:border-[#528B63] dark:text-[#528B63] font-bold text-xs md:text-sm transition-all active:scale-95 hover:bg-green-50/50 dark:hover:bg-green-950/10 cursor-pointer"
                  >
                    View All Orders
                  </Link>

                  <Link
                    to="/market"
                    className="flex-1 text-center py-3 rounded-xl bg-[#446C4F] dark:bg-[#528B63] text-white font-bold text-xs md:text-sm shadow-sm transition-all active:scale-95 hover:opacity-95 cursor-pointer"
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