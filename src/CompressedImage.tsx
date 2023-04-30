import { useEffect, useState, useRef } from "react";
import imageCompression from "browser-image-compression";
import "./CompressedImage.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { DragRefType, CompressedImageProps } from "./types";

// image starts being dragged
const handleDragStart = (
  e: React.DragEvent<HTMLImageElement>,
  ref: React.RefObject<HTMLImageElement>,
  dragRef: React.RefObject<DragRefType>,
  setPos: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!ref.current || !dragRef.current) return;
  ref.current.classList.add("isDragging");
  dragRef.current.start = ref.current;
  dragRef.current.setPosStart = setPos;
};

// image stops being dragged (released)
const handleDragEnd = (
  e: React.DragEvent<HTMLImageElement>,
  ref: React.RefObject<HTMLImageElement>,
  dragRef: React.RefObject<DragRefType>
) => {
  if (!ref.current || !dragRef.current) return;

  ref.current.classList.remove("over");
  // swap the positions of the two images by exchanging their 'order' styles
  const startOrder = dragRef.current.start?.id || "";
  const endOrder = dragRef.current.end?.id || "";
  dragRef.current.setPosStart(endOrder);
  dragRef.current.setPosEnd(startOrder);

  ref.current.classList.remove("isDragging");
};

// image is dragged over other image
const handleDragOver = (
  e: React.DragEvent<HTMLImageElement>,
  dragRef: React.RefObject<DragRefType>,
  setPos: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!dragRef.current) return;

  dragRef.current.end = e.target as HTMLElement;
  dragRef.current.setPosEnd = setPos;
};

// other image has image dragged over it
const handleDragEnter = (
  e: React.DragEvent<HTMLImageElement>,
  ref: React.RefObject<HTMLDivElement>
) => {
  if (!ref.current) return;
  ref.current.classList.add("over");
};

// other image has image dragged away from it
const handleDragLeave = (
  e: React.DragEvent<HTMLImageElement>,
  ref: React.RefObject<HTMLDivElement>
) => {
  if (!ref.current) return;
  ref.current.classList.remove("over");
};

// loading states of image
const handleLoad = (
  ref: React.RefObject<HTMLImageElement>,
  setIsRendered: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // image is in second cycle of rendering
  const handleRendering = () => {
    requestAnimationFrame(handleRender);
  };

  const handleRender = () => {
    if (!ref.current) return;
    ref.current.classList.remove("rendering");
    ref.current.classList.add("rendered");
    setIsRendered(true);
  };
  // image starts rendering
  requestAnimationFrame(handleRendering);
};

function CompressedImage({
  file,
  order,
  dragRef,
  uuid,
  MaxResolution,
  MaxFileSize,
}: CompressedImageProps): JSX.Element {
  const [pos, setPos] = useState(order);
  const [isRendered, setIsRendered] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  const [compressedImage, setCompressedImage] = useState<string>("");

  const compressionOptions = {
    maxSizeMB: MaxFileSize || 1,
    maxWidthOrHeight: MaxResolution || 1920,
    useWebWorker: true,
  };

  useEffect(() => {
    const compressImage = async () => {
      try {
        const image = new Image();
        image.src = URL.createObjectURL(file);
        const compressedFile = await imageCompression(file, compressionOptions);
        const compressedImage = URL.createObjectURL(compressedFile);
        setCompressedImage(compressedImage);
      } catch (err) {
        console.log(err);
      }
    };
    compressImage();
  }, []);

  const image = (
    <>
      <div className="image-content">
        <button
          className="x-button"
          onClick={(e) => {
            const child = document.getElementById(pos);
            const parent = document.querySelector(".images-container");
            if (!child || !parent || !dragRef.current) return;
            delete dragRef.current.rawFiles[uuid];
            parent.removeChild(child);
          }}
        >
          x
        </button>
        <img
          ref={ref}
          className="rendering"
          id={pos}
          src={compressedImage}
          style={{
            maxWidth: "100%",
            height: "100%",
            backgroundColor: "black",
            cursor: "move",
          }}
          draggable="true"
          loading="lazy"
          onLoad={() => handleLoad(ref, setIsRendered)}
          onDragStart={(e) => handleDragStart(e, ref, dragRef, setPos)}
          onDragOver={(e) => handleDragOver(e, dragRef, setPos)}
          onDragEnter={(e) => handleDragEnter(e, ref)}
          onDragLeave={(e) => handleDragLeave(e, ref)}
          onDragEnd={(e) => handleDragEnd(e, ref, dragRef)}
        />
      </div>
    </>
  );

  return (
    <>
      <div
        id={pos}
        className="image-container"
        style={{
          display: "flex",
          maxWidth: "19.6%",
          order: `${pos}`,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!isRendered ? (
          <AiOutlineLoading3Quarters className="spinner" size="30px" />
        ) : null}
        {image}
      </div>
    </>
  );
}

export { CompressedImage };
