import { Link, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const ProductCard = (props) => {
    const { name, sellingPrice, originalPrice, image, id } = props
    const navigate = useNavigate();
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

    const addToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                toast.error("Please login to add to cart");
                return;
            }
            await axios.post("http://localhost:3000/cart",
                { productId: id, quantity: 1 },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Added to cart");
        } catch (err) {
            console.error(err);
            toast.error("Failed to add to cart");
        }
    }

    const orderNow = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                toast.error("Please login to place an order");
                return;
            }
            await axios.post("http://localhost:3000/orders",
                { productId: id, quantity: 1 },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Order Placed Successfully!");
            navigate("/orders");
        } catch (err) {
            console.error(err);
            toast.error("Failed to place order");
        }
    }

    return (
        <div className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full border border-gray-100">
            <Link to={`/products/${id}`} className="block relative overflow-hidden aspect-[4/5] w-full">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                {originalPrice > sellingPrice && (
                    <span className="absolute top-2 right-2 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md z-10">
                        {Math.round(((originalPrice - sellingPrice) / originalPrice) * 100)}% OFF
                    </span>
                )}
            </Link>

            <div className="p-4 flex flex-col flex-1">
                <Link to={`/products/${id}`}>
                    <h1 className="text-gray-800 font-semibold text-lg hover:text-rose-600 transition-colors mb-2 line-clamp-1">{name}</h1>
                </Link>

                <div className="flex items-end gap-2 mb-4">
                    <span className="text-xl font-bold text-gray-900">₹{sellingPrice}</span>
                    <span className="text-sm text-gray-400 line-through mb-1">₹{originalPrice}</span>
                </div>

                <div className="mt-auto flex flex-col gap-2">
                    {isLoggedIn ? (
                        <div className="flex gap-2">
                            <button
                                onClick={addToCart}
                                className="flex-1 bg-white border border-rose-500 text-rose-500 px-3 py-2 rounded-lg text-sm font-medium hover:bg-rose-50 transition-colors active:scale-95"
                            >
                                Add Cart
                            </button>
                            <button
                                onClick={orderNow}
                                className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:from-rose-600 hover:to-pink-700 shadow-md hover:shadow-lg transition-all active:scale-95"
                            >
                                Order Now
                            </button>
                        </div>
                    ) : (
                        <p className="text-xs text-center text-gray-400 italic mt-2">Login to purchase</p>
                    )}
                </div>
            </div>
        </div>
    )
}
export default ProductCard;