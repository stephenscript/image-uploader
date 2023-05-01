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
import { DragRefType, ImageUploaderProps } from "./types";

function ImageUploader({
  handleFileSubmit,
  uploadButtonStyle = {},
  submitButtonStyle = {},
  Width,
  Height,
  MaxResolution,
  MaxFileSize,
}: ImageUploaderProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [images, setImages] = useState<JSX.Element[]>([]);
  const [showError, setShowError] = useState(false);
  const dragRef: MutableRefObject<DragRefType> = useRef({
    start: null,
    end: null,
    setPosStart: () => {},
    setPosEnd: () => {},
    maxIndex: 0,
    rawFiles: {} as { [key: string]: File },
    fileNames: new Set<string>()
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
            MaxResolution={MaxResolution}
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


  useEffect(() => {
    if (!showError) return;
    setTimeout(() => setShowError(false), 2500);
  }, [showError]);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const fileNames = dragRef.current.fileNames;
    const fileTypes = new Set(['image/png', 'image/jpg', 'image/jpeg']);
    let isBadFileType = false;

    const validatedFiles = [...files].filter((file) => {
      if (fileNames.has(file.name)) return false;
      if (!fileTypes.has(file.type)) {
        isBadFileType = true;
        return false;
      }
      fileNames.add(file.name);
      return true;
    });
    if (isBadFileType) {
      setShowError(true);
    }

    if (validatedFiles) {
      setUploadedFiles(Array.from(validatedFiles));
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
      <dialog 
      open
      style={{display: showError ? 'block' : 'none', position: 'absolute', top:'10%', zIndex: 999999, backgroundColor: 'pink', borderRadius: '15px', fontSize: '20px'}}>
       File type must be .png, jpg, or .jpeg!
      </dialog>
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
            uploadButtonStyle={uploadButtonStyle}
          />
          <SubmitButton
            handleFileSubmit={handleFileSubmit}
            imageContainerRef={ref}
            dragRef={dragRef}
            submitButtonStyle={submitButtonStyle}
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
            padding: "20px",
          }}
        >
          {images.length ? images : ImagePlaceholder}
        </div>
      </div>
    </>
  );
}

export { ImageUploader };
