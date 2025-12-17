import ProductList from './Components/ProductList';
import Cart from './Components/Cart';
import ProductForm from "./Components/ProductForm";

import { useState } from 'react';
import LoginForm from './Components/LoginForm';



const App = () => {

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 100,
      image: "https://picsum.photos/id/1/200/300"
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
      image: "https://picsum.photos/id/26/200/300"
    },
    {
      id: 3,
      name: "Product 3",
      price: 300,
      image: "https://picsum.photos/id/27/200/300"
    },

  ])


  const addProduct = (name, price, image) => {
    const newProduct = { name, price, image };
    setProducts([...products, newProduct])
  };

  return (
    <>
      <ProductList products={products} />
      {/* <AdminPage ></AdminPage> */}
    </>
  )
}

export default App;