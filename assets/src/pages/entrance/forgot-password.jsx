import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../../components/Navbar';
import Layout from '../../components/layouts';
function SuccessAlert() {
    return (
        <div class="alert alert-success alert-dismissible" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <strong>Sukses!</strong> Link untuk membuat password baru sudah dikirimkan ke email anda.
        </div>
    )
}

class ForgotPasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: '',
            userIdVal: '',
            errorMessage: '',
            isSuccess: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const value = e.target.value;
        const parsedValue = !isNaN(value) ? parseInt(value) : value
        this.setState({[e.target.name]: parsedValue});
    }

    handleSubmit(e) {
        e.preventDefault();
        const {userType, userIdVal} = this.state;
        fetch('/entrance/send-password-recovery', {
            method: 'POST',
            body: JSON.stringify({userType, userIdVal})
        })
        .then(res => {
            if (res.status == 200) {
                this.setState({isSuccess: true, userIdVal: '', errorMessage: ''});
            }
            else if (res.headers.get('X-Exit') == 'userNotFound') {
                const userIdKey = userType == 'student' ? 'nim' : 'nik';
                this.setState({errorMessage: `User dengan ${userIdKey.toUpperCase()} ${userIdVal} tidak ditemukan`})
            }
        });
    }

    render() {
        const {userType, userIdVal, errorMessage, isSuccess} = this.state;
        const userIdKey = userType=='student'? 'nim' : 'nik'
        return (
            <div>
                {isSuccess && <SuccessAlert />}
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="userType">Jenis Akun</label>
                        <select className="form-control" name="userType" value={userType} onChange={this.handleChange}>
                            <option value="" defaultValue>Pilih jenis akun</option>
                            <option value="student">Mahasiswa</option>
                            <option value="lecturer">Dosen</option>
                        </select>
                    </div>
                    {userType?
                        <React.Fragment>
                            <div className="form-group">
                                <label htmlFor="userIdVal">{userIdKey.toUpperCase()}</label>
                                <input type="number" className="form-control" name="userIdVal" value={userIdVal} onChange={this.handleChange} />
                                <span className="help-block">{errorMessage}</span>
                            </div>
                        </React.Fragment> : null}
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        )
    }
}

function Page() {
    return (
        <div className="page main-content-container px-4 pb-4 container-fluid">
            {/* <Navbar /> */}
            <div className="container">
                <h1>Lupa password</h1>
                <ForgotPasswordForm />
            </div>
        </div>
    )
}

ReactDOM.render(<Layout><Page /></Layout>, document.getElementById('root'));