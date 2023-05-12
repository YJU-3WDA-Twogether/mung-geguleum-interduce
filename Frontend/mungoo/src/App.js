import React, {useEffect} from 'react';
import Main from './Components/Main';
import axios from 'axios';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Main/>} />
        </Routes>
      </Router>
  );
}

export default App;
