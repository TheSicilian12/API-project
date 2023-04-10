import { csrfFetch } from './csrf';

const ALL_GROUPEVENTS = '/api/groups/:groupId/events';
const ALL_EVENTS = '/api/events';
const ONE_EVENT = '/api/events/:eventId';
const DELETE_EVENT = '/api/events/:eventId';
const ADD_EVENT = '/api/ADD_EVENT'

const allGroupEvents = (list) => ({
    type: ALL_GROUPEVENTS,
    list
});

const allEvents = (list) => ({
    type: ALL_EVENTS,
    list
})

const oneEvent = (events) => ({
    type: ONE_EVENT,
    events
})

const deleteEvent = (event) => ({
    type: DELETE_EVENT,
    event
})

const addEvent = (event) => ({
    type: ADD_EVENT,
    event
})

//thunk - get all events for a group
export const getGroupEventsThunk = (groupId) => async (dispatch) => {
    const response = await fetch(`/api/groups/${groupId}/events`)
    // console.log('test')
    // console.log('response event: ', response)
    if (response.ok) {
        const eventsList = await response.json();
        // console.log('eventsList: ', eventsList)
        dispatch(allGroupEvents(eventsList));
    }
}

//thunk - get All events
export const getAllEventsThunk = () => async (dispatch) => {
    const response = await fetch('/api/events')
    if (response.ok) {
        const events = await response.json();
        dispatch(allEvents(events));
    }
}

//thunk - get a specific event
export const getEventThunk = (eventId) => async (dispatch) => {
    const response = await fetch(`/api/events/${eventId}`);
    if (response.ok) {
        const event = await response.json();
        dispatch(oneEvent(event));
    }
}

//thunk - delete an event
export const deleteEventThunk = (eventId) => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const deleteEvent = await response.json();
        return deleteEvent;
    }
}

//thunk - add an event by group id
export const addEventByGroupIdThunk = (eventInfo) => async (dispatch) => {
    const {groupId} = eventInfo;
    const eventInfoObj = eventInfo.eventObj;
    console.log('eventInfoObj: ', eventInfoObj)
    // console.log('groupId: ', groupId)
    // console.log(groupId)

    // console.log('event obj: ', eventInfoObj);
    console.log('before fetch')
    const response = await csrfFetch(`/api/groups/${groupId}/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventInfoObj)
    })
    console.log('after fetch')
    console.log('response: ', response);
    if (response.ok) {
        const newEvent = await response.json();
        // console.log('newEvent: ', newEvent)
        return newEvent;
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
            // console.log('action! ', action.list.Events)

            const allGroupEvents = {};
            action.list.Events.map((e) => allGroupEvents[e.id] = e)
            // console.log('allGroupEvents: ', allGroupEvents)
            return {
                ...allGroupEvents,
            }
        case ALL_EVENTS:
            const returnAllEvents = {}
            returnAllEvents.allEvents = {};
            // console.log('action: ', action.list.Events)
            action.list.Events.map((e) => returnAllEvents.allEvents[e.id] = e)
            return {
                ...returnAllEvents
            }
        case ONE_EVENT:
            let returnOneEvent = {}
            // console.log('action: ', action)
            returnOneEvent = {...action.events}
            return {
                ...returnOneEvent
            }
        default:
            // console.log('default')
            return state
    }
}

export default eventReducer
