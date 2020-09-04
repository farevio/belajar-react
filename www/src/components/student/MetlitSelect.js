import React from 'react';
import PropTypes from 'prop-types';

function MetlitSelect(props) {
    MetlitSelect.propTypes = {
        metlits: PropTypes.arrayOf(PropTypes.object),
        onChange: PropTypes.func.isRequired
    }
    const {metlits, onChange: handleChange} = props;
    return (
        <div className="form-group">
            <label className="control-label" htmlFor="metlitId">
                Metode Penelitian
            </label>
            <select className="form-control" name="metlitId" onChange={handleChange}>
                {metlits.map(metlit => {
                    return (
                        <option key={metlit.id} value={metlit.id}>{metlit.class}</option>
                    )
                })}
            </select>
        </div>
    );
};



module.exports = MetlitSelect;