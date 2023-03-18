import React from 'react';
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './EventDetails.css';
import { getEventThunk } from '../../store/eventsThunk';
import { getGroup } from '../../store/groupsThunk';
// import { getGroupEventsThunk } from '../../store/eventsThunk';
// import OpenModalDeleteGroupButton from '../DeleteGroupModalButton';
// import DeleteGroupModal from '../DeleteGroupModal'



function EventDetails({event, eventId}) {
    const dispatch = useDispatch();

    if (!event.Group) {
        return <div>loading</div>
    }

    const groupId = event.Group.id

        // useEffect(() => {
        //     dispatch(getGroup(groupId))
        // }, [])

    let options = 'off'
    


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
                    <div>
                        Image
                    </div>
                    <div>
                        <div>
                            <div>
                                GroupImage
                            </div>
                            <div>
                                <h4>{event.Group?.name}</h4>
                                <h4>{event.Group?.private === true ? 'Private' : 'Public'}</h4>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>
                                <h4>START</h4>
                                <h4>{event?.startDate}</h4>
                            </div>
                            <div>
                                <h4>END</h4>
                                <h4>{event?.endDate}</h4>
                            </div>
                        </div>
                        <div>
                            <h4>{event?.price > 0 ? `$${event?.price}` : 'FREE'}</h4>
                        </div>
                        <div>
                            <h4>{event?.type}</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2>Details</h2>
                <p>{event?.description}</p>
            </div>
        </div>
        </div>
    )
}

export default EventDetails
