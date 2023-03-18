import React from 'react';
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './EventDetails.css';
import { getEventThunk } from '../../store/eventsThunk';
// import { getGroupEventsThunk } from '../../store/eventsThunk';
// import OpenModalDeleteGroupButton from '../DeleteGroupModalButton';
// import DeleteGroupModal from '../DeleteGroupModal'



function EventDetails() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const eventId = id;

    // console.log('eventId: ', eventId)

    useEffect(() => {
        
    })

    return (
        <div>test</div>
    )
}

export default EventDetails
