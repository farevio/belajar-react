import React from 'react';
import { Form, FormInput, FormGroup,Button } from "shards-react";

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: '',
            userIdVal: '', //nik/nim/id
            password: '',
            errorMessages: {
                userIdVal: '',
                password: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserIdValChange = this.handleUserIdValChange.bind(this);
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleUserIdValChange(e) {
        const userIdVal = parseInt(e.target.value);
        this.setState({ userIdVal });
    }
    handleSubmit(e) {
        e.preventDefault();
        fetch('/entrance/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        }).then(res => {
            if (res.redirected) window.location = res.url;
            else {
                const userIdKey = this.state.userType == 'student' ? 'nim'
                    : this.state.userType == 'lecturer' ? 'nik'
                        : this.state.userType == 'admin' ? 'id'
                            : '';
                const userIdVal = this.state.userIdVal;
                this.setState(state => {
                    switch (res.headers.get('X-Exit')) {
                        case 'userNotFound':
                            return { errorMessages: { userIdVal: `User dengan ${userIdKey} ${userIdVal} tidak ditemukan` } };
                        case 'incorrectPassword':
                            return { errorMessages: { password: `password tidak cocok dengan ${userIdKey}` } };
                        case 'passwordNotSet':
                            return { errorMessages: { password: `Anda belum membuat password dalam tahap signup` } };
                        default:
                            return;
                    }
                });
            }
        })
    }
    render() {
        const { userType = null, userIdVal, password, errorMessages } = this.state;
        const userIdKey = this.state.userType == 'student' ? 'nim'
            : this.state.userType == 'lecturer' ? 'nik'
                : this.state.userType == 'admin' ? 'id'
                    : '';
        return (
            <Form method="post" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="userType">Login akun sebagai</label>
                    <select className="form-control" name="userType" value={userType} onChange={this.handleChange}>
                        <option value="" defaultValue></option>
                        <option value="student">Mahasiswa</option>
                        <option value="lecturer">Dosen</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                {userType ?
                    <React.Fragment>
                        <div className={`form-group ${errorMessages.userIdVal ? 'has-error' : ''}`}>
                            <label htmlFor="userIdVal">{userIdKey.toUpperCase()}</label>
                            <input type="number" className="form-control" name="userIdVal" value={userIdVal} onChange={this.handleUserIdValChange} />
                            <span className="help-block">{errorMessages.userIdVal}</span>
                        </div>
                        <div className={`form-group ${errorMessages.password ? 'has-error' : ''}`}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                            <span className="help-block">{errorMessages.password}</span>
                        </div>
                    </React.Fragment> : null}
                     {/* <FormGroup>
        <label htmlFor="#username">Username</label>
        <FormInput id="#username" placeholder="Username Igracias" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="#password">Password</label>
        <FormInput type="password" id="#password" placeholder="Password Igracias" />
      </FormGroup> */}
      <Button block theme="success">Masuk</Button>
                {/* <button type="submit" className="btn btn-default">Login</button>
                <p className="help-block"><a href="/password/forgot">Lupa password</a></p> */}
        </Form>
        )
    }
}
