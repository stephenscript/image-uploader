import { useEffect, useState, useRef } from 'react'
import './App.css'
import imageCompression from 'browser-image-compression';
import './CompressedImage.css';

const compressionOptions = {
  maxSizeMB: 0.5,
  maxWidthOrHeight: 960,
  useWebWorker: true
}

const handleDragStart = (e, ref) => {
  ref.current.style.opacity = '0.4';
}
const handleDragEnd = (e, ref) => {
  ref.current.style.opacity = '1';
}
const handleDragOver = (e, ref) => {
  e.preventDefault();
  return false;
}
const handleDragEnter = (e, ref) => {
  ref.current.classList.add('over');
}
const handleDragLeave = (e, ref) => {
  ref.current.classList.remove('over');
}

function CompressedImage({ file }) {

  const ref = useRef(null);

  const [compressedImage, setCompressedImage] = useState(null);

  useEffect(() => {

      const compressImage = async() => {
        const compressedFile = await imageCompression(file, compressionOptions);
        const compressedImage = URL.createObjectURL(compressedFile);
        setCompressedImage(compressedImage);
      }
      compressImage();
  }, []);


  return (
    <>
      <img 
      ref={ref}
      draggable="true"
      src={compressedImage}
      style={{maxHeight: '30%', maxWidth: '30%', cursor:'move'}}
      onDragStart={(e) => handleDragStart(e, ref)}
      onDragOver={(e) => handleDragOver(e, ref)}
      onDragEnter={(e) => handleDragEnter(e, ref)}
      onDragLeave={(e) => handleDragLeave(e, ref)}
      onDragEnd={(e) => handleDragEnd(e, ref)}
      /> 
    </>
  )
}

export default CompressedImage;
