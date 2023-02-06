import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

import logo from '../../assets/paper-bag.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import menuIcon from '../../assets/icon-menu.svg';
import closeIcon from '../../assets/icon-close.svg';

import { ShopContext } from '../../ClientCart/ClientCart';

const Navbar = () => {
  const [{ cart }] = useContext(ShopContext);
  const [quantity, setQuantity] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [drop, setDrop] = useState(false);

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

  const handleClick = () => {
    setClicked(!clicked);
  }

  const navigate = () => {
    setClicked(false);
  }

  const handleDrop = () => {
    setDrop(!drop);
  }

  return (
    <div className="navbar">
      <div className={ clicked ? "overlay active":"overlay"}></div>
      <div className="navbar-container">
        <div className="logo-container">
          <Link to="/" className="logo">
            <img src={logo} alt="logo" />
            <div className="logo-title">JJ-Shop<span className="logo-span">.</span></div>
          </Link>
        </div>
        <div className={ clicked ? "main-navigation active" : "main-navigation"}>
          <div className="tab dropdown" onClick={handleDrop}>
            <button className="menu-close-container" onClick={handleClick}>
              <img src={closeIcon} alt="" />
            </button>
            Categories<KeyboardArrowDownIcon className="arrow-down" />
            <div className={ drop ? "dropdown-content active" : "dropdown-content"}>
              <div><Link to="/products/collection/women" onClick={navigate}>Women</Link></div>
              <div><Link to="/products/collection/men" onClick={navigate}>Men</Link></div>
              <div><Link to="/products/collection/shoes" onClick={navigate}>Shoes</Link></div>
              <div><Link to="/products/collection/accessories" onClick={navigate}>Accessories</Link></div>
              <div><Link to="/products/all" onClick={navigate}>Shop All</Link></div>
            </div>
          </div>
          <div className="tab"><Link to="/products/collection/new-arrivals" onClick={navigate}>What's New</Link></div>
          <div className="tab"><Link to="/products/collection/sale" onClick={navigate}>Sale</Link></div>
        </div>
        <div className="personal-navigation">
          <button className="menu-icon-container">
            <img src={menuIcon} alt="" onClick={handleClick}/>
          </button>
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