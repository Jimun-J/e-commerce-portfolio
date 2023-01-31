import React from 'react'
import './Home.css'

import Banner from './Banner/Banner'
import Categories from './Categories/Categories'

const Home = () => {
  return (
    <div className="home">
      <Banner />
      <Categories />
    </div>
  )
}

export default Home