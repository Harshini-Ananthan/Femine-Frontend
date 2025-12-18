import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
const ProductList = () => {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://femine-backend.onrender.com/products")
            const json = await response.json()

            setProducts(json)
        }
        fetchData()
    }, [])

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-rose-500 pl-3">Featured Collection</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <ProductCard
                        key={product._id}
                        id={product._id}
                        name={product.name}
                        originalPrice={product.originalPrice}
                        sellingPrice={product.sellingPrice}
                        image={product.image}
                    />
                ))}
            </div>
        </div>
    )
}
export default ProductList;