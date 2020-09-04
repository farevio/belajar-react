import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar';
import { MENU as STUDENT_MENU } from '../../components/student/Nav';

class TopicTitleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topicTitle: '',
            hasEdited: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {
        const { topicTitleRecord } = this.props;
        const topicTitle = topicTitleRecord ? topicTitleRecord.topicTitle : '';
        this.setState({ topicTitle })
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value, hasEdited: true });
    }
    validate() {
        this.setState(state => {
            const topicTitle = state.topicTitle;
            return {
                errorMessages: {
                    topicTitle: topicTitle ? '' : 'Kolom nama tidak boleh kosong'
                }
            }
        });
        if (!this.state.topicTitle) return false;
        else return true;
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.validate()) {
            fetch('/student/set-topic-title', {
                method: 'POST',
                body: JSON.stringify(this.state)
            }).then(res => {
                if (res.redirected) {
                    location.href = res.url;
                }
            })
        }
    }
    render() {
        const { topicTitleRecord, topic } = this.props;
        return (
            <form
                method="POST"
                onSubmit={this.handleSubmit}
            >
                <div className="form-group">
                    <label className="col-sm-2 control-label">Topik</label>
                    <div className="col-sm-10">
                        <p className="form-control-static">{topic.name}</p>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2" htmlFor="topicTitle">
                        Judul
                    </label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            type="text"
                            name="topicTitle"
                            value={this.state.topicTitle}
                            onChange={this.handleChange}
                        />
                        <p className="help-block">{topicTitleRecord && topicTitleRecord.status}</p>
                    </div>
                </div>
                <button
                    className="btn btn-default"
                    onClick={this.handleSubmit}
                    disabled={!this.state.hasEdited}
                >
                    Simpan
                </button>
            </form>
        )
    }
}
TopicTitleForm.propTypes = {
    topicTitleRecord: PropTypes.object,
    topic: PropTypes.object.isRequired
}

function Page() {
    const { topicTitleRecord, topic } = window.SAILS_LOCALS;
    return (
        <div>
            <Navbar activeMenu={STUDENT_MENU.SET_TOPIC_TITLE} />
            <div className="container">
                <h1>Buat Judul Topik</h1>
                <TopicTitleForm
                    topicTitleRecord={topicTitleRecord}
                    topic={topic}
                />
            </div>
        </div>
    )
}

ReactDOM.render(<Page />, document.getElementById('root'));
