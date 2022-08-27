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
            var i = 0;
            var k;
            var control = 0;
            var position = 0;
            // var numMatches = 0;
            // var numMismatches = 0;
            // var numGaps = 0;

            while(control < res.data[0].length) {
                $("#alignmentResults").append(`
                    <tr id=r${i}>
                        <th>Sequência n° 1</th>
                    </tr>
               `);

                $("#alignmentResults").append(`
                    <tr id=r${i+1}>
                        <th>Sequência n° 2</th>
                    </tr>
                `);
                
                $("#alignmentResults").append(`
                    <br/>
                `);

                k = 0;
                for(k; k < 24; k++) {
                    if(res.data[0][position] == null){
                        break
                    }
                    
                    if(res.data[0][position] === res.data[1][position]) {
                        $("#alignmentResults").find(`#r${i}`).append(`
                            <td id=c${k} class=match>${res.data[0][position]}</td>
                        `);

                        $("#alignmentResults").find(`#r${i+1}`).append(`
                            <td id=c${k} class=match>${res.data[1][position]}</td>
                        `);

                        // numMatches++
                    } else if(res.data[0][position] === "-" || res.data[1][position] === "-") {
                        $("#alignmentResults").find(`#r${i}`).append(`
                            <td id=c${k}>${res.data[0][position]}</td>
                        `);

                        $("#alignmentResults").find(`#r${i+1}`).append(`
                            <td id=c${k}>${res.data[1][position]}</td>
                        `);
                        
                        // numGaps++;
                    } else {
                        $("#alignmentResults").find(`#r${i}`).append(`
                            <td id=c${k} class=mismatch >${res.data[0][position]}</td>
                        `);
                            
                        $("#alignmentResults").find(`#r${i+1}`).append(`
                            <td id=c${k} class=mismatch >${res.data[1][position]}</td>
                        `);
                        // numMismatches++;
                    }
                    position++;
                }
                control += k;
                i += 2;
            }

            // $("able").insertBefore(`
            //     <p class=match >${numMatches}</p>
            //     <p class=mismatch >${numMismatches}</p>
            //     <p>${numGaps}</p>
            // `);
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
                            <Form.Control type="text" className="form-control" id="seq1" placeholder="ATCGCTAG" onChange={(e) => setSeq1(e.target.value)}/>
                        </FloatingLabel>
                
                        <FloatingLabel label="Sequência nº 2">
                            <Form.Control type="text" className="form-control" id="seq2" placeholder="TAGCAGT" onChange={(e) => setSeq2(e.target.value)}/>
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
                            <tbody id="alignmentResults"/>
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