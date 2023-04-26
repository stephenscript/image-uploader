import { useEffect, useState, useRef, useMemo } from 'react'
import './App.css'
import CompressedImage from './CompressedImage';
import shortid from 'shortid';


function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [images, setImages] = useState([]);
  const dragRef = useRef({
    startElement: null,
    endElement: null,
    maxIndex: 0
  });

  useEffect(() => {
    if (uploadedFiles.length) {
      // if (images.length) {
      //   setImages([ ...images, ...uploadedFiles.map((file, i) => <CompressedImage key={shortid.generate()} file={file} />) ]);
      // } else {
      //   setImages(uploadedFiles.map((file, i) => <CompressedImage key={shortid.generate()} file={file} />));
      // }
      const compressedImages = uploadedFiles.map((file) => {
        return (
          <CompressedImage
          key={shortid.generate()}
          file={file}
          order={dragRef.current.maxIndex++}
          dragRef={dragRef}
          />)
      });

      if (images.length) {
        setImages([ ...images, ...compressedImages ]);
      } else {
        setImages(compressedImages);
      }
  
      setUploadedFiles([]);
    }

  }, [uploadedFiles.length]);

  const handleFileSelect = (e) => {
    setUploadedFiles(Object.values(e.target.files));
  }


  return (
    <>
      <input type="file" multiple onChange={handleFileSelect}></input>
      <div style={{width: '100vw', height:'100vh'}}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignContent: 'flex-start', width: '100%', height: '100%', flexWrap: 'wrap', gap: '2px'}}>
          {images}
        </div>
      </div>
     
     
    </>
  )
}

export default App
