import { NavLink } from "react-router-dom";
import { useAuth } from "../hook/auth";
import { URL } from "../config/routes";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4  py-2.5 border-b fixed top-0 z-20 w-full  ">
        <div className="flex flex-wrap justify-between items-center mx-auto">
          <NavLink to={URL.HOMEPAGE} className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="main Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              Medical Case
            </span>
          </NavLink>
          <div className="flex items-center lg:order-2">
            {isAuthenticated && (
              <button
                className="text-white bg-blue-700 hover:bg-blue-800   focus:ring-0 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 "
                onClick={logout}
              >
                Logout
              </button>
            )}
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          ></div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
