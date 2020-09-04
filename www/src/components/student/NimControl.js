import React from 'react';
import PropTypes from 'prop-types';

import NimField from './NimField';
import NimRows from './NimRows';

export default function NimControl(props) {
    const {
        nims,
        error,
        onAddNim,
        onValidateNim, 
        onDltNim
    } = props;
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>NIM</th>
                    <th>Aksi</th>
                </tr>
                <NimField
                    onAddNim={onAddNim}
                    onValidateNim={onValidateNim}
                    error={error}
                />
            </thead>
            <tbody>
                <NimRows
                    nims={nims}
                    onDltNim={onDltNim}
                />
                <tr><td colSpan="2">Jumlah Mahasiswa: {nims.length}</td></tr>
            </tbody>
        </table>
    )
}

NimControl.propTypes = {
    nims: PropTypes.arrayOf(PropTypes.number).isRequired,
    error: PropTypes.string,
    onAddNim: PropTypes.func.isRequired,
    onValidateNim: PropTypes.func.isRequired, 
    onDltNim: PropTypes.func.isRequired
}