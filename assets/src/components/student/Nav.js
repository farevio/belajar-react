import React from 'react';
import PropTypes from 'prop-types';

export const MENU = {
    STATUS: 'status',
    SELECT_TOPIC: 'select-topic',
    SET_TOPIC_TITLE: 'set-topic-title'
}

export default function Nav({ activeMenu, showTopicTitle }) {
    Nav.propTypes = {
        activeMenu: PropTypes.oneOf(Object.values(MENU))
    }
    return (
        <ul className="nav navbar-nav">
            <li
                role="presentation"
                className={activeMenu == MENU.SELECT_TOPIC ? 'active' : undefined}
            >
                <a href="/student/topic-selection/new">Pilih Topik</a>
            </li>
            <li
                role="presentation"
                className={activeMenu == MENU.STATUS ? 'active' : undefined}
            >
                <a href="/student/topic-selection/status">Status Topik</a>
            </li>
            <li
                role="presentation"
                className={activeMenu == MENU.SET_TOPIC_TITLE ? 'active' : undefined}
            >
                <a href="/student/topic-title/set">Buat Judul Topik</a>
            </li>
        </ul>
    )
}
