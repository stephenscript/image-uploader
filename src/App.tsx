import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [allFiles, setAllFiles] = useState([]);

  useEffect(() => {
    if (selectedFile) {
      const img = URL.createObjectURL(selectedFile);
      console.log(img)
      if (allFiles.length) {
        setAllFiles([ ...allFiles, img ]);
      } else {
        setAllFiles([img]);
      }
    }
   
  }, [selectedFile]);

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const imgs = allFiles.map((file, i) => <img key={i} src={file}></img>);

  return (
    <>
      <input type="file" onChange={handleFileSelect}></input>
      {imgs}
    </>
  )
}

export default App
