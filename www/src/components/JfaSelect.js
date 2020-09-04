import React from 'react';
import PropTypes from 'prop-types';

export default function JfaSelect({jfaList, value, onChange, name}) {
    JfaSelect.propTypes = {
        jfaList: PropTypes.arrayOf(PropTypes.object).isRequired,
        value: PropTypes.string,
        onChange: PropTypes.func,
        name: PropTypes.string
    }
    return (
        <select className="form-control" name={name} value={value} onChange={onChange}>
            <option value=""></option>
            {jfaList.map(jfa => {
                return <option key={jfa.id} value={jfa.id}>{jfa.name}</option>
            })}
        </select>
        
    )
}