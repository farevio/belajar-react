import React from 'react';
import PropTypes from 'prop-types';
import PeminatanSelect from '../components/PeminatanSelect';
import PeriodSelect from './PeriodSelect';
import handleFilterChange from './handleFilterChange';


export default class TopicFilter extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        handleFilterChange(e);
    }
    render() {
        const { peminatanList, periods } = this.props;
        const searchParams = new URLSearchParams(window.location.search);
        const peminatanId = searchParams.get('peminatanId')
        const periodId = searchParams.get('periodId');
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="peminatanId">Peminatan</label>
                    <PeminatanSelect
                        name="peminatanId"
                        value={peminatanId}
                        peminatanList={peminatanList}
                        onChange={this.handleChange}
                    />
                </div>
                {periods && <div className="form-group">
                    <label htmlFor="semester">Periode</label>
                    <PeriodSelect
                        name="periodId"
                        value={periodId}
                        periods={periods}
                        onChange={this.handleChange}
                    />
                </div>}
            </form>
        )
    }
}

TopicFilter.propTypes = {
    peminatanList: PropTypes.arrayOf(PropTypes.object).isRequired,
    periods: PropTypes.arrayOf(PropTypes.object)
}
