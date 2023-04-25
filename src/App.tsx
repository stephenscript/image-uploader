import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);

  useEffect(() => {
    if (uploadedFiles.length) {
      const imgArr = uploadedFiles.map((img) => URL.createObjectURL(img));
      if (allFiles.length) {
        setAllFiles([ ...allFiles, ...imgArr ]);
      } else {
        setAllFiles([...imgArr]);
      }
    }
  }, [uploadedFiles]);

  const handleFileSelect = (e) => {
    setUploadedFiles(Object.values(e.target.files));
  }

  const imgs = allFiles.map((file, i) => <img key={i} src={file} style={{ width: '30%', height: '30%', maxHeight: '' }}></img>);

  return (
    <>
      <input type="file" multiple onChange={handleFileSelect}></input>
      <div style={{ display: 'flex', width: '100%', height: '100%', flexWrap: 'wrap', overflow: 'none', gap: '2px' }}>
        {imgs}
      </div>
     
    </>
  )
}

export default App
