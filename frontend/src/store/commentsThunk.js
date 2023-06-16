import { csrfFetch } from './csrf';
import normalizeIdArrToObj from './normalizer';

const ALL_COMMENTS = '/comments/all';

const allComments = (payload) => ({
    type: ALL_COMMENTS,
    payload
});

// THUNK - get all comments for an event
export const getAllEventComments = (eventId) => async (dispatch) => {
    console.log("get all event before response")
    const response = await csrfFetch(`/api/comments/${eventId}`)
    console.log("after response: ", response)
    if (response.ok) {
        const eventsList = await response.json();
        let normEventList = normalizeIdArrToObj(eventsList)
        // console.log("events: ", normEventList)
        dispatch(allComments(normEventList));
    }
}


const initialState = {}

//reducer - comments reducer
const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_COMMENTS: {
           let returnState = {};
           returnState = {...action.payload};
           return returnState;
        }
        default:
            // console.log('default')
            return state
    }
}

export default commentReducer
