import React from 'react';
import PropTypes from 'prop-types';

export default function PeriodTag({ period }) {
    PeriodTag.propTypes = {
        period: PropTypes.object.isRequired
    }
    return (<small>{period.semester ? period.semester : 'belum set semester'} {period.academicYear? period.academicYear : 'belum set tahun akademik'}</small>)
}
