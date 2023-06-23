import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { submitGroup, editGroupThunk, getGroup } from '../../store/groupsThunk';
import EventForm from './index'
import { getEventThunk } from '../../store/eventsThunk';
import { timeline } from '../EventOrganizer';

export default function EditEventWrapper({formType}) {
    const { groupId, eventId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGroup(groupId));
        dispatch(getEventThunk(eventId))
    }, [groupId])

    const isPast = (checkDate) => {
      const todayParse = Date.parse(new Date());

      const checkDateParse = Date.parse(checkDate);

      let response;
      if (todayParse > checkDateParse) {
        response = 'past';
      } else {
        response = 'future';
      }

      return response;
    }

  // const currentGroup = useSelector((state) => state.groups.singleGroup);
  const currentEvent = useSelector((state) => state.events);

  console.log("currentEvent: ", currentEvent)
  console.log("today: ", new Date())
  console.log("isPast: ", isPast(currentEvent.startDate))

  const timeLineStatus = isPast(currentEvent.startDate)

    return (
        <div>
        {currentEvent.name && (
          <EventForm currentEvent={currentEvent} formType={formType} timeLineStatus={timeLineStatus}/>
        )}
      </div>
    )

}
