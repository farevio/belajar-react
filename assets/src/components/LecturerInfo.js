import React from 'react';
import PropTypes from 'prop-types';

export default class LecturerInfo extends React.Component {
    render() {
        const {nik, name, lecturerCode, peminatan} = this.props;
        let popoverContent = `NIK: ${nik}`;
        if (peminatan) {
            if (peminatan.abbrev) {
                popoverContent += `, Peminatan: ${peminatan.abbrev}`
            }
        }
        return (
            <a
                tabIndex="0"
                role="button"
                data-toggle="popover"
                data-trigger="focus"
                title={name}
                data-container="body"
                data-content={popoverContent}
            >{lecturerCode}</a>
        )
    }
}

LecturerInfo.propTypes = {
    nik: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    lecturerCode: PropTypes.string.isRequired,
    peminatan: PropTypes.object
}