import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Cart from './components/Cart/Cart'
import Products from './components/Products/Products'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import NotFoundPage from './components/NotFoundPage/NotFoundPage'
import AuthContextProvider from './Context/AuthContextProvider'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import CartContextProvider from './Context/CartContextProvider'
import { Toaster } from 'react-hot-toast'
import Payment from './components/Payment/Payment'
import AllOrders from './components/AllOrders/AllOrders'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import VerifyResetCode from './components/VerifyCode/VerifyResetCode'
import ResetPassword from './components/ResetPassword/ResetPassword'
import WishList from './components/WishList/WishList'
import WishListContextProvider from './Context/WishListContextProvider'
import SubCategories from './components/SubCategories/SubCategories'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
let queryClient=new QueryClient()
function App() {
  const router=createBrowserRouter([
    {path:"",element:<Layout/>,children:[
      {path:"",element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:"Register",element:<Register/>},
      {path:"Login",element:<Login/>},
      {path:"ForgetPassword",element:<ForgetPassword/>},
      {path:"VerifyResetCode",element:<VerifyResetCode/>},
      {path:"ResetPassword",element:<ResetPassword/>},
      {path:"Cart",element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:"WishList",element:<ProtectedRoute><WishList/></ProtectedRoute>},
      {path:"Payment",element:<ProtectedRoute><Payment/></ProtectedRoute>},
      {path:"AllOrders",element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
      {path:"Products",element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:"ProductDetails/:id/:category",element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:"Categories",element:<ProtectedRoute><Categories/></ProtectedRoute>,children:[
        {path:"subcategories/:categoryId/:categoryName",element:<ProtectedRoute><SubCategories/></ProtectedRoute>},
      ]},
      {path:"Brands",element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:"*",element:<NotFoundPage/>},
    ]}
  ])
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthContextProvider>
        <CartContextProvider>
          <WishListContextProvider>
          <RouterProvider router={router} />
          <Toaster/>
          </WishListContextProvider>
          </CartContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
    
    </>
  )
}

export default App
