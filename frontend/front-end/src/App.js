import './App.css';
import Upload from "./components/UploadButton/Upload"

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>App Name</h1>
        <h2>Something to make the app sound epic</h2>
        {/* <button id="upload-button" onClick={upload}>Upload file</button> */}
        <Upload/>
      </div>

      <div>
        
      </div>
    </div>
  );
}

export default App;
