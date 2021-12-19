import React from 'react'
import { Link } from 'react-router-dom';
import './style/Menu.css';

function Menu() {
  return (
    <div className="nav-wrapper">
      <nav className='nav'>
        <li
          className={`nav-list home-link`}
          onClick={() => {
            const root = document.getElementById('root');
            root?.classList.remove('search');
            root?.classList.add('home');
          }}
        >
          <Link to={'/'}>Home</Link>
        </li>
        <li
          className={`nav-list search-link`}
          onClick={() => {
            const root = document.getElementById('root');
            root?.classList.remove('home');
            root?.classList.add('search');
          }}
        >
          <Link to={'/search'}>Search</Link>
        </li>
      </nav>
    </div>
  )
}

export default Menu
