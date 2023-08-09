import React, { useState } from 'react';

function ImageUploader({ onImageUpload }) {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    const handleUpload = () => {
        if (selectedImage) {
            // Perform upload logic here, e.g., using APIs
            onImageUpload(selectedImage);
            setSelectedImage(null); // Clear selected image after upload
        }
    };

    return (
        <div>
            <h2>이미지 업로더</h2>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleUpload}>업로드</button>
        </div>
    );
}

export default ImageUploader;
