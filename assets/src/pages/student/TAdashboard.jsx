import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Card, CardBody, CardSubtitle, CardTitle, Col, FormInput, Button, Collapse, Form } from 'shards-react';
import Layout from '../../components/layouts';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }


  render() {
    let dataAnggota = ["Dimas", "Singgih", "Marom", "Noufal", "Bambang"];

    return (
      <div className="main-content-container px-4 pb-4 container-fluid" style={{ paddingTop: '2em' }}>

        <Row>
          <Col md="12" lg="4">
            <Card>
              <CardBody style={{ paddingBottom: '25px' }}>
                <CardSubtitle>Dosen Pebimbing</CardSubtitle>
                <CardTitle style={{ marginBottom: '0', marginTop: '0.35em' }}>Dr. Edi Suheri, ST, S.Kom (ESH)</CardTitle>

              </CardBody>
            </Card>
          </Col>
          <Col md="12" lg="4">
            <Card>
              <CardBody style={{ paddingBottom: '25px' }}>
                <CardSubtitle>Dosen Penguji</CardSubtitle>
                <CardTitle style={{ marginBottom: '0', marginTop: '0.35em' }}>-</CardTitle>

              </CardBody>
            </Card>
          </Col>
          <Col md="12" lg="4">
            <Card className="btn" style={{ padding: 0 }} onClick={this.toggle}>
              <CardBody style={{ paddingBottom: '25px' }}>
                <Row style={{ marginTop: '-1.09375rem' }}>
                  <Col><CardSubtitle style={{ marginTop: '0' }}>Anggota Kelompok</CardSubtitle></Col>
                  <Col style={{ textAlign: '-webkit-right' }}>{this.state.collapse == false ? <div className="seeAnggota" ></div> : <div className="dontSeeAnggota" ></div>}</Col>
                </Row>

                <CardTitle style={{ marginBottom: '0', marginTop: '0.35em', textAlign: '-webkit-left' }}><span className="dot">1</span> Khairul Anwar</CardTitle>
                <Collapse open={this.state.collapse}>
                  {dataAnggota.map((nama, idx) =>
                    <CardTitle key={idx} style={{ marginBottom: '0', marginTop: '0.35em', textAlign: '-webkit-left' }}><span className="dot">{idx + 2}</span> {nama}</CardTitle>
                  )}
                </Collapse>
              </CardBody>
            </Card>
          </Col>


        </Row>
        <Row style={{ paddingTop: '2em' }}>
          <Col md="12" lg="6">
            <Card>
              <CardBody>
                <Row style={{ marginTop: '-1.09375rem' }}>
                  <Col lg="1" style={{ paddingLeft: 0 }}>
                    <span className="dot2">
                      <i className="material-icons" style={{ fontSize: '2em', alignSelf: 'left' }}>library_books</i>
                    </span>
                  </Col>
                  <Col style={{ alignSelf: 'center', textAlign: 'left' }}><CardTitle style={{ marginTop: '0' }}>Input EPRT</CardTitle></Col>
                </Row>
                <Row style={{ paddingTop: '1em' }}>
                  <Col className="uploadBox btn" lg="12" onClick={() => { console.log('pilih file') }}>


                    <Row style={{ margin: 0, justifyContent: 'center' }}>
                      <i className="material-icons" style={{ fontSize: '2em' }}>library_books</i>
                    </Row>
                    <Row style={{ margin: 0, justifyContent: 'center', paddingTop: '1em' }}>
                      <p>Klik disini untuk memilih berkas</p>
                    </Row>

                  </Col>

                </Row>
                <Row className="formComponentSpace">
                  <CardTitle>Nilai EPRT</CardTitle>
                </Row>
                <Row className="formComponentSpace">
                  <FormInput size="lg" type="number" placeholder="Masukkan nilai EPRT" />
                </Row>
                <Row className="formComponentSpace">
                  <Button block className="btn-ijo" >Upload File</Button>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>


        <Row style={{ paddingTop: '2em' }}>
          <Col md="12" lg="6">
            <Card>
              <CardBody>
                <Row style={{ marginTop: '-1.09375rem' }}>
                  <Col lg="1" style={{ paddingLeft: 0 }}>
                    <span className="dot2">
                      <i class="material-icons" style={{ fontSize: '2em', alignSelf: 'left' }}>note_add</i>
                    </span>
                  </Col>
                  <Col style={{ alignSelf: 'center', textAlign: 'left' }}><CardTitle style={{ marginTop: '0' }}>Upload Form Bimbingan</CardTitle></Col>
                </Row>
                <Row style={{ paddingTop: '1em' }}>
                  <Col lg="12">
                    <Form className="uploadBox">
                      <label>
                        <FormInput type="file" name="fileTA" hidden></FormInput>

                        <Row style={{ margin: 0, justifyContent: 'center' }}>
                          <i className="material-icons" style={{ fontSize: '2em' }}>cloud_upload</i>
                        </Row>
                        <Row style={{ margin: 0, justifyContent: 'center', paddingTop: '1em' }}>
                          <p>Klik disini untuk memilih berkas</p>
                        </Row>

                      </label>
                    </Form>
                  </Col>
                </Row>

                <Row className="formComponentSpace">
                  <Button block className="btn-ijo" >Upload File</Button>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col md="12" lg="6">
            <Card>
              <CardBody>
                <Row style={{ marginTop: '-1.09375rem' }}>
                  <Col lg="1" style={{ paddingLeft: 0 }}>
                    <span className="dot2">
                      <i className="material-icons" style={{ fontSize: '2em', alignSelf: 'left' }}>book</i>
                    </span>
                  </Col>
                  <Col style={{ alignSelf: 'center', textAlign: 'left' }}><CardTitle style={{ marginTop: '0' }}>Upload File TA 1</CardTitle></Col>
                </Row>
                <Row style={{ paddingTop: '1em' }}>
                  <Col className="uploadBox btn" lg="12" onClick={() => { console.log('pilih file') }}>


                    <Row style={{ margin: 0, justifyContent: 'center' }}>
                      <i className="material-icons" style={{ fontSize: '2em' }}>cloud_upload</i>
                    </Row>
                    <Row style={{ margin: 0, justifyContent: 'center', paddingTop: '1em' }}>
                      <p>Klik disini untuk memilih berkas</p>
                    </Row>

                  </Col>

                </Row>

                <Row className="formComponentSpace">
                  <Button block className="btn-ijo" >Upload File</Button>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>



      </div>
    );
  }
}

ReactDOM.render(<Layout><Dashboard /></Layout>, document.getElementById('root'));



