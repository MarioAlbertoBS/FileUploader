import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import UploadFiles from './components/UploadFiles';

function App() {
  return (
    <div className="App">
      <h1>React Multiple Files Upload Example</h1>
      <UploadFiles />
    </div>
  );
}

export default App;
