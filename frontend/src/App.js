import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Navigation from '../src/components/shared/Navigation/Navigation';
import Home from '../src/Pages/Home/Home';
import Register from '../src/Pages/Register/Register';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
