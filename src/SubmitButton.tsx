import React, { MutableRefObject } from "react";
import { DragRefType } from "./types";

type SubmitButtonProps = {
  handleFileSubmit?: (files: File[]) => void;
  dragRef: DragRefType;
  submitButtonStyle?: React.CSSProperties;
  imageContainerRef: MutableRefObject<HTMLDivElement | null>;
};

function SubmitButton({
  handleFileSubmit,
  dragRef,
  imageContainerRef,
  submitButtonStyle,
}: SubmitButtonProps) {
  if (!Object.values(submitButtonStyle).length) {
    submitButtonStyle = {
      backgroundColor: "white",
      color: "black",
      padding: "5px 10px 5px 10px",
      cursor: "pointer",
      outline: "1px solid black",
      borderRadius: "15px",
    };
  }

  // sort raw files into array based on order of image elements in DOM
  const sortAndHandleFileSubmit = () => {
    const orderedFiles: File[] = [];
    const unorderedFiles: File[] = Object.values(dragRef.current.rawFiles);
    const imageContainers = imageContainerRef.current?.children;
    if (!imageContainers) return;

    for (const imageContainer of imageContainers) {
      const image = imageContainer.children[0].children[1];
      const position = parseInt(image.id);
      console.log(position, dragRef.current.maxIndex)
      unorderedFiles[position] ? orderedFiles.push(unorderedFiles[position]) : orderedFiles.unshift(unorderedFiles[dragRef.current.maxIndex - position - 1]);
    }
     // default submit button behavior
    if (!handleFileSubmit || !unorderedFiles.length) {
      handleFileSubmit = () => {
        console.log("Please pass a handleFileSubmit prop to Submit button");
        console.log("Format: (e, files) => * code to manage files * ");
      };
    } else {
      handleFileSubmit(orderedFiles[0] ? orderedFiles : []);
    }
    
  };

  return (
    <>
      <input
        id="submit-button"
        onClick={sortAndHandleFileSubmit}
        style={{ display: "none" }}
      />
      <label htmlFor="submit-button" style={submitButtonStyle} title="Submit Images">
        Submit
      </label>
    </>
  );
}

export { SubmitButton };
