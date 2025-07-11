import React, { useContext,useEffect,useRef,useState } from "react";
import Style from "./DisplayProducts.module.css";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContextProvider";
import toast from "react-hot-toast";
import { wishListContext } from "../../Context/WishListContextProvider";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import useFetchData from "../../Hooks/useFetchData";

export default function DisplayProducts() {
  let { addToCart } = useContext(cartContext);
  const {addToWishList,removeFromWishList} = useContext(wishListContext)
  const [likedProducts, setLikedProducts] = useState([]);
  const {data,isLoading,isError}=useFetchData("products","products")
  const [search, setSearch] = useState("")  
  
  async function addToCartStatus(id) {
    let flag = await addToCart(id);
    if (flag) {
      toast.success("Successfully added", {
        duration: 3500,
      });
    } else {
      toast.error("This process cannot be completed!", {
        duration: 3500,
      });
    }
  }

  async function toggleLike(productId) {
    const userId = localStorage.getItem("userId"); 
    let copy = structuredClone(likedProducts);
    let found = false;
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].id === productId) {
        copy[i].isLiked = !copy[i].isLiked;
        found = true;
        if (!copy[i].isLiked) {
        await removeFromWishList(productId);
      } else {
        await addToWishList(productId);
      }
      break;
    }
  }
  if (!found) {
    copy.push({ id: productId, isLiked: true });
    await addToWishList(productId);
    toast.success("Added to wishlist \u{1F496}");
  }
  setLikedProducts(copy);
  localStorage.setItem(`likedProducts_${userId}`, JSON.stringify(copy));
}
  useEffect(() => {
    const userId=localStorage.getItem("userId")
    console.log(userId);
    const saved=localStorage.getItem(`likedProducts_${userId}`)
    if(saved){
      setLikedProducts(JSON.parse(saved))
    }
  }, [])

  const filtered=data?.filter((p)=>
    p.title.toLowerCase().includes(search.toLowerCase().trim())
  )

if(isLoading){
  return <LoadingScreen/>
}
if(isError){
  return <div className='mt-9 p-6 text-center bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>No products found <i className="fa-regular fa-face-sad-tear ms-1"></i></div>
}

  return (
    <>
      <div className="container mt-32 mb-10">
      <input value={search} onChange={e=>setSearch(e.target.value)} type="text" placeholder="search..." class="focus:border-gray-200 focus:ring-gray-200 w-[92%] bg-gray-50/30 border border-gray-300 text-gray-900 text-sm rounded-lg block mx-auto p-2.5 dark:bg-gray-700 dark:border-gray-50 dark:placeholder-gray-400 dark:text-white"/>
        </div>
        
        <div className=" container grid gap-3.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {filtered?.map((product) => (
            <div
              key={product._id}
              className="group overflow-hidden shadow-sm relative cursor-pointer dark:bg-gray-600"
            >
              <Link
                to={`/ProductDetails/${product._id}/${product.category.name}`}
              >
                <img src={product.imageCover} alt={product.title} />
                <div className="card-body p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-green-600 dark:text-emerald-500">
                        {product.category.name}
                      </h3>
                      <h2 className="dark:text-gray-200">{product.title.split(" ", 2).join(" ")}</h2>
                    </div>
                  </div>
                  <div className="flex justify-between pt-3.5">
                    {product.priceAfterDiscount ? (
                      <>
                        <h3 className="text-red-400 line-through text-sm font-medium">
                          {product.price} EGP
                        </h3>
                        <h3 className="text-sm dark:text-gray-200">
                          {product.priceAfterDiscount} EGP
                        </h3>
                      </>
                    ) : (
                      <h3 className="text-md dark:text-gray-200">{product.price} EGP</h3>
                    )}
                    <span className="text-gray-400 dark:text-gray-300">
                      <i className="fa-solid fa-star text-amber-300 me-0.5"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </div>
                {product.priceAfterDiscount ? (
                  <span className="bg-red-100 absolute top-1 left-1 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300">
                    sale
                  </span>
                ) : null}
              </Link>
              <button
                onClick={() => {
                  addToCartStatus(product._id);
                }}
                type="button"
                className="text-green-700 hover:text-white border transition-all duration-300 md:group-hover:translate-y-0 cursor-pointer md:translate-y-[200%] border-green-600 hover:bg-green-600 font-medium rounded-lg text-sm py-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 w-[93%] mx-auto block "
              >
                <i className="fa-solid fa-cart-shopping me-2"></i>
                Add to cart
              </button>
              <i
                onClick={() => {
                  toggleLike(product._id);
                }
                }
                className={`fa-solid fa-heart cursor-pointer text-xl absolute bottom-24 right-3 transition-colors duration-100 ${
                  likedProducts.find(
                    (item) => item.id === product._id && item.isLiked
                  )
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              />
            </div>
          ))}
        </div>
    </>
  );
}
