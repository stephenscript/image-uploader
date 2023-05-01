import React, { ChangeEventHandler, CSSProperties } from "react";
import { FiUpload } from "react-icons/fi";

interface UploadButtonProps {
  handleFileSelect: ChangeEventHandler<HTMLInputElement>;
  uploadButtonStyle?: CSSProperties;
}

function UploadButton({
  handleFileSelect,
  uploadButtonStyle,
}: UploadButtonProps) {
  if (!Object.values(uploadButtonStyle).length) {
    uploadButtonStyle = {
      backgroundColor: "white",
      color: "black",
      cursor: "pointer",
      padding: "0px",
    };
  }

  return (
    <>
      <input
        id="upload-button"
        type="file"
        multiple
        onChange={handleFileSelect}
        style={{ display: "none" }}
      ></input>
      <label
        htmlFor="upload-button"
        style={uploadButtonStyle}
        title="Upload Images"
      >
        <FiUpload size="30px" />
      </label>
    </>
  );
}

export { UploadButton };
