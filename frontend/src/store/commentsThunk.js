import { csrfFetch } from './csrf';
import normalizeIdArrToObj from './normalizer';

const ALL_COMMENTS = '/comments/all';
const CLEAR_STATE = '/comments/clear'

const allComments = (payload) => ({
    type: ALL_COMMENTS,
    payload
});

const clear_state = () => ({
    type: CLEAR_STATE
})

// THUNK - get all comments for an event
export const getAllEventComments = (eventId) => async (dispatch) => {
    console.log("get all event before response")
    console.log("eventId: ", eventId)
    const response = await csrfFetch(`/api/comments/${eventId}`)
    console.log("after response: ", response)
    if (response.ok) {
        const eventsList = await response.json();
        let normEventList = normalizeIdArrToObj(eventsList)
        // console.log("events: ", normEventList)
        dispatch(allComments(normEventList));
    }
}

// THUNK - add a comment to an event
export const addComment = (payload) => async (dispatch) => {
    console.log("----add comment thunk----")
    const {eventId} = payload
    console.log("add comment before")
    const response = await csrfFetch(`/api/comments/${eventId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    console.log("add comment after")
    if (response.ok) {
        const newComment = await response.json();
        dispatch(getAllEventComments(eventId))
    }
}

// THUNK - edit a comment to an event
export const editComment = (payload) => async (dispatch) => {
    const {eventId} = payload
    const response = await csrfFetch('/api/comments/edit', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        dispatch(getAllEventComments(eventId))
    }
}

// THUNK - delete a comment for an event
export const deleteComment = (payload) => async (dispatch) => {
    console.log("----delete comment----")
    const {eventId, user} = payload
    console.log("delete comment before")
    const response = await csrfFetch('/api/comments/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    console.log("delete comment after")
    if (response.ok) {
        const deleteComment = await response.json()
        dispatch(getAllEventComments(eventId))
    }
}

// Clear state
export const clearCommentState = () => async (dispatch) => {
    dispatch(clear_state())
}

const initialState = {}

//reducer - comments reducer
const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_COMMENTS: {
            console.log("reducer: ", action.payload)
            const returnState = {};
            return {...action.payload};
        }
        case CLEAR_STATE: {
            const clearState = {}
            return clearState
        }
        default:
            // console.log('default')
            return state
    }
}

export default commentReducer
