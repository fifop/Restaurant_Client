import React, { useRef } from "react";

function ImageUploadButton({onFileSelect} ) {
  const fileInputRef = useRef();

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        onFileSelect(selectedFile); // Call the callback function with the selected file
              console.log("Selected file:", selectedFile);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label
        htmlFor="fileInput"
        onClick={handleImageClick}
        style={{
          backgroundColor: "#319aa0",
          borderRadius: "50px",
          color: "white",
          fontWeight: "bold",
          fontFamily: "cursive",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Upload  Image
      </label>
    </div>
  );
}

export default ImageUploadButton;
