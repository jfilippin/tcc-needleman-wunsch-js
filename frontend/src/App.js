import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="navbar bg-primary">
        <img src={logo} alt="Logo" className="logo"/>
      </div>

      <div className="main">
        <div className="container">
          <h1 className="title"><strong>Bem vindo ao (nome app)</strong></h1>
          <hr/>

          <p className="startTxt">
            Para começar, insira um arquivo contendo uma sequência <br/> 
            de DNA em cada campo e clique em alinhar sequências.
          </p>

          <form method="POST" className="form">
            <div className="input-group">
              <input type="file" className="form-control" id="seq1"/>
            </div>

            <div className="input-group">
              <input type="file" className="form-control" id="seq2"/>
            </div>

            <div className="btn-group" role="group">
              <button type="button" className="btn btn-outline-purple">Alinhar sequências</button>
              <button type="reset" className="btn btn-outline-dark">Cancelar alinhamento</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
