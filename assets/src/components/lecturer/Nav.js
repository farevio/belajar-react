import React from 'react';
import PropTypes from 'prop-types';

export const MENU = {
    APPROVE: 'approve',
    APPROVE_TITLE: 'approve-title',
    NEW: 'new',
    LIST: 'list',
}

export default function Nav({ activeMenu }) {
    Nav.propTypes = {
        activeMenu: PropTypes.oneOf(Object.values(MENU))
    }
    return (
        <div className="submenu">
            <ul className="nav navbar-nav">
                <li
                    role="presentation"
                    className={activeMenu == MENU.LIST ? 'active' : undefined}
                >
                    <a href="/lecturer/topics">Daftar Topik Anda</a>
                </li>
                <li
                    role="presentation"
                    className={activeMenu == MENU.NEW ? 'active' : undefined}
                >
                    <a href="/lecturer/topic/new">Buat Topik</a>
                </li>
                <li
                    role="presentation"
                    className={activeMenu == MENU.APPROVE ? 'active' : undefined}
                >
                    <a href="/lecturer/topic-approvals">Setujui Topik</a>
                </li>
                <li
                    role="presentation"
                    className={activeMenu == MENU.APPROVE_TITLE ? 'active' : undefined}
                >
                    <a href="/lecturer/topic-title-approvals">Setujui Judul Topik</a>
                </li>
            </ul>
        </div>
    )
}
