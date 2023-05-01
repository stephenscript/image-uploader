import { useEffect, useState, useRef } from "react";
import imageCompression from "browser-image-compression";
import "./CompressedImage.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CompressedImageProps } from "./types";
import {
  handleDragStart,
  handleDragEnd,
  handleDragOver,
  handleDragEnter,
  handleDragLeave,
  handleLoad,
} from "./utils.tsx";

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
  const [compressedImage, setCompressedImage] = useState<string>("");
  const ref = useRef<HTMLImageElement>(null);

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

  const ImageCard = () => {
    return (
      <>
        <div className="image-content">
          <button
            className="x-button"
            onClick={_ => {
              const child = document.getElementById(pos);
              const parent = document.querySelector(".images-container");
              if (!child || !parent || !dragRef.current) return;
              dragRef.current.fileNames.delete(
                dragRef.current.rawFiles[uuid].name
              );
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
  };

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
        <ImageCard />
      </div>
    </>
  );
}

export { CompressedImage };
