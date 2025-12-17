const Footer = () => {
  return (
  <footer className="border-t bg-rose-100">
    <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
      <div>
        <h4 className="font-bold text-lg text-pink-600">Femine</h4>
        <p className="text-gray-500 text-sm mt-2">© 2025 Femine</p>
      </div>
      
      <div>
        <h5 className="font-semibold mb-2">About</h5>
        <ul className="text-gray-600 text-sm space-y-1">
          <li>About us</li>
          <li>Store location</li>
          <li>Contact</li>
        </ul>
      </div>
      
      <div>
        <h5 className="font-semibold mb-2">Help</h5>
        <ul className="text-gray-600 text-sm space-y-1">
          <li>Support</li>
          <li>Shipping</li>
          <li>FAQs</li>
        </ul>
      </div>
      
      <div>
        <h5 className="font-semibold mb-2">Newsletter</h5>
        <form className="flex">
          <input type="email" placeholder="Email" className="border px-3 py-2 rounded-l flex-1" />
          <button className="bg-pink-600 text-white px-4 py-2 rounded-r hover:bg-pink-700">
            Join
          </button>
        </form>
      </div>
    </div>
  </footer>
)}

export default Footer;