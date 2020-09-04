import React from 'react';
import PropTypes from 'prop-types';
import StudentInfo from './StudentInfo';

export default class GroupInfo extends React.Component {
    render() {
        const { students, peminatan, isTable } = this.props;
        const peminatanLabel = typeof peminatan == 'object' ? peminatan.abbrev : '';
        const view = isTable ? (
            <table className="table">
                <thead>
                    <tr>
                        <td colSpan="3">
                            {peminatanLabel && <th>Peminatan: {peminatanLabel}</th>}
                        </td>
                    </tr>
                    <tr>
                        <th>NIM</th>
                        <th>Nama</th>
                        <th>Kelas</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.nim}</td>
                            <td>{student.name}</td>
                            <td>{student.class}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
                <div>
                    {peminatanLabel && <p>Peminatan: {peminatanLabel}</p>}
                    <ul>
                        {students.map(student => <StudentInfo key={student.id} student={student} />)}
                    </ul>
                </div>
            )
        return view;
    }
}

GroupInfo.propTypes = {
    students: PropTypes.array,
    peminatan: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    isTable: PropTypes.bool
}
GroupInfo.defaultProps = {
    students: []
}
