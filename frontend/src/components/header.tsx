import { Link } from "react-router-dom";
import { User } from "lucide-react";
import Logo from "../constants/logo";
import navItems from "../constants/nav_items";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logOut, useCurrentUser } from "../redux/features/auth/auth.slice";
import Cart from "./cart";
import { useGetMyProfileQuery } from "../redux/features/user/user.api";
import UserRole from "../constants/user_role";
import { decrypt } from "../utils/text_encryption";
import Headroom from "react-headroom";

export default function Header() {
  const user = useAppSelector(useCurrentUser);
  const { data: profile } = useGetMyProfileQuery({}, { skip: !user });
  const dispatch = useAppDispatch();

  return (
    <Headroom className="z-[100000]">
      <header className="bg-white shadow-sm ">
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
                      alt="Profile Picture"
                      src={
                        decrypt(user.role) === UserRole.vendor
                          ? profile?.logo
                          : profile?.img
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/profile" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  {decrypt(user.role) !== UserRole.customer ? (
                    <li>
                      <Link
                        to={`/dashboard/${decrypt(user.role).toLowerCase()}`}
                      >
                        Dashboard
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link to="/orders" className="justify-between">
                        My Orders
                      </Link>
                    </li>
                  )}
                  <li>
                    <a onClick={() => dispatch(logOut())}>Logout</a>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="text-gray-600 hover:text-primary"
              >
                <User className="h-6 w-6" />
              </Link>
            )}
          </div>
        </div>
      </header>
    </Headroom>
  );
}
