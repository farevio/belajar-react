import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Navbar, { MENU as NAVBAR_MENU } from '../../components/Navbar';
import Nav, { MENU as LECTURER_MENU } from '../../components/lecturer/Nav';
import GroupInfo from '../../components/GroupInfo';
import Layout from '../../components/layouts'

var $ = require('jquery');
var dt = require('datatables.net')();

function ApprovalButton({ onApprove, onReject, status, topicSelectionId }) {
    ApprovalButton.propTypes = {
        onApprove: PropTypes.func.isRequired,
        onReject: PropTypes.func.isRequired,
        status: PropTypes.string.isRequired,
        topicSelectionId: PropTypes.number.isRequired
    }
    const handleApproveClick = () => {
        onApprove(topicSelectionId);
    }
    const handleRejectClick = () => {
        onReject(topicSelectionId);
    }
    const approveBtnClass = status == 'APPROVED' ? 'btn-success' : 'btn-default';
    const rejectBtnClass = status == 'REJECTED' ? 'btn-danger' : 'btn-default';
    return (
        <div className="btn-group" role="group" aria-label="approval-button">
            <button type="button" className={`btn ${approveBtnClass}`} onClick={handleApproveClick} >Setujui</button>
            <button type="button" className={`btn ${rejectBtnClass}`} onClick={handleRejectClick} >Tolak</button>
        </div>
    );
}

function TopicApprovalRow({ topicSelection, onApprove, onReject, recentStatus }) {
    TopicApprovalRow.propTypes = {
        topicSelection: PropTypes.object.isRequired,
        onApprove: PropTypes.func.isRequired,
        onRejecte: PropTypes.func.isRequired,
        recentStatus: PropTypes.string
    }
    const className = recentStatus ? 'active' : '';
    return (
        <tr className={className}>
            <td>{topicSelection.topic.name}</td>
            <td>
                <GroupInfo
                    students={topicSelection.group.students}
                    peminatan={topicSelection.group.peminatan}
                />
            </td>
            <td>{topicSelection.optionNum}</td>
            <td>
                <ApprovalButton
                    topicSelectionId={topicSelection.id}
                    status={recentStatus || topicSelection.status}
                    onApprove={onApprove}
                    onReject={onReject}
                />
            </td>
        </tr>)
}

class TopicApprovalTable extends React.Component {
    constructor(props) {
        super(props);
        TopicApprovalTable.propTypes = {
            topicSelections: PropTypes.array
        }
        this.state = {
            recentTopicStatus: new Map(),
            submitStatus: '',
        }
        this.handleApprove = this.handleApprove.bind(this);
        this.handleReject = this.handleReject.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleApprove(topicSelectionId) {
        this.setState(({ recentTopicStatus }) => {
            return { recentTopicStatus: recentTopicStatus.set(topicSelectionId, 'APPROVED') }
        });
    }
    handleReject(topicSelectionId) {
        this.setState(({ recentTopicStatus }) => {
            return { recentTopicStatus: recentTopicStatus.set(topicSelectionId, 'REJECTED') };
        });
    }
    handleSubmit() {
        const { recentTopicStatus } = this.state;
        let approvedIds = [];
        let rejectedIds = [];
        recentTopicStatus.forEach((approval, topicSelectionId) => {
            if (approval == 'APPROVED') {
                approvedIds.push(parseInt(topicSelectionId));
            }
            else if (approval == 'REJECTED') {
                rejectedIds.push(parseInt(topicSelectionId));
            }
        });
        //this.setState({submitStatus: 'LOADING'});
        fetch('/lecturer/judge-topic-selections', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ approvedIds, rejectedIds }),
        }).then(res => location.href = res.url);
    }
    componentDidMount() {
        $('#topic-approvals-table').DataTable();
    }
    render() {
        const { topicSelections } = this.props;
        const { recentTopicStatus, submitStatus } = this.state;
        const topicApprovalRows = topicSelections.map(topicSelection =>
            <TopicApprovalRow
                key={topicSelection.id}
                topicSelection={topicSelection}
                onApprove={this.handleApprove}
                onReject={this.handleReject}
                recentStatus={recentTopicStatus.get(topicSelection.id)}
            />
        )
        return (
            <React.Fragment>
                <div className="table-scroll">
                    <table id="topic-approvals-table">
                        <thead>
                            <tr>
                                <td>Topik</td>
                                <td>Mahasiswa Pelamar</td>
                                <td>Opsi</td>
                                <td>Setujui</td>
                            </tr>
                        </thead>
                        <tbody>
                            {topicApprovalRows}
                        </tbody>
                    </table>
                </div>
                <div>
                    <button
                        className="btn btn-primary"
                        disabled={!recentTopicStatus.size}
                        onClick={this.handleSubmit}
                    >
                        Simpan
                    </button>
                    <span>{submitStatus}</span>
                </div>
            </React.Fragment>
        )
    }
}

function Page() {
    const topicSelections = window.SAILS_LOCALS.topicSelections;
    return (
        <div id="page" className="page main-content-container px-4 pb-4 container-fluid">
            {/* <Navbar activeMenu={LECTURER_MENU.APPROVE} /> */}
            <div className="container">
                <h1>Setujui Atau Tolak</h1>
                {
                    topicSelections.length ? <TopicApprovalTable topicSelections={topicSelections} />
                        : <p>Belum ada mahasiswa yang memilih topik anda</p>
                }
            </div>
        </div>
    )
}

ReactDOM.render(<Layout><Page /></Layout>, document.getElementById('root'));
