import { csrfFetch } from './csrf';

const LOAD = '/groups';

const load = (list) => ({
    type: LOAD,
    list
});

// THUNK - request membership to a group
// This is skipping the approval stage to demonstate joining a group.
export const membershipIdThunk = (payload) => async (dispatch) => {
    // Need group Id in api route
    // Send userId to api

    // console.log("thunk: ", payload)
    const { groupId, user } = payload
    const userId = user.id

    const response = await fetch(`/api/groups/${userId}/${groupId}/membership`)
    if (response.ok) {
        const membership = await response.json()
        console.log("membership: ", membership)
        return membership
    } else {
        return "Not a member"
    }
}

//reducer - group reducer
const membershipReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const returnState = {}
            // console.log('reducer action: ', action.list)

            returnState.allGroups = normalizeIdArrToObj(action.list.Groups)
            // console.log('returnState: ', returnState.allGroups[1])
            // console.log('reducer, returnState: ', returnState)
            // console.log('returnState: ', returnState.allGroups)
            return {
                ...returnState,
            }
        case LOAD_DETAILS:
            // console.log('group details reducer')
            const returnSingleGroup = {}
            returnSingleGroup.singleGroup = normalizeSingleGroup(action.group)
            // console.log('singleGroup: ', returnSingleGroup)
            return {
                ...returnSingleGroup
            }
        default:
            // console.log('default')
            return state
    }
}

export default membership
