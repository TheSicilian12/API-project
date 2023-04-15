import React from 'react';
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './EventDetails.css';
import '../UniversalCSS.css';
import { getEventThunk } from '../../store/eventsThunk';
import { getGroup } from '../../store/groupsThunk';
// import { getGroupEventsThunk } from '../../store/eventsThunk';
import OpenModalDeleteEventButton from '../DeleteEventModalButton';
import DeleteEventModal from '../DeleteEventModal'
import clockImage from '../assets/Images/ATWP.webp'


function EventDetails({ event, eventId, user }) {
    const dispatch = useDispatch();
    // console.log('event groupId: ', event.groupId)

    useEffect(() => {
        // console.log('useEffect test')
        // if (event.Group) {
        // console.log('event.groupId: ', event.groupId)
        dispatch(getGroup(event.groupId))
        // }
    }, [event.groupId])
    const organizer = useSelector((state) => state.groups.singleGroup?.Organizer)
    const groupImages = useSelector((state) => state.groups.singleGroup?.GroupImages)
    // console.log('orgranizer: ', organizer)
    // console.log('groupImages: ', groupImages)

    console.log('event: ', event)

    let groupPreviewImage;
    if (groupImages) {
        groupPreviewImage = groupImages.find(image => image.preview === true)
    }
    // console.log('groupPreviewImage: ', groupPreviewImage)

    const eventImages = useSelector((state) => state.events.EventImages)
    // console.log('eventImages: ', eventImages)

    let eventPreviewImage;
    if (eventImages) {
        eventPreviewImage = eventImages.find(image => image.preview === true)
    }
    // console.log('previewImage: ', eventPreviewImage)

    if (!event.Group) {
        return <div>loading</div>
    }
    const groupId = event.Group.id

    let imageData = 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';

    // console.log('group: ', group)
    // console.log('event: ', event)

    let noEventImage = 'off';
    let noGroupImage = 'off';
    // let test = eventPreviewImage.url;
    // eventPreviewImage.url ? noEventImage = 'on' : noEventImage = 'off'
    if (!eventPreviewImage) noEventImage = 'on';
    // console.log('eventPreviewImage: ', eventPreviewImage)
    if (!groupPreviewImage) noGroupImage = 'on';

    let options = 'off'
    if (user) {
        if (event.Group.organizerId === user.id) options = 'on'
    }

    console.log('eventPreviewImage: ', eventPreviewImage)

    return (
        <div className='UfontTreb'>
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

                    <div className='borderRed displayFlex'>
                        {/* {eventPreviewImage?.url} */}
                        <img
                            className=''
                            src={eventPreviewImage?.url || imageData}
                            width='50%'
                            height='50%'
                        />

                        <div className='displayFlex flex-directionColumn infoGeneralSpacing'>
                            <div className='UblackBorderWeighted displayFlex border-Radius15'>
                                <img
                                    //group image
                                    className='border-Radius15'
                                    src={groupPreviewImage?.url || imageData}
                                    width='100%'
                                />

                                <div className='infoGroupSpacing'>
                                    <h4 className='textWrap'>{event.Group?.name}</h4>
                                    <h4>{event.Group?.private === true ? 'Private' : 'Public'}</h4>
                                </div>
                            </div>
                            <div className='UblackBorderWeighted border-Radius15 marginTop'>
                                <div className='displayFlex marginTop marginLeft'>
                                    {/* <i class="fa-regular fa-clock fa-2xl style=color: #000000; borderRed displayFlex alignCenter justifyCenter clockDimensions"></i> */}
                                    <img
                                        className=''
                                        width='15%'
                                        height='15%'
                                        src={clockImage}
                                    />
                                    <div className='timeEventSpacing'>
                                        <div className='displayFlex alignCenter'>
                                            <h4 className='startEndSpacing'>
                                                START:
                                            </h4>
                                            {/* date */}
                                            {<h4>{new Date(event?.startDate).toUTCString().split(' ')[0].split(',')[0]}. {new Date(event?.startDate).toUTCString().split(' ')[2]} {new Date(event?.startDate).toUTCString().split(' ')[1]}, {new Date(event?.startDate).toUTCString().split(' ')[3]}</h4>}
                                            <h4 className='dotSpacing'>•</h4>
                                            {/* military time */}
                                            {<h4>{new Date(event?.startDate).toUTCString().split(' ')[4]}</h4>}

                                        </div>
                                        <div className='displayFlex alignCenter'>
                                            <h4 className='startEndSpacing'>
                                                END:
                                            </h4>
                                            {/* date */}
                                            {<h4>{new Date(event?.endDate).toUTCString().split(' ')[0].split(',')[0]}. {new Date(event?.endDate).toUTCString().split(' ')[2]} {new Date(event?.endDate).toUTCString().split(' ')[1]}, {new Date(event?.endDate).toUTCString().split(' ')[3]}</h4>}
                                            <h4 className='dotSpacing'>•</h4>
                                            {/* military time */}
                                            {<h4>{new Date(event?.endDate).toUTCString().split(' ')[4]}</h4>}
                                        </div>
                                    </div>
                                </div>
                                <div className='displayFlex alignCenter'>
                                    <div className='moneyDimensions displayFlex justifyCenter'>
                                        <i class="fa-solid fa-dollar-sign fa-2xl style=color: #000000;"></i>
                                    </div>
                                    <h4 className='timeEventSpacing'>{event?.price > 0 ? `$${event?.price}` : 'FREE'}</h4>
                                </div>
                                <div className='displayFlex alignCenter'>
                                    <div className='moneyDimensions displayFlex justifyCenter'>
                                        <i class="fa-solid fa-map-pin fa-2xl style=color: #000000;"></i>
                                    </div>
                                    <h4>{event?.type}</h4>

                                </div>
                                <div className={`${options} displayFlex justifyCenter`}>
                                    <NavLink to={`/events/${eventId}/edit`}>
                                        <button
                                            className='UpinkBorder UpurpleButton UfontTreb UbuttonCreateDimensions marginRight'
                                        >
                                            Update
                                        </button>
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
                    <h2>Description</h2>
                    <p>{event?.description}</p>
                </div>
            </div>
        </div>
    )
}

export default EventDetails
