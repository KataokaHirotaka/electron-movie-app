import React from 'react';
import './style/Header.css';
import {Menu} from './index';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1 className="app-title">
        <Link to={'/'}>movie-app</Link>
      </h1>
      <div className="menu-wrapper">
        <Menu />
      </div>
    </header>
  )
}

export default Header;