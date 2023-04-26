import { useEffect, useState } from 'react'
import './App.css'
import imageCompression from 'browser-image-compression';

const compressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true
}

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {

    if (uploadedFiles.length) {

      const updateFiles = async() => {

        const imgArr = await uploadedFiles.map(async (image, i) => {
          const compressedFile = await imageCompression(image, compressionOptions);
          const compressedImage = URL.createObjectURL(compressedFile);
         
          const Image =  <img key={i} src={compressedImage} style={{ width: '30%', height: '30%', maxHeight: '' }} />
          setImages([...images, Image]);
        });
        
        if (allFiles.length) {
          setAllFiles([ ...allFiles, ...imgArr ]);
        } else {
          setAllFiles([ ...imgArr ]);
        }
      }
    // console.log(images)
    updateFiles();

    }
  }, [uploadedFiles]);

  const handleFileSelect = (e) => {
    setUploadedFiles(Object.values(e.target.files));
  }

  return (
    <>
      <input type="file" multiple onChange={handleFileSelect}></input>
      <div style={{ display: 'flex', width: '100%', height: '100%', flexWrap: 'wrap', overflow: 'none', gap: '2px' }}>
        {images}
      </div>
     
    </>
  )
}

export default App
