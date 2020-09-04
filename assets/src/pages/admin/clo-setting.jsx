import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import Navbar from '../../components/Navbar';
import { MENU as ADMIN_MENU } from '../../components/admin/Nav';
import EditableTable from '../../components/EditableTable';
import Layout from '../../components/layouts';

const getCloFormErrors = (data) => {
    const errorMessages = {}
    if (!data.ploId) {
        errorMessages.set('ploId', 'PLO tidak boleh kosong')
    } else {
        errorMessages.delete('ploId');
    }
    return errorMessages;
}

class CloForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.defaultClo && props.defaultClo.id,
            ploId: props.defaultClo && props.defaultClo.plo.id,
            cloCode: props.defaultClo && props.defaultClo.cloCode,
            description: props.defaultClo && props.defaultClo.description,
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
            const errorMessages = getCloFormErrors(state);
            return { errorMessages }
        });
        const errorMessages = getCloFormErrors(state);
        return errorMessages.size == 0;
    }
    handleSubmit(e) {
        e.preventDefault();
        if (!this.validate) return;
        if (this.props.mode == 'NEW') {
            fetch('/admin/new-clo', {
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
            fetch('/admin/edit-clo', {
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
        const { ploList } = this.props;
        const ploSelect = (
            <select className="form-control" name="ploId" value={this.state.ploId} onChange={this.handleChange}>
                <option value=""></option>
                {ploList.map(plo => <option key={plo.id} value={plo.id}>{plo.ploCode}</option>)}
            </select>
        );
        return (
            <form
                className="form-horizontal"
                method="POST"
                onSubmit={this.handleSubmit}
            >
                <div className="form-group">
                    <label className="col-sm-2 control-label" htmlFor="ploId">
                        PLO
                    </label>
                    <div className="col-sm-6">
                        {ploSelect}
                    </div>
                    <p className="help-block">{this.state.errorMessages.get('ploId')}</p>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label" htmlFor="cloCode">
                        Kode CLO
                    </label>
                    <div className="col-sm-6">
                        <input
                            className="form-control"
                            type="text"
                            name="cloCode"
                            value={this.state.cloCode}
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
CloForm.propTypes = {
    mode: PropTypes.oneOf(['NEW', 'EDIT', '']),
    ploList: PropTypes.arrayOf(PropTypes.object),
    defaultClo: PropTypes.object
}

class EditablePloTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: '',
            cloToEdit: '',
        }
        this.handleNew = this.handleNew.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    handleNew() {
        this.setState({ mode: 'NEW', cloToEdit: '' });
    }
    handleEdit(cloId) {
        const cloToEdit = this.props.cloList.find(clo => clo.id == cloId);
        this.setState({ cloToEdit, mode: 'EDIT' });
    }
    handleDelete(cloId) {
        const clo = this.props.cloList.find(clo => clo.id == cloId);
        const shouldDelete = confirm(`Apakah anda yakin akan menghapus PLO dengan kode ${clo.cloCode}?`);
        if (shouldDelete) {
            fetch('/admin/delete-clo', {
                method: 'POST',
                body: JSON.stringify({ id: cloId })
            }).then(res => {
                const exitCode = res.headers.get('X-Exit');
                if (exitCode == 'success') {
                    window.location.reload(true);
                }
            })
        }
    }
    closeModal() {
        this.setState({ mode: '', cloToEdit: '' });
    }
    render() {
        const { cloList, ploList } = this.props;
        const cloIds = cloList.map(plo => plo.id);
        const cloTuples = cloList.map(clo => [clo.plo.ploCode, clo.cloCode, clo.description]);
        return (
            <div>
                <button className="btn btn-default" onClick={this.handleNew}>Buat CLO</button>
                <EditableTable
                    columns={['Kode PLO', 'Kode CLO', 'Deskripsi']}
                    tuples={cloTuples}
                    rowIds={cloIds}
                    onRowDelete={this.handleDelete}
                    onRowEdit={this.handleEdit}
                />
                <ReactModal
                    appElement={document.getElementById('root')}
                    isOpen={!!this.state.mode}
                    onRequestClose={this.closeModal}
                >
                    <CloForm
                        mode={this.state.mode}
                        ploList={ploList}
                        id={this.state.cloToEdit.id}
                        defaultClo={this.state.cloToEdit}
                    />
                </ReactModal>
            </div>
        )
    }
}

EditablePloTable.propTypes = {
    cloList: PropTypes.arrayOf(PropTypes.object),
    ploList: PropTypes.arrayOf(PropTypes.object)
}

function Page() {
    const { cloList, ploList } = window.SAILS_LOCALS;
    return (
        <div id="page" className="page main-content-container px-4 pb-4 container-fluid">
            {/* <Navbar activeMenu={ADMIN_MENU.CLO_SETTING} /> */}
            <div className="container">
                <h1>Atur CLO</h1>
                <EditablePloTable cloList={cloList} ploList={ploList} />
            </div>
        </div>
    )
}

ReactDOM.render(<Layout><Page /></Layout>, document.getElementById('root'));
