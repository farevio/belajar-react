import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../../components/Navbar';

import { Row, Col, Form, FormGroup, FormInput, Button } from "shards-react";

class NewPasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            passwordCheck: '',
            isPasswordChecked: false,
            errorMessages: {
                password: '',
                passwordCheck: '',
                general: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    validate(e) {
        this.setState((state) => {
            if (!state.password) {
                const message = 'Password harus diisi';
                return { errorMessages: { password: message, isPasswordChecked: true } };
            }
            else if (state.password != state.passwordCheck) {
                const message = 'Password tidak sama'
                return { errorMessages: { passwordCheck: message }, isPasswordChecked: true };
            } else {
                return { errorMessages: { errorMessages: {} } }
            }
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.validate();
        const { errorMessages, password } = this.state;
        if (errorMessages.passwordCheck || errorMessages.password) return;
        const params = new URLSearchParams(location.search);
        const userType = params.get('userType');
        const token = params.get('token');
        fetch('/entrance/new-password-and-login', {
            method: 'POST',
            body: JSON.stringify({ password, userType, token }),
        })
            .then(res => {
                if (res.redirected) window.location.href = res.url;
                else if (res.status == 410) this.setState({ errorMessages: { generic: 'Link yang anda gunakan sudah tidak berlaku' } })
            })

    }
    render() {
        const { isPasswordChecked, errorMessages } = this.state;
        const passwordClassName = errorMessages.passwordCheck || errorMessages.password ? 'has-error' : isPasswordChecked ? "has-success" : "";
        return (
            <form onSubmit={this.handleSubmit}>
                <div className={`form-group ${passwordClassName}`}>
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" onChange={this.handleChange} />
                    <span className="help-block">{errorMessages.password}</span>
                </div>
                <div className={`form-group ${passwordClassName}`}>
                    <label htmlFor="passwordCheck">Ketik Ulang Password</label>
                    <input type="password" className="form-control" name="passwordCheck" onChange={this.handleChange} onBlur={this.validate} />
                    <span className="help-block">{errorMessages.passwordCheck}</span>
                </div>
                <button type="submit" className="btn btn-default">Buat</button>
                <p className="help-block">{errorMessages.general}</p>
            </form>
        );
    }
}

const Page = () => {
    return (<div id="page" style={{ height: "100%" }}>
        {/* <Navbar activeMenu={MENU.SIGNUP}/> */}
        <Row style={{ margin: '0', textAlign: 'center', height: '100%' }}>
            <Col sm="12" lg="6" style={{ padding: '0 4em' }} >

                <img src="/images/fri.png" style={{ maxHeight: "10em", margin: '5em 0 2em 0' }} ></img>
                <p style={{ marginBottom: '4em' }}>Selamat Datang di Aplikasi TA 1</p>


                <h1>Masukkan password baru</h1>
                <NewPasswordForm />
            </Col>
            <Col sm="12" lg="6">
                <div className="gedungFRI"></div>
            </Col>
        </Row>
    </div>
    );
}
ReactDOM.render(<Page />, document.getElementById('root'));