import React from 'react';
import ReactDOM from 'react';
import ReactDOMServer from 'react-dom/server';
import GroupInfo from '../../components/GroupInfo';
import Layout from '../../components/layouts';

var $ = require('jquery');
var dt = require('datatables.net');

class TopicSelectionTable extends React.Component {
    constructor(props) {
        super(props);
        $(document).ready(() => {
            $('#topic-selection-table').DataTable({
                data: this.props.topicSelections || [],
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
                        <td>Pelamar</td>
                        <td>Opsi ke</td>
                        <td>Status</td>
                    </tr>
                </thead>
            </table>
        )
    }
}

TopicSelectionTable.propTypes = {
    topicSelections: PropTypes.arrayOf(PropTypes.object)
}

function Page() {
    const { currentPeriod, topicSelections, peminatanList } = window.SAILS_LOCALS;
    return (
        <div className="page">
            <Navbar activeMenu={MAIN_MENU.TOPICS} />
            <div className="container">
                <h1>Daftar Topik <small>{currentPeriod.semester} {currentPeriod.academicYear}</small></h1>
                <div>
                    <TopicFilter peminatanList={peminatanList} />
                    <TopicSelectionTable topicSelections={topicSelections} />
                </div>
            </div>
        </div>
    )
}
