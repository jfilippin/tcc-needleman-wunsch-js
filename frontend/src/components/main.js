import React from 'react';
import axios from 'axios';
import logo from '../img/logo.svg';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            seq1: '',
            seq2: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.files[0]
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: this.state
        };

        console.log(options);

        axios.post("http://localhost:5000", options)
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log(err)
        });
    }

    render () {
        return(
            <div className="App">
                <div className="navbar bg-primary">
                    <img src={logo} alt="Logo" className="logo"/>
                </div>
        
                <div className="bg">
                    <div className="container">
                        <h1 className="title"><strong>Bem vindo ao (nome app)</strong></h1><hr/>
            
                        <p className="startTxt">
                            Para começar, insira um arquivo contendo uma sequência <br/> 
                            de DNA em cada campo e clique em alinhar sequências.
                        </p>
            
                        <form method="POST" className="form" onSubmit={this.handleSubmit}>
                            <div className="input-group">
                                <input type="file" className="form-control" id="seq1" accept=".txt" onChange={this.handleChange}/>
                            </div>
                
                            <div className="input-group">
                                <input type="file" className="form-control" id="seq2" accept=".txt" onChange={this.handleChange}/>
                            </div>
                
                            <div className="btn-group" role="group">
                                <button type="submit" className="btn btn-outline-purple">Alinhar sequências</button>
                                <button type="reset" className="btn btn-outline-dark">Cancelar alinhamento</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
} export default Main;