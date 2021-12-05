import React, { createContext } from 'react';
import ReactDom from 'react-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { Home, Search } from './components/index';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/search" element={<Search />}/>
        </Routes>
      </Router>
      
    </div>
  );
};

ReactDom.render(<App />, document.getElementById('root'));