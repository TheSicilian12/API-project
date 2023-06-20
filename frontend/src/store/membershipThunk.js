import { csrfFetch } from './csrf';

const LOAD = '/membership';
const LOAD_ALL = '/membership/all';
const AUTO_MEMBER = '/auto/membership';
const DELETE_MEMBER = '/membership/delete';
const CLEAR_STATE = '/membership/clear';

const load = (payload) => ({
    type: LOAD,
    payload
});

const load_all = (payload) => ({
    type: LOAD_ALL,
    payload
})

const load_auto = (payload) => ({
    type: AUTO_MEMBER,
    payload
})

const delete_member = (payload) => ({
    type: DELETE_MEMBER,
    payload
})

const clear_state = () => ({
    type: CLEAR_STATE
})

// THUNK - get all groups your a member to
export const allMembershipThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/groups/memberships/${userId}`)
    if (response.ok) {
        const list = await response.json();
        dispatch(load_all(list))
    }
}

// THUNK - request membership to a group
export const membershipsThunk = (payload) => async (dispatch) => {
    // Need group Id in api route
    // Send userId to api
    const { groupId, user } = payload
    const userId = user.id
    const response = await fetch(`/api/groups/${userId}/${groupId}/membership`)
    if (response.ok) {
        const membership = await response.json()
        dispatch(load(membership))
    }
    else {
        dispatch(load({status: "Not a member"}))
    }
}

// THUNK - automatic membership
export const automaticMembershipThunk = (payload) => async (dispatch) => {
    const {groupId, user} = payload
    const response = await csrfFetch(`/api/groups/${groupId}/automembership`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        let autoMember = await response.json()
    }
}

// THUNK - delete membership
export const deleteMembershipThunk = (payload) => async (dispatch) => {
    const {groupId, user, memberId} = payload
    const response = await csrfFetch(`/api/groups/${groupId}/membership`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        let deleteMembership = await response.json()
        dispatch(delete_member({groupId: groupId}))
    }
}

export const clearMembershipState = () => async (dispatch) => {
    dispatch(clear_state())
}


const initialState = {}

const membershipReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const newState = {}
            newState.membership = { ...action.payload }
            return newState
        case LOAD_ALL: {
            const newState = {}
            newState.membership = { ...action.payload }
            return newState
        }
        case DELETE_MEMBER:
            const {groupId} = action.payload
            let updatedMembership = {...state.membership}
            delete updatedMembership[groupId]
            return {...state, membership: updatedMembership}
        case CLEAR_STATE: {
            const clearState = {"membership": "Not a member"}
            return {...clearState}
        }
        default:
            return state
    }
}

export default membershipReducer
