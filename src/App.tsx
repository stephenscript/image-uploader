import { useEffect, useState, useRef } from 'react'
import './App.css'
import CompressedImage from './CompressedImage';
import shortid from 'shortid';

const getFiles = (ref) => {

}

function App() {
  const ref = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [images, setImages] = useState([]);
  const dragRef = useRef({
    startElement: null,
    endElement: null,
    maxIndex: 0,
    rawFiles: {}
  });

  useEffect(() => {
    if (uploadedFiles.length) {
      const compressedImages = uploadedFiles.map((file) => {
        const key = shortid.generate();
        dragRef.current.rawFiles[key] = file;
        return (
          <CompressedImage
          key={key}
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
        <div className="images-container" ref={ref} style={{ display: 'flex', justifyContent: 'flex-start', alignContent: 'flex-start', width: '100%', height: '100%', flexWrap: 'wrap', gap: '2px'}}>
          {images}
        </div>
      </div>
     
     
    </>
  )
}

export default App
