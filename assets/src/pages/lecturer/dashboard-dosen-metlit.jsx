import React from 'react';
import ReactDOM from 'react-dom';
import { Breadcrumb, BreadcrumbItem, Row, Card, CardBody, CardSubtitle, CardTitle, Col, FormInput, Button, Collapse, Form } from 'shards-react';
import Layout from '../../components/layouts';
import { Link } from 'react-router-dom';
import { Progress } from 'react-sweet-progress';

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="main-content-container px-4 pb-4 container-fluid" style={{ paddingTop: '2em' }}>
        
        <Row>
            <Col xs="auto">
                <a>Metode Penelitian</a>
            </Col>
            <Col xs="auto">></Col>
            <Col xs="auto">Dosen Metlit</Col>
        </Row>
        <Row>
            {/* <Col style={{font-family: Roboto, font-style: normal, font-weight: 500, font-size: 24px, line-height: 28px, color: #000000}}>
                <h1>Daftar Kelas yang diampu</h1>
            </Col> */}
            <Col>
                <Link>Download nilai semua kelas</Link>
            </Col>
        </Row>
        <Row>
            <Col>
                <Card>
                    <CardBody>
                        <CardSubtitle>Kelas</CardSubtitle>
                        <CardTitle>SI-41-04</CardTitle>
                        <Row>
                            <Progress
                                type="circle"
                                width={100}
                                percent={100}
                                theme={{
                                    color: '#2ECC71'
                                }}
                            />
                        </Row>
                        <Link>LIHAT NILAI</Link>
                    </CardBody>
                </Card>
            </Col>
            <Col>
                <Card>
                    {/* <CardBody>
                        <CardSubtitle>Kelas</CardSubtitle>
                        <CardTitle>SI-41-05</CardTitle>
                        <Progress
                                type="circle"
                                width={100}
                                percent={67}
                                theme={{
                                    color: '#2ECC71'
                                }}
                            />
                        </Row>
                        <Link>LIHAT NILAI</Link>
                    </CardBody> */}
                </Card>
            </Col>
            <Col>
                <Card>
                    {/* <CardBody>
                        <CardSubtitle>Kelas</CardSubtitle>
                        <CardTitle>SI-41-06</CardTitle>
                        <Progress
                                type="circle"
                                width={100}
                                percent={0}
                                theme={{
                                    color: '#2ECC71'
                                }}
                            />
                        </Row>           
                        <Link>LIHAT NILAI</Link>
                    </CardBody> */}
                </Card>
            </Col>
            <Col>
                <Card>
                    {/* <CardBody>
                        <CardSubtitle>Kelas</CardSubtitle>
                        <CardTitle>SI-41-07</CardTitle>
                        <Progress
                                type="circle"
                                width={100}
                                percent={65}
                                theme={{
                                    color: '#2ECC71'
                                }}
                            />
                        </Row>          
                        <Link>LIHAT NILAI</Link>
                    </CardBody> */}
                </Card>
            </Col>
        </Row>

      </div>
    );
  }
}

ReactDOM.render(<Layout><Dashboard /></Layout>, document.getElementById('root'));



