import React from 'react';
import Home from './Home';
import DCA from './DCA';
import Portfolio from './Portfolio';
import Market from './Market';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function App() {
  return (
    
    <Router>
      <Routes>
        <Route index element = {<Home />} />
        <Route path = "/dca" element = {<DCA />} />
        <Route path = "/portfolio" element = {<Portfolio />} />
        <Route path = "/market" element = {<Market />} />
      </Routes>
    </Router>
  
  );
}

export default App;
