import React from 'react';
import ReactDOM from 'react-dom';
import Navbar, { MENU } from '../../components/Navbar';
import LoginForm from '../../components/entrance/LoginForm';
import { Row, Col, Form, FormGroup, FormInput, Button, Container } from "shards-react";

ReactDOM.render(<div id="page" style={{height:"100%"}}>
                    {/* <Navbar activeMenu={MENU.LOGIN}/> */}
                    <Row style={{ margin: '0', height: '100%' }}>
          <Col sm="12" lg="6" style={{padding: '0 4em'}} >
            <Container style={{textAlign:"center"}}>
          
            <img src="/images/fri.png" style={{ maxHeight: "10em" , margin: '5em 0 2em 0'}} ></img>
            <p style={{ marginBottom: '4em'}}>Selamat Datang di Desk Evaluation</p>
            </Container>
            {/* <p>Belum punya akun? <a href="/signup">Register</a></p> */}
            <LoginForm/>
            
       
      
          </Col>
          <Col sm="12" lg="6">
            <div className="gedungFRI"></div>
          </Col>
        </Row>
                </div>, document.getElementById('root'));

