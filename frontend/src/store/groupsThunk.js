import { READ_GROUPS, MAKE_GROUPS, EDIT_GROUPS, DELETE_GROUPS } from "./groups"

const LOAD = '/groups';

const load = (list) => ({
    type: LOAD,
    list
});

// thunk - fetches all groups
export const getAllGroups = () => async (dispatch) => {
    const response = await fetch('/api/groups');
    // console.log(response)
    if (response.ok) {
        const list = await response.json();
        // console.log('list: ', list)
        const list2 = normalizeIdArrToObj(list);
        // console.log('list2: ', list2)
        // console.log(dispatch)
        dispatch(load(list2));
    }

}

//normalizer (array to obj. uses id as the key for the obj)
const state = {};
function normalizeIdArrToObj(list) {
    state.allGroups = {};
    // console.log('normalize: ', list)
    // console.log(Object.values(list))
    const arr = Object.values(list);
    // console.log('test: ', arr[0])
    arr[0].forEach(a => {
        // console.log('test: ', a)
        state.allGroups[a.id] = a;
    })
    return state;
};

// console.log('state: ', state)

const initialState = {}
//reducer - group reducer
const groupReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD:
            const allGroups = action.list
            // console.log('allGroups: ', allGroups)
            // console.log('reducer', action.list)
            return {
                ...allGroups,
                // ...state,
            }
        default:
            console.log('default')
            return state
    }
}

export default groupReducer

// store = {
//     session:
//     {},
//     groups:
//     {
//         allGroups:
//         {
//             [groupId]: { groupData, },
//             optionalOrderedList: [],
//         },
//         singleGroup:
//         {
//             groupData,
//             GroupImages: [imagesData],
//             Organizer: {
//                 organizerData,
//             },
//             Venues: [venuesData],
//         },
//     },
//     events:
//     {
//         allEvents:
//         {
//             [eventId]:
//             {
//                 eventData,
//                 Group: {
//                     groupData,
//                 },
//                 Venue:
//                 {
//                     venueData,
//                 },
//             },
//         },
        // In this slice we have much more info about the event than in the allEvents slice. singleEvent: { eventData, Group: { groupData, }, // Note that venue here will have more information than venue did in the all events slice. (Refer to your API Docs for more info) Venue: { venueData, }, EventImages: [imagesData], // These would be extra features, not required for your first 2 CRUD features Members: [membersData], Attendees: [attendeeData], }, }, };
