import react from 'react'
import { FiUpload } from 'react-icons/fi';

function UploadButton({ handleFileSelect, buttonStyle }) {
  if (!buttonStyle) {
    buttonStyle = {
      backgroundColor: 'white',
      color: 'black',
      cursor: 'pointer',
      padding: '0px'
    }
  }
  return (
    <>
      <input id="upload-button" type="file" multiple onChange={handleFileSelect} style={{display: 'none'}}></input>
      <label
      htmlFor="upload-button"
      style={buttonStyle}
      title="Upload Images"
      >  
        <FiUpload size='30px' />
      </label>
    </>
  )
}

export { UploadButton };
