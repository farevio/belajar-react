import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar';
import Nav, { MENU as ADMIN_MENU } from '../../components/admin/Nav';
import TopicFilter from '../../components/TopicFilter';
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
                    { data: 'period', render: 'academicYear' }, //period
                    { data: 'period', render: 'semester' },

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
                        <th>Dosen</th>
                        <th>Tahun</th>
                        <th>Semester</th>
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
    const { topics, peminatanList, periods } = window.SAILS_LOCALS;
    return (
        <div className="page main-content-container px-4 pb-4 container-fluid">
            {/* <Navbar activeMenu={ADMIN_MENU.TOPIC_ARCHIVES} /> */}
            <div className="container">
                <h1>Daftar Arsip Topik</h1>
                <div className="content">
                    <TopicFilter peminatanList={peminatanList} periods={periods} />
                    <TopicTable topics={topics} />
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(<Layout><Page /></Layout>, document.getElementById('root'))
