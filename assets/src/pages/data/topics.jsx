import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import Navbar, { MENU as MAIN_MENU } from '../../components/Navbar';
import TopicFilter from '../../components/TopicFilter';
import PeriodTag from '../../components/PeriodTag';
import LecturerInfo from '../../components/LecturerInfo';
import Layout from '../../components/layouts';
var $ = require('jquery');
var dt = require('datatables.net')();

class TopicTable extends React.Component {
    constructor(props) {
        super(props);
        $(document).ready(() => {
            $('#topic-table').DataTable({
                data: this.props.topics || [],
                columns: [
                    { data: 'id', visible: false }, //id
                    { data: 'name' }, //name
                    { data: 'quota' }, //quota
                    { data: 'kk', visible: false }, //kk
                    { data: 'peminatan', render: 'abbrev' }, //peminatan
                    { data: 'period', render: 'semester' }, //period
                    { //lecturer
                        data: 'lecturer',
                        /*render: function(data, type, row, meta) {
                            if (type=='display') {
                                const lecturerInfo = (
                                    <LecturerInfo
                                        nik={data.nik}
                                        name={data.name}
                                        lecturerCode={data.lecturerCode}
                                    />
                                );
                                return ReactDOMServer.renderToString(lecturerInfo)
                            }
                        }*/
                        render: 'name'
                    },
                    { data: 'isDeleted', visible: false } //isDeleted

                ]
            })
        })
    }

    componentDidUpdate() {
        $(function () {
            $('[data-toggle="popover"]').popover()
        })
    }

    render() {
        return (
            <table id="topic-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Topik</th>
                        <th>Quota</th>
                        <th>KK</th>
                        <th>Peminatan</th>
                        <th>Semester</th>
                        <th>Dosen</th>
                        <th>sudah dihapus</th>
                    </tr>
                </thead>
            </table>
        )
    }
}

TopicTable.propTypes = {
    topics: PropTypes.arrayOf(PropTypes.object)
}

function Page() {
    const { currentPeriod, topics, peminatanList } = window.SAILS_LOCALS;
    return (
        <div className="page main-content-container px-4 pb-4 container-fluid">
            {/* <Navbar activeMenu={MAIN_MENU.TOPICS} /> */}
            <div className="container">
                <h1>Daftar Topik <PeriodTag period={currentPeriod} /></h1>
                <div>
                    <TopicFilter peminatanList={peminatanList} />
                    <TopicTable topics={topics} />
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(<Layout><Page /></Layout>, document.getElementById('root'));
