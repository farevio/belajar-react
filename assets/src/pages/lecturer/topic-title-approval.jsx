import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Navbar, { MENU as NAVBAR_MENU } from '../../components/Navbar';
import { MENU as LECTURER_MENU } from '../../components/lecturer/Nav';
import StudentInfo from '../../components/StudentInfo';
import Layout from '../../components/layouts'

var $ = require('jquery');
var dt = require('datatables.net')()

function ApprovalButton({ onApprove, onReject, status, topicTitleId }) {
    ApprovalButton.propTypes = {
        onApprove: PropTypes.func.isRequired,
        onReject: PropTypes.func.isRequired,
        status: PropTypes.string.isRequired,
        topicTitleId: PropTypes.number.isRequired
    }
    const handleApproveClick = () => {
        onApprove(topicTitleId);
    }
    const handleRejectClick = () => {
        onReject(topicTitleId);
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

function TopicApprovalRow({ topicTitle, onApprove, onReject, recentStatus }) {
    TopicApprovalRow.propTypes = {
        topicTitle: PropTypes.object.isRequired,
        onApprove: PropTypes.func.isRequired,
        onRejected: PropTypes.func.isRequired,
        recentStatus: PropTypes.string
    }
    const className = recentStatus ? 'active' : '';
    return (
        <tr className={className}>
            <td>{topicTitle.topicTitle}</td>
            <td>{topicTitle.topic.name}</td>
            <td>
                <StudentInfo
                    student={topicTitle.student}
                />
            </td>
            <td>
                <ApprovalButton
                    topicTitleId={topicTitle.id}
                    status={recentStatus || topicTitle.status}
                    onApprove={onApprove}
                    onReject={onReject}
                />
            </td>
        </tr>)
}

class TitleApprovalTable extends React.Component {
    constructor(props) {
        super(props);
        TitleApprovalTable.propTypes = {
            topicTitles: PropTypes.array
        }
        this.state = {
            recentTitleStatus: new Map(),
            submitStatus: ''
        }
        this.handleApprove = this.handleApprove.bind(this);
        this.handleReject = this.handleReject.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleApprove(topicTitleId) {
        this.setState(({ recentTitleStatus }) => {
            return { recentTitleStatus: recentTitleStatus.set(topicTitleId, 'APPROVED') }
        });
    }
    handleReject(topicTitleId) {
        this.setState(({ recentTitleStatus }) => {
            return { recentTitleStatus: recentTitleStatus.set(topicTitleId, 'REJECTED') };
        });
    }
    handleSubmit() {
        const { recentTitleStatus } = this.state;
        let approvedIds = [];
        let rejectedIds = [];
        recentTitleStatus.forEach((approval, topicTitleId) => {
            if (approval == 'APPROVED') {
                approvedIds.push(parseInt(topicTitleId));
            }
            else if (approval == 'REJECTED') {
                rejectedIds.push(parseInt(topicTitleId));
            }
        });
        //this.setState({submitStatus: 'LOADING'});
        fetch('/lecturer/judge-topic-titles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ approvedIds, rejectedIds }),
        }).then(res => location.href = res.url);
    }
    componentDidMount() {
        $('#topic-title-approvals-table').DataTable();
    }
    render() {
        const { topicTitles } = this.props;
        const { recentTitleStatus, submitStatus } = this.state;
        const topicApprovalRows = topicTitles.map(topicTitle =>
            <TopicApprovalRow
                key={topicTitle.id}
                topicTitle={topicTitle}
                onApprove={this.handleApprove}
                onReject={this.handleReject}
                recentStatus={recentTitleStatus.get(topicTitle.id)}
            />
        )
        return (
            <React.Fragment>
                <div className="table-scroll">
                    <table id="topic-title-approvals-table">
                        <thead>
                            <tr>
                                <th>Judul</th>
                                <th>Topik</th>
                                <th>Mahasiswa Pelamar</th>
                                <th>Setujui</th>
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
                        disabled={!recentTitleStatus.size}
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
    const topicTitles = window.SAILS_LOCALS.topicTitles;
    return (
        <div id="page" className="page main-content-container px-4 pb-4 container-fluid">
            {/* <Navbar activeMenu={LECTURER_MENU.APPROVE_TITLE} /> */}
            <div className="container">
                <h1>Setujui Atau Tolak</h1>
                {
                    topicTitles.length ? <TitleApprovalTable topicTitles={topicTitles} />
                        : <p>Belum ada mahasiswa yang mengajukan judul topik</p>
                }
            </div>
        </div>
    )
}

ReactDOM.render(<Layout><Page /></Layout>, document.getElementById('root'));
