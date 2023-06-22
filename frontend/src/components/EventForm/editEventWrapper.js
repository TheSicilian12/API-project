import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { submitGroup, editGroupThunk, getGroup } from '../../store/groupsThunk';
import EventForm from './index'
import { getEventThunk } from '../../store/eventsThunk';


export default function EditEventWrapper({formType}) {
    const { groupId, eventId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGroup(groupId));
        dispatch(getEventThunk(eventId))
    }, [groupId])

    const currentGroup = useSelector((state) => state.groups.singleGroup);
    const currentEvent = useSelector((state) => state.events);

    if (!currentGroup) return null;
    if (!currentEvent) return null;

    let info = {
        eventName: currentEvent.name
    }

    console.log("info: ", info)


    return (
        // <div>
        //     Edit
        //     <div>
        //         {currentEvent.name}
        //     </div>
        // </div>
        <div>
            {currentEvent.name}
        <EventForm currentGroup={currentGroup} currentEvent={currentEvent} formType={formType} info={info}/>
        </div>
    )

}
