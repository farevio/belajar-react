import React from 'react';
import PropTypes from 'prop-types';

export default function NimRows(props) {
    const { nims, onDltNim: handleDltNim } = props;
    return (
        <React.Fragment>
            {nims.map(nim => {
                return (
                    <tr key={nim}>
                        <td>{nim}</td>
                        <td>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => handleDltNim(nim)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                );
            })}
    </React.Fragment>
    );
}

NimRows.propTypes = {   
    nims: PropTypes.arrayOf(PropTypes.number),
    onDltNim: PropTypes.func.isRequired,
}