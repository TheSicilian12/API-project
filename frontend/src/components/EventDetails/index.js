import React from 'react';
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './EventDetails.css';
import { getEventThunk } from '../../store/eventsThunk';
import { getGroup } from '../../store/groupsThunk';
// import { getGroupEventsThunk } from '../../store/eventsThunk';
import OpenModalDeleteEventButton from '../DeleteEventModalButton';
import DeleteEventModal from '../DeleteEventModal'



function EventDetails({ event, eventId, user }) {
    const dispatch = useDispatch();
    useEffect(() => {
        // console.log('useEffect test')
        if (event.Group) {
            dispatch(getGroup(event.Group.id))
        }
    }, [event.Group])
    const organizer = useSelector((state) => state.groups.singleGroup?.Organizer)
    // console.log('orgranizer: ', organizer)

    const eventImages = useSelector((state) => state.events.EventImages)
    // console.log('eventImges: ', eventImages)

    let eventPreviewImage;
    if (eventImages) {
        eventPreviewImage = eventImages.find(image => image.preview === true)
    }
    console.log('previewImage: ', eventPreviewImage)

    if (!event.Group) {
        return <div>loading</div>
    }
    const groupId = event.Group.id

    // console.log('group: ', group)

    // console.log('event: ', event)

    let options = 'off'
    if (user) {
        if (event.Group.organizerId === user.id) options = 'on'
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
                        <h4>Hosted by {`${organizer?.firstName} ${organizer?.lastName}`}</h4>
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
                                <div className={options}>
                                    <NavLink to={`/events/${eventId}/edit`}>
                                        <button>Update</button>
                                    </NavLink>
                                    <OpenModalDeleteEventButton
                                        buttonText='Delete'
                                        modalComponent={<DeleteEventModal eventId={eventId} groupId={event.Group.id} />}
                                    />
                                </div>
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
