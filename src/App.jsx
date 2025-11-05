import './App.css';
import { CartProvider } from './contexts/CartContext.jsx';
import HomePage from './pages/HomePage.jsx';
import MenuPage from './pages/MenuPage.jsx';

const App = () => (
    <CartProvider>
        <div className="App">
            <div className="main-container">
                {/* <HomePage /> */}
                <MenuPage />
            </div>
        </div>
    </CartProvider>
);

export default App;
