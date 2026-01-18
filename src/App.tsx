import './App.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import LoginPage from './pages/LoginPage';
import OrderPage from './pages/OrderPage';
import Layout from './components/layout/Layout';
import ProtectedRoute from './router/ProtectedRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => (
    <Provider store={store}>
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
    </Provider>
);

export default App;
