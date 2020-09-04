import React from 'react';
import ReactDOM from 'react-dom';
import Navbar, {MENU} from '../components/Navbar';

class Homepage extends React.Component {
    render() {
        return(
            <div id="page">
                <Navbar activeMenu={MENU.HOME}/>
                <div className="container">
                    <h1>Beranda</h1>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Homepage />,document.getElementById('root'));

