import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router"
import App from "./App"
import ProductList from "./Components/ProductList"
import ProductDetails from "./Components/ProductDetails"
import LoginForm from "./Components/LoginForm.jsx"

import Cart from "./Components/Cart"
import HomeLayout from './layouts/HomeLayout.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'
import OrderPage from './Components/OrderPage.jsx'
import AdminPage from './Components/AdminPage.jsx'
import {ToastContainer} from "react-toastify"
import PrivateRoute from './Components/PrivateRoute.jsx'

const products = [
        {
            id: 1,
            name : "Product 1",
            price : 100,
            image : "https://picsum.photos/id/1/200/300"
        },
        {
            id: 2,
            name : "Product 2",
            price : 200,
            image : "https://picsum.photos/id/26/200/300"
        },
        {
            id: 3,
            name : "Product 3",
            price : 300,
            image : "https://picsum.photos/id/27/200/300"
        },
        
    ]

createRoot(document.getElementById('root')).render(
    <>
    <ToastContainer/>
    <BrowserRouter>
        <Routes>
            <Route element={<HomeLayout/>}>
                <Route path="/" element={<App />}/>
                <Route path="/products">
                    <Route index element = {<ProductList products={products}/>}/>
                    <Route path = ":id" element ={<ProductDetails/>}/>
                
                </Route>
            
                 {/* <Route path="/about" element={<About/>} /> */}
                <Route path="/cart" element={<Cart/>}/> 
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/orders" element={<ProtectedRoute><OrderPage/></ProtectedRoute>}/>
            </Route>
            <Route path="/admin" element= {<PrivateRoute><AdminPage /></PrivateRoute>} />
        </Routes>
    </BrowserRouter>
    </>
)