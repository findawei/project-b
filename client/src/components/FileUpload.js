import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  // If you are using TypeScript the state will be
  // const [file, setFile] = useState<FileList | null>(null);
  const [file, setFile] = useState(null);

  const submitFile = async (event) => {
    event.preventDefault();
    try {
      if (!file) {
        throw new Error('Select a file first!');
      }
      const formData = new FormData();
      formData.append('file', file[0]);
      await axios.post(`/test-upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // handle success
      console.log("Upload to S3 successful!")
    } catch (error) {
      // handle error
      console.log(error)
    }
  };

  return (
    <form onSubmit={submitFile}>
      <label>Upload file</label>
      <input type="file" onChange={event => setFile(event.target.files)} />
      <button type="submit">Send</button>
    </form>
  );
};

export default FileUpload;