import './App.css'
import { createHashRouter, RouterProvider } from 'react-router-dom'
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

function App() {
  const router=createHashRouter([
    {path:"",element:<Layout/>,children:[
      {path:"",element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:"Register",element:<Register/>},
      {path:"Login",element:<Login/>},
      {path:"Cart",element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:"Products",element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:"ProductDetails/:id/:category",element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:"Categories",element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:"Brands",element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:"*",element:<NotFoundPage/>},
    ]}
  ])
  return (
    <>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
    </>
  )
}

export default App
