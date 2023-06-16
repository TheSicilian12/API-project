import { csrfFetch } from './csrf';

const ALL_GROUPEVENTS = '/api/groups/:groupId/events';

const allGroupEvents = (list) => ({
    type: ALL_GROUPEVENTS,
    list
});




const initialState = {}

//reducer - comments reducer
const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            // console.log('default')
            return state
    }
}

export default commentReducer
