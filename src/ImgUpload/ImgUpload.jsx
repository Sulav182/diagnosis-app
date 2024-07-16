import React from 'react';
import '../../style/ImgUpload.css'; 
function ImgUpload() {
    const handleFileUpload = (event) => {
        const file = event.target.files[0]; // Assuming single file upload
        // Handle file upload logic here
        console.log('Uploaded file:', file);
    };

    return (
        <div className="upload-container">
            <h2>Upload Image</h2>
            <label htmlFor="file-upload" className="upload-button">
                Upload an Image
                <input 
                    id="file-upload" 
                    type="file" 
                    onChange={handleFileUpload} 
                    style={{ display: 'none' }} 
                    accept=".jpg,.jpeg,.png,.gif" // Restrict file types
                />
            </label>
        </div>
    );
}

export default ImgUpload;
