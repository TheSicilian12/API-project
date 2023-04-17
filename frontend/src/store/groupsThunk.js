import { csrfFetch } from './csrf';

const LOAD = '/groups';
const LOAD_INCLUDE_EVENTS = '/groups/LOAD_INCLUDE_EVENTS';
const LOAD_DETAILS = '/groups:id';
const SUBMIT_DETAILS = '/groups/new';
const DELETE_GROUP = '/groups/:groupId';

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

const delete_group = (group) => ({
    type: DELETE_GROUP,
    group
})

// thunk - fetches all groups
export const getAllGroups = () => async (dispatch) => {
    const response = await fetch('/api/groups');
    // console.log('group thunk response: ', response)
    if (response.ok) {
        const list = await response.json();
        // console.log('group thunk: ', list)
        // console.log('list: ', list)
        dispatch(load(list));
    }
}

//thunk - get all groups with events
export const getAllGroupsWithEventsThunk = () => async (dispatch) => {
    const responseGroup = await fetch('/api/groups');
    if (responseGroup.ok) {
        //all groups
        const groups = await responseGroup.json()
        // console.log('groups: ', groups.Groups)

        // console.log('values: ', Object.keys(groups.Groups))
        let groupEventObj = {};
        Object.values(groups.Groups).map(async group => {
            // console.log(group.id)
            //get all events of a group specified by its id
            let responseGroupEvent = await fetch(`/api/groups/${group.id}/events`)
            if (responseGroupEvent.ok) {
                let groupEvent = await responseGroupEvent.json();
                // console.log('groupEvent: ', groupEvent.Events)
                groupEventObj[group.id] = groupEvent.Events

                let currentGroup = groups.Groups.find(e => e.id === group.id);
                currentGroup.events = groupEvent.Events;
                // console.log('thunk - currentGroup: ', currentGroup.events)

            }
        })
        // console.log('groupEventObj: ', groupEventObj)
        //events: groupEventObj key is the groupId
        // const groupEventReturn = {groups: groups, events: groupEventObj}
        // console.log('groupEventReturn: ', groupEventReturn);
        // console.log('thunk groups: ', groups)
        dispatch(load(groups))
    }
}

// thunk - fetches a group
export const getGroup = (groupId) => async (dispatch) => {
    //call the thunk that gets all groups
    // console.log('getGroupThunk')
    // console.log('groupId: ', groupId)
    const response = await fetch(`/api/groups/${groupId}`)
    // console.log('response: ', response)
    if (response.ok) {
        // console.log('is ok?')
        const group = await response.json();
        // console.log('group: ', group)
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
    // console.log('editGroup thunk: ', groupObj)
    // console.log('edit group thunk')
    let newGroupObj = {}
    newGroupObj.name = groupObj.name;
    newGroupObj.about = groupObj.about;
    newGroupObj.type = groupObj.type;
    newGroupObj.city = groupObj.city;
    newGroupObj.state = groupObj.state;
    newGroupObj.private = groupObj.private;

    if (typeof newGroupObj.private !== 'boolean') {
        // console.log('not a boolean')
        if (newGroupObj.private === 'true') newGroupObj.private = true;
        else newGroupObj.private = false;
    }

    // console.log('newGroupObj.private, val: ', newGroupObj.private);
    // console.log('newGroupObj.private, type: ', typeof newGroupObj.private);
    // if (groupObj.private === 'true') {
    //     newGroupObj.private = true;
    // } else {
    //     newGroupObj.private = false;
    // }

    // console.log('object: ', newGroupObj)
    // console.log('newGroup: ', typeof newGroupObj.private);
    const response = await csrfFetch(`/api/groups/${groupObj.groupId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newGroupObj)
    })
    // console.log('after fetch')
    if (response.ok) {
        const editedGroup = await response.json();
        // console.log('editedGroup: ', editedGroup)
        console.log('update group ok')

        //if updated - get current image id, which means get group details
        const responseGroupInfo = await fetch(`/api/groups/${groupObj.groupId}`)
        if (responseGroupInfo.ok) {
            console.log('retreive group info ok')

            const groupInfoData = await responseGroupInfo.json()
            // console.log('groupInfoData: ', groupInfoData.find((image) => image.preview === true))
            //if updated - edit current true image to false
            // console.log('groupInfoData: ', groupInfoData.GroupImages)

            let currentGroupImage = groupInfoData.GroupImages.find((image) => image.preview === true)
            // console.log('currentGroupImage: ', currentGroupImage)

            //add currentGroupImage with false preview
            const addCurrentImageFalsePreviewResponse = await dispatch(addAGroupImage({
                groupId: groupObj.groupId,
                url: currentGroupImage.url,
                preview: false
            }))
            // console.log('before')
            // const test = await addCurrentImageFalsePreviewResponse.json()
            // console.log('response: ', addCurrentImageFalsePreviewResponse)

            //potential issue
            if (addCurrentImageFalsePreviewResponse) {
                console.log('added current image with preview false')

                //add updated image with true preview
                const addNewImageTruePreviewResponse = await dispatch(addAGroupImage({
                    groupId: groupObj.groupId,
                    url: groupObj.url,
                    preview: true
                }))

                if (addNewImageTruePreviewResponse.ok) {
                    const responseDeleteCurrentImageOld = await csrfFetch(`/api/group-images/${currentGroupImage.id}`, {
                        method: 'DELETE'
                    })

                    if (responseDeleteCurrentImageOld.ok) {
                        return 'yay'
                    }


                }

            }

            //currentImage added again but with false, then the current deleted

            //new added with true


        }


        // const addImageResponse = await dispatch(addAGroupImage({
        //     groupId: groupObj.groupId,
        //     url: groupObj.url,
        //     preview: true
        // }))




        // if (addImageResponse.ok) {
        return editedGroup;
        // }
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
        console.log('add a group thunk: ', newImage)
        return newImage;
    }
}

//thunk - deletes a group
export const deleteGroupThunk = (groupId) => async (dispatch) => {

    const response = await csrfFetch(`/api/groups/${groupId}`, {
        method: 'DELETE'
    })
    // console.log('response: ', response)
    if (response.ok) {
        const deleteGroup = await response.json();
        return deleteGroup;
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
