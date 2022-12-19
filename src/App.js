import React, { useEffect } from 'react';
import Home from './Home';
import DCA from './DCA';
import Portfolio from './Portfolio';
import Market from './Market';
import Login from './Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';




function App() {

  useEffect(() => {
    document.title = "Crypto Calculator";
  }, []);

  return (
    
    <Router>
      <Routes>
        <Route index element = {<Home />} />
        <Route path = "/dca" element = {<DCA />} />
        <Route path = "/portfolio" element = {<Portfolio />} />
        <Route path = "/market" element = {<Market />} />
        <Route path = "/login" element = {<Login />} />
      </Routes>
    </Router>
  
  );
}

export default App;
