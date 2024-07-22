import { useState } from 'react';
import axios from 'axios';
import '../../style/ImgUpload.css';
import Markdown from 'react-markdown'

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

        // try {
        //     const payload = {
        //         model: "gpt-4o",
        //         messages: [
        //             {
        //                 role: "user",
        //                 content: [
        //                     { type: "text", text: "I have give me possible cause, diagnosis and treatment plan based on the image" },
        //                     { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
        //                 ]
        //             }
        //         ],
        //         max_tokens: 300
        //     };

        //     const response = await axios.post(
        //         'https://api.openai.com/v1/chat/completions',
        //         payload,
        //         {
        //             headers: {
        //                 'Authorization': `Bearer ${apiKey}`,
        //                 'Content-Type': 'application/json'
        //             }
        //         }
        //     );

        //     setApiResponse(response.data.choices[0].message.content);
        // } catch (error) {
        //     console.error('Error querying ChatGPT:', error);
        //     setError('Error querying ChatGPT: ' + error.message);
        // }
        //const fetchResponse = async ()=>{
            try {
                const response = await axios.post(
                    'https://ovqd82tmu3.execute-api.us-east-1.amazonaws.com/prod/queryAI',
                    {image:base64Image},
                    {
                        headers: {
                            'x-api-key': `uYwil5e8jZ8jnomt0utsr4Eocgee5QXk8YevDPCR`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                console.log(response)
                setApiResponse(response.data.response);
            } catch (error) {
                console.error('Error querying ChatGPT:', error);
                setError('Error querying ChatGPT: ' + error.message);
            }
        
    };

    return (
        <div className="container">
        <div className="upload-container">
            <h2>Upload Image</h2>
            {error && <p className="error-message">{error}</p>}
            {fileName && <p className="file-name">Selected file: {fileName}</p>}
            <label htmlFor="file-upload" className="btn btn-primary">
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
            <button onClick={handleChatGPTQuery} disabled={isUploading || !base64Image} className="btn btn-primary" style={{margin:"10px"}}>
                Ask ChatGPT
            </button>
            {apiResponse && <div><h3 className="api-response">ChatGPT Response:</h3><Markdown> {JSON.stringify(apiResponse)}</Markdown></div>}
        </div>
        </div>
    );
}

export default ImgUpload;
