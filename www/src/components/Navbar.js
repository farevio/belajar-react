import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

import StudentNav from '../components/student/Nav';
import LecturerNav from '../components/lecturer/Nav';
import AdminNav from '../components/admin/Nav';

export const MENU = {
    HOME: 'home',
    LOGIN: 'login',
    SIGNUP: 'signup',
    TOPICS: 'topics'
};

function UserControl({userName}) {
    const handleLogout = () => {
        fetch('/entrance/logout', {
            method: 'POST',
        }).then(res => location.href = res.url)
    }
    return (
        <li className="dropdown">
            <a 
                href="#" 
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
            >
                {userName}<span className="caret"></span>
            </a>
            <ul className="dropdown-menu" aria-labelledby="userAction">
                <li><a href="#" onClick={handleLogout}>Logout</a></li>
                <li><a href="/account/password/change">Ganti Password</a></li>
            </ul>
        </li>
    )
}

export default function Navbar(props) {
    Navbar.propTypes = {
        activeMenu: PropTypes.string
    }
    const activeMenu = props.activeMenu;
    const userName = Cookies.get('userName');
    const userType = Cookies.get('userType');
    let userNav;
    switch (userType) {
        case 'student':
            userNav = <StudentNav activeMenu={activeMenu}/>;
            break;
        case 'lecturer':
            userNav = <LecturerNav activeMenu={activeMenu}/>;
            break;
        case 'admin':
            userNav = <AdminNav activeMenu={activeMenu}/>;
            break;
        default:
            userNav = <></>
    }
    const loginLink = (<li className={activeMenu == MENU.LOGIN? 'active': null} >
        <a href="/login">Login</a></li>);
    const signupLink =(<li className={activeMenu == MENU.SIGNUP? 'active': null} >
        <a href="/signup">Signup</a></li>);
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button
                        type="button"
                        className="navbar-toggle collapsed"
                        data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                    </button>
                    <a className="navbar-brand" href="#">
                        Aplikasi TA 1
                    </a>
                </div>

                <div
                    className="collapse navbar-collapse"
                    id="bs-example-navbar-collapse-1"
                >
                    <ul className="nav navbar-nav">
                        <li className={activeMenu == MENU.HOME? 'active' : ''}>
                            <a href="/">
                                Beranda
                            </a>
                        </li>
                        <li className={activeMenu == MENU.TOPICS? 'active' : ''}>
                            <a href="/topics">
                                Daftar Topik
                            </a>
                        </li>
                    </ul>
                    {userNav}
                    <ul className="nav navbar-nav navbar-right">
                        {userName ? <UserControl userName={userName} /> : <React.Fragment>{loginLink}{signupLink}</React.Fragment>}
                    </ul>
                </div>
            </div>
        </nav>
    );
};