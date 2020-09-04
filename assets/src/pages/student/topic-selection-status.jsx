import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import Navbar, { MENU as NAVBAR_MENU } from '../../components/Navbar';
import Nav, { MENU as STUDENT_MENU } from '../../components/student/Nav';
import PeriodTag from '../../components/PeriodTag';
import LecturerInfo from '../../components/LecturerInfo';
import GroupInfo from '../../components/GroupInfo';

function StatusPanel({ topicSelection }) {
    StatusPanel.propTypes = {
        topicSelection: PropTypes.object.isRequired
    }
    let className, statusLabel;
    switch (topicSelection.status) {
        case 'WAITING':
            className = 'panel-default';
            statusLabel = 'Menunggu'
            break;
        case 'APPROVED':
            className = 'panel-success';
            statusLabel = 'Disetujui'
            break;
        case 'REJECTED':
            className = 'panel-danger';
            statusLabel = 'Ditolak'
            break;
        case 'AUTO_CANCELED':
            className = 'panel-info';
            className = 'Dibatalkan sebab topik opsi #1 tersetujui'
            break;
        default:
            break;
    }
    const topic = topicSelection.topic;
    const lecturer = topic.lecturer;
    return (
        <div className={`panel ${className}`}>
            <div className="panel-heading">
                <h3 className="panel-title">Opsi #{topicSelection.optionNum}</h3>
            </div>
            <div className="panel-body">
                <dl className="dl-horizontal">
                    <dt>Id Topik</dt>
                    <dd>{topic.id}</dd>
                    <dt>Nama Topik</dt>
                    <dd>{topic.name}</dd>
                    <dt>Dosen</dt>
                    <dd>
                        <LecturerInfo
                            nik={lecturer.nik}
                            name={lecturer.name}
                            lecturerCode={lecturer.lecturerCode}
                        />
                    </dd>
                    <dt>Status</dt>
                    <dd>{statusLabel}</dd>
                </dl>
            </div>
        </div>
    )
}

function Title({ currentPeriod }) {
    const { semester, academicYear } = currentPeriod;
    return (
        <h1>Status Pemilihan Topik <PeriodTag period={currentPeriod} /></h1>
    )
}

function ReselectButton({ firstStatus, secondStatus }) {
    ReselectButton.propTypes = {
        firstStatus: PropTypes.string.isRequired,
        secondStatus: PropTypes.string.isRequired
    }
    let isShown = false;
    if (firstStatus != 'WAITING' && secondStatus != 'WAITING') {
        if (firstStatus == 'REJECTED' || secondStatus == 'REJECTED') {
            isShown = true;
        }
    }
    return (
        <div>
            {isShown && <a className="btn btn-primary" href="/student/topic-selection/new">Pilih topik lagi</a>}
        </div>
    )
}

function AppContent({ topicSelection1, topicSelection2, group }) {
    AppContent.propTypes = {
        topicSelection1: PropTypes.object.isRequired,
        topicSelection2: PropTypes.object.isRequired,
        group: PropTypes.object.isRequired
    }
    return (
        <div className="content">
            <div className="row">
                <div className="col-xs-12 col-sm-6">
                    <StatusPanel topicSelection={topicSelection1}
                    />
                </div>
                <div className="col-xs-12 col-sm-6">
                    <StatusPanel topicSelection={topicSelection2} />
                </div>
            </div>
            <div className="row">
                <ReselectButton firstStatus={topicSelection1.status} secondStatus={topicSelection2.status} />
            </div>
            <GroupInfo students={group.students} peminatan={group.peminatan} isTable={true} />
        </div>
    )
}

function Page() {
    const { topicSelection1, topicSelection2, currentPeriod, group } = window.SAILS_LOCALS;;
    return (
        <div>
            <Navbar activeMenu={STUDENT_MENU.STATUS} />
            <div className="container">
                <Title currentPeriod={currentPeriod} />
                {(topicSelection1 && topicSelection2) ?
                    (<AppContent topicSelection1={topicSelection1} topicSelection2={topicSelection2} group={group} />)
                    : <p>Anda belum memilih topik</p>
                }
            </div>
        </div>
    )
}

ReactDOM.render(<Page />, document.getElementById('root'));
