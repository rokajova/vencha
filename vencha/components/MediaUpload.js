import React, { useState } from "react";
import firebase from "../config/firebase";

const MediaUpload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileType = file["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

      if (validImageTypes.includes(fileType)) {
        setError("");
        setImage("file");
      } else {
        setError("Please select an image to upload");
      }
    }
  };

  return (
    <div>
      {" "}
      <div>
        <input onChange={handleChange} type="file" />
        <button>Upload</button>
      </div>
      <div style={{ height: "100px" }}>
        {progress > 0 ? <progress value={progress} max="100" /> : ""}
        <p style={{ color: "red" }}>{error}</p>
      </div>
      {url ? <img src={url} alt="logo" /> : ""}
    </div>
  );
};

export default MediaUpload;
