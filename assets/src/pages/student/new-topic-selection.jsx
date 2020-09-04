import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import Navbar from '../../components/Navbar';
import Nav, { MENU as STUDENT_MENU } from '../../components/student/Nav';
import Pagination from '../../components/Pagination';
import PeriodTag from '../../components/PeriodTag';
import LecturerInfo from '../../components/LecturerInfo';

global.$ = require('jquery');

class NimForm extends React.Component {
    constructor(props) {
        super(props);
        NimForm.propTypes = {
            peminatanId: PropTypes.number.isRequired,
            onAddStudent: PropTypes.func.isRequired,
            hasStudent: PropTypes.func.isRequired
        }
        this.state = {
            nim: '',
            errorMessage: ''
        }
        this.handleNimChange = this.handleNimChange.bind(this);
        this.handleAddNim = this.handleAddNim.bind(this);
    }
    handleNimChange(e) {
        const newNim = e.target.value;
        this.setState({ nim: newNim });
    }
    handleAddNim(e) {
        const newNim = this.state.nim;
        if (this.props.hasStudent(newNim)) return this.setState({ errorMessage: `Mahasiswa dengan nim ${newNim} sudah ditambahkan` });
        fetch(`/data/student/${newNim}`)
            .then(res => res.json())
            .then(res => {
                if (!res.student) {
                    this.setState({ errorMessage: `Mahasiswa dengan nim ${newNim} tidak ditemukan` });
                }
                else if (res.student.hasGroup) {
                    this.setState({ errorMessage: `Mahasiswa dengan nim ${newNim} sudah memiliki kelompok` });
                }
                else if (res.student.peminatan.id != this.props.peminatanId) {
                    this.setState({ errorMessage: `Anggota harus memiliki peminatan yang sama dengan anda` });
                }
                else {
                    this.props.onAddStudent(res.student);
                    this.setState({ nim: '', errorMessage: '' });
                }
            });
    }
    render() {
        const { nim, errorMessage } = this.state;
        return (
            <tr className={errorMessage ? 'has-error' : ''}>
                <td>
                    <input
                        type="number"
                        className="form-control"
                        name="nim"
                        value={nim}
                        onChange={this.handleNimChange} />
                </td>
                <td colSpan="3">{errorMessage}</td>
                <td><button type="button" className="btn btn-default" onClick={this.handleAddNim}>Tambah</button></td>
            </tr>
        );
    }
}

function DeletableGroupRow({ student, hasDeleteButton = false, onDeleteStudent }) {
    DeletableGroupRow.propTypes = {
        student: PropTypes.object.isRequired,
        hasDeleteButton: PropTypes.bool,
        onDeleteStudent: PropTypes.func.isRequired
    }
    const handleDeleteClick = () => {
        onDeleteStudent(student.id);
    }
    return (
        <tr>
            <td>{student.nim}</td>
            <td>{student.name}</td>
            <td>{student.class}</td>
            <td>{student.peminatan.abbrev}</td>
            <td>
                <button type="button" className="btn btn-default" onClick={handleDeleteClick} disabled={!hasDeleteButton}>Hapus</button>
            </td>
        </tr>
    )
}

class EditableGroupTable extends React.Component {
    constructor(props) {
        super(props);
        EditableGroupTable.propTypes = {
            user: PropTypes.object.isRequired,
            students: PropTypes.arrayOf(PropTypes.object).isRequired,
            onAddStudent: PropTypes.func.isRequired,
            onDeleteStudent: PropTypes.func.isRequired
        }
        this.handleHasStudent = this.handleHasStudent.bind(this);

    }

    handleHasStudent(nim) {
        const student = this.props.students.find(student => student.nim == nim);
        return !!student;
    }

    render() {
        const { students, user, onAddStudent, onDeleteStudent } = this.props;
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>NIM</th>
                            <th>Nama</th>
                            <th>Kelas</th>
                            <th>Peminatan</th>
                            <th>Aksi</th>
                        </tr>
                        <NimForm
                            peminatanId={user.peminatan.id}
                            onAddStudent={onAddStudent}
                            hasStudent={this.handleHasStudent}
                        />
                    </thead>
                    <tbody>
                        {students.map(student => {
                            return (
                                <DeletableGroupRow
                                    key={student.id}
                                    student={student}
                                    onDeleteStudent={onDeleteStudent}
                                    hasDeleteButton={student.id != user.id}
                                />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

function SelectButton({ topic, topicOptionNum, selectTopic }) {
    SelectButton.propTypes = {
        topic: PropTypes.object.isRequired,
        topicOptionNum: PropTypes.oneOf([1, 2]),
        selectTopic: PropTypes.func.isRequired
    }
    const handleChange = (e) => {
        const optionNum = e.target.value;
        selectTopic(optionNum, topic);
    }
    return (
        <select className="" value={topicOptionNum || ""} onChange={handleChange}>
            <option value="" defaultValue>Pilih</option>
            <option value="1">Opsi #1</option>
            <option value="2">Opsi #2</option>
        </select>
    )
}

function SelectableTopicRow({ topic, topicOptionNum, selectTopic }) {
    SelectableTopicRow.propTypes = {
        topic: PropTypes.object.isRequired,
        topicOptionNum: PropTypes.oneOf([1, 2]),
        selectTopic: PropTypes.func.isRequired,
    }
    return (
        <tr>
            <td>{topic.name}</td>
            <td>
                <LecturerInfo
                    nik={topic.lecturer.nik}
                    name={topic.lecturer.name}
                    lecturerCode={topic.lecturer.lecturerCode}
                />
            </td>
            <td>{topic.quota}</td>
            <td>
                <SelectButton
                    topic={topic}
                    topicOptionNum={topicOptionNum}
                    selectTopic={selectTopic}
                />
            </td>
        </tr>
    );
}

class SelectableTopicTable extends React.Component {
    constructor(props) {
        super(props);
        SelectableTopicTable.propTypes = {
            peminatanId: PropTypes.number.isRequired,
            totalStudents: PropTypes.number.isRequired,
            selectTopic: PropTypes.func.isRequired,
            topicOpt1Id: PropTypes.number,
            topicOpt2Id: PropTypes.number,
        }
        SelectableTopicTable.defaultProps = {
            totalStudents: 0
        }
        this.state = {
            topics: [],
            pageNum: 1,
            maxPage: 10,
            maxRow: 25,
            isLoading: false
        }
        this.handleMaxRowChange = this.handleMaxRowChange.bind(this);
        this.handlePageNumChange = this.handlePageNumChange.bind(this);
    }

    fetchTopics() {
        this.setState({ isLoading: true });
        const { pageNum, maxRow } = this.state;
        const { totalStudents, peminatanId } = this.props;
        const getTopicsParams = new URLSearchParams(
            {
                pageNum,
                maxRow,
                minQuota: totalStudents,
                peminatanId: peminatanId
            }
        );
        fetch('/data/topics?' + getTopicsParams.toString()).then(res => res.json())
            .then(res => this.setState({ topics: res.topics, isLoading: false }));
    }

    componentDidMount() {
        this.fetchTopics();
        const { totalStudents, peminatanId } = this.props;
        const getTopicsParams = new URLSearchParams(
            {
                minQuota: totalStudents,
                peminatanId: peminatanId
            }
        );
        const maxRow = this.state.maxPage;
        const getMaxPage = topicsCount => Math.floor(topicsCount / maxRow) || 1;
        fetch('/data/topics/count?' + getTopicsParams.toString())
            .then(res => res.json())
            .then(({ topicsCount }) => this.setState({ maxPage: getMaxPage(topicsCount) }));
        $(function () {
            $('[data-toggle="popover"]').popover()
        })
    }

    componentDidUpdate() {
        $(function () {
            $('[data-toggle="popover"]').popover()
        })
    }

    handlePageNumChange(pageNum) {
        this.fetchTopics();
        this.setState({ pageNum });
    }

    handleMaxRowChange(maxRow) {
        this.fetchTopics();
        this.setState({ maxRow });
    }

    render() {
        const { topicOpt1Id, topicOpt2Id, selectTopic } = this.props;
        return (
            <div className="selectable-topic-table">
                <div className="">
                    <table id="topic-selection-table" className="table">
                        <thead>
                            <tr>
                                <th>Topik</th>
                                <th>Dosen</th>
                                <th>Quota Topik</th>
                                <th>Pilih</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.topics && this.state.topics.map(topic => {
                                let topicOptionNum;
                                if (topic.id == topicOpt1Id) topicOptionNum = 1;
                                else if (topic.id == topicOpt2Id) topicOptionNum = 2;
                                return (
                                    <SelectableTopicRow
                                        key={topic.id}
                                        topic={topic}
                                        topicOptionNum={topicOptionNum}
                                        selectTopic={selectTopic}
                                    />
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    pageNum={this.state.pageNum}
                    maxPage={this.state.maxPage}
                    maxRow={this.state.maxRow}
                    onPageNumChange={this.handlePageNumChange}
                    onMaxRowChange={this.handleMaxRowChange}
                />
            </div>
        );
    }
}


function TopicSelectionControl({ topicOpt1, topicOpt2, selectTopic }) {
    TopicSelectionControl.propTypes = {
        topicOpt1: PropTypes.object,
        topicOpt2: PropTypes.object,
        selectTopic: PropTypes.func.isRequired
    }
    const handleSwitch = (e) => {
        selectTopic(1, topicOpt2);
        selectTopic(2, topicOpt1);
    }
    const handleDeleteOpt1 = () => {
        selectTopic(1, null);
    }
    const handleDeleteOpt2 = () => {
        selectTopic(2, null);
    }
    return (
        <div className="form-horizontal">
            <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="topicOpt1">Opsi #1</label>
                <div className="col-sm-8">
                    <p className="form-control-static">{topicOpt1 ? topicOpt1.name : 'Belum memilih'}</p>
                </div>
                <div className="col-sm-2">
                    {topicOpt1 && <button className="btn btn-default" type="button" onClick={handleDeleteOpt1} >Hapus</button>}
                </div>
            </div>
            <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="topicOpt2">Opsi #2</label>
                <div className="col-sm-8">
                    <p className="form-control-static">{topicOpt2 ? topicOpt2.name : 'Belum memilih'}</p>
                </div>
                <div className="col-sm-2">
                    {topicOpt2 && <button className="btn btn-default" type="button" onClick={handleDeleteOpt2} >Hapus</button>}
                </div>
            </div>
            <div className="form-group">
                <div className="col-sm-2 col-sm-offset-2">
                    <button className={`btn btn-default ${(topicOpt1 && topicOpt2) ? '' : 'sr-only'}`} type="button" onClick={handleSwitch}>Tukar</button>
                </div>
            </div>
        </div>
    )
}

function TopicSelectionReview({
    topicOpt1,
    topicOpt2,
    students,
    onConfirm,
    onCancel
}) {
    TopicSelectionReview.propTypes = {
        topicOpt1: PropTypes.object.isRequired,
        topicOpt2: PropTypes.object.isRequired,
        students: PropTypes.arrayOf(PropTypes.object).isRequired,
        onConfirm: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired
    }
    return (
        <div className="container text-center">
            <h1>Periksa Pilihan</h1>
            <div className="row">
                <div className="col-sm-6 col-sm-offset-3">
                    <dl className="dl-horizontal">
                        <dt>Topik opsi #1</dt>
                        <dd>{topicOpt1.name}</dd>
                        <dt>Topik opsi #2</dt>
                        <dd>{topicOpt2.name}</dd>
                    </dl>
                </div>
            </div>
            <div className="text-center">
                <tabel class="table">
                    <thead>
                        <tr>
                            <th>NIM</th>
                            <th>Nama</th>
                            <th>Kelas</th>
                            <th>Peminatan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr>
                                <td>{student.nim}</td>
                                <td>{student.name}</td>
                                <td>{student.class}</td>
                                <td>{student.peminatan.abbrev}</td>
                            </tr>
                        ))}
                    </tbody>
                </tabel>
                <p>Apakah anda yakin?</p>
                <div className="form-inline">
                    <button type="button" className="btn btn-default" onClick={onCancel}>Tidak</button>
                    <button type="button" className="btn btn-primary" onClick={onConfirm}>Ya</button>
                </div>
            </div>
        </div>
    )
}

function FormErrorMessages({ errorMessages }) {
    FormErrorMessages.propTypes = {
        errorMessages: PropTypes.object
    }
    return (
        <div>
            {
                Object.entries(errorMessages).map(([field, message]) => {
                    return <p key={field} className="text-danger">{message}</p>
                })
            }
        </div>
    )
}

class TopicSelectionForm extends React.Component {
    constructor(props) {
        super(props);
        TopicSelectionForm.propTypes = {
            user: PropTypes.object.isRequired,
            prevGroupStudents: PropTypes.arrayOf(PropTypes.object),
        }
        this.state = {
            topicOpt1: undefined,
            topicOpt2: undefined,
            students: this.props.prevGroupStudents ? this.props.prevGroupStudents : [this.props.user],
            errorMessages: {},
            isReviewModalOpen: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAddStudent = this.handleAddStudent.bind(this);
        this.handleDeleteStudent = this.handleDeleteStudent.bind(this);
        this.selectTopic = this.selectTopic.bind(this);
        this.validate = this.validate.bind(this);
        this.showReviewModal = this.showReviewModal.bind(this);
        this.closeReviewModal = this.closeReviewModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.setState((state, props) => {
            if (props.prevGroupStudents) {
                return { students: props.prevGroupStudents }
            }
        })
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        const parsedValue = isNaN(Number(value)) ? value : Number(value); //parse value kalo bisa diparse ke integer
        this.setState({ [name]: parsedValue });
    }

    handleAddStudent(student) {
        this.setState(prevState => ({ students: [student, ...prevState.students] }))
    }


    handleDeleteStudent(studentId) {
        console.log("DELETE")
        this.setState(prevState => {
            let students = prevState.students;
            const deleteIndex = students.findIndex(student => student.id == studentId);
            students.splice(deleteIndex, 1);
            return { students }
        });
    }

    selectTopic(optionNum, topic) {
        this.setState({ [`topicOpt${optionNum}`]: topic });
    }

    validate() {
        const { topicOpt1, topicOpt2, students } = this.state;
        this.setState({
            errorMessages: {
                topicOpt1: !topicOpt1 && 'Anda harus memilih topik opsi #1',
                topicOpt2: !topicOpt2 && 'Anda harus memilih topik opsi #2'
            }
        });
        if (!topicOpt1 || !topicOpt2) return false;
        else return true;
    }

    showReviewModal() {
        if (this.validate()) {
            this.setState({ isReviewModalOpen: true });
        }
    }

    closeReviewModal() {
        this.setState({ isReviewModalOpen: false })
    }

    handleSubmit(e) {
        const {
            topicOpt1,
            topicOpt2,
            students
        } = this.state;
        const studentIds = students.map(s => s.id);
        fetch('/student/new-topic-selection', {
            method: "POST",
            body: JSON.stringify({
                topicOpt1Id: topicOpt1 && topicOpt1.id,
                topicOpt2Id: topicOpt2 && topicOpt2.id,
                studentIds
            }),
        })
            .then(res => {
                const exitCode = res.headers.get('X-Exit');
                switch (exitCode) {
                    case 'success':
                        window.location.href = res.url;
                        break;
                    case 'topicQuotaExceeded':
                        this.closeReviewModal();
                        alert('Tidak bisa mengajukan topik. Jumlah anggota kelompok lebih besar dari topik yang anda pilih.');
                        break;
                }
            })
    }

    render() {
        const { user } = this.props;
        return (
            <div className="container">
                <form>
                    <EditableGroupTable
                        user={user}
                        students={this.state.students}
                        onAddStudent={this.handleAddStudent}
                        onDeleteStudent={this.handleDeleteStudent}
                    />
                    <TopicSelectionControl
                        topicOpt1={this.state.topicOpt1}
                        topicOpt2={this.state.topicOpt2}
                        selectTopic={this.selectTopic}
                    />
                    <SelectableTopicTable
                        peminatanId={user.peminatan.id}
                        topicOpt1Id={this.state.topicOpt1 && this.state.topicOpt1.id}
                        topicOpt2Id={this.state.topicOpt2 && this.state.topicOpt2.id}
                        totalStudents={this.state.students.length}
                        selectTopic={this.selectTopic}
                    />
                    <div className="row">

                    </div>
                    <div className="row">
                        <div className="col-xs-2">
                            <div className="form-inline">
                                <button type="button" onClick={this.showReviewModal} className="btn btn-primary">
                                    Ajukan
                                </button>
                            </div>
                        </div>
                        <div className="col-xs-10">
                            <FormErrorMessages errorMessages={this.state.errorMessages} />
                        </div>
                    </div>
                    {
                        <ReactModal
                            appElement={document.getElementById('root')}
                            isOpen={this.state.isReviewModalOpen}
                            onRequestClose={this.closeReviewModal}
                        >
                            <TopicSelectionReview
                                students={this.state.students}
                                topicOpt1={this.state.topicOpt1}
                                topicOpt2={this.state.topicOpt2}
                                onConfirm={this.handleSubmit}
                                onCancel={this.closeReviewModal}
                            />
                        </ReactModal>
                    }
                </form>
            </div>
        );
    }
}

function Page() {
    const { prevGroupStudents, currentPeriod, user, hasSelectedTopic } = window.SAILS_LOCALS;
    return (
        <div>
            <Navbar activeMenu={STUDENT_MENU.SELECT_TOPIC} />
            <div className="container">
                <h1>Pemilihan Topik <PeriodTag period={currentPeriod} /></h1>

                {hasSelectedTopic
                    ? 'Anda sudah mengajukan pilihan topik' :
                    <TopicSelectionForm
                        user={user}
                        prevGroupStudents={prevGroupStudents}
                    />
                }
            </div>
        </div>
    )
}
ReactDOM.render(
    <Page
    />,
    document.getElementById("root")
);
