import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Markdown from 'react-markdown'
const Result = (props) => {
    const { data } = props;
    const [apiResponse, setApiResponse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChatGPTResponse = async () => {
            const apiKey = ''; // Replace with your OpenAI API key

            const payload = {
                model: "gpt-4o",
                messages: [
                    {
                        role: "user",
                        content: [
                            { type: "text", text: `I am experiencing ${data.symptoms} on ${data.bodyPart}. What could be the possible causes, diagnosis, and treatment plans?` }
                        ]
                    }
                ],
                max_tokens: 300
            };

            try {
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
        const fetchResponse = async ()=>{
            try {
                const response = await axios.post(
                    'https://ovqd82tmu3.execute-api.us-east-1.amazonaws.com/prod/queryAI',
                    data,
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
        }
        fetchResponse();
        //fetchChatGPTResponse();
    }, [data]);

    return (
        <div className="container">
            {error && <p className="error-message">{error}</p>}
            {apiResponse ? (
                <div>
                    <h3 className="api-response">Medical GPT Response: </h3>
                    <Markdown>{JSON.stringify(apiResponse)}</Markdown>
                </div>
            ) : (
                'Submitting your query...'
            )}
        </div>
    );
};

Result.propTypes = {
    data: PropTypes.shape({
        symptoms: PropTypes.string,
        bodyPart: PropTypes.string
    }).isRequired
};

export default Result;
