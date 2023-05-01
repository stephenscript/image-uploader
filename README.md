# Image Uploader

- A simple image uploading interface for React

## Installation

```bash
npm i react-image-upload-interface

```

```js
import { ImageUploader } from 'react-image-upload-interface'

```

## Usage

```js
  <ImageUploader
    Width='80vh'
    Height='60vh'
    submitButtonStyle={submitButtonStyle}
    handleFileSubmit={handleFileSubmit}
  />
```

### Required Props

- Use the *Width* and *Height* props to specify the width and height of the component
- To access and array of submitted files, it's important to pass in a *handleFileSubmit* callback function:

```js
  handleFileSubmit = (files) => /* code to handle raw image files */
```

### Optional Props

- Use the *uploadButtonStyle* and *submitButtonStyle* props to style the respective buttons
- The *MaxResolution* and *MaxFileSize* props specify the level of compression each image incurs. By default, images have a max height or width of 1920px and a max file size of 1mb

## How It Works

- This image upload interface accepts the uploading of .png, .jpg, and .jpeg files
- Users can swap the position of the images by using drag-and-drop, and this order will be reflected upon submission
- Users can delete images from the list
- Uploading the same image name will not produce a second copy of that image to appear

## Under The Hood

- Swapping of image positions is handled using in-line styles, requiring only the two individual images to be re-rendered in constant time
- Once uploaded, images are compressed to improve browser performance
  - A reference to the raw image file is retained in memory via a hashmap
  - Compression is handled asynchronously, and a loading spinner is provided for user feedback
- Upon submission, the individual images in the DOM are references for their order and applied to the raw files in memory, requiring only a single linear runtime operation

## Contributions

- Authored by Stephen Rivas
- To contribute to [this repo](https://github.com/stephenpharmd/image-uploader):
  - fork, clone and submit a feature branch as a pull request