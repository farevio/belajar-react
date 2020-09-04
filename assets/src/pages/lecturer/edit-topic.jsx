import React from 'react';
import ReactDOM from 'react-dom';

import Navbar from '../../components/Navbar';
import Nav from '../../components/lecturer/Nav';
import PeminatanSelect from '../../components/PeminatanSelect';
import Layout from '../../components/layouts'

class TopicEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.topic.id,
            name: this.props.topic.name,
            quota: this.props.topic.quota,
            peminatanId: this.props.topic.peminatan,
            errorMessages: {
                quota: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    validate() {
        this.setState(state => {
            const {name, quota, peminatanId} = state;
            return {
                errorMessages: {
                    name: name? '' : 'Kolom nama tidak boleh kosong',
                    peminatanId: peminatanId? '' : 'Kolom peminatan tidak boleh kosong'
                }
            }
        });
        const {name, peminatanId} = this.state;
        if (!name || !peminatanId) return false;
        else return true;
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.validate()) {
            fetch('/lecturer/edit-topic', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            }).then(res => {
                if (res.redirected) location.href = res.url;
                else if (res.headers.get('X-Exit') == 'quotaConflict') {
                    res.json().then(({minQuota})=> {
                        this.setState(state => {
                            let newErrorMessages = state.errorMessages;
                            newErrorMessages.quota = 'Kuota harus tidak kurang dari ' + minQuota + ', yaitu jumlah anggota kelompok yang sudah memilih topik ini';
                            return {errorMessages: newErrorMessages}
                        })
                    })
    
                }
            });
        }
    }

    render() {
        const {topic, peminatanList} = this.props;
        const {name, quota, peminatanId, errorMessages} = this.state;
        return (
            <div className="container">
                
                <form
                    className="form-horizontal"
                    onSubmit={this.handleSubmit}
                >
                    <input className="hidden" type="text" name="id" value={topic.id} readOnly/>
                    <div className={`form-group ${errorMessages.name && 'has-error'}`}>
                        <label htmlFor="name" className="col-sm-2 control-label">
                            Nama Topik TA
                        </label>
                        <div className="col-sm-10">
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                value={name}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="col-sm-offset-2 col-sm-10">
                            <p className="help-block">{errorMessages.name}</p>
                        </div>
                    </div>
                    <div className={`form-group ${errorMessages.quota && 'has-error'}`}>
                        <label className="col-sm-2 control-label" htmlFor="quota">
                            Kuota
                        </label>
                        <div className="col-sm-2">
                            <input
                                className="form-control"
                                type="number"
                                name="quota"
                                value={quota}
                                onChange={this.handleChange}
                                min={1}
                            />
                        </div>
                        <p className="help-block">{errorMessages.quota}</p>
                    </div>
                    <div className={`form-group ${errorMessages.peminatanId && 'has-error'}`}>
                        <label className="col-sm-2 control-label" htmlFor="peminatanId">
                            Peminatan
                        </label>
                        <div className="col-sm-2">
                            <PeminatanSelect name="peminatanId" peminatanList={peminatanList} value={peminatanId} onChange={this.handleChange}/>
                        </div>
                        <p className="help-block">{errorMessages.peminatanId}</p>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-default">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function Page() {
    return (
        <div className="page main-content-container px-4 pb-4 container-fluid">
            {/* <Navbar /> */}
            <div className="container">
                <h1>Edit Topik TA</h1>
                <TopicEditForm
                    topic={window.SAILS_LOCALS.topic}
                    peminatanList={window.SAILS_LOCALS.peminatanList}
                />
            </div>
        </div>
    )
}

ReactDOM.render(
    <Layout>
    <Page
    /></Layout>,
    document.getElementById("root")
);
