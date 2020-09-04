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
                  <Col style={{ alignSelf: 'center', textAlign: 'left' }}><CardTitle style={{ marginTop: '0' }}>Upload Data Kelas Metlit</CardTitle></Col>
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
                          <p>Klik disini untuk memilih berkas (format file .CSV) </p>
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

        </Row>



      </div>
    );
  }
}

ReactDOM.render(<Layout><Dashboard /></Layout>, document.getElementById('root'));



