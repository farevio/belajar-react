import React from 'react';
import ReactDOM from 'react-dom';

import Navbar, { MENU as NAVBAR_MENU } from '../../components/Navbar';
import Nav, { MENU as LECTURER_MENU } from '../../components/lecturer/Nav';
//import PeminatanSelect from '../../components/PeminatanSelect'
import { Form, FormGroup, FormInput, Button, Alert, FormSelect } from "shards-react";
import KKselect from '../../components/KkSelect';
import PeminatanSelect from '../../components/PeminatanSelect';
import RoleSelect from '../../components/RoleSelect';
import JfaSelect from '../../components/JfaSelect';
import Layout from '../../components/layouts';


class DataInput extends React.Component {
    constructor(props) {
        super(props);
        this.interval = null;
        this.state = {
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

        };

        this.handleChange = this.handleChange.bind(this);
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


    handleChange(e) {
        const el = e.target;
        if(el.name == 'role_id'){
            var array = [...this.state.role_id];
            var index = array.indexOf(el.value);
            if(index > -1){
                array.splice(index, 1);
                this.setState({role_id: array});
            }else{
                this.setState(prevState => ({
                    role_id: [...prevState.role_id,el.value]
                  }))
            }

        }
        else if(el.name == 'file_csv'){
            this.setState({ [el.name]: el.files[0] })

        }else this.setState({ [el.name]: el.value });
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


        switch (idformInput) {
            case 'JFA':
                fetchUrl = '/admin/new-jfa';
                break;

            case 'KK':
                fetchUrl = '/admin/new-kk';
                break;
            case 'Peminatan':
                fetchUrl = '/admin/new-peminatan';
                break;
            case 'Dosen':
                fetchUrl = '/admin/new-lecturer';
                break;
            case 'csvDosen':
                fetchUrl = '/admin/input-csv-lecturer';
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

    render() {

        return (
            <>
           
                <Form
                    className="form-horizontal"
                    id="csvDosen"
                    method="POST"
                    enctype="multipart/form-data"
                    
                    
                >
                    <FormGroup>
                        <h3>Upload Data Dosen</h3>
                        <label htmlFor="csvdosen">Upload FIle CSV</label>
                        <FormInput id="csvdosen" type="file"  name="file_csv" />
                        
                    </FormGroup>
                    {/* <Alert className="mb-3" open={this.state.visible && this.state.alertFor == 'csvDosen'} theme={this.state.success ? 'success' : this.state.error ? 'danger' : ''}>
                        {this.state.success ? <>Berhasil Menambahkan Data Dosen</> : this.state.error ? <>Gagal menambahkan Data Dosen</> : ''}
                    </Alert> */}
                    <Button type="submit">Submit</Button>
                </Form>
                <br />
                <Form
                    className="form-horizontal"
                    id="uploadMetlit"
                    method="POST"
                    onSubmit={this.handleSubmit}

                >
                    <FormGroup>
                        <h3>Upload Data Kelas Metlit</h3>
                        <label htmlFor="csvmetlit">Upload FIle CSV</label>
                        <FormInput id="csvmetlit" type="file" onChange={this.handleChange} name="fileKelasMetlit" />
                        
                    </FormGroup>
                    <Alert className="mb-3" open={this.state.visible && this.state.alertFor == 'JFA'} theme={this.state.success ? 'success' : this.state.error ? 'danger' : ''}>
                        {this.state.success ? <>Berhasil Menambahkan JFA</> : this.state.error ? <>Gagal menambahkan JFA</> : ''}
                    </Alert>
                    <Button type="submit">Submit</Button>
                </Form>
                <br />
                <Form
                    className="form-horizontal"
                    id="uploadPeminatanMahasiswa"
                    method="POST"
                    onSubmit={this.handleSubmit}

                >
                    <FormGroup>
                        <h3>Upload Data Peminatan Mahasiswa</h3>
                        <label htmlFor="csvPeminatan">Upload FIle CSV</label>
                        <FormInput id="csvPeminatan" type="file" onChange={this.handleChange} name="filePeminatanMahasiswa" />
                        
                    </FormGroup>
                    <Alert className="mb-3" open={this.state.visible && this.state.alertFor == 'JFA'} theme={this.state.success ? 'success' : this.state.error ? 'danger' : ''}>
                        {this.state.success ? <>Berhasil Menambahkan JFA</> : this.state.error ? <>Gagal menambahkan JFA</> : ''}
                    </Alert>
                    <Button type="submit">Submit</Button>
                </Form>
                <br />
                <Form
                    className="form-horizontal"
                    id="JFA"
                    method="POST"
                    onSubmit={this.handleSubmit}

                >
                    <FormGroup>
                        <h3>Tambah JFA</h3>
                        <label htmlFor="name">nama JFA</label>
                        <FormInput id="name" onChange={this.handleChange} name="name" placeholder="nama" />
                        <label htmlFor="abbrev">abbrev JFA</label>
                        <FormInput id="abbrev" onChange={this.handleChange} name="abbrev" placeholder="abbrev" />
                    </FormGroup>
                    <Alert className="mb-3" open={this.state.visible && this.state.alertFor == 'JFA'} theme={this.state.success ? 'success' : this.state.error ? 'danger' : ''}>
                        {this.state.success ? <>Berhasil Menambahkan JFA</> : this.state.error ? <>Gagal menambahkan JFA</> : ''}
                    </Alert>
                    <Button type="submit">Submit</Button>
                </Form>
                <br />
                <Form
                    className="form-horizontal"
                    id="KK"
                    method="POST"
                    onSubmit={this.handleSubmit}

                >
                    <FormGroup>
                        <h3>Tambah KK</h3>
                        <label htmlFor="name">nama KK</label>
                        <FormInput id="name" onChange={this.handleChange} name="name" placeholder="nama" />
                        <label htmlFor="abbrev">abbrev KK</label>
                        <FormInput id="abbrev" onChange={this.handleChange} name="abbrev" placeholder="abbrev" />
                    </FormGroup>
                    <Alert className="mb-3" open={this.state.visible && this.state.alertFor == 'KK'} theme={this.state.success ? 'success' : this.state.error ? 'danger' : ''}>
                        {this.state.success ? <>Berhasil Menambahkan KK</> : this.state.error ? <>Gagal menambahkan KK</> : ''}
                    </Alert>
                    <Button type="submit" >Submit</Button>
                </Form>
                <br />
                <Form
                    className="form-horizontal"
                    id="Peminatan"
                    method="POST"
                    onSubmit={this.handleSubmit}

                >
                    <FormGroup>
                        <h3>Tambah Peminatan</h3>
                        <label htmlFor="name">nama Peminatan</label>
                        <FormInput id="name" onChange={this.handleChange} name="name" placeholder="nama" />
                        <label htmlFor="abbrev">abbrev Peminatan</label>
                        <FormInput id="abbrev" onChange={this.handleChange} name="abbrev" placeholder="abbrev" />
                        <label htmlFor="kk_id">KK</label>
                        {/* <FormInput id="kk_id" type="number" onChange={this.handleChange} name="kk_id" placeholder="nomor KK" /> */}
                        
                        <KKselect name="kk_id" kkList={window.SAILS_LOCALS.kkList} value={this.state.kk_id} onChange={this.handleChange} />
                    </FormGroup>
                    <Alert className="mb-3" open={this.state.visible && this.state.alertFor == 'Peminatan'} theme={this.state.success ? 'success' : this.state.error ? 'danger' : ''}>
                        {this.state.success ? <>Berhasil Menambahkan Peminatan</> : this.state.error ? <>Gagal menambahkan Peminatan</> : ''}
                    </Alert>
                    <Button type="submit" >Submit</Button>
                </Form>
                <br />
                <Form
                    className="form-horizontal"
                    id="Dosen"
                    method="POST"
                    onSubmit={this.handleSubmit}

                >
                    <FormGroup>
                        <h3>Tambah Dosen</h3>
                        <label htmlFor="nik">nik Dosen</label>
                        <FormInput id="nik" type="number" onChange={this.handleChange} name="nik" placeholder="nik" />
                        <label htmlFor="nama">nama Dosen</label>
                        <FormInput id="name" onChange={this.handleChange} name="name" placeholder="name" />
                        <label htmlFor="email">email Dosen</label>
                        <FormInput id="email" onChange={this.handleChange} name="email" placeholder="email" />
                        <label htmlFor="password">password</label>
                        <FormInput id="password" onChange={this.handleChange} name="password" placeholder="password" />
                        <label htmlFor="lecturer_code">kode Dosen</label>
                        <FormInput id="lecturer_code" onChange={this.handleChange} name="lecturer_code" placeholder="kode dosen" />
                        <label htmlFor="jfa">JFA</label>
                        <JfaSelect id="jfa" jfaList={window.SAILS_LOCALS.jfaList} name="jfa_id" value={this.state.jfa_id} onChange={this.handleChange}/>
                        <label htmlFor="kk_id">KK</label>
                        <KKselect name="kk_id" kkList={window.SAILS_LOCALS.kkList} value={this.state.kk_id} onChange={this.handleChange} />
                        <label htmlFor="peminatan">Peminatan</label>
                        <PeminatanSelect peminatanList={window.SAILS_LOCALS.peminatanList} name="peminatanId" value={this.state.peminatanId} onChange={this.handleChange} />
                        <label htmlFor="role_id">Role</label>
                        <br/>
                        <RoleSelect roleList={window.SAILS_LOCALS.roleList} value={this.state.role} onChange={this.handleChange} />
                    </FormGroup>
                    <Alert className="mb-3" open={this.state.visible && this.state.alertFor == 'Dosen'} theme={this.state.success ? 'success' : this.state.error ? 'danger' : ''}>
                        {this.state.success ? <>Berhasil Menambahkan Dosen</> : this.state.error ? <>Gagal menambahkan Dosen</> : ''}
                    </Alert>
                    <Button type="submit" >Submit</Button>
                </Form>

            </>
        );
    }
}

const Page = () => {
    return (
        <div className="page main-content-container px-4 pb-4 container-fluid">
            {/* <Navbar activeMenu={LECTURER_MENU.NEW} /> */}
            <div className="container">
                <br />
                <h1>Input Data</h1>
                <br />
                <DataInput />
            </div>
        </div>
    )
}

ReactDOM.render(
    <Layout><Page /></Layout>,
    document.getElementById("root")
);
