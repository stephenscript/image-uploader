import { useEffect, useState, useRef } from 'react'
import './App.css'
import imageCompression from 'browser-image-compression';
import './CompressedImage.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const compressionFactor = 1;
const maxResolution = 1920;

const compressionOptions = {
  maxSizeMB: compressionFactor,
  maxWidthOrHeight: maxResolution,
  useWebWorker: true
}

const handleDragStart = (e, ref, dragRef, setPos) => {
  ref.current.classList.add('isDragging');
  dragRef.current.start = ref.current;
  dragRef.current.setPosStart = setPos;
}
const handleDragEnd = (e, ref, dragRef) => {
  ref.current.classList.remove('over');

  const startOrder = dragRef.current.start.getAttribute('id');
  const endOrder = dragRef.current.end.getAttribute('id');

  dragRef.current.setPosStart(endOrder);
  dragRef.current.setPosEnd(startOrder);

  ref.current.classList.remove('isDragging');
}
const handleDragOver = (e, ref, dragRef, setPos) => {
  dragRef.current.end = e.target;
  dragRef.current.setPosEnd = setPos;
}
const handleDragEnter = (e, ref) => {
  ref.current.classList.add('over');
  
  
}
const handleDragLeave = (e, ref) => {
  ref.current.classList.remove('over');
}

const handleLoad = (setIsRendered, ref) => {
  ref.current.classList.add('rendering');
  const handleRendering = () => {
    requestAnimationFrame(handleRender);
  }

  const handleRender = () => {
    ref.current.classList.remove('rendering');
    ref.current.classList.add('rendered');
    setIsRendered(true);
  }

  requestAnimationFrame(handleRendering);
}

function CompressedImage({ file, order, dragRef }) {

  const [pos, setPos] = useState(order);
  const ref = useRef();

  const [compressedImage, setCompressedImage] = useState(null);
  const [isRendered, setIsRendered] = useState(false);
  const dimensions = useRef([]);
  
  useEffect(() => {
      const compressImage = async() => {
        try {
          const image = new Image();
          image.src = URL.createObjectURL(file);
          image.onload = () => dimensions.current = [image.width, image.height];
          
          const compressedFile = await imageCompression(file, compressionOptions);
          const compressedImage = URL.createObjectURL(compressedFile);
          setCompressedImage(compressedImage);
        } catch(err) {
          console.log(err);
        }
      }
      compressImage();
  }, []);

  const image = 
  (
  <>
      <img 
      id={pos}
      src={compressedImage}
      className="image-content"
      style={{maxWidth: '100%', backgroundColor: 'black', cursor:'move'}}
      ref={ref}
      draggable="true"
      onLoad={() => handleLoad(setIsRendered, ref)}
      onDragStart={(e) => handleDragStart(e, ref, dragRef, setPos)}
      onDragOver={(e) => handleDragOver(e, ref, dragRef, setPos)}
      onDragEnter={(e) => handleDragEnter(e, ref)}
      onDragLeave={(e) => handleDragLeave(e, ref)}
      onDragEnd={(e) => handleDragEnd(e, ref, dragRef)}
      />
  </>)
  console.log('img rendered', pos)
  return (
    <>
      <div
      className="image-container"
      style={{display: 'flex', maxWidth: '19.6%', order: `${pos}`}}
      >
        {image}
      </div>
    </>
  )
}

export default CompressedImage;