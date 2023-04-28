import { useEffect, useState, useRef } from 'react'
import imageCompression from 'browser-image-compression';
import './CompressedImage.css';

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

const handleLoad = (ref) => {
  const handleRendering = () => {
    requestAnimationFrame(handleRender);
  }

  const handleRender = () => {
    ref.current.classList.remove('rendering');
    ref.current.classList.add('rendered');
  }

  requestAnimationFrame(handleRendering);
}

function CompressedImage({ file, order, dragRef, shortid }) {

  const [pos, setPos] = useState(order);
  const ref = useRef();

  const [compressedImage, setCompressedImage] = useState(null);
  
  useEffect(() => {
      const compressImage = async() => {
        try {
          const image = new Image();
          image.src = URL.createObjectURL(file);
          
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
      <div className="image-content">
        <button
        className="x-button"
        onClick={(e, ref) => {
          const child = document.getElementById(pos);
          const parent = document.querySelector('.images-container');
          delete dragRef.current.rawFiles[shortid];
          parent.removeChild(child);
        }}
        >x</button>
          <img 
          className="rendering"
          id={pos}
          src={compressedImage}
          style={{maxWidth: '100%', height: 'auto', backgroundColor: 'black', cursor:'move'}}
          ref={ref}
          draggable="true"
          onLoad={() => handleLoad(ref)}
          onDragStart={(e) => handleDragStart(e, ref, dragRef, setPos)}
          onDragOver={(e) => handleDragOver(e, ref, dragRef, setPos)}
          onDragEnter={(e) => handleDragEnter(e, ref)}
          onDragLeave={(e) => handleDragLeave(e, ref)}
          onDragEnd={(e) => handleDragEnd(e, ref, dragRef)}
          />
      </div>
  </>)

  return (
    <>
      <div
      id={pos}
      className="image-container"
      style={{display: 'flex', maxWidth: '19.6%', order: `${pos}`}}
      >
        {image}
      </div>
    </>
  )
}

export default CompressedImage;
