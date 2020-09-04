import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../../components/Navbar';

function Page() {
    return (
        <div className="page">
            <Navbar />
            <div className="container">
                <h1>Link tidak valid</h1>
                <p>
                    Link yang anda gunakan sudah tidak berlaku lagi atau salah.
                </p>
            </div>
        </div>
    )
}

ReactDOM.render(<Page />, document.getElementById('root'));