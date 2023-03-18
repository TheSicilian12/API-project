import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getEventThunk } from '../../store/eventsThunk';
import { getGroup } from '../../store/groupsThunk';
// import { getGroupEventsThunk } from '../../store/eventsThunk';
import EventDetails from './index'

export default function EventDetailsWrapper() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const eventId = id;

    useEffect(() => {
        dispatch(getEventThunk(eventId));
    }, [])

    let event = useSelector((state) => state.events)

    console.log('event: ', event)

    if (!event) {
        return <div>loading</div>
    }


    return (
        <EventDetails event={event} eventId={eventId}/>
    )

}
