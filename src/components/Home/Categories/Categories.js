import React from 'react'
import { Link } from 'react-router-dom'
import './Categories.css'

import EastIcon from '@mui/icons-material/East';

const Categories = () => {
  return (
    <div className="categories">
        <div className="categories-title">
            <div className="categories-text-wrap">Discover our styles.</div>
            <Link to="/">View More<span class="categories-arrow"><EastIcon /></span></Link>
        </div>
        <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
  )
}

export default Categories