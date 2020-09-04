import React from 'react';
import PropTypes from 'prop-types';

export default function StudentInfo({ student }) {
    StudentInfo.propTypes = {
        student: PropTypes.object.isRequired
    }
    return (
        <li key={student.id}>
            <a
                tabIndex="0"
                role="button"
                data-toggle="popover"
                data-trigger="focus"
                title={student.name}
                data-container="body"
                data-content={`NIM: ${student.nim}, Kelas: ${student.class}, IPK: ${student.ipk}`}
            >{student.nim}</a>
        </li>
    )
}
