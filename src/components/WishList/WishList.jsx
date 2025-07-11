import React, { useContext, useEffect } from 'react'
import Style from "./WishList.module.css"
import { wishListContext } from '../../Context/WishListContextProvider'
import { cartContext } from '../../Context/CartContextProvider';
import toast from 'react-hot-toast';
import useFetchData from '../../Hooks/useFetchData';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function WishList() {
  const { addToCart } = useContext(cartContext);
  let{data:allProducts}=useFetchData("products","products")
  const {getWishList,products,removeFromWishList,isLoading} = useContext(wishListContext)
  
  useEffect(() => {
    getWishList()
  
  }, [])
  async function addToCartStatus(id) {
    let flag = await addToCart(id);
    if (flag) {
      toast.success("Successfully added", {
        duration: 5000,
      });
    } else {
      toast.error("This process cannot be completed!", {
        duration: 5000,
      });
    }
    handleRemove(id)
  }
  async function handleRemove(productId){
    let flag = await removeFromWishList(productId);
    if (flag) {
      toast.success("Item is deleted successfully");
      getWishList()
    } else {
      toast.error("Something is wrong!");
    }
  }
  
  if(isLoading){
    return <LoadingScreen/>
  }
  return <>
<div className={`container ${products?.length=== 0 ?'h-screen':'h-auto'} mt-20 pt-12 `}>
  {products?.length>0?<>
  <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
    <table className="hidden md:block w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 w-[30%]">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3 w-[40%]">
              Product
            </th>
            <th scope="col" className="px-6 py-3 w-[40%]">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {products?.map((product)=><tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="p-4">
              <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
            </td>
            <td className="text-left px-6 py-4 font-semibold text-gray-900 dark:text-white">
              <h1 className='mb-2'>
                {product.title}
              </h1>
              <h2 className='mb-2 text-gray-500'>
                {product.brand.name}
              </h2>
              <span onClick={()=>handleRemove(product._id)} className="cursor-pointer text-sm text-red-600 dark:text-red-500">Remove <i className="fa-solid fa-trash fa-sm"></i></span>
            </td>
            {allProducts?.find((p)=>p._id === product._id) ?.priceAfterDiscount?<>
                <td>
                  <span className="line-through text-sm font-medium text-red-500 me-2.5">
                  {product.price} EGP
                </span>
                <span className="font-medium text-sm text-emerald-900 dark:text-emerald-500" >
                  {
                    allProducts.find((p) => p._id === product._id).priceAfterDiscount
                  } EGP
                </span>
                </td>
                </>:<td className="text-center"><span className="text-sm font-medium text-emerald-900 dark:text-emerald-500">{product.price} EGP</span></td>}
            <td className="px-6 py-4">
              <button onClick={()=>addToCartStatus(product._id)} class=" cursor-pointer relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-700 hover:text-gray-600 rounded-lg group bg-gradient-to-br from-teal-500 to-lime-100 group-hover:from-teal-500 group-hover:to-lime-100 dark:text-white dark:hover:text-gray-900">
    <span className="relative w-32  py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
      <i className="fa-solid fa-cart-shopping me-2"></i>
    Add to cart
    </span>
    </button>
            </td>
          </tr>)}
          
        </tbody>
    </table> 
  </div>
  
  <div className="grid sm:grid-cols-2 gap-5 md:hidden">
              {products?.map((product)=><div key={product._id} className="shadow-sm">
                <img src={product.imageCover} alt={product.title} />
                <div className="card-body px-2.5">
                <h2 className="font-medium text-center mt-3 text-gray-700 mb-3">{product.title.split(" ", 2).join(" ")}</h2>
                <div className="text-center">
                  {allProducts?.find((p)=>p._id === product._id) ?.priceAfterDiscount?<>
                <span className="line-through text-sm font-medium text-red-500 me-2.5">
                  {product.price} EGP
                </span>
                <span className="font-medium text-emerald-900" >
                  {
                    allProducts.find((p) => p._id === product._id).priceAfterDiscount
                  } EGP
                </span>
                </>:<span className="font-medium text-emerald-900">{product.price} EGP</span>}
                </div>
                <div className="flex">
                  <button
                          onClick={() =>
                            handleRemove(product._id)
                          }
                          className="mx-auto block my-4 hover:text-white border border-red-600 hover:bg-red-600 rounded-lg text-sm px-4 py-1 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 cursor-pointer font-medium text-red-600"
                        >
                          Remove <i className="fa-solid fa-trash fa-xs"></i>
                </button>
                <button
                          onClick={() =>
                            addToCartStatus(product._id)
                          }
                          className="mx-auto block my-4 hover:text-white border border-emerald-600 hover:bg-emerald-600 rounded-lg text-sm px-4 py-1 text-center dark:border-emerald-500 dark:text-emerald-500 dark:hover:text-white dark:hover:bg-emerald-600 cursor-pointer font-medium text-emerald-600"
                        >
                          Add to cart <i className="fa-solid fa-cart-shopping me-2"></i>
                </button>
                </div>
                </div>
              </div>)}
  </div>
  </>
  :<div className="text-center shadow-sm rounded-lg p-4 mt-10">no items in wishlist <i className="fa-solid fa-heart-crack text-red-600 ms-2"></i></div>}
</div>


  </>
  
}
