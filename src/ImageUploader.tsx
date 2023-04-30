import React, {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  MutableRefObject,
} from "react";
import { v4 as uuid4 } from "uuid";
import { CompressedImage } from "./CompressedImage";
import { UploadButton } from "./UploadButton";
import { SubmitButton } from "./SubmitButton";
import { BsCardImage } from "react-icons/bs";
import { DragRefType } from "./types";

type ImageUploaderProps = {
  handleFileSubmit: (files: { [key: string]: File }) => void;
  uploadButtonStyle?: React.CSSProperties;
  submitButtonStyle?: React.CSSProperties;
  Width: number;
  Height: number;
  CompressionFactor: number;
  MaxFileSize: number;
};

function ImageUploader({
  handleFileSubmit,
  uploadButtonStyle = {},
  submitButtonStyle = {},
  Width,
  Height,
  CompressionFactor,
  MaxFileSize,
}: ImageUploaderProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [images, setImages] = useState<JSX.Element[]>([]);
  const dragRef: MutableRefObject<DragRefType> = useRef({
    start: null,
    end: null,
    setPosStart: () => {},
    setPosEnd: () => {},
    maxIndex: 0,
    rawFiles: {} as { [key: string]: File },
  });

  useEffect(() => {
    if (!uploadedFiles.length) return;

    const compressedImages = uploadedFiles
      .map((file) => {
        if (!dragRef.current) return null;
        const key = uuid4();
        dragRef.current.rawFiles[key] = file;
        return (
          <CompressedImage
            key={key}
            uuid={key}
            file={file}
            order={dragRef.current.maxIndex++}
            dragRef={dragRef}
            CompressionFactor={CompressionFactor}
            MaxFileSize={MaxFileSize}
          />
        );
      })
      .filter(Boolean) as JSX.Element[];

    if (images.length) {
      setImages([...images, ...compressedImages]);
    } else {
      setImages(compressedImages);
    }
  }, [uploadedFiles]);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setUploadedFiles(Array.from(files));
    }
  };

  const ImagePlaceholder = (
    <div
      style={{
        display: "flex",
        paddingTop: "5%",
        gap: "20%",
        alignItems: "center",
      }}
    >
      <BsCardImage style={{ transform: "scale(4.8)" }} />
      <div>Select the 'upload images' button to begin </div>
    </div>
  );

  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", minWidth: Width }}
      >
        <div
          className="buttons"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "15px",
            padding: "20px",
            minWidth: Width,
          }}
        >
          <UploadButton
            handleFileSelect={handleFileSelect}
            style={uploadButtonStyle}
          />
          <SubmitButton
            handleFileSubmit={handleFileSubmit}
            imageContainerRef={ref}
            files={dragRef.current.rawFiles}
            style={submitButtonStyle}
          />
        </div>
        <div
          className="images-container"
          ref={ref}
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "flex-start",
            width: Width,
            height: Height,
            overflow: "scroll",
            flexWrap: "wrap",
            gap: "2px",
            padding: "20px 0px 20px 0px",
          }}
        >
          {images.length ? images : ImagePlaceholder}
        </div>
      </div>
    </>
  );
}

export { ImageUploader };
