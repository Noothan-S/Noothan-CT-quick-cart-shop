import { Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import Logo from '../constants/logo';

export default function Header() {
    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Logo />
                <nav className="hidden md:flex space-x-8">
                    <Link to="/" className="text-gray-600 hover:text-primary">Home</Link>
                    <Link to="/categories" className="text-gray-600 hover:text-primary">Categories</Link>
                    <Link to="/vendors" className="text-gray-600 hover:text-primary">Vendors</Link>
                    <Link to="/about" className="text-gray-600 hover:text-primary">About</Link>
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
