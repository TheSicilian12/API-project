import { csrfFetch } from './csrf';

const LOAD = '/groups';
const LOAD_DETAILS = '/groups:id'
const SUBMIT_DETAILS = '/groups/new'

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
    // console.log('thunk groupObj: ', groupObj)

    //create a group obj info
    let newGroupObj = {}
    newGroupObj.name = groupObj.name;
    newGroupObj.about = groupObj.about;
    newGroupObj.type = groupObj.type;
    newGroupObj.city = groupObj.city;
    newGroupObj.state = groupObj.state;

    if (groupObj.private === 'true') newGroupObj.private = true;
    if (groupObj.private === 'false') newGroupObj.private = false;

    // console.log('newGroupObj: ', newGroupObj)

    //add an image to a group obj info
    //since this is during the creation of a group, the first image would be the preview by default

    const response = await csrfFetch('/api/groups', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newGroupObj)
        // body: newGroupObj
    })
    if (response.ok) {
        const newGroup = await response.json();
        // console.log('newGroup: ', newGroup)
        // console.log('newGroup.id: ', newGroup.id)

        let newImageObj = {};
            newImageObj.url = groupObj.url;
            newImageObj.preview = true;
            newImageObj.groupId = newGroup.id;

        // console.log('newImageObj: ', newImageObj)

        // dispatch(addAGroupImage(newImageObj))
       dispatch(addAGroupImage(newImageObj));

        // dispatch(getGroup(newGroup.id));
        return newGroup;
    }

}

//thunk - edits a group
export const editGroupThunk = (groupObj) => async (dispatch) => {
    console.log('editGroup thunk: ', groupObj)

    let newGroupObj = {}
    newGroupObj.name = groupObj.name;
    newGroupObj.about = groupObj.about;
    newGroupObj.type = groupObj.type;
    newGroupObj.city = groupObj.city;
    newGroupObj.state = groupObj.state;
    newGroupObj.private = groupObj.private;
    if (groupObj.private === 'true') {
        newGroupObj.private = true;
    } else {
        newGroupObj.private = false;
    }

    console.log('newGroup: ', newGroupObj);
    const response = await csrfFetch(`/api/groups/${groupObj.groupId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newGroupObj)
    })
    if (response.ok) {
        const editedGroup = await response.json();
        return editedGroup;
    }
}

//thunk - adds an image to a group
export const addAGroupImage = (groupImageObj) => async (dispatch) => {
    //groupImageObj needs to include the groupId, url, and preview.
    // console.log('add a group image')

    const response = await csrfFetch(`/api/groups/${groupImageObj.groupId}/images`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(groupImageObj)
    })
    if (response.ok) {
        const newImage = await response.json();

        return newImage;
    }
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
