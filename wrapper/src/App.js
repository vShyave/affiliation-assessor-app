import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
        <iframe style={{height: "100vh", width: "100vw"}} src="http://localhost:8005/preview?xform=http://localhost:8080/getForm/SOE"/>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/* add an iframe with following link http://localhost:8005/preview?xform=http://localhost:8080/getForm/SOE */}
      </header>
    </div>
  );
}

export default App;
