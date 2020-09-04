import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar';
import Nav, {MENU as STUDENT_MENU} from '../../components/student/Nav';



class NimForm extends React.Component {
    constructor(props) {
        super(props);
        NimForm.propTypes = {
            peminatanId: PropTypes.number.isRequired
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
        this.setState({nim: newNim});
    }
    handleAddNim(e) {
        const newNim = this.state.nim;
        fetch(`/student/${newNim}`)
            .then(res => res.json())
            .then(res => {
                if (!res.student) {
                    this.setState({errorMessage: `Mahasiswa dengan nim ${newNim} tidak ditemukan`});
                }
                else if (res.student.hasGroup) {
                    this.setState({errorMessage: `Mahasiswa dengan nim ${newNim} sudah memiliki kelompok`});
                }
                else if (res.student.peminatan != this.props.peminatanId) {
                    this.setState({errorMessage: `Anggota harus memiliki peminatan yang sama dengan anda`});
                }
                else {
                    this.props.onAddStudent(res.student);
                    this.setState({nim: ''});
                }
            });
    }
    render() {
        const {nim, errorMessage} = this.state;
        return (
            <tr className={errorMessage? 'has-error' : ''}>
                <td>
                    <input
                        type="number"
                        className="form-control"
                        name="nim"
                        value={nim}
                        onChange={this.handleNimChange}/>
                </td>
                <td>{errorMessage}</td>
                <td><button className="btn btn-default" onClick={this.handleAddNim}>Tambah</button></td>
            </tr>
        );
    }
}

function GroupRow({student, onDeleteStudent, hasDeleteButton}) {
    const handleDelete = () => {
        onDeleteStudent(student.nim);
    }
    const deleteButton = (hasDeleteButton)
        ? <button className="btn btn-default" onClick={handleDelete}>Hapus</button>
        : null
    return (
        <tr key={student.id}>
            <td>{student.nim}</td>
            <td>{student.name}</td>
            <td>{deleteButton}</td>
        </tr>
    )
}

class GroupTable extends React.Component {
    constructor(props) {
        super(props);
        GroupTable.propTypes = {
            group: PropTypes.object,
            student: PropTypes.object.isRequired,
            isReadOnly: PropTypes.bool
        }
        this.state = {
            students: new Map([[this.props.student.nim, this.props.student]]),
            errors: []
        }
        this.handleAddStudent = this.handleAddStudent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeleteStudent = this.handleDeleteStudent.bind(this);

    }
    componentWillMount() {
        this.setState((state, props) => {
            if (props.group && Array.isArray(props.group.students)) {
                const studentNimVal = props.group.students.map(student => {
                    return [student.nim, student];
                });
                const studentMap = new Map(studentNimVal);
                return {students: studentMap}
            }
        })
    }
    handleAddStudent(student) {
        const newNim = student.nim;
        this.setState((state) => {
            newStudentMap = new Map([[newNim, student]])
            return new Map(...newStudentMap, state.students);
        });
    }
    handleDeleteStudent(nim) {
        this.setState(({students}) => {
            students.delete(nim);
            return students;
        })
    }
    handleSubmit() {
        const group = this.props.group;
        const studentIds = Array.from(this.state.students.values())
            .map(student => student.id);
        if (group) {
            fetch('/student/edit-group', {
                method: 'POST',
                body: JSON.stringify({studentIds: studentIds})
            }).then(res => {
                if (res.redirected) location.href = res.url;
            })
        } else {
            fetch('/student/new-group', {
                method: 'POST',
                body: JSON.stringify({studentIds})
            }).then(res => {
                if (res.redirected) location.href = res.url;
            })
        }
    }
    render() {
        const {isReadOnly} = this.props;
        const {students} = this.state;
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>NIM</th>
                            <th>Nama</th>
                            <th></th>
                        </tr>
                        {!isReadOnly &&
                            <NimForm
                                peminatanId={this.props.student.peminatan}
                                onAddStudent={this.handleAddStudent}
                            />
                        }
                    </thead>
                    <tbody>
                        {Array.from(students.values()).map(student => {
                            return (
                                <GroupRow
                                    student={student}
                                    onDeleteStudent={this.handleDeleteStudent}
                                    hasDeleteButton={
                                        !isReadOnly
                                        ? (student.id != this.props.student.id)
                                        : false
                                    }
                                />
                            )
                        })}
                    </tbody>
                </table>
                <button className="btn btn-primary" onClick={this.handleSubmit} disabled={isReadOnly}>Simpan</button>
            </div>
        )
    }
}

function Page() {
    const {group, currentPeriod, student, isReadOnly} = window.SAILS_LOCALS;
    return (
        <div>
            <Navbar activeMenu={STUDENT_MENU.GROUP} />
            <div className="container">
                <h1>Kelompok <small className="period">{currentPeriod.semester} {currentPeriod.academicYear}</small></h1>
                <GroupTable
                    group={group}
                    student={student}
                    isReadOnly={isReadOnly}
                />
            </div>
        </div>
    )
}

ReactDOM.render(<Page />, document.getElementById('root'))