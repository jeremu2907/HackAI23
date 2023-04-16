import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import Upload from "./components/UploadButton/Upload"
import PostProcess from './pages/PostProcess';
import Loading from './components/Loading/Loading'

function App() {
   global.LATEST_TRANSLATED_LANG = undefined;

  return (
    <div className="App">
      {/* <div className="App-header">
        <h1>App Name</h1>
        <h2>Something to make the app sound epic</h2>
        <Upload/>
      </div> */}
      {/* <PostProcess /> */}
      <Loading/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="App-header">
            {/* <div id="buttonDiv"></div> */}
            <h1>Oh - Cap</h1>
            <h2>Better video translation, powered by Deep Learning and Cloud Technologies</h2>
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
