import { Link } from "react-router-dom";
import { User } from "lucide-react";
import Logo from "../constants/logo";
import navItems from "../constants/nav_items";
import { useAppSelector } from "../redux/hooks";
import { useCurrentUser } from "../redux/features/auth/auth.slice";
import Cart from "./cart";

export default function Header() {
  const user = useAppSelector(useCurrentUser);

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
          {/* cart */}

          <Cart />
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/auth/login" className="text-gray-600 hover:text-primary">
              <User className="h-6 w-6" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
