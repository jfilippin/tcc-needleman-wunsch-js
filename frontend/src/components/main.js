import React, { useState } from 'react';
import axios from 'axios';
import $ from 'jquery';
import logo from '../img/logo.svg';
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

            for(var i = 0; i < res.data[0].length; i++) {
                $("#alignTable").find("#seq1").append(`
                    <td>${res.data[0][i]}</td>
                `); 

                $("#alignTable").find("#seq2").append(`
                    <td>${res.data[1][i]}</td>
                `);
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
                        <strong className="appName">(nome app)</strong>
                    </h1><hr/>
            
                    <p className="startTxt">
                        Para começar, insira um arquivo contendo uma sequência <br/> 
                        de DNA em cada campo e clique em alinhar sequências.
                    </p>
            
                    <Form method="POST" className="form" onSubmit={handleSubmit}>
                        <FloatingLabel label="Sequência nº 1">
                            <Form.Control type="text" className="form-control" id="seq1" placeholder="ATCGCTAG" onChange={(e) => setSeq1(e.target.value)}/>
                        </FloatingLabel>
                
                        <FloatingLabel label="Sequência nº 2">
                            <Form.Control type="text" className="form-control" id="seq2" placeholder="TAGCAGT"  onChange={(e) => setSeq2(e.target.value)}/>
                        </FloatingLabel>

                        <ButtonGroup>
                            <Button type="submit" className="btn btn-primary" data-toggle="modal" data-target="#results" onClick={handleShow}>Alinhar sequências</Button>
                            <Button type="reset" className="btn btn-outline-dark">Cancelar alinhamento</Button>
                        </ButtonGroup>
                    </Form>
                </Container>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Resultados do alinhamento</Modal.Title>
                        <Button type="button" className="btn close btn-outline-light" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                            <span aria-hidden="true">&times;</span>
                        </Button>   
                    </Modal.Header>

                    <Modal.Body>
                        <Table responsive id="alignTable">
                            <tbody>
                                <tr id="seq1"></tr>
                                <tr id="seq2"></tr>
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