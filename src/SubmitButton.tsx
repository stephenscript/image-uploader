import React, { MutableRefObject } from "react";

type SubmitButtonProps = {
  handleFileSubmit?: (files: File[]) => void;
  files: { [key: string]: File };
  buttonStyle?: React.CSSProperties;
  imageContainerRef: MutableRefObject<HTMLDivElement | null>;
};

function SubmitButton({
  handleFileSubmit,
  files,
  buttonStyle,
  imageContainerRef,
}: SubmitButtonProps) {
  if (!buttonStyle) {
    buttonStyle = {
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
    
    const imageContainers = imageContainerRef.current?.children;
    if (!imageContainers) return;

    for (const imageContainer of imageContainers) {
      const position = parseInt(imageContainer.children[0].children[1].id);
      orderedFiles.push(Object.values(files)[position]);
    }

     // default submit button behavior
    if (!handleFileSubmit) {
      handleFileSubmit = () => {
        console.log("Please pass a handleFileSubmit prop to Submit button");
        console.log("Format: (e, files) => * code to manage files * ");
      };
    } else {
      handleFileSubmit(orderedFiles);
    }
    
  };

  return (
    <>
      <input
        id="submit-button"
        onClick={sortAndHandleFileSubmit}
        style={{ display: "none" }}
      />
      <label htmlFor="submit-button" style={buttonStyle} title="Submit Images">
        Submit
      </label>
    </>
  );
}

export { SubmitButton };
