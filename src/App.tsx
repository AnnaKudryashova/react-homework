import './App.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import LoginPage from './pages/LoginPage';
import OrderPage from './pages/OrderPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/layout/Layout';
import ProtectedRoute from './router/ProtectedRoute';
import AuthInitializer from './features/auth/AuthInitializer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <AuthInitializer />
            <div className="App">
                <div className="main-container">
                    <Routes>
                        <Route element={<Layout />}>
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
                        </Route>
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    </Provider>
);

export default App;
