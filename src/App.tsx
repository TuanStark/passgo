import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Nearby from './pages/Nearby';
import Collections from './pages/Collections';
import Restaurants from './pages/Restaurants';
import TrustedRestaurants from './pages/TrustedRestaurants';
import RestaurantDetail from './pages/RestaurantDetail';
import Blog from './pages/Blog';
import Login from './pages/Login';
import Register from './pages/Register';
import Booking from './pages/Booking';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dia-diem-gan-ban" element={<Nearby />} />
            <Route path="/bo-suu-tap" element={<Collections />} />
            <Route path="/bo-suu-tap/:city" element={<Collections />} />
            <Route path="/an-uong" element={<Restaurants />} />
            <Route path="/an-uong/:city" element={<Restaurants />} />
            <Route path="/an-uong/:city/:category" element={<Restaurants />} />
            <Route path="/nha-hang-uy-tin" element={<TrustedRestaurants />} />
            <Route path="/nha-hang-uy-tin/:city" element={<TrustedRestaurants />} />
            <Route path="/nha-hang/:id" element={<RestaurantDetail />} />
            <Route path="/dat-ban" element={<Booking />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:city" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
