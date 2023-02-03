import React from 'react'
import './Footer.css'
import image from '../../assets/image14.png'

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer">

        <div className="left">
          <div className="logo">JJ-Store</div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Interdum velit euismod in pellentesque massa placerat duis ultricies
          </p>
          <img src={image} alt="payment-method" />
        </div>

        <div className="right">
          <div className="footer-item">
            <h1>Departments</h1>
            <div className="item">Women</div>
            <div className="item">Men</div>
            <div className="item">Shoes</div>
            <div className="item">Accessories</div>
            <div className="item">New Arrivals</div>
          </div>
          <div className="footer-item">
            <h1>Links</h1>
            <div className="item">FAQ</div>
            <div className="item">Shipping & Delivery</div>
            <div className="item">Order Pickup</div>
            <div className="item">Account Signup</div>
            <div className="item">Contact us</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer