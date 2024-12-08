import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import Logo from "../constants/logo";
import navItems from "../constants/nav_items";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link to={item.link}>{item.name}</Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="text-gray-600 hover:text-primary">
            <ShoppingCart className="h-6 w-6" />
          </Link>
          <Link to="/auth/login" className="text-gray-600 hover:text-primary">
            <User className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </header>
  );
}
