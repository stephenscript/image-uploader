import react from 'react'

function UploadButton({ handleFileSelect, style }) {
  if (!style) {
    style={
      backgroundColor: 'white',
      color: 'black',
      padding: '5px 10px 5px 10px',
      borderRadius: '15px',
      cursor: 'pointer',
      outline: '1px solid black'
    }
  }
  return (
    <>
      <input id="upload-button" type="file" multiple onChange={handleFileSelect} style={{display: 'none'}}></input>
      <label
      for="upload-button"
      style={style}
      >  
        Upload
      </label>
    </>
  )
}

export default UploadButton;
