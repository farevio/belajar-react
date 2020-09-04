import React from "react";
import ReactDOM from 'react-dom';
import { Nav, NavItem, NavLink, Collapse, Modal, ModalBody, ModalHeader, Button, Form, FormGroup, FormInput,FormCheckbox, Alert } from "shards-react";
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
            peminatanIdDosen: undefined,
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
    handleChangeCheckBox(e, role) {
        let arrRole = this.state.role_id;
        let target = e.target;
        if(target.checked){
            arrRole.push(role);
            this.setState({role_id: arrRole});
        }else{
            arrRole.splice(arrRole.indexOf(role),1);
            console.log(arrRole)
            this.setState({role_id: arrRole});
        }
       
        
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
            case 'dosen':
                url ='/admin/delete-peminatan';
                row = this.props.peminatanList.find(peminatan => peminatan.id == rowId);
                shouldDelete = confirm(`Apakah anda yakin akan menghapus peminatan '${row.name}?'`);
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
        const { peminatanList, dosenList, roleList,kkList } = this.props;
        const { tableName, rowToEdit,open } = this.state;
        let judul = rowToEdit != undefined ? 'Edit' : 'Tambah';
        
        let rowIds = dosenList.map(dosen => dosen.id);
        let tuples = dosenList.map(dosen => [dosen.name, dosen.lecturer_code,dosen.nik, peminatanList[peminatanList.findIndex(o => o.id == dosen.peminatan_id)].name,
         ()=>{
            var arrDosenRoleId = dosen.role_id.split(',');
            var arrDosenRoleName = 'a';
                for(i=0;i<arrDosenRoleId.length;i++){
                    arrDosenRoleName+=`${roleList[roleList.findIndex(r => r.id == arrDosenRoleId[i]).role]}${i+1==arrDosenRoleId.length ?'':','}`
                }
            return arrDosenRoleName;
         }
        
        
        ]);
        
  return (
      <>
    

    <br/>
    
    <Button onClick={this.tambah}>Tambah</Button>
    <br/>
    <br/>
    <Modal open={open} toggle={this.toggle}>
  <ModalHeader>{judul} Dosen</ModalHeader>
          <ModalBody>
          <Form
                    className="form-horizontal"
                    id="Dosen"
                    method="POST"
                    onSubmit={this.handleSubmit}

                >
                    <FormGroup>
                        
                        <label htmlFor="name">Nama Dosen</label>
                        <FormInput id="name" onChange={this.handleChange} name="name" placeholder="nama" value={this.state.name}/>
                        <label htmlFor="abbrev">Kode Dosen</label>
                        <FormInput id="abbrev" onChange={this.handleChange} name="abbrev" placeholder="abbrev" value={this.state.abbrev}/>
                        <label htmlFor="nip">NIP</label>
                        <FormInput id="nip" onChange={this.handleChange} name="nip" placeholder="nip" value={this.state.nip}/>
                        {/* <FormInput id="kk_id" type="number" onChange={this.handleChange} name="kk_id" placeholder="nomor KK" /> */}
                        <label htmlFor="kk_id">KK</label>
                        <KKselect name="kk_id" kkList={kkList} value={this.state.kk_id} onChange={this.handleChange}  />
                        <label htmlFor="peminatanIdDosen">Peminatan</label>
                        <PeminatanSelect name="peminatanIdDosen" selectedKK={this.state.kk_id} peminatanList={peminatanList} value={this.state.peminatanIdDosen} onChange={this.handleChange}  />
                        <label htmlFor="role">Role</label>
                        <div id="role">
                        {roleList.map(rl => {
                return <FormCheckbox
                inline
                onClick={e => this.handleChangeCheckBox(e, `${rl.id}`)} 
                >
                {rl.role}
                </FormCheckbox>
            })}
                        
                            
                        </div>
                    </FormGroup>
                    <Alert className="mb-3" open={this.state.visible && this.state.alertFor == 'Peminatan'} theme={this.state.success ? 'success' : this.state.error ? 'danger' : ''}>
                        {this.state.success ? <>Berhasil Menambahkan Dosen</> : this.state.error ? <>Gagal menambahkan Dosen</> : ''}
                    </Alert>
                    <Button type="submit" >Submit</Button>
                </Form>
          </ModalBody>
        </Modal>
    <EditableTable rowIds={rowIds} tuples={tuples} roleList={roleList} tbName={tableName} columns={['Nama','Kode Dosen','NIP','Peminatan','Role','','']} onRowDelete={this.handleDelete} onRowEdit={this.handleEdit}  />
    
    
</>
    
  )
};
}

const Page = () => {
    const { peminatanList, dosenList, roleList, kkList }  = window.SAILS_LOCALS;
    return (
        <div className="page main-content-container px-4 pb-4 container-fluid">
            {/* <Navbar activeMenu={LECTURER_MENU.NEW} /> */}
            <div className="container">
                <br/>
                <br/>
                <MasterData peminatanList={peminatanList} dosenList={dosenList} roleList={roleList} kkList={kkList} />
            </div>
        </div>
    )
}

ReactDOM.render(
    <Layout><Page /></Layout>,
    document.getElementById("root")
);
