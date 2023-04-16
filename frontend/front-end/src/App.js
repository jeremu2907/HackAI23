import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import Upload from "./components/UploadButton/Upload"
import PostProcess from './pages/PostProcess';

function App() {
  function handleCallbackResponse(response){
    console.log("JWD Token" + response.credential)
  }

  useEffect(() => {
      /* global google */
      google.accounts.id.initialize({
          client_id: "767441415793-sq762l7n92ea8sq6bempmnvn6q6ebij6.apps.googleusercontent.com",
          callback: handleCallbackResponse
      })

      google.accounts.id.renderButton(
          document.getElementById("buttonDiv"),
          {theme: "outline", size: "large"}
      );
  }, [])
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
