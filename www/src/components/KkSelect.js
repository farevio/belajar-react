import React from 'react';
import PropTypes from 'prop-types';

export default function KkSelect({kkList, value, onChange, name}) {
    KkSelect.propTypes = {
        kkList: PropTypes.arrayOf(PropTypes.object).isRequired,
        value: PropTypes.string,
        onChange: PropTypes.func,
        name: PropTypes.string
    }
    return (
        <select className="form-control" name={name} value={value} onChange={onChange}>
            <option value=""></option>
            {kkList.map(kk => {
                return <option key={kk.id} value={kk.id}>{kk.name}</option>
            })}
        </select>
        
    )
}