import React from 'react';
import PropTypes from 'prop-types';

export default function PeriodSelect({ periods, value, onChange, name = 'periodId' }) {
    PeriodSelect.propTypes = {
        periods: PropTypes.arrayOf(PropTypes.object).isRequired,
        value: PropTypes.string,
        onChange: PropTypes.func,
        name: PropTypes.string
    }
    return (
        <select className="form-control" name={name} value={value || ''} onChange={onChange}>
            <option value=""></option>
            {periods.map(period => {
                return <option key={period.id} value={period.id}>{period.academicYear} {period.semester}</option>
            })}
        </select>
    )
}
