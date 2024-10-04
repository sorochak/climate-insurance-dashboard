import React from "react";
import { useDropzone } from "react-dropzone";

function Dropzone({ file, setFile }) {
  const onDrop = (selectedFiles) => {
    setFile(selectedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
    maxFiles: 1,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop a file here ...</p>
      ) : (
        <div>
          <p>
            Drag 'n' drop a *.csv file here, or click to select a *.csv file
          </p>
          <p>
            <em>(Only 1 file will be accepted)</em>
          </p>
        </div>
      )}
      <div>File: {file.name}</div>
    </div>
  );
}

export default Dropzone;
