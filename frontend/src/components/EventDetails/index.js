import React from 'react';
import { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './EventDetails.css';
import '../UniversalCSS.css';
// import { getEventThunk } from '../../store/eventsThunk';
import { getGroup } from '../../store/groupsThunk';
// import { getGroupEventsThunk } from '../../store/eventsThunk';
import OpenModalDeleteEventButton from '../DeleteEventModalButton';
import DeleteEventModal from '../DeleteEventModal'
import clockImage from '../assets/Images/ATWP.webp'
import pinkArrowLeft from '../assets/Images/pinkArrowLeft-removebg-preview.png';
import EventGroupComponent from '../eventGroupComponent';

function EventDetails({ event, eventId, user }) {
    const dispatch = useDispatch();
    const history = useHistory();
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

    // console.log('event: ', event)

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

    let options = 'Uhide';
    if (user) {
        if (event.Group.organizerId === user.id) options = 'Ushow';
    }

    const type = "event"

    // console.log("event image: ", eventPreviewImage)
    const previewImage = eventPreviewImage?.url
    // console.log("previewImage: ", previewImage)

    // console.log('eventPreviewImage: ', eventPreviewImage)
    // console.log('options: ', options)

    const info = {
        event,
        organizer,
        groupPreviewImage: groupPreviewImage?.url,
        options
    }

    return (
        <>
            <div className="">
                <div className='arrowCenterWidth'>
                    <img
                        className='pointerCursor displayFlex'
                        onClick={() => history.push('/events')}
                        src={pinkArrowLeft}
                    />
                    <NavLink to='/events' className='displayFlex UblackColor UnoDecoration backButtonTextSize'>Back to All Events</NavLink>
                </div>
                <EventGroupComponent type={type} previewImage={previewImage} info={info} />

                <div className='descriptionTextSize'>
                    <div className='displayFlex'>
                        <div className='arrowCenterWidth'>
                            <h2>Description</h2>
                            <p>{event?.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventDetails
