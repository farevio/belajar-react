import React from 'react';
import PropTypes from 'prop-types';

export const MENU = {
    TOPIC_ARCHIVES: 'topic_archives',
    TOPIC_SELECTIONS: 'topicselections',
    TOPIC_SELECTION_ARCHIVES: 'topic_selection_archives',
    SET_CURRENT_PERIOD: 'set_period',
    PLO_SETTING: 'plo',
    CLO_SETTING: 'clo',
    CLO_RUBRIC_SETTING: 'clorubric'
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
                    className={activeMenu == MENU.TOPIC_ARCHIVES ? 'active' : undefined}
                >
                    <a href="/admin/topic-archives">Arsip Topik</a>
                </li>
                <li
                    role="presentation"
                    className={activeMenu == MENU.TOPIC_SELECTIONS ? 'active' : undefined}
                >
                    <a href="/admin/topic-selections">Pemilihan Topik</a>
                </li>
                <li
                    role="presentation"
                    className={activeMenu == MENU.TOPIC_SELECTION_ARCHIVES ? 'active' : undefined}
                >
                    <a href="/admin/topic-selections-archives">Arsip Pemilihan Topik</a>
                </li>
                <li
                    role="presentation"
                    className={activeMenu == MENU.SET_CURRENT_PERIOD ? 'active' : undefined}
                >
                    <a href="/admin/period/change">Ganti Periode</a>
                </li>
                <li
                    role="presentation"
                    className={activeMenu == MENU.PLO_SETTING ? 'active' : undefined}
                >
                    <a href="/admin/plo-setting">Atur PLO</a>
                </li>
                <li
                    role="presentation"
                    className={activeMenu == MENU.CLO_SETTING ? 'active' : undefined}
                >
                    <a href="/admin/clo-setting">Atur CLO</a>
                </li>
                <li
                    role="presentation"
                    className={activeMenu == MENU.CLO_RUBRIC_SETTING ? 'active' : undefined}
                >
                    <a href="/admin/clo-rubric-setting">Atur Rubrik CLO</a>
                </li>

            </ul>
        </div>
    )
}