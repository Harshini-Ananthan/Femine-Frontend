import { Link } from "react-router"

const Header = ()=>{
    return (<header className="w-full bg-rose-200 p-4">
        <nav className="flex gap-6 justify-center items-center">
            <Link to="/" className="hover:text-pink-500">Home</Link>
            <Link to="/products" className="hover:text-pink-500">Products</Link>
            <Link to="/cart" className="hover:text-pink-500">Cart</Link>
            {/* <Link to="/about" className="hover:text-pink-500">About</Link> */}
            {/* <Link to="/contact" className="hover:text-pink-500">Contact</Link> */}
            {/* <Link to="/blog" className="hover:text-pink-500">Blogs</Link> */}
        </nav>
        </header>
    )
}
export default Header