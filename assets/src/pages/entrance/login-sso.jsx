import React from "react";
import ReactDOM from "react-dom";
import { Row, Col, Form, FormGroup, FormInput, Button } from "shards-react";
import LoginSsoForm from "../../components/entrance/LoginSsoForm";

function Page () {
    const userType = window.SAILS_LOCALS.userType;
    return (
        <div id="page" style={{ height: "100%" }}>
            <Row style={{ margin: "0", textAlign: "center", height: "100%" }}>
                <Col sm="12" lg="6" style={{ padding: "0 4em" }}>
                    <img
                        src="/images/fri.png"
                        style={{ maxHeight: "10em", margin: "5em 0 2em 0" }}
                    ></img>
                    <p style={{ marginBottom: "4em" }}>
                        Selamat Datang di Aplikasi TA 1
                    </p>
                    <LoginSsoForm userType={userType}/>
                </Col>
                <Col sm="12" lg="6">
                    <div className="gedungFRI"></div>
                </Col>
            </Row>
        </div>
    )
}

ReactDOM.render(
    <Page />,
    document.getElementById("root")
);
