import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import Notification from './components/Notification/Notification';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Product from './components/Product/Product'
import ProductList from './components/ProductList/ProductList';
import ProductListAll from './components/ProductList/ProductListAll';
import Cart from './components/Cart/Cart';

const Layout = () => {
  return (
    <div className="app">
      <Notification />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/products/collection/:id",
        element: <ProductList />
      },
      {
        path: "/products/all",
        element: <ProductListAll />
      },
      {
        path: "/product/:id",
        element: <Product />
      },
      {
        path: "/cart",
        element: <Cart />
      }
    ]
  }
])



function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
