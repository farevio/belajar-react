import React from 'react';
import ReactDOM from 'react-dom';

import Navbar, {MENU as NAVBAR_MENU} from '../../components/Navbar';
import Nav, {MENU as LECTURER_MENU} from '../../components/lecturer/Nav';
import PeminatanSelect from '../../components/PeminatanSelect'
import Layout from '../../components/layouts'

class TopicCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            quota: 5,
            peminatanId: '',
            errorMessages: {
                name: '',
                quota: '',
                peminatanId: ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            fetch('/lecturer/new-topic', {
                method: 'POST',
                body: JSON.stringify(this.state)
            }).then(res => {
                res.redirected ? location.href = res.url : null;
            })
        }
    }

    render() {
        const peminatanList = this.props.peminatanList;
        const {name, quota, peminatanId, errorMessages} = this.state;
        return (
            <form
                className="form-horizontal"
                method="POST"
                onSubmit={this.handleSubmit}
            >
                <div className={`form-group ${errorMessages.name ? 'has-error' : ''}`}>
                    <label className="col-sm-2 control-label" htmlFor="name">
                        Nama
                    </label>
                    <div className="col-sm-6">
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            value={name}
                            onChange={this.handleChange}
                        />
                        <span className="help-block">
                            {errorMessages.name}
                        </span>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label" htmlFor="quota">
                        Kuota
                    </label>
                    <div className="col-sm-2">
                        <input
                            className="form-control"
                            type="number"
                            name="quota"
                            min="1"
                            value={quota}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className={`form-group ${errorMessages.peminatanId ? 'has-error' : ''}`}>
                    <label className="col-sm-2 control-label" htmlFor="peminatanId">
                        Peminatan
                    </label>
                    <div className="col-sm-6">
                        <PeminatanSelect peminatanList={peminatanList} name="peminatanId" value={peminatanId} onChange={this.handleChange} />
                        <span className="help-block">
                            {errorMessages.peminatanId}
                        </span>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button className="btn btn-default" type="submit">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

const Page = () => {
    return (
        <div className="page main-content-container px-4 pb-4 container-fluid">
            {/* <Navbar activeMenu={LECTURER_MENU.NEW} /> */}
            <div className="container">
                <h1>Buat Topik</h1>
                <TopicCreate peminatanList={window.SAILS_LOCALS.peminatanList}/>
            </div>
        </div>
    )
}

ReactDOM.render(
    <Layout><Page /></Layout>,
    document.getElementById("root")
);
