import './App.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import HomePage from './pages/HomePage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import OrderPage from './pages/OrderPage.jsx';
import Layout from './components/layout/Layout.jsx';
import ProtectedRoute from './router/ProtectedRoute.jsx';
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
