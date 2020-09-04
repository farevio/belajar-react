import React from 'react';
import ReactDOM from 'react-dom';

import Navbar from '../../components/Navbar';
import Nav, {MENU as LECTURER_MENU} from '../../components/lecturer/Nav';
import Layout from '../../components/layouts'
function TopicRow({topic}) {
    const promptMessage = `Apakah anda yakin ingin menghapus topik "${topic.name}" (id: ${topic.id})?`
    const handleDelete = () => {
        if (!confirm(promptMessage)) return;
        fetch('/lecturer/delete-topic', {
            method: 'POST',
            body: JSON.stringify({topicId: topic.id})
        }).then(res => {
            if (res.redirected) location.href = res.url;
            else if (res.headers.get('X-Edit') == 'alreadyHasStudent') {
                alert('Tidak bisa menghapus topik. Topik sudah dipilih mahasiswa.');
            }
        })
    }
    const shortAcademicYear = topic.period.academicYear.split('-')
        .map(year => year.substring(2,4))
        .join('-');
    return (
        <tr>
            <td>{topic.name}</td>
            <td>{topic.quota}</td>
            <td>{topic.kk.abbrev}</td>
            <td>{topic.peminatan.abbrev}</td>
            <td>{topic.period.semester}</td>
            <td>{shortAcademicYear}</td>
            <td>
                <a className="btn btn-default" href={`/lecturer/topic/edit/${topic.id}`} role="button">Edit</a>
                <button className="btn btn-default" onClick={handleDelete}>Hapus</button>
            </td>
        </tr>
    )
}

class TopicTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {topics} = this.props;
        return(
            <table className="table">
                <thead>
                    <tr>
                        <th>Nama Topik</th>
                        <th>Kuota</th>
                        <th>KK</th>
                        <th>Peminatan</th>
                        <th>Semester</th>
                        <th>Tahun</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {topics.map(topic => <TopicRow key={topic.id} topic={topic} />)}
                </tbody>
            </table>
        )
    }
}

function Page({topics}) {
    return (
        <React.Fragment>
            {/* <Navbar activeMenu={LECTURER_MENU.LIST}/> */}
            <div className="container main-content-container px-4 pb-4 container-fluid">
                <h1>Daftar Topik Anda</h1>
                {topics.length? <TopicTable topics={topics}/> : <p>Anda belum membuat topik.</p>}
            </div>
        </React.Fragment>
    )
}

ReactDOM.render(
    <Layout>
    <Page
        topics={window.SAILS_LOCALS.topics} 
        currentPeriod={window.SAILS_LOCALS.currentPeriod}
    /></Layout>,
    document.getElementById("root")
);
