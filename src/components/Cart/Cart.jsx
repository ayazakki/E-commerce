import React, { useContext, useEffect } from "react";
import Style from "./Cart.module.css";
import { cartContext } from "../../Context/CartContextProvider";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useFetchData from "../../Hooks/useFetchData";

export default function Cart() {
  let {
    getCart,
    removeItem,
    updateQuantityProduct,
    clearCart,
    products,
    numOfCart,
    totalPrice,
    isLoading,
  } = useContext(cartContext);
  let{data:allProducts}=useFetchData("products","products")
  
  

  useEffect(() => {
    getCart();
  }, []);
  async function removeItemFromCart(id) {
    let flag = await removeItem(id);
    if (flag) {
      toast.success("Item is deleted successfully");
    } else {
      toast.error("Something is wrong!");
    }
  }
  async function updateProduct(id, count) {
    let flag = await updateQuantityProduct(id, count);
    if (flag) {
      toast.success("Item is updated successfully");
    } else {
      toast.error("Something is wrong!");
    }
  }
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className={`container ${products?.length === 0 ?'h-screen':'h-auto'}  mt-14 pt-14`}>
          <div className="flex justify-between mb-5">
            <div className="text-center">
              <h2 className="text-gray-700">Number of Cart : {numOfCart} items</h2>
              <h2 className="text-gray-700 ">Total Price : {totalPrice} EGP</h2>
            </div>
            <button
              onClick={() => clearCart()}
              type="button"
              className="cursor-pointer text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              clear cart
            </button>
          </div>

          {products?.length > 0 ? <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="hidden md:block w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className=" px-6 py-3 w-[30%]">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3 w-[30%]">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {products?.map((product) => (
                    <tr
                      key={product.product._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4">
                        
                          <img
                          src={product.product.imageCover}
                          className="lg:w-[40%]"
                          alt={product.product.title}
                        />
                        
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.product.title.split(" ",2).join(" ")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              updateProduct(
                                product.product._id,
                                product.count - 1
                              )
                            }
                            className="cursor-pointer inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div>
                            <input
                              type="number"
                              id="first_product"
                              className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
                              placeholder={product.count}
                              required
                            />
                          </div>
                          <button
                            onClick={() =>
                              updateProduct(
                                product.product._id,
                                product.count + 1
                              )
                            }
                            className="cursor-pointer inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      {allProducts?.find((p)=>p._id === product.product._id) ?.priceAfterDiscount?<>
                <td>
                  <span className="line-through text-sm font-medium text-red-500 me-2.5">
                  {product.price} EGP
                </span>
                <span className="font-medium text-sm text-emerald-900 dark:text-emerald-500" >
                  {
                    allProducts.find((p) => p._id === product.product._id).priceAfterDiscount
                  } EGP
                </span>
                </td>
                </>:<td className="text-center"><span className="text-sm font-medium text-emerald-900 dark:text-emerald-500">{product.price} EGP</span></td>}
                      <td className="px-6 py-4">
                        <span
                          onClick={() =>
                            removeItemFromCart(product.product._id)
                          }
                          className="mx-auto block my-4 hover:text-white border border-red-600 hover:bg-red-600 rounded-lg text-sm px-4 py-1 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 cursor-pointer font-medium text-red-600"
                        >
                          Remove 
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid sm:grid-cols-2 gap-5 md:hidden">
              {products?.map((product)=><div key={product.product._id} className="shadow-sm">
                <img src={product.product.imageCover} alt={product.product.title} />
                <div className="card-body px-2.5">
                <h2 className="font-medium text-center mt-3 text-gray-700 mb-3">{product.product.title.split(" ", 2).join(" ")}</h2>
                <div className="text-center">
                  {allProducts?.find((p)=>p._id === product.product._id) ?.priceAfterDiscount?<>
                <span className="line-through text-sm font-medium text-red-500 me-2.5">
                  {product.price} EGP
                </span>
                <span className="font-medium text-emerald-900" >
                  {
                    allProducts.find((p) => p._id === product.product._id).priceAfterDiscount
                  } EGP
                </span>
                </>:<span className="font-medium text-emerald-900">{product.price} EGP</span>}
                </div>
                  <div className="flex items-center justify-center mt-3">
                          <button
                            onClick={() =>
                              updateProduct(
                                product.product._id,
                                product.count - 1
                              )
                            }
                            className="cursor-pointer inline-flex items-center justify-center p-1 me-3 text-sm font-medium md:h-6 md:w-6 h-5 w-5 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div>
                            <input
                              type="number"
                              id="first_product"
                              className="bg-gray-50 w-14 h-6 md:h-0 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
                              placeholder={product.count}
                              required
                            />
                          </div>
                          <button
                            onClick={() =>
                              updateProduct(
                                product.product._id,
                                product.count + 1
                              )
                            }
                            className="cursor-pointer inline-flex items-center justify-center h-5 w-5 md:h-6 md:w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                </div>
                <button
                          onClick={() =>
                            removeItemFromCart(product.product._id)
                          }
                          className="mx-auto block my-4 hover:text-white border border-red-600 hover:bg-red-600 rounded-lg text-sm px-4 py-1 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 cursor-pointer font-medium text-red-600"
                        >
                          Remove <i className="fa-solid fa-trash fa-xs"></i>
                </button>
                
                </div>
              </div>)}
            </div>
            <Link to={"/Payment"}>
              <button type="button" className="text-green-600 hover:text-white border border-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-600 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 cursor-pointer mt-10  ">Payment <i class="fa-solid fa-cart-shopping"></i></button>
              </Link>
          </> : (
            <div className="text-center shadow-sm rounded-lg p-4 mt-10">Your cart is empty <i className="fa-solid fa-heart-crack text-red-600 ms-2"></i></div>
          )}
        </div>
      )}
    </>
  );
}
