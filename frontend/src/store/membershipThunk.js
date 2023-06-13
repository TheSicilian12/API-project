import { csrfFetch } from './csrf';

const LOAD = '/membership';
const AUTO_MEMBER = '/auto/membership'

const load = (payload) => ({
    type: LOAD,
    payload
});

const load_auto = (payload) => ({
    type: AUTO_MEMBER,
    payload
})

// THUNK - request membership to a group
export const membershipsThunk = (payload) => async (dispatch) => {
    // Need group Id in api route
    // Send userId to api

    // console.log("thunk: ", payload)
    const { groupId, user } = payload
    const userId = user.id
    // console.log("thunk!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    const response = await fetch(`/api/groups/${userId}/${groupId}/membership`)
    if (response.ok) {
        const membership = await response.json()
        console.log("membership: ", membership)
        dispatch(load(membership))
    }
    else {
        dispatch(load({status: "Not a member"}))
    }
}

// THUNK - automatic membership
export const automaticMembershipThunk = (payload) => async (dispatch) => {
    const {groupId} = payload
    console.log("auto thunk")
    const response = await fetch(`/api/groups/${groupId}/automembership`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    console.log("auto after response: ", response)
    if (response.ok) {
        console.log("auto ok")
        let autoMember = await response.json()

    }
}


const initialState = {}

const membershipReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const newState = {}
            // console.log("action: ", action.payload)
            // console.log("membership reducer!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            newState.membership = { ...action.payload }
            return newState

        default:
            // console.log('default')
            return state
    }
}

export default membershipReducer
