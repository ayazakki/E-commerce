import Style from "./Categories.module.css";
import { Link, Outlet } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import useFetchData from "../../Hooks/useFetchData";

export default function Categories() {
  const {data,isLoading,isError}=useFetchData("categories","categories")
    if(isLoading){
      return <LoadingScreen/>
    }
    if(isError){
      return <div className="h-screen flex justify-center items-center">
        <div className='mt-20 w-full p-6 text-center bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>No products found <i className="fa-regular fa-face-sad-tear ms-1"></i></div>
      </div>
    }

return (
    <>
      <div className="container mt-14 pt-20">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {data?.map((category) => (
            <div
              key={category._id}
              className="max-w-sm hover:shadow-emerald-300 hover:scale-[1.01] transform  transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              <img
                className="rounded-t-lg h-48 w-full object-cover"
                src={category.image}
                alt={category.name}
              />
              <div className="p-5 text-center">
                <h1 className="mb-2 text-xl font-bold tracking-tight text-emerald-900 dark:text-white">
                  {category.name}
                </h1>
                <Link to={`/categories/subcategories/${category._id}/${category.name}`}>
                <button
                  type="button"
                  className="text-gray-600 py-0.5 cursor-pointer mt-2 hover:text-white border border-gray-500 hover:bg-gray-600 font-normal rounded-lg text-sm px-5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                >
                  More <i className="fa-solid fa-arrow-down fa-sm ms-1"></i>
                </button>
                </Link>
                
              </div>
            </div>
          ))}
        </div>
      </div>
      <Outlet/>
    </>
  );
}
