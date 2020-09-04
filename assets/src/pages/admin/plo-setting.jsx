import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes, { func } from 'prop-types';
import ReactModal from 'react-modal';
import Navbar from '../../components/Navbar';
import { MENU as ADMIN_MENU } from '../../components/admin/Nav';
import EditableTable from '../../components/EditableTable';
import Layout from '../../components/layouts';

class PloForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ploCode: props.defaultPloCode || '',
            description: props.defaultDescription || ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.props.mode == 'NEW') {
            fetch('/admin/new-plo', {
                method: 'POST',
                body: JSON.stringify(this.state)
            }).then(res => {
                const exitCode = res.headers.get('X-Exit');
                if (exitCode == 'success') {
                    window.location.reload(true);
                }
            })
        } else if (this.props.mode == 'EDIT') {
            const data = { ...this.state, id: this.props.id }
            fetch('/admin/edit-plo', {
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
        return (
            <form
                className="form-horizontal"
                method="POST"
                onSubmit={this.handleSubmit}
            >
                <div className="form-group">
                    <label className="col-sm-2 control-label" htmlFor="ploCode">
                        Kode PLO
                    </label>
                    <div className="col-sm-6">
                        <input
                            className="form-control"
                            type="text"
                            name="ploCode"
                            value={this.state.ploCode}
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
PloForm.propTypes = {
    mode: PropTypes.oneOf(['NEW', 'EDIT']),
    id: PropTypes.number,
    defaultPloCode: PropTypes.string,
    defaultDescription: PropTypes.string,
}

class EditablePloTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: '',
            ploToEdit: '',
        }
        this.handleNew = this.handleNew.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    handleNew() {
        this.setState({ mode: 'NEW', ploToEdit: '' });
    }
    handleEdit(ploId) {
        const ploToEdit = this.props.ploList.find(plo => plo.id == ploId);
        this.setState({ ploToEdit, mode: 'EDIT' });
    }
    handleDelete(ploId) {
        const plo = this.props.ploList.find(plo => plo.id == ploId);
        const shouldDelete = confirm(`Apakah anda yakin akan menghapus PLO dengan kode ${plo.ploCode}?`);
        if (shouldDelete) {
            fetch('/admin/delete-plo', {
                method: 'POST',
                body: JSON.stringify({ id: ploId })
            }).then(res => {
                const exitCode = res.headers.get('X-Exit');
                if (exitCode == 'success') {
                    window.location.reload(true);
                }
            })
        }
    }
    closeModal() {
        this.setState({ mode: '', ploToEdit: '' });
    }
    render() {
        const ploList = this.props.ploList;
        const ploIds = ploList.map(plo => plo.id);
        const ploTuples = ploList.map(plo => [plo.ploCode, plo.description]);
        return (
            <div>
                <button className="btn btn-default" onClick={this.handleNew}>Buat PLO</button>
                <EditableTable
                    columns={['Kode PLO', 'Deskripsi']}
                    tuples={ploTuples}
                    rowIds={ploIds}
                    onRowDelete={this.handleDelete}
                    onRowEdit={this.handleEdit}
                />
                <ReactModal
                    appElement={document.getElementById('root')}
                    isOpen={!!this.state.mode}
                    onRequestClose={this.closeModal}
                >
                    <PloForm
                        mode={this.state.mode}
                        id={this.state.ploToEdit.id}
                        defaultPloCode={this.state.ploToEdit && this.state.ploToEdit.ploCode}
                        defaultDescription={this.state.ploToEdit && this.state.ploToEdit.description}
                    />
                </ReactModal>
            </div>
        )
    }
}

EditablePloTable.propTypes = {
    ploList: PropTypes.arrayOf(PropTypes.object)
}

function Page() {
    const { ploList } = window.SAILS_LOCALS;
    return (
        <div id="page" className="page main-content-container px-4 pb-4 container-fluid">
            {/* <Navbar activeMenu={ADMIN_MENU.PLO_SETTING} /> */}
            <div className="container">
                <h1>Atur PLO</h1>
                <EditablePloTable ploList={ploList} />
            </div>
        </div>
    )
}

ReactDOM.render(<Layout><Page /></Layout>, document.getElementById('root'));
