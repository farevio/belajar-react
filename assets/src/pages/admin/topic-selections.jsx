import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server'
import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar';
import Nav, { MENU as ADMIN_MENU } from '../../components/admin/Nav';
import PeminatanSelect from '../../components/PeminatanSelect';
import GroupInfo from '../../components/GroupInfo';
import handleFilterChange from '../../components/handleFilterChange';
import PeriodTag from '../../components/PeriodTag';
import Layout from '../../components/layouts';

var $ = require('jquery');
var dt = require('datatables.net')();


function FilterBar({ peminatanList }) {
    FilterBar.propTypes = {
        peminatanList: PropTypes.arrayOf(PropTypes.object).isRequired
    }
    const searchParams = new URLSearchParams(window.location.search);
    const filterPeminatanId = searchParams.get('peminatanId');
    const filterStatus = searchParams.get('status');
    return (
        <div>
            <form className="form">
                <div className="form-group">
                    <label htmlFor="peminatanId">Peminatan</label>
                    <PeminatanSelect
                        name="peminatanId"
                        peminatanList={peminatanList}
                        value={filterPeminatanId}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select className="form-control" name="status" value={filterStatus} onChange={handleFilterChange}>
                        <option value=""></option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="REJECTED">REJECTED</option>
                        <option value="WAITING">WAITING</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

function addPeminatan(topicSelections, peminatanList) {
    const peminatanMap = peminatanList.reduce(function (map, peminatan) {
        map[peminatan.id] = peminatan;
        return map;
    }, {});
    const withPeminatan = topicSelections.map(ts => {
        const peminatanId = ts.topic.peminatan;
        const peminatan = peminatanMap[peminatanId];
        return { ...ts, peminatan }
    });
    return withPeminatan;
}

class TopicSelectionTable extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const data = addPeminatan(this.props.topicSelections, this.props.peminatanList) || [];
        $('#topic-selection-table').DataTable({
            data: data,
            columns: [
                { data: 'topic', render: 'name' }, //topic-name
                { data: 'peminatan', render: 'abbrev' }, //peminatan
                {
                    data: 'group',
                    render: function (data, type, row, meta) {
                        if (type == 'display') {
                            const groupInfo = (
                                <GroupInfo students={data.students} peminatan={data.peminatan} />
                            );
                            return ReactDOMServer.renderToString(groupInfo);
                        }
                    }
                }, //peminatan
                { data: 'optionNum' },
                { data: 'status' }

            ]
        })
    }


    componentDidUpdate() {
        $(function () {
            $('[data-toggle="popover"]').popover()
        })
    }

    render() {
        return (
            <table id="topic-selection-table">
                <thead>
                    <tr>
                        <td>Topik</td>
                        <td>Peminatan</td>
                        <td>Kelompok</td>
                        <td>Opsi ke</td>
                        <td>Status</td>
                    </tr>
                </thead>
            </table>
        )
    }
}

TopicSelectionTable.propTypes = {
    topicSelections: PropTypes.arrayOf(PropTypes.object),
    peminatanList: PropTypes.arrayOf(PropTypes.object).isRequired
}


function Page() {
    const { topicSelections, peminatanList, currentPeriod } = window.SAILS_LOCALS;
    return (
        <div className="page main-content-container px-4 pb-4 container-fluid">
            {/* <Navbar activeMenu={ADMIN_MENU.TOPIC_SELECTIONS} /> */}
            <div className="container">
                <div className="content">
                    <h1>Daftar Pemilihan Topik <PeriodTag period={currentPeriod} /></h1>
                    <FilterBar peminatanList={peminatanList} />
                    <TopicSelectionTable
                        topicSelections={topicSelections}
                        peminatanList={peminatanList}
                    />
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(<Layout><Page /></Layout>, document.getElementById('root'));
