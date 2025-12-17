import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-rose-200 px-6 py-4 bg-white/80 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 transition-colors">
          Femine
        </Link>
        <div className="hidden md:flex gap-8 text-base font-medium text-gray-700">
          <Link to="/" className="hover:text-rose-500 transition-colors">Home</Link>
          <Link to="/products" className="hover:text-rose-500 transition-colors">Shop</Link>
          <Link to="#" className="hover:text-rose-500 transition-colors">Blog</Link>
          <Link to="#" className="hover:text-rose-500 transition-colors">Contact</Link>
        </div>
        <div className="flex items-center gap-4">
          {/* Search Icon */}
          <button className="p-2 hover:bg-rose-100 rounded-full transition-colors text-gray-600 hover:text-rose-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path>
            </svg>
          </button>

          {/* User Icon */}
          <button className="p-2 hover:bg-rose-100 rounded-full transition-colors text-gray-600 hover:text-rose-600">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          {/* Orders Icon */}
          <Link to="/orders" className="p-2 hover:bg-rose-100 rounded-full transition-colors text-gray-600 hover:text-rose-600 relative group" title="My Orders">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </Link>

          {/* Cart Icon */}
          <Link to="/cart" className="p-2 hover:bg-rose-100 rounded-full transition-colors text-gray-600 hover:text-rose-600 relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  )
}


export default Navbar;