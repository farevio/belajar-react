import React from 'react';
import PropTypes from 'prop-types';
import KkSelect from './KkSelect';

export default function PeminatanSelect({ peminatanList, value, onChange, name,selectedKK }) {
    PeminatanSelect.propTypes = {
        peminatanList: PropTypes.arrayOf(PropTypes.object).isRequired,
        value: PropTypes.string,
        onChange: PropTypes.func,
        name: PropTypes.string
    }
    return (name=="peminatanId"?
        <select className="form-control" name={name} value={value || ''} onChange={onChange}>
            <option value=""></option>
            {peminatanList.map(peminatan => {
                return <option key={peminatan.id} value={peminatan.id + ""}>{peminatan.name}</option>
            })}
        </select>:
        <select className="form-control" name={name} value={value || ''} onChange={onChange}>
        <option value=""></option>
        {peminatanList.map(peminatan => {
            if(peminatan.kk_id == selectedKK){
            return <option key={peminatan.id} value={peminatan.id + ""}>{peminatan.name}</option>
            }
        })}
    </select>
    )
}
