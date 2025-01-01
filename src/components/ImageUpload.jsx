import { useState,useEffect } from "react";
import { storage } from "../api/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ImageUploader = ({ data, setData, handlePhotoChange }) => {

  const [image, setImage] = useState(data);
  useEffect(() => {
    if (data) {
      setImage(data);
    }
  }, [data]);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error("Upload failed:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImage(url);
            handlePhotoChange(url);
          });
        }
      );
    }
  };

  return (
    <div className="relative w-24 h-24 rounded-full bg-[#eaecdd] border">
      {image ? (
        <label htmlFor="fileInput" className="absolute inset-0 cursor-pointer">
          <img
            src={image}
            alt="Uploaded"
            className="w-full h-full object-cover rounded-full"
          />
        </label>
      ) : (
        <label
          htmlFor="fileInput"
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
        >
          <span className="text-3xl">+</span>
        </label>
      )}
      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={handleImageChange}
        accept="image/*"
      />
    </div>
  );
};

export default ImageUploader;
