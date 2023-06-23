import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { submitGroup, editGroupThunk, getGroup } from '../../store/groupsThunk';
import EventForm from './index'
import { getEventThunk } from '../../store/eventsThunk';
import { isPast } from '../EventOrganizer';


export default function EditEventWrapper({formType}) {
    const { groupId, eventId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getGroup(groupId));
        dispatch(getEventThunk(eventId))
    }, [groupId])



  // const currentGroup = useSelector((state) => state.groups.singleGroup);
  const currentEvent = useSelector((state) => state.events);

  // console.log("currentEvent: ", currentEvent)
  // console.log("today: ", new Date())
  // console.log("isPast: ", isPast(currentEvent.startDate))

  const timeLineStatus = isPast(currentEvent.startDate)

  const endDateCheck = isPast(currentEvent.endDate)

  // Guard in case endDate is in the past, redirect to event page
  if (endDateCheck === "past") history.push(`/events/${currentEvent.id}`)

    return (
        <div>
        {currentEvent.name && (
          <EventForm currentEvent={currentEvent} formType={formType} timeLineStatus={timeLineStatus}/>
        )}
      </div>
    )

}
