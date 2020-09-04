import React from 'react';
import ReactDOM from 'react-dom';
import Navbar, { MENU } from '../../components/Navbar';

import { Row, Col, Form, FormGroup, FormInput, Button } from "shards-react";
function SuccessAlert() {
    return (
        <div class="alert alert-success alert-dismissible" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <strong>Berhasil!</strong> Link verifikasi akun sudah dikirim ke email anda.
        </div>
    )
}

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: '',
            userIdVal: '', //nik atau nim
            errorMessage: '',
            isSuccess: false

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        const { userIdVal, userType } = this.state;
        fetch(`/entrance/signup`, { method: 'POST', body: JSON.stringify({ userIdVal, userType }) })
            .then(res => {
                const exitCode = res.headers.get('X-Exit');
                if (res.status == 200) this.setState({ isSuccess: true });
                else if (exitCode) {
                    const userIdKey = userType == 'student' ? 'nim' : 'nik';
                    switch (exitCode) {
                        case 'userNotFound':
                            this.setState({ errorMessage: `Akun dengan ${userIdKey.toUpperCase()} ${userIdVal} tidak ditemukan` });
                            break;
                        case 'alreadySignedUp': {
                            const forgotPasswordLink = <a href="/password/forgot">Klik disini</a>
                            this.setState({ errorMessage: <>Anda sudah melakukan pendaftaran. {forgotPasswordLink} jika anda lupa password</> });
                            break;
                        }
                        default:
                            break;
                    }
                }
            });
    }
    render() {
        const { userType, errorMessage, userIdVal, isSuccess } = this.state;
        let userIdKey = userType == 'student' ? 'nim' : 'nik';
        return (
            <div>
                {isSuccess && <SuccessAlert />}
                <form method="post" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="userType">Daftar akun sebagai</label>
                        <select className="form-control" name="userType" value={userType} onChange={this.handleChange}>
                            <option value="" defaultValue>Pilih jenis akun</option>
                            <option value="student">Mahasiswa</option>
                            <option value="lecturer">Dosen</option>
                        </select>
                    </div>
                    {userType ?
                        <div>
                            <div className={`form-group ${errorMessage ? 'has-error' : ''}`}>
                                <label htmlFor="userIdVal">
                                    {userIdKey.toUpperCase()}
                                </label>
                                <input type="text" className="form-control" name="userIdVal" value={userIdVal} onChange={this.handleChange} />
                                <span className="help-block">{errorMessage}</span>
                            </div>
                            <button theme="success">Daftar</button>
                            <p className="help-block">Sudah Punya Akun ? <a href="/login">Login</a></p>
                        </div>
                        : null
                    }
                </form>
            </div>
        )
    }
}

ReactDOM.render(<div id="page" style={{ height: "100%" }}>
    {/* <Navbar activeMenu={MENU.SIGNUP}/> */}
    <Row style={{ margin: '0', textAlign: 'center', height: '100%' }}>
        <Col sm="12" lg="6" style={{ padding: '0 4em' }} >

            <img src="/images/fri.png" style={{ maxHeight: "10em", margin: '5em 0 2em 0' }} ></img>
            <p style={{ marginBottom: '4em' }}>Selamat Datang di Aplikasi TA 1</p>


            <h1>Register Akun</h1>
            <Signup />
        </Col>
        <Col sm="12" lg="6">
            <div className="gedungFRI"></div>
        </Col>
    </Row>
</div>, document.getElementById('root'));