import { Component } from 'react';
import './App.css';

const items = ['Home', 'Menu', 'Company', 'Login'];

class App extends Component {
    handleItemClick = (item) => {
        console.log(`Clicked on: ${item}`);
        alert(`You clicked on: ${item}`);
    };

    render() {
        return (
            <ul>
                {items.map((item, index) => (
                    <li key={index} onClick={() => this.handleItemClick(item)}>
                        {item}
                    </li>
                ))}
            </ul>
        );
    }
}

export default App;
