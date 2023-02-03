import React from 'react'
import './Home.css'

import Banner from './Banner/Banner'
import FeaturedProducts from './FeaturedProducts/FeaturedProducts'
import Blog from './Blog/Blog'
import Categories from './Categories/Categories'

const Home = () => {
  return (
    <div className="home">
      <Banner />
      <Categories />
      <FeaturedProducts />
      <Blog />
    </div>
  )
}

export default Home