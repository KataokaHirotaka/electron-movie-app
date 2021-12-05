import React from 'react';
import './style/Header.css';
import {Menu} from './index';
// import styled from 'styled-components';

function Header() {
  return (
    <header>
      <h1 className="app-title">movie-app</h1>
      <div className="menu-wrapper">
        <Menu />
      </div>
    </header>
  )
}

export default Header;