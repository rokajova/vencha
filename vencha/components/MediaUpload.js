import firebase from "firebase/app";
import "firebase/storage";
import { useRef, useState } from "react";

const MediaUpload = () => {
  const inputEl = useRef(null);
  const [value, setValue] = useState(0);

  function uploadFile() {
    var file = inputEl.current.files[0];
    var storageRef = firebase.storage().ref("Vents/" + file.name);
    var task = storageRef.put(file);

    task.on(
      "state_change",

      function progress(snapshot) {
        setValue((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },

      function error(err) {
        alert(error);
      },

      function complete() {
        alert("Upload to sotrage complete!");
      }
    );
  }

  return (
    <div>
      <progress value={value} max="100"></progress>;
      <input type="file" onChange={uploadFile} ref={inputEl} />
    </div>
  );
};

export default MediaUpload;
