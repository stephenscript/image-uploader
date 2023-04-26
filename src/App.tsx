import { useEffect, useState } from 'react'
import './App.css'
import CompressedImage from './CompressedImage';


function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {

    if (uploadedFiles.length) {
      if (images.length) {
        setImages([ ...images, ...uploadedFiles.map((file, i) => <CompressedImage key={i} file={file} />) ]);
      } else {
        setImages(uploadedFiles.map((file, i) => <CompressedImage key={i} file={file} />));
      }
    }

  }, [uploadedFiles]);

  const handleFileSelect = (e) => {
    setUploadedFiles(Object.values(e.target.files));
  }

  useEffect(() => {
    
  }, [allFiles]);


  return (
    <>
      <input type="file" multiple onChange={handleFileSelect}></input>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', flexWrap: 'wrap', gap: '2px'}}>
        {images}
      </div>
     
    </>
  )
}

export default App
