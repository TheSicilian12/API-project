const LOAD = '/groups';
const LOAD_DETAILS = '/groups:id'
const SUBMIT_DETAILS = 'groups/new'

const load = (list) => ({
    type: LOAD,
    list
});

const load_details = (group) => ({
    type: LOAD_DETAILS,
    group
});

const submit_details = (group) => ({
    type: SUBMIT_DETAILS,
    group
})

// thunk - fetches all groups
export const getAllGroups = () => async (dispatch) => {
    const response = await fetch('/api/groups');
    if (response.ok) {
        const list = await response.json();
        console.log('list: ', list)
        dispatch(load(list));
    }
}

// thunk - fetches a group
export const getGroup = (groupId) => async (dispatch) => {
    //call the thunk that gets all groups
    const response = await fetch(`/api/groups/${groupId}`)
    // console.log(response)
    if (response.ok) {
        const group = await response.json();
        // console.log('group: ', group)
        // dispatch(load_details(group));
        // const group2 = normalizeSingleGroup(group)
        dispatch(load_details(group))
    }
}

//thunk - submits a group
export const submitGroup = (groupObj) => async (dispatch) => {
    //private key is a string
    console.log('thunk groupObj: ', groupObj)

    let newGroupObj = {}
    newGroupObj.name = groupObj.name;
    newGroupObj.about = groupObj.about;
    newGroupObj.type = groupObj.type;
    newGroupObj.city = groupObj.city;
    newGroupObj.state = groupObj.state;

    if (groupObj.private === 'true') newGroupObj.private = true;
    if (groupObj.private === 'false') newGroupObj.private = false;

    console.log('newGroupObj: ', newGroupObj)
}

//normalizer (array to obj. uses id as the key for the obj)
// const state = {};
function normalizeIdArrToObj(array) {
    // console.log('list: ', array)
    const allGroups = {};
    array.map((e) => allGroups[e.id] = e)
    // console.log('allGroups: ', allGroups)
    return allGroups;
};

// normalizer (single group)
function normalizeSingleGroup(object) {
    // console.log('normalizegroup: ', object)
    const singleGroup = {
        ...object
    };
    // console.log('singleGroup: ', singleGroup)
    return singleGroup;
}

// console.log('state: ', state)

// const initialState = {}
const initialState = {
    session: {},
    groups: {
        allGroups: {
            // [groupId]: { groupData, },
            //  optionalOrderedList: [],
        },
        singleGroup: {
            // groupData,
            GroupImages: [],
            Organizer: {
                // organizerData,
                },
            Venues: [],
        }
    },
    events:
    {
        allEvents:
        {
            // [eventId]:
            // {
            //     eventData,
            //     Group: {
            //         groupData,
            //     },
            //     Venue:
            //     {
            //         venueData,
            //     },
            // },
        },
        // In this slice we have much more info about the event than in the allEvents slice. singleEvent: { eventData, Group: { groupData, }, // Note that venue here will have more information than venue did in the all events slice. (Refer to your API Docs for more info) Venue: { venueData, }, EventImages: [imagesData], // These would be extra features, not required for your first 2 CRUD features Members: [membersData], Attendees: [attendeeData], }, }, };
    }
}
//reducer - group reducer
const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const returnState = {}
            returnState.allGroups = normalizeIdArrToObj(action.list.Groups)
            // console.log('returnState: ', returnState.allGroups[1])

            return {
                ...returnState,
            }
        case LOAD_DETAILS:
            const returnSingleGroup = {}
            returnSingleGroup.singleGroup = normalizeSingleGroup(action.group)
            // console.log('singleGroup: ', singleGroup)
            return {
                ...returnSingleGroup
            }
        default:
            // console.log('default')
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
