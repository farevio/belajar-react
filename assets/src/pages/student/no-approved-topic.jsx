import React from 'react';
import ReactDOM from 'react-dom';

import Navbar from '../../components/Navbar';
import { MENU as STUDENT_MENU } from '../../components/student/Nav';


function Page() {
    return (
        <div>
            <Navbar activeMenu={STUDENT_MENU.SET_TOPIC_TITLE} />
            <div className="container">
                <h1>Buat Judul Topik</h1>
                <p>Anda belum memiliki topik yang sudah disetujui.</p>
            </div>
        </div>
    )
}

ReactDOM.render(<Page />, document.getElementById('root'));
