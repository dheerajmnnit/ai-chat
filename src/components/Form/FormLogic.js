import { useState } from "react";

const mockAIResponse = (prompt) => {
    // Simulating the AI response structure
    const fakeResponse = {
        data: {
            "id": "chatcmpl-abc123",
            "object": "chat.completion",
            "created": 1677858242,
            "model": "gpt-3.5-turbo-1106",
            "usage": {
                "prompt_tokens": 13,
                "completion_tokens": 7,
                "total_tokens": 20
            },
            "choices": [
                {
                    "message": {
                        "role": "assistant",
                        "content": "\n\nThis is a test!"
                    },
                    "finish_reason": "stop",
                    "index": 0
                }
            ]
        }
    };

    return Promise.resolve(fakeResponse);
};

const ResponseState = () => {
    const [responses, setResponses] = useState({
        num: 0,
        data: [],
    });

    const newResponse = async (prompt) => {
        console.log("prompt: ", prompt);

        try {
            // Simulating API call using the mock function
            const response = await mockAIResponse(prompt);

            let new_response = {
                "prompt": prompt,
                "ai_response": response.data.choices[0].message.content,
                "id": responses.num + 1,
            };

            responses.num = responses.num + 1;
            responses.data = responses.data.concat(new_response);
            responses.data.sort((a, b) => (a.id > b.id) ? -1 : 1);
            console.log(responses.data);
            setResponses({ ...responses, num: responses.num, data: responses.data });
        } catch (error) {
            console.error("Error:", error);
            // Handle errors accordingly
        }
    };

    return { responses, newResponse };
};



export default ResponseState