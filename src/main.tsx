import React from "react";
import ReactDOM from "react-dom/client";
import { ImageUploader } from "./ImageUploader.tsx";
// import ImageUploader from 'react-image-upload-interface'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      outline: "1px solid black",
    }}
  >
    <ImageUploader Width="800px" Height="400px" />
  </div>
);
