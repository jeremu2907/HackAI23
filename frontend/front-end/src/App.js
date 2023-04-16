import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import Upload from "./components/UploadButton/Upload"
import PostProcess from './pages/PostProcess';

function App() {

  return (
    <div className="App">
      {/* <div className="App-header">
        <h1>App Name</h1>
        <h2>Something to make the app sound epic</h2>
        <Upload/>
      </div> */}
      {/* <PostProcess /> */}

      <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="App-header">
            {/* <div id="buttonDiv"></div> */}
            <h1>App Name</h1>
            <h2>Something to make the app sound epic</h2>
            <Upload/>
          </div>
        }/>
        <Route path="/PostProcess" element={<PostProcess />} />
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
