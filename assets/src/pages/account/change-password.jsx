import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../../components/Navbar';
import Layout from '../../components/layouts';
function SuccessAlert() {
    return (
        <div class="alert alert-success alert-dismissible" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <strong>Berhasil!</strong> Password anda berhasil diganti.
        </div>
    )
}

class ChangePasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            newPasswordCheck: '',
            errorMessages: {
                oldPassword: '',
                newPasswordCheck: ''
            },
            isSuccess: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const {oldPassword, newPassword, newPasswordCheck} = this.state;
        if (newPassword != newPasswordCheck) {
            return this.setState({errorMessages: {newPasswordCheck: 'Password yang anda ketik salah'}});
        }
        fetch('/account/change-password', {
            method: 'POST',
            body: JSON.stringify({oldPassword, newPassword})
        }).then(res => {
            switch (res.headers.get('X-Exit')) {
                case 'success':
                    this.setState({isSuccess: true, oldPassword: '', newPassword:'', newPasswordCheck:'', errorMessages: {}});
                    break;
                case 'incorrectOldPassword':
                    this.setState({errorMessages: {oldPassword: 'Password lama yang anda ketik salah'}});
                    break;
                default:
                    break;
            }
        })
    }

    render() {
        const {oldPassword, newPassword, newPasswordCheck, errorMessages, isSuccess} = this.state;
        return (
            <div>
                {isSuccess && <SuccessAlert />}
                <form onSubmit={this.handleSubmit}>
                    <div className={`form-group ${errorMessages.oldPassword && 'has-error'}`}>
                        <label htmlFor="oldPassword">Password Lama</label>
                        <input type="password" className="form-control" name="oldPassword" value={oldPassword} onChange={this.handleChange}/>
                        <p className="help-block">{errorMessages.oldPassword}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">Password Baru</label>
                        <input type="password" className="form-control" name="newPassword" value={newPassword} onChange={this.handleChange}/>
                    </div>
                    <div className={`form-group ${errorMessages.newPasswordCheck && 'has-error'}`}>
                        <label htmlFor="newPasswordCheck">Ulangi Password Baru</label>
                        <input type="password" className="form-control" name="newPasswordCheck" value={newPasswordCheck} onChange={this.handleChange}/>
                        <p className="help-block">{errorMessages.newPasswordCheck}</p>
                    </div>
                    <button type="submit" className="btn btn-default">Simpan</button>
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
                <h1>Ganti Password</h1>
                <ChangePasswordForm />
            </div>
        </div>
    )
}

ReactDOM.render(<Layout><Page /></Layout>, document.getElementById('root'));