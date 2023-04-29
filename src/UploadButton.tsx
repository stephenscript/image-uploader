import react from 'react'
import UploadIcon from '@mui/icons-material/Upload';

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
        <UploadIcon  /> 
      </label>
    </>
  )
}

export default UploadButton;
