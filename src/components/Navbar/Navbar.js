import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

import logo from '../../assets/paper-bag.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
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
              <div><Link to="/products/women">Women</Link></div>
              <div><Link to="/products/men">Men</Link></div>
              <div><Link to="/products/shoes">Shoes</Link></div>
              <div><Link to="/products/accessories">Accessories</Link></div>
              <div><Link to="/products/all">Shop All</Link></div>
            </div>
          </div>
          <div className="tab"><Link to="/products/new-arrivals">What's New</Link></div>
          <div className="tab"><Link to="/products/sale">Sale</Link></div>
        </div>
        <div className="personal-navigation">
          <div className="search">
            <input type="text" placeholder="Search Product" />
            <SearchIcon className="search-icon icon" />
          </div>
          <div className="cart">
            <ShoppingCartIcon className="cart-icon icon" />
            <span className="item-added-badge">0</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar