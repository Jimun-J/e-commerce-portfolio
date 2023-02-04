import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

import logo from '../../assets/paper-bag.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { ShopContext } from '../../client/Client';

const Navbar = () => {
  const [{ cart }] = useContext(ShopContext);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (Object.keys(cart).length !== 0) {
      let totalItem = 0;
      if (cart.lineItems.length !== 0) {
        cart.lineItems.forEach((item) => {
          totalItem += item.quantity;
        })
      }
      setQuantity(totalItem);
    }
  }, [cart]);

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <Link to="/" className="logo">
            <img src={logo} alt="logo" />
            <div className="logo-title">JJ-Shop<span className="logo-span">.</span></div>
          </Link>
        </div>
        <div className="main-navigation">
          <div className="tab dropdown">
            Categories<KeyboardArrowDownIcon />
            <div className="dropdown-content">
              <div><Link to="/products/collection/women">Women</Link></div>
              <div><Link to="/products/collection/men">Men</Link></div>
              <div><Link to="/products/collection/shoes">Shoes</Link></div>
              <div><Link to="/products/collection/accessories">Accessories</Link></div>
              <div><Link to="/products/all">Shop All</Link></div>
            </div>
          </div>
          <div className="tab"><Link to="/products/collection/new-arrivals">What's New</Link></div>
          <div className="tab"><Link to="/products/collection/sale">Sale</Link></div>
        </div>
        <div className="personal-navigation">
          <div className="search">
            <input type="text" placeholder="Search Product" />
            <SearchIcon className="search-icon icon" />
          </div>
          <Link to="/cart" className="cart-icon-container">
            <ShoppingCartIcon className="cart-icon icon" />
            <span className="item-added-badge">{quantity}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar