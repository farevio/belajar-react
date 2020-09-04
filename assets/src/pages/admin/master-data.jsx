import React from "react";
import ReactDOM from 'react-dom';
import { Nav, NavItem, NavLink, Collapse, Modal, ModalBody, ModalHeader, Button, Form, FormGroup, FormInput, Alert } from "shards-react";
import KKselect from '../../components/KkSelect';
import PeminatanSelect from '../../components/PeminatanSelect';
import RoleSelect from '../../components/RoleSelect';
import JfaSelect from '../../components/JfaSelect';
import Layout from '../../components/layouts';
import EditableTable from '../../components/MasterDataTable';
import { array } from "prop-types";

class MasterData extends React.Component{
    constructor(props){
        super(props)
        this.interval = null;
        this.state={
            tableName: 'peminatan',
            open: false,
            name: '',
            abbrev: '',
            kk_id: undefined,
            peminatanId: undefined,
            role_id: [],
            visible: false,
            alertFor: '',
            error: false,
            success: false,
            countdown: 0,
            timeUntilDismissed: 5,
            kkList: []
        }
       

        this.toggle = this.toggle.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeTb = this.handleChangeTb.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.tambah = this.tambah.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.validate = this.validate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
     

        this.showAlert = this.showAlert.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.clearInterval = this.clearInterval.bind(this);
    }
    
    showAlert(id) {
        this.clearInterval();
        this.setState({ visible: true, alertFor: id, countdown: 0, timeUntilDismissed: 5 });
        this.interval = setInterval(this.handleTimeChange, 1000);
    }

    handleTimeChange() {
        if (this.state.countdown < this.state.timeUntilDismissed - 1) {
            this.setState({
                ...this.state,
                ...{ countdown: this.state.countdown + 1 }
            });
            return;
        }

        this.setState({ ...this.state, ...{ visible: false, success: false, error: false } });
        this.clearInterval();
    }

    clearInterval() {
        clearInterval(this.interval);
        this.interval = null;
    }

    toggle() {
        this.setState({
          open: !this.state.open
        });
      }
    
    tambah(){
        this.toggle()
        const rowToEdit = this.state.rowToEdit;
        Object.keys(rowToEdit).forEach(col => {
            this.setState({[col]: undefined});
        })
        this.setState({ rowToEdit: undefined, mode: 'TAMBAH' });
    }

    handleChangeTb(tbName){
        this.setState({tableName: tbName});

    }
    handleChange(e) {
        const el = e.target;
         this.setState({ [el.name]: el.value });
    }

    handleEdit(rowId) {
        this.toggle();
        const rowToEdit = this.state.tableName == 'peminatan' ? this.props.peminatanList.find(row => row.id == rowId) : this.state.tableName == 'kk' ? this.props.kkList.find(row => row.id == rowId) : this.props.jfaList.find(row => row.id == rowId) ;
        Object.keys(rowToEdit).forEach(col => {
            this.setState({[col]: rowToEdit[col]});
        })
        this.setState({ rowToEdit, mode: 'EDIT' });
    }
    handleDelete(tableName, rowId) {
        let row;
        let shouldDelete;
        let url;
        switch (tableName) {
            case 'peminatan':
                url ='/admin/delete-peminatan';
                row = this.props.peminatanList.find(peminatan => peminatan.id == rowId);
                shouldDelete = confirm(`Apakah anda yakin akan menghapus peminatan '${row.name}?'`);
                break;
            case 'kk':
                url ='/admin/delete-kk';
                row = this.props.kkList.find(kk => kk.id == rowId);
                shouldDelete = confirm(`Apakah anda yakin akan menghapus kelompok keahlian '${row.name}?'`);
                break;
            case 'jfa':
                url ='/admin/delete-jfa';
                row = this.props.jfaList.find(jfa => jfa.id == rowId);
                shouldDelete = confirm(`Apakah anda yakin akan menghapus jfa '${row.name}?'`);
                break;
            default:
                break;
        }
        if (shouldDelete) {
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({ id: rowId })
            }).then(res => {
                const exitCode = res.headers.get('X-Exit');
                if (exitCode == 'success') {
                    window.location.reload(true);
                }
            })
        }
    }
    validate(formType) {

        this.setState(state => {
            const { name, abbrev, kk_id } = state;
            return {
                errorMessages: {
                    name: name ? '' : 'Kolom nama tidak boleh kosong',
                    abbrev: abbrev ? '' : 'Kolom abbrev tidak boleh kosong',
                    kk_id: kk_id ? undefined : 'Kolom nomor kk tidak boleh kosong'
                }
            }
        });

        const { name, abbrev, kk_id, nik, email, password, lecturer_code, jfa_id,role_id,peminatanId,file_csv } = this.state;

        switch (formType) {
            case 'JFA':
                if (!name || !abbrev ) return false;
                else return true;
                break;

            case 'KK':
                if (!name || !abbrev ) return false;
                else return true;
                break;
            case 'Peminatan':
                if (!name || !abbrev || !kk_id) return false;
                else return true;
                break;
            case 'Dosen':
                if (!name || !nik || !kk_id || !email || !lecturer_code || !password || !jfa_id || !role_id || !peminatanId) return false;
                else return true;
                break;
            case 'csvDosen':
                if (!file_csv) return false;
                else return true;
                break;

            default:
                return false;
                break;
        }
        
        
        
    }

    handleSubmit(e) {
        // console.log(e.target.id);
        let fetchUrl;
        let formDataCSV;
        let formInput = e.target;
        let idformInput = formInput.id;
        const mode = this.state.mode;


        switch (idformInput) {
            case 'JFA':
                fetchUrl = mode == 'EDIT'?'/admin/edit-jfa':'/admin/new-jfa';
                break;

            case 'KK':
                fetchUrl = mode == 'EDIT'?'/admin/edit-kk':'/admin/new-kk';
                break;
            case 'Peminatan':
                fetchUrl = mode == 'EDIT'?'/admin/edit-peminatan':'/admin/new-peminatan';
                break;
            case 'Dosen':
                fetchUrl = mode == 'EDIT'?'/admin/edit-lecturer':'/admin/new-lecturer';
                break;
            case 'csvDosen':
                fetchUrl = mode == 'EDIT'?'/admin/edit-csv-lecturer':'/admin/input-csv-lecturer';
                var formElement = document.querySelector("#csvDosen");
                formDataCSV = new FormData(formElement);
                break;

            default:
                break;
        }
        e.preventDefault();

        if (this.validate(idformInput)) {
            fetch(fetchUrl, {
                method: 'POST',
                body: idformInput == 'csvDosen' ? formDataCSV : JSON.stringify(this.state)
            }).then(res => {
                const exitCode = res.headers.get('X-Exit');
                switch (exitCode) {
                    case 'success':
                        this.setState({ success: true })
                        formInput.reset();
                        this.showAlert(idformInput);
                        //res.redirected ? location.href = res.url : null;
                        window.location.reload(true);
                        break;
                    case 'failed':
                        this.setState({ error: true })
                        this.showAlert(idformInput);
                        break;
                }
            })
        }else{
            this.setState({ error: true })
            this.showAlert(idformInput)
            console.log(this.state.role_id)
            alert('tidak valid');
        }
    }

    render(){
        const { peminatanList, kkList, jfaList } = this.props;
        const { tableName, rowToEdit,open } = this.state;
        let judul = rowToEdit != undefined ? 'Edit' : 'Tambah';
        let rowIds;
        let tuples;

        switch (tableName) {
            case 'peminatan':
                rowIds = peminatanList.map(peminatan => peminatan.id);
                tuples = peminatanList.map(peminatan => [peminatan.name, peminatan.abbrev, kkList[kkList.findIndex(o => o.id == peminatan.kk_id)].name]);
                break;
            case 'kk':
                rowIds = kkList.map(kk => kk.id);
                tuples = kkList.map(kk => [kk.name, kk.abbrev]);
                break;
            case 'jfa':
                rowIds = jfaList.map(jfa => jfa.id);
                tuples = jfaList.map(jfa => [jfa.name, jfa.abbrev, jfa.kk]);
                break;
            default:
                break;
        }
  return (
      <>
    <Nav tabs>
      <NavItem onClick={() => this.handleChangeTb('peminatan')}>
        <NavLink href="#">
          Peminatan
        </NavLink>
      </NavItem>
      <NavItem onClick={() => this.handleChangeTb('kk')}>
        <NavLink href="#">Kelompok Keahlian</NavLink>
      </NavItem>
      <NavItem onClick={() => this.handleChangeTb('jfa')}> 
        <NavLink href="#" >JFA</NavLink>
      </NavItem>
      
    </Nav>

    <br/>
    <Collapse open={tableName == 'peminatan'}>
    <Button onClick={this.tambah}>Tambah</Button>
    <br/>
    <br/>
    <Modal open={tableName == 'peminatan' && open == true} toggle={this.toggle}>
  <ModalHeader>{judul} Peminatan</ModalHeader>
          <ModalBody>
          <Form
                    className="form-horizontal"
                    id="Peminatan"
                    method="POST"
                    onSubmit={this.handleSubmit}

                >
                    <FormGroup>
                        
                        <label htmlFor="name">nama Peminatan</label>
                        <FormInput id="name" onChange={this.handleChange} name="name" placeholder="nama" value={this.state.name}/>
                        <label htmlFor="abbrev">abbrev Peminatan</label>
                        <FormInput id="abbrev" onChange={this.handleChange} name="abbrev" placeholder="abbrev" value={this.state.abbrev}/>
                        <label htmlFor="kk_id">KK</label>
                        {/* <FormInput id="kk_id" type="number" onChange={this.handleChange} name="kk_id" placeholder="nomor KK" /> */}
                        
                        <KKselect name="kk_id" kkList={kkList} value={this.state.kk_id} onChange={this.handleChange}  />
                    </FormGroup>
                    <Alert className="mb-3" open={this.state.visible && this.state.alertFor == 'Peminatan'} theme={this.state.success ? 'success' : this.state.error ? 'danger' : ''}>
                        {this.state.success ? <>Berhasil Menambahkan Peminatan</> : this.state.error ? <>Gagal menambahkan Peminatan</> : ''}
                    </Alert>
                    <Button type="submit" >Submit</Button>
                </Form>
          </ModalBody>
        </Modal>
    <EditableTable rowIds={rowIds} tuples={tuples} tbName={tableName} columns={['name','abbrev','kk','','']} onRowDelete={this.handleDelete} onRowEdit={this.handleEdit}  />
    </Collapse>
    <Collapse open={tableName == 'kk'}>
    <Button onClick={this.tambah}>Tambah</Button>
    <br/>
    <br/>
    <Modal open={tableName == 'kk' && open == true} toggle={this.toggle}>
          <ModalHeader>{judul} KK</ModalHeader>
          <ModalBody>
          <Form
                    className="form-horizontal"
                    id="KK"
                    method="POST"
                    onSubmit={this.handleSubmit}

                >
                    <FormGroup>
                        
                        <label htmlFor="name" >nama KK</label>
                        <FormInput id="name" onChange={this.handleChange} name="name" placeholder="nama" value={this.state.name}/>
                        <label htmlFor="abbrev">abbrev KK</label>
                        <FormInput id="abbrev" onChange={this.handleChange} name="abbrev" placeholder="abbrev" value={this.state.abbrev} />
                    </FormGroup>
                    <Alert className="mb-3" open={this.state.visible && this.state.alertFor == 'KK'} theme={this.state.success ? 'success' : this.state.error ? 'danger' : ''}>
                        {this.state.success ? <>Berhasil Menambahkan KK</> : this.state.error ? <>Gagal menambahkan KK</> : ''}
                    </Alert>
                    <Button type="submit" >Submit</Button>
                </Form>
          </ModalBody>
        </Modal>
    <EditableTable rowIds={rowIds} tuples={tuples} tbName={tableName} columns={ ['name','abbrev','','']}  onRowDelete={this.handleDelete} onRowEdit={this.handleEdit} />
    </Collapse>
    <Collapse open={tableName == 'jfa'}>
    <Button onClick={this.tambah}>Tambah</Button>
    <br/>
    <br/>
    <Modal open={tableName == 'jfa' && open == true} toggle={this.toggle}>
          <ModalHeader>{judul} JFA</ModalHeader>
          <ModalBody>
          <Form
                    className="form-horizontal"
                    id="JFA"
                    method="POST"
                    onSubmit={this.handleSubmit}

                >
                    <FormGroup>
                      
                        <label htmlFor="name">nama JFA</label>
                        <FormInput id="name" onChange={this.handleChange} name="name" placeholder="nama" value={this.state.name} />
                        <label htmlFor="abbrev">abbrev JFA</label>
                        <FormInput id="abbrev" onChange={this.handleChange} name="abbrev" placeholder="abbrev" value={this.state.abbrev} />
                    </FormGroup>
                    <Alert className="mb-3" open={this.state.visible && this.state.alertFor == 'JFA'} theme={this.state.success ? 'success' : this.state.error ? 'danger' : ''}>
                        {this.state.success ? <>Berhasil Menambahkan JFA</> : this.state.error ? <>Gagal menambahkan JFA</> : ''}
                    </Alert>
                    <Button type="submit">Submit</Button>
                </Form>
          </ModalBody>
        </Modal>
    <EditableTable rowIds={rowIds} tuples={tuples} tbName={tableName} columns={['name','abbrev','','']}  onRowDelete={this.handleDelete} onRowEdit={this.handleEdit} />
    </Collapse>
</>
    
  )
};
}

const Page = () => {
    const { peminatanList, kkList, jfaList }  = window.SAILS_LOCALS;
    return (
        <div className="page main-content-container px-4 pb-4 container-fluid">
            {/* <Navbar activeMenu={LECTURER_MENU.NEW} /> */}
            <div className="container">
                <br/>
                <br/>
                <MasterData peminatanList={peminatanList} kkList={kkList} jfaList={jfaList} />
            </div>
        </div>
    )
}

ReactDOM.render(
    <Layout><Page /></Layout>,
    document.getElementById("root")
);
