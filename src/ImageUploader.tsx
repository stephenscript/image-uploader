import { useEffect, useState, useRef } from 'react'
import './ImageUploader.css'
import CompressedImage from './CompressedImage';
import UploadButton from './UploadButton';
import SubmitButton from './SubmitButton';
import uuid4 from 'uuid4';
import { InsertPhoto } from '@mui/icons-material';

function ImageUploader({ handleFileSubmit, uploadButtonStyle, submitButtonStyle, Width, Height }) {
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
      const key = uuid4();
      dragRef.current.rawFiles[key] = file;
      return (
        <CompressedImage
        key={key}
        uuid={key}
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


  const ImagePlaceholder = (
    <div style={{display: 'flex', paddingTop: '5%', gap: '20%', alignItems: 'center'}}>
      <InsertPhotoIcon style={{transform: 'scale(4.8)'}}/>
      <div>Select the 'upload images' button to begin </div>
    </div>
    );

  return (
    <>
    <div style={{display: 'flex', flexDirection: 'column', minWidth: Width}}>
      <div className="buttons" style={{display: 'flex', justifyContent: 'flex-end', gap: '15px', padding: '20px', minWidth: Width}}>
          <UploadButton handleFileSelect={handleFileSelect} style={uploadButtonStyle}/>
          <SubmitButton handleFileSubmit={handleFileSubmit} imageContainerRef={ref} files={dragRef.current.rawFiles} style={submitButtonStyle}/>
      </div>
      <div className="images-container" ref={ref} style={{ display: 'flex', justifyContent: 'center', alignContent: 'flex-start', width: Width, height: Height, overflow: 'scroll', flexWrap: 'wrap', gap: '2px', padding: '20px 0px 20px 0px'}}>
          {images.length ? images : ImagePlaceholder}
      </div>

    </div>
    </>
  )
}

export default ImageUploader
