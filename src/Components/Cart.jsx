import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const Cart = () => {

  const [items, setItems] = useState([]);

  const fetchCart = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return;
      const response = await axios.get("http://localhost:3000/cart", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setItems(response.data);
    } catch (err) {
      console.error("Error fetching cart", err);
    }
  }

  useEffect(() => {
    fetchCart();
  }, [])

  // Calculate totals - ensure number format
  const subtotal = items.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const discount = items.reduce((sum, item) => sum + ((item.originalPrice - item.sellingPrice) * item.quantity), 0);
  const total = items.reduce((sum, item) => sum + (item.sellingPrice * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="bg-rose-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-rose-600 transition-colors shadow-lg hover:shadow-xl">
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart <span className="text-lg font-normal text-gray-500 ml-2">({items.length} items)</span></h2>

      <div className="grid lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-6">
          {items.map((item, idx) => (
            <div key={idx} className="flex gap-6 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <img src={item.image} className="w-32 h-32 object-cover rounded-xl" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{item.id}</p> {/* Placeholder for variant features like Size/Color */}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-4 bg-gray-50 rounded-lg px-3 py-1 border border-gray-200">
                      <span className="text-sm font-medium text-gray-500">Qty:</span>
                      <span className="font-bold text-gray-800">{item.quantity}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">₹{item.sellingPrice}</div>
                    <div className="text-sm text-gray-400 line-through">₹{item.originalPrice}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h3 className="text-xl font-bold mb-6 text-gray-800">Order Summary</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-green-600 font-medium">
                <span>Discount</span>
                <span>- ₹{discount}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping Estimate</span>
                <span>Free</span>
              </div>
              <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1 text-right">Including GST</p>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-rose-600 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all active:scale-95">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;