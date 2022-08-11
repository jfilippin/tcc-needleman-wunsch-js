import React, { useState } from 'react';
import axios from 'axios';
import logo from '../img/logo.svg';
import $ from 'jquery';
import {
    Navbar, 
    Image, 
    Container, 
    Form, 
    FloatingLabel, 
    Button, 
    ButtonGroup, 
    Modal,
    Table
} from 'react-bootstrap';

function Main() {
    const [seq1, setSeq1] = useState("");
    const [seq2, setSeq2] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                seq1, seq2
            }
        };

        axios.post("http://localhost:5000", options)
        .then((res) => {
            return res;
        })
        .then((res) => {
            console.log(res.data);

            for (var i = 0; i < res.data[0].length; i++) {
                $("#alignmentResults").find("#seq1").append(`
                    <td id=r1c${i}>${res.data[0][i]}</td>
                `);
            }
                
            for (var j = 0; j < res.data[1].length; j++) {
                $("#alignmentResults").find("#seq2").append(`
                    <td id=r2c${j}>${res.data[1][j]}</td>
                `)
            }

            for (var k = 0; k < res.data[0].length; k++) {
                if(res.data[0][k] === res.data[1][k]) {
                    $(`#r1c${k}`).addClass("match");
                    $(`#r2c${k}`).addClass("match");
                } else if (res.data[0][k] === "-" || res.data[1][k] === "-") {
                    $(`#r1c${k}`).addClass("gap");
                    $(`#r2c${k}`).addClass("gap");
                } else {
                    $(`#r1c${k}`).addClass("mismatch");
                    $(`#r2c${k}`).addClass("mismatch");
                }
            }
        })
        .catch(err => {
            console.log(err)
        });
    }

    return(
        <div className="App">
            <Navbar>
                <Image src={logo} alt="Logo" className="logo"/>
            </Navbar>
        
            <div className="bg">
                <Container>
                    <h1 className="title">
                        <strong>Bem vindo ao </strong>
                        <strong className="appName">SeqAligner</strong>
                    </h1><hr/>
            
                    <p className="startTxt">
                        Para começar, insira duas sequências de DNA quaisquer <br/> 
                        em cada campo e clique em alinhar sequências.
                    </p>
            
                    <Form method="POST" className="form" onSubmit={handleSubmit}>
                        <FloatingLabel label="Sequência nº 1">
                            <Form.Control type="text" className="form-control" id="seq1" placeholder="ATCGCTAG" maxLength={25} onChange={(e) => setSeq1(e.target.value)}/>
                        </FloatingLabel>
                
                        <FloatingLabel label="Sequência nº 2">
                            <Form.Control type="text" className="form-control" id="seq2" placeholder="TAGCAGT" maxLength={25} onChange={(e) => setSeq2(e.target.value)}/>
                        </FloatingLabel>

                        <ButtonGroup>
                            <Button type="submit" className="btn btn-primary" data-toggle="modal" data-target="#results" onClick={handleShow}>Alinhar sequências</Button>
                            <Button type="reset" className="btn btn-outline-dark">Cancelar alinhamento</Button>
                        </ButtonGroup>
                    </Form>
                </Container>

                <Modal show={show} onHide={handleClose} backdrop="static" size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Resultados do alinhamento</Modal.Title>                    
                    </Modal.Header>

                    <Modal.Body>
                        <Table striped bordered responsive>
                            <tbody id="alignmentResults">
                                <tr id="seq1">
                                    <th>Sequência n° 1</th>
                                </tr>

                                <tr id="seq2">
                                    <th>Sequência n° 2</th>
                                </tr>
                            </tbody>
                        </Table>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button type="button" className="btn btn-secondary" onClick={handleClose}>Fechar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
} export default Main;