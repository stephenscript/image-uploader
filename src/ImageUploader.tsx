import { useEffect, useState, useRef } from 'react'
import './ImageUploader.css'
import CompressedImage from './CompressedImage';
import UploadButton from './UploadButton';
import SubmitButton from './SubmitButton';

import shortid from 'shortid';

function ImageUploader() {
  const ref = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [images, setImages] = useState([]);
  const dragRef = useRef({
    startElement: null,
    endElement: null,
    maxIndex: 0,
    rawFiles: {}
  });

  useEffect(() => {
    if (!uploadedFiles.length) return;

    const compressedImages = uploadedFiles.map((file) => {
      const key = shortid.generate();
      dragRef.current.rawFiles[key] = file;
      return (
        <CompressedImage
        key={key}
        shortid={shortid}
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

  }, [uploadedFiles]);

  const handleFileSelect = (e) => {
    setUploadedFiles(Object.values(e.target.files));
  }
  
  /* Callback passed as props to SubmitButton
    const handleFileSubmit = (e, files) => {
    return files
    }
  */

  return (
    <>
      <UploadButton handleFileSelect={handleFileSelect}/>
      <SubmitButton imageContainerRef={ref} files={dragRef.current.rawFiles}/>
      <div style={{width: '100vw', height:'100vh'}}>
        <div className="images-container" ref={ref} style={{ display: 'flex', justifyContent: 'flex-start', alignContent: 'flex-start', width: '100%', height: '100%', flexWrap: 'wrap', gap: '2px'}}>
          {images}
        </div>
      </div>
    </>
  )
}

export default ImageUploader
