import { READ_GROUPS, MAKE_GROUPS, EDIT_GROUPS, DELETE_GROUPS } from "./groups"

const LOAD = '/groups';

const load = list => ({
    type: LOAD,
    list
});




// thunk - fetches all groups
export const getAllGroups = () => async dispatch => {
    const response = await fetch('/api/groups');

    // console.log(response)
    if (response.ok) {
        const list = await response.json();
        console.log('list: ', list)
        // dispatch(load(list));
    }
    // console.log('test')
}


const initialState = {
    list: ['initial state test']
}

//reducer - group reducer
const groupReducer = (state = initialState, action) => {
    console.log('reducer')
    switch(action.type) {
        case LOAD:
            // const allGroups = {};
            // action.list.forEach(group => {
            //     allGroups[group.id] = group
            // });
            // return {
            //     // ...allGroups,
            //     // ...state,
            //     // list: sortList(action.list)
            //    ...state
            // }
            // console.log('reducer test')
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
