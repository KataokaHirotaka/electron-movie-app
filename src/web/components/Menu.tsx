import React from 'react'
import { Link } from 'react-router-dom';
import './style/Menu.css';

function Menu() {
  return (
    <div className="nav-wrapper">
      <nav className="nav">
        <li className="nav-list">
          <Link to={'/'}>Home</Link>
        </li>
        <li className="nav-list">
          <Link to={'/search'}>Search</Link>
        </li>
      </nav>
    </div>
  )
}

export default Menu
