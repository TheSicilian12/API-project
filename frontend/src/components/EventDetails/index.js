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
        dispatch(getEventThunk(eventId));
    }, [])

    let event = useSelector((state) => state.events)

    console.log('index event: ', event)

    if (!event) {
        return <div>loading</div>
    }

    return (
        <div>
            <div>
                <div>
                    <div>
                    <p>{'<'}</p>
                    <NavLink to='/events'>Events</NavLink>
                    </div>
                    <div>
                        <h1>{event.name}</h1>
                        <h4>host information needed!</h4>
                    </div>
                </div>
                <div>
                    <div>
                        Image
                    </div>
                    <div>
                        <div>
                            <div>
                                GroupImage
                            </div>
                            <div>
                                <h4>{event.Group.name}</h4>
                    
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default EventDetails
