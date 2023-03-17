import { csrfFetch } from './csrf';

const ALL_GROUPEVENTS = '/api/groups/:groupId/events';

const allGroupEvents = (list) => ({
    type: ALL_GROUPEVENTS,
    list
});

//thunk - get all events for a group
export const getGroupEventsThunk = (groupId) => async (dispatch) => {
    const response = await fetch(`/api/groups/${groupId}/events`)
    // console.log('test')
    // console.log('response event: ', response)
    if (response.ok) {
        const eventsList = await response.json();
        // console.log('eventsList: ', eventsList)
        dispatch(allGroupEvents(eventsList))
    }
}

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
const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_GROUPEVENTS:
            const returnState = {}
            // returnState.allGroups = normalizeIdArrToObj(action.list.Groups)
            console.log('action! ', action.list.Events)

            const allGroupEvents = {};
            action.list.Events.map((e) => allGroupEvents[e.id] = e)
            console.log('allGroupEvents: ', allGroupEvents)
            return {
                ...returnState,
            }
    //     case LOAD_DETAILS:
    //         const returnSingleGroup = {}
    //         returnSingleGroup.singleGroup = normalizeSingleGroup(action.group)
    //         // console.log('singleGroup: ', returnSingleGroup)
    //         return {
    //             ...returnSingleGroup
    //         }
        default:
            // console.log('default')
            return state
    }
}

export default eventReducer
