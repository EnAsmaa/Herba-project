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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {orders != null &&
          orders.map((order) => {
            return (
              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-8 border border-slate-200 dark:border-slate-800">
                {/* Header */}
                <div className="text-center mb-10">
                  <FaCheckCircle
                    size={80}
                    className="mx-auto text-green-500 mb-4"
                  />

                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Order Placed Successfully 🎉
                  </h1>

                  <p className="text-slate-500 mt-3">
                    Thank you for your purchase. Your order is being processed.
                  </p>
                </div>

                {/* Order Info */}
                <div className="grid md:grid-cols-2 gap-5 mb-8">
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5">
                    <p className="text-sm text-slate-500">Order ID</p>

                    <p className="font-semibold text-lg">#{order.orderId}</p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5">
                    <p className="text-sm text-slate-500">Payment ID</p>

                    <p className="font-semibold text-lg">#{order.paymentId}</p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5">
                    <p className="text-sm text-slate-500">Payment Method</p>

                    <p className="font-semibold">{order.paymentMethod}</p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5">
                    <p className="text-sm text-slate-500">Total Amount</p>

                    <p className="font-bold text-2xl text-green-600">
                      ${order.totalAmount}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5 mb-8">
                  <h3 className="font-semibold mb-2">Delivery Location</h3>

                  <p className="text-slate-600 dark:text-slate-300">
                    {order.location}
                  </p>
                </div>

                {/* Date */}
                <div className="mb-8">
                  <p className="text-sm text-slate-500">Order Date</p>

                  <p className="font-medium">
                    {new Date(order.date).toLocaleString()}
                  </p>
                </div>

                {/* Products */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Ordered Items</h2>

                  <div className="overflow-x-auto border rounded-2xl dark:border-slate-700">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-100 dark:bg-slate-800">
                          <th className="text-left p-4">Product</th>
                          <th className="text-left p-4">Quantity</th>
                          <th className="text-left p-4">Price</th>
                        </tr>
                      </thead>

                      <tbody>
                        {order?.items?.map((item, index) => (
                          <tr
                            key={index}
                            className="border-t dark:border-slate-700"
                          >
                            <td className="p-4">{item.productName}</td>

                            <td className="p-4">{item.quantity}</td>

                            <td className="p-4 font-medium">${item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mt-10">
                  <Link
                    to="/orders"
                    className="flex-1 text-center py-3 rounded-xl border border-green-700 text-green-700 hover:bg-green-50 dark:hover:bg-green-950"
                  >
                    View Orders
                  </Link>

                  <Link
                    to="/herbas"
                    className="flex-1 text-center py-3 rounded-xl bg-green-700 text-white hover:bg-green-800"
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
