import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState([]);
  const [allFiles, setAllFiles] = useState([]);

  useEffect(() => {
    console.log(selectedFile)
    if (selectedFile.length) {
      const imgArr = selectedFile.map((img) => URL.createObjectURL(img));
      console.log(imgArr)
      if (allFiles.length) {
        setAllFiles([ ...allFiles, ...imgArr ]);
      } else {
        setAllFiles([...imgArr]);
      }
    }
   
  }, [selectedFile]);

  const handleFileSelect = (e) => {
    setSelectedFile(Object.values(e.target.files));
  }

  const imgs = allFiles.map((file, i) => <img key={i} src={file}></img>);

  return (
    <>
      <input type="file" multiple onChange={handleFileSelect}></input>
      {imgs}
    </>
  )
}

export default App
