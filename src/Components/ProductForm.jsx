import { useState } from "react";

const ProductForm = () => {

    const [username, setUsername] = useState('');
    const handleNameChange = (e) => {
        setUsername(e.target.value);
    }
    console.log(username)

    const [price, setPrice] = useState('');
    const handlePrice = (e) => {
        setPrice(e.target.value)
    }
    console.log(price)

    const [url, setUrl] = useState('');
    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    }
    console.log(url)

    const [originalPrice, setOriginalPrice] = useState('');
    const handleOriginalPriceChange = (e) => {
        setOriginalPrice(e.target.value);
    }
    console.log(originalPrice)

    const [category, setCategory] = useState('');
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username, price, url);

        const generateUniqueId = () => {
            return `product_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        };

        const productData = {
            id: generateUniqueId(),
            name: username,
            sellingPrice: price,
            price: originalPrice,
            image: url,
        };

        console.log("Submitting product:", productData);

        try {
            const response = await fetch('https://femine-backend.onrender.com/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData)
            });

            const result = await response.json();

            if (response.ok) {
                console.log("Product added successfully!");
                // Reset form
                setUsername('');
                setPrice('');
                setUrl('');
                setOriginalPrice('');
                setCategory('');
            } else {
                console.log(`Error: ${result.error || 'Failed to add product'}`);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    }

    return (
        <div className="bg-rose-100 p-5">

            <form className="w-[500px] mx-auto bg-rose-200 px-14 py-4   flex flex-col justify-center item-center gap-4 shadow-xl rounded-lg">
                <h1 className="text-lg font-semibold text-center ">Add Products</h1>
                <label>Name</label>
                <input
                    type="text"
                    placeholder="Name"
                    value={username}
                    onChange={handleNameChange}
                    className="border-2 rounded-md p-2 hover:border-pink-400"></input>

                <label>Image URL</label>
                <input
                    type="text"
                    placeholder="URL"
                    value={url}
                    onChange={handleUrlChange}
                    className="border-2 rounded-md p-2 hover:border-pink-400"></input>

                <label>Selling Price</label>
                <input
                    type="text"
                    placeholder="Selling Price"
                    value={price}
                    onChange={handlePrice}
                    className="border-2 rounded-md p-2 hover:border-pink-400"></input>

                <label>Original Price</label>
                <input
                    type="text"
                    placeholder="Original Price"
                    value={originalPrice}
                    onChange={handleOriginalPriceChange}
                    className="border-2 rounded-md p-2 hover:border-pink-400"></input>

                <label>Category</label>
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={handleCategoryChange}
                    className="border-2 rounded-md p-2 hover:border-pink-400"></input>

                <button type="submit"
                    className="bg-pink-300 rounded-md  py-1 hover:bg-pink-400 "
                    onClick={handleSubmit}
                >Add
                </button>

            </form>
        </div>
    )
}
export default ProductForm;