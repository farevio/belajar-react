import React from 'react';

import TopicOptRows from "./TopicOptRows";

export default class TopicOptControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabledOpt1: '',
            disabledOpt2: '',
        };
    }
    render() {
        return (<div className="col-xs-12">
            <table className="table table-scroll">
                <thead>
                    <tr className="row">
                        <th className="-col-xs-10">Nama Topik Ta</th>
                        <th>Quota Topik</th>
                        <th className="-col-xs-1">Pilih</th>
                    </tr>
                </thead>
                <tbody>
                    <TopicOptRows {...this.props} />
                </tbody>
            </table>
        </div>);
    }
}
