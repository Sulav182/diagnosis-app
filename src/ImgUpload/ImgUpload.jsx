import { useState } from 'react';
import axios from 'axios';
import '../../style/ImgUpload.css';

function ImgUpload() {
    const [error, setError] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);
    const [base64Image, setBase64Image] = useState(null);
    
    const handleFileUpload = async (event) => {
        const file = event.target.files[0]; // Assuming single file upload

        if (file) {
            // File type validation
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                setError('Invalid file type. Please upload an image.');
                return;
            }

            // File size validation (e.g., limit to 5MB)
            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                setError('File size exceeds the 5MB limit.');
                return;
            }

            // Clear any previous error
            setError(null);
            setFileName(file.name);

            // Convert image to base64
            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64Image(reader.result.split(',')[1]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChatGPTQuery = async () => {
        const apiKey = ''; // Replace with your OpenAI API key

        if (!base64Image) {
            setError('No image uploaded or image not yet processed.');
            return;
        }

        try {
            const payload = {
                model: "gpt-4o",
                messages: [
                    {
                        role: "user",
                        content: [
                            { type: "text", text: "I have give me possible cause, diagnosis and treatment plan based on the image" },
                            { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
                        ]
                    }
                ],
                max_tokens: 300
            };

            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            setApiResponse(response.data.choices[0].message.content);
        } catch (error) {
            console.error('Error querying ChatGPT:', error);
            setError('Error querying ChatGPT: ' + error.message);
        }
    };

    return (
        <div className="upload-container">
            <h2>Upload Image</h2>
            {error && <p className="error-message">{error}</p>}
            {fileName && <p className="file-name">Selected file: {fileName}</p>}
            <label htmlFor="file-upload" className="upload-button">
                {isUploading ? 'Uploading...' : 'Upload an Image'}
                <input 
                    id="file-upload" 
                    type="file" 
                    onChange={handleFileUpload} 
                    style={{ display: 'none' }} 
                    accept=".jpg,.jpeg,.png,.gif" // Restrict file types
                    disabled={isUploading} // Disable input while uploading
                />
            </label>
            <button onClick={handleChatGPTQuery} disabled={isUploading || !base64Image}>
                Ask ChatGPT
            </button>
            {apiResponse && <p className="api-response">ChatGPT Response: {apiResponse}</p>}
        </div>
    );
}

export default ImgUpload;
