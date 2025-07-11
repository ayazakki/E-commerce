import React, { useContext, useEffect } from "react";
import Style from "./Navbar.module.css";
import Logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContextProvider";
import { cartContext } from "../../Context/CartContextProvider";
export default function Navbar() {
  const { token, setToken } = useContext(authContext);
  let { numOfCart, getCart } = useContext(cartContext);
  useEffect(() => {
    getCart();
  }, []);

  let navigate = useNavigate();
  function logout() {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      <nav className="z-50 py-4 bg-gray-100 border-gray-200 dark:bg-gray-900 fixed top-0 w-full">
        <div className=" flex items-center mx-auto w-[92%]">
          <Link to="">
            <img src={Logo} />
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="cursor-pointer ms-auto inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
              className="py-1.5 absolute top-full left-0 w-full bg-gray-100 dark:bg-gray-900 transition-all duration-500 ease-in-out overflow-hidden hidden md:flex md:relative "
              id="navbar-default"
            >
          {token ? (
              <ul className="flex flex-col md:flex-row gap-3.5 ms-7 text-center items-center">
                <li>
                  <Link to="" className=" text-gray-500 dark:text-gray-50 dark:hover:text-gray-300 hover:text-gray-800">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="Cart" className="text-gray-500 dark:text-gray-50 dark:hover:text-gray-300 hover:text-gray-800">
                    Cart
                  </Link>
                </li>
                <li>
                  <Link to="WishList" className="text-gray-500 dark:text-gray-50 dark:hover:text-gray-300 hover:text-gray-800">
                    Wish List
                  </Link>
                </li>
                <li>
                  <Link to="Products" className="text-gray-500 dark:text-gray-50 dark:hover:text-gray-300 hover:text-gray-800">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="Categories" className="text-gray-500 dark:text-gray-50 dark:hover:text-gray-300 hover:text-gray-800">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="Brands" className="text-gray-500 dark:text-gray-50 dark:hover:text-gray-300 hover:text-gray-800">
                    Brands
                  </Link>
                </li>
              </ul>
          ) : null}
          <div className="flex ms-auto items-center">
            <ul className="hidden lg:flex gap-3.5 ms-auto me-4 ">
            <li>
              <i className="fab fa-instagram cursor-pointer dark:text-gray-50 dark:hover:text-gray-300 hover:text-gray-500 transition-colors duration-200"></i>
            </li>
            <li>
              <i className="fab fa-facebook cursor-pointer dark:text-gray-50 dark:hover:text-gray-300 hover:text-gray-500 transition-colors duration-200"></i>
            </li>
            <li>
              <i className="fab fa-tiktok cursor-pointer dark:text-gray-50 dark:hover:text-gray-300 hover:text-gray-500 transition-colors duration-200"></i>
            </li>
            <li>
              <i className="fab fa-twitter cursor-pointer dark:text-gray-50 dark:hover:text-gray-300 hover:text-gray-500 transition-colors duration-200"></i>
            </li>
            <li>
              <i className="fab fa-linkedin cursor-pointer dark:text-gray-50 dark:hover:text-gray-300 hover:text-gray-500 transition-colors duration-200"></i>
            </li>
            <li>
              <i className="fab fa-youtube cursor-pointer dark:text-gray-50 dark:hover:text-gray-300 hover:text-gray-500 transition-colors duration-200"></i>
            </li>
            
          </ul>
          {token ? (
              <>
                <ul className="mx-auto md:ms-auto lg:ms-0 mt-5 md:mt-0 pb-3  md:pb-0">
                  <Link to={"Cart"}>
                  <button
                    type="button"
                    className="ms-9 md:ms-0 mb-3 md:mb-0 cursor-pointer me-2 relative block md:inline-flex items-center font-medium text-center text-gray-700 rounded-lg "
                  >
                    <i className="fa-solid fa-cart-shopping fa-lg  dark:text-gray-50 dark:hover:text-gray-300"></i>
                    <span className="sr-only">Notifications</span>
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-emerald-600 border-2 border-white rounded-full -top-4.5 -end-4.5 dark:border-gray-900">
                      {numOfCart||0}
                    </div>
                  </button>
                  </Link>
                  <span
                    onClick={() => {
                      logout();
                    }}
                    className="ps-3 md:ps-0 text-red-700 dark:text-red-500 cursor-pointer md:ms-4.5"
                  >
                    Logout
                    <i className="ms-2 fa-solid fa-arrow-right-from-bracket"></i>
                  </span>
                </ul>
              </>
            ) : (
              <>
                <div className="ms-auto lg:ms-0">
                  <span>
                  <Link to="Login" className="dark:text-gray-50 dark:hover:text-gray-300 text-gray-500 me-4 hover:text-gray-600 transition-colors duration-200">
                    Login
                  </Link>
                </span>
                <span>
                  <Link to="Register" className="dark:text-gray-50 dark:hover:text-gray-300 text-gray-500 hover:text-gray-600 transition-colors duration-200">
                    Register
                  </Link>
                </span>
                </div>
              </>
            )}
          </div>
          </div>
        </div>
      </nav>
    </>
  );
}
