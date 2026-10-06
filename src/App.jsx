import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, CartProvider } from './contexts';
import 'semantic-ui-css/semantic.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './scss/index.scss';
import HomePage from './pages/home/home';
import GamePage from './pages/[game]/game';
import PlatformPage from './pages/games/[platform]/platform';
import SearchPage from './pages/search/search';
import AccountPage from './pages/account/account';
import CartPage from './pages/cart/cart';
import SignInPage from './pages/join/sign-in/sign-in';
import SignUpPage from './pages/join/sign-up/sign-up';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/games/:platform" element={<PlatformPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/join/sign-in" element={<SignInPage />} />
            <Route path="/join/sign-up" element={<SignUpPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/:game" element={<GamePage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
