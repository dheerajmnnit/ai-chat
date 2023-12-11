const initialState = {
    conversations: [],
};

const conversationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CONVERSATION':
            return {
                ...state,
                conversations: [...state.conversations, action.payload],
            };
        // Add more cases for different actions related to conversations (saving chats, etc.)
        default:
            return state;
    }
};

export default conversationReducer;
