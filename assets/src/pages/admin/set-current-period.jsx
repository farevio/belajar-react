import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar';
import Nav, {MENU as ADMIN_MENU} from '../../components/admin/Nav';
import Layout from '../../components/layouts';

class PeriodForm extends React.Component {
    constructor(props) {
        super(props);
        PeriodForm.propTypes = {
            currentPeriod: PropTypes.object
        }
        this.state = {
            academicYear: '',
            semester: this.props.currentPeriod && this.props.currentPeriod.semester == 'GANJIL' ? 'GENAP' : 'GANJIL'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({[e.target.value]: e.target.name});
    }
    handleSubmit(e) {
        e.preventDefault();
        if (!confirm('Apakah anda yakin akan mengupdate periode')) return;
        fetch('/admin/set-current-period', {
            method: 'POST',
            body: JSON.stringify(this.state)
        }).then(res => {

        })
    }
    render() {
        const {currentPeriod} = this.props;
        const nextAcademicYear = currentPeriod
            ? currentPeriod.academicYear.split('-').map(year => parseInt(year) + 1).join('-')
            : '';
        return (
            <>
                {currentPeriod && 
                    (<div>
                        <h3>Periode Sebelumnya</h3>
                        <dl className="dl-horizontal">
                            <dt>Semester</dt>
                            <dd>{currentPeriod.semester}</dd>
                            <dt>Tahun Akademik</dt>
                            <dd>{currentPeriod.academicYear}</dd>
                        </dl>
                    </div>)
                }
                <div>
                    <h3>Update Periode</h3>
                    <form name="period" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="semester">Semester</label>
                            <select name="semester" className="form-control" value={this.state.semester} onChange={this.handleChange}>
                                <option value="GANJIL">Ganjil</option>
                                <option value="GENAP">Genap</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="academicYear">Tahun Akademik</label>
                            <input type="text" className="form-control" name="academicYear" placeholder={nextAcademicYear} onChange={this.handleChange}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
            </>
        )
    }
}

PeriodForm.propTypes = {
    currentPeriod: PropTypes.object
}

function Page() {
    const {currentPeriod} = SAILS_LOCALS;
    return (
        <div className="page main-content-container px-4 pb-4 container-fluid">
            {/* <Navbar activeMenu={ADMIN_MENU.SET_CURRENT_PERIOD} /> */}
            <div className="container">
                <div className="content">
                    <h1>Aktivasi Periode</h1>
                    <PeriodForm currentPeriod={currentPeriod}/>
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(<Layout><Page /></Layout>, document.getElementById('root'));