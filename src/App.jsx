import './App.css';
import { CartProvider } from './contexts/CartContext.jsx';
import HomePage from './pages/HomePage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import OrderPage from './pages/OrderPage.jsx';
import Layout from './components/layout/Layout.jsx';
import ProtectedRoute from './router/ProtectedRoute.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';

const App = () => (
    <AuthProvider>
        <CartProvider>
            <BrowserRouter>
                <div className="App">
                    <div className="main-container">
                        <Layout>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/menu" element={<MenuPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route
                                    path="/order"
                                    element={
                                        <ProtectedRoute>
                                            <OrderPage />
                                        </ProtectedRoute>
                                    }
                                />
                            </Routes>
                        </Layout>
                    </div>
                </div>
            </BrowserRouter>
        </CartProvider>
    </AuthProvider>
);

export default App;
