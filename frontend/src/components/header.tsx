import { Link } from "react-router-dom";
import { User } from "lucide-react";
import Logo from "../constants/logo";
import navItems from "../constants/nav_items";
import { Button } from "antd";
import { useAppSelector } from "../redux/hooks";
import { useCurrentUser } from "../redux/features/auth/auth.slice";

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
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge text-red-500 badge-sm indicator-item">
                  8
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact rounded-lg dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">8 Items</span>
                <span className="">Subtotal: $999</span>
                <div className="card-actions">
                  <Button
                    color="danger"
                    size="middle"
                    className="w-full"
                    variant="solid"
                  >
                    View cart
                  </Button>
                </div>
              </div>
            </div>
          </div>

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
