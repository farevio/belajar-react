import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import Navbar from '../../components/Navbar';
import { MENU as ADMIN_MENU } from '../../components/admin/Nav';
import EditableTable from '../../components/EditableTable';
import Layout from '../../components/layouts';

const getCloRubricFormErrors = (data) => {
    const errorMessages = {}
    if (!data.cloId) {
        errorMessages.set('cloId', 'CLO tidak boleh kosong')
    } else {
        errorMessages.delete('cloId');
    }
    return errorMessages;
}

class CloRubricForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.defaultRubric && props.defaultRubric.id,
            cloId: props.defaultRubric && props.defaultRubric.clo.id,
            rubricCode: props.defaultRubric && props.defaultRubric.rubricCode,
            score: props.defaultRubric && props.defaultRubric.score,
            description: props.defaultRubric && props.defaultRubric.description,
            errorMessages: new Map()
        }
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    validate() {
        this.setState((state, props) => {
            const errorMessages = getCloRubricFormErrors(state);
            return { errorMessages }
        });
        const errorMessages = getCloRubricFormErrors(state);
        return errorMessages.size == 0;
    }
    handleSubmit(e) {
        e.preventDefault();
        if (!this.validate) return;
        if (this.props.mode == 'NEW') {
            fetch('/admin/new-clo-rubric', {
                method: 'POST',
                body: JSON.stringify(this.state)
            }).then(res => {
                const exitCode = res.headers.get('X-Exit');
                if (exitCode == 'success') {
                    window.location.reload(true);
                }
            })
        } else if (this.props.mode == 'EDIT') {
            const data = { ...this.state }
            fetch('/admin/edit-clo-rubric', {
                method: 'POST',
                body: JSON.stringify(data)
            }).then(res => {
                const exitCode = res.headers.get('X-Exit');
                if (exitCode == 'success') {
                    window.location.reload(true);
                }
            })
        }
    }
    render() {
        const { cloList } = this.props;
        const cloSelect = (
            <select className="form-control" name="cloId" value={this.state.ploId} onChange={this.handleChange}>
                <option value=""></option>
                {cloList.map(clo => <option key={clo.id} value={clo.id}>{clo.cloCode}</option>)}
            </select>
        );
        return (
            <form
                className="form-horizontal"
                method="POST"
                onSubmit={this.handleSubmit}
            >
                <div className="form-group">
                    <label className="col-sm-2 control-label" htmlFor="cloId">
                        CLO
                    </label>
                    <div className="col-sm-6">
                        {cloSelect}
                    </div>
                    <p className="help-block">{this.state.errorMessages.get('cloId')}</p>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label" htmlFor="rubricCode">
                        Kode Rubrik
                    </label>
                    <div className="col-sm-6">
                        <input
                            className="form-control"
                            type="text"
                            name="rubricCode"
                            value={this.state.rubricCode}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label" htmlFor="score">
                        Nilai
                    </label>
                    <div className="col-sm-6">
                        <input
                            className="form-control"
                            type="number"
                            name="score"
                            value={this.state.score}
                            mix={0}
                            max={100}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label" htmlFor="description">
                        Deskripsi
                    </label>
                    <div className="col-sm-6">
                        <textarea
                            className="form-control"
                            rows={3}
                            name="description"
                            value={this.state.description}
                            onChange={this.handleChange}
                        />
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
        )
    }
}
CloRubricForm.propTypes = {
    mode: PropTypes.oneOf(['NEW', 'EDIT', '']),
    cloList: PropTypes.arrayOf(PropTypes.object),
    defaultRubric: PropTypes.object
}

class EditableRubricTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: '',
            rubricToEdit: '',
        }
        this.handleNew = this.handleNew.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    handleNew() {
        this.setState({ mode: 'NEW', rubricToEdit: '' });
    }
    handleEdit(rubricId) {
        const rubricToEdit = this.props.cloRubrics.find(rubric => rubric.id == rubricId);
        this.setState({ rubricToEdit, mode: 'EDIT' });
    }
    handleDelete(rubricId) {
        const cloRubric = this.props.cloRubrics.find(rubric => rubric.id == rubricId);
        const shouldDelete = confirm(`Apakah anda yakin akan menghapus rubrik CLO dengan kode ${cloRubric.rubricCode}?`);
        if (shouldDelete) {
            fetch('/admin/delete-clo-rubric', {
                method: 'POST',
                body: JSON.stringify({ id: rubricId })
            }).then(res => {
                const exitCode = res.headers.get('X-Exit');
                if (exitCode == 'success') {
                    window.location.reload(true);
                }
            })
        }
    }
    closeModal() {
        this.setState({ mode: '', rubricToEdit: '' });
    }
    render() {
        const { cloRubrics, cloList } = this.props;
        const cloRubricIds = cloRubrics.map(plo => plo.id);
        const cloRubricTuples = cloRubrics.map(rubric => [rubric.clo.cloCode, rubric.rubricCode, rubric.score, rubric.description]);
        return (
            <div>
                <button className="btn btn-default" onClick={this.handleNew}>Buat Rubrik</button>
                <EditableTable
                    columns={['Kode CLO', 'Kode Rubrik', 'Nilai', 'Deskripsi']}
                    tuples={cloRubricTuples}
                    rowIds={cloRubricIds}
                    onRowDelete={this.handleDelete}
                    onRowEdit={this.handleEdit}
                />
                <ReactModal
                    appElement={document.getElementById('root')}
                    isOpen={!!this.state.mode}
                    onRequestClose={this.closeModal}
                >
                    <CloRubricForm
                        mode={this.state.mode}
                        cloList={cloList}
                        id={this.state.rubricToEdit.id}
                        defaultRubric={this.state.rubricToEdit}
                    />
                </ReactModal>
            </div>
        )
    }
}

EditableRubricTable.propTypes = {
    cloRubrics: PropTypes.arrayOf(PropTypes.object),
    cloList: PropTypes.arrayOf(PropTypes.object)
}

function Page() {
    const { cloRubrics, cloList } = window.SAILS_LOCALS;
    return (
        <div id="page" className="page main-content-container px-4 pb-4 container-fluid">
            {/* <Navbar activeMenu={ADMIN_MENU.CLO_RUBRIC_SETTING} /> */}
            <div className="container">
                <h1>Atur Rubrik CLO</h1>
                <EditableRubricTable cloRubrics={cloRubrics} cloList={cloList} />
            </div>
        </div>
    )
}

ReactDOM.render(<Layout><Page /></Layout>, document.getElementById('root'));
