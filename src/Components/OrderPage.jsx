import { useEffect, useState } from "react";
import axios from "axios";

const OrderPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) return;
        const res = await axios.get("https://femine-backend.onrender.com/orders", {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Flatten the orders to get a list of products
        const allItems = res.data.flatMap(order =>
          order.products.map(p => {
            if (!p.product) return null;
            return {
              ...p.product,
              qty: p.quantity,
              orderId: order._id,
              orderDate: order.createdAt
            }
          })
        ).filter(item => item !== null);
        setItems(allItems);
      } catch (err) {
        console.error("Error fetching orders", err);
      }
    }
    fetchOrders();
  }, []);

  const subtotal = items.reduce((sum, item) => sum + (item.sellingPrice * item.qty), 0);
  const shipping = items.length > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">No orders yet</h1>
        <p className="text-gray-500 mb-8">Start shopping to see your orders here.</p>
        <Link to="/products" className="bg-rose-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-rose-600 transition-colors shadow-lg hover:shadow-xl">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Orders</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item, idx) => (
            <div key={idx} className="flex gap-6 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <img src={item.image} alt={item.name} className="w-28 h-28 object-cover rounded-xl" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">Processing</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Order ID: #{item.orderId?.slice(-6).toUpperCase()}</p>
                  <p className="text-xs text-gray-400 mt-1">Ordered on: {new Date(item.orderDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>

                <div className="flex justify-between items-end mt-4">
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-medium text-gray-500">Qty: <span className="text-gray-800 font-bold">{item.qty}</span></div>
                  </div>
                  <span className="text-xl font-bold text-rose-600"> ₹{item.sellingPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="h-fit">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h3 className="text-xl font-bold mb-6 text-gray-800">Lifetime Summary</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span> ₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping Fees</span>
                <span> ₹{shipping}</span>
              </div>
              <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total Spent</span>
                  <span> ₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl flex gap-3 items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
              <p className="text-sm text-blue-700">Orders usually ship within 24 hours. You will receive an email once shipped.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;