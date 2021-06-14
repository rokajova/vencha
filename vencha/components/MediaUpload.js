import React, { useState } from "react";

const MediaUpload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  return (
    <div>
      <input type="file" />
      <button>Upload</button>
    </div>
  );
};

export default MediaUpload;
