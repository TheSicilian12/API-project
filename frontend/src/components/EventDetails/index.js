import React from 'react';
import { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './EventDetails.css';
import '../UniversalCSS.css';
// import { getEventThunk } from '../../store/eventsThunk';
import { getGroup } from '../../store/groupsThunk';
// import { getGroupEventsThunk } from '../../store/eventsThunk';
import pinkArrowLeft from '../assets/Images/pinkArrowLeft-removebg-preview.png';
import EventGroupComponent from '../eventGroupComponent';

import BackButton from '../BackButton';
import CommentComponent from '../CommentComponent';
import { getAllEventComments } from '../../store/commentsThunk';

function EventDetails({ event, eventId, user, comments }) {
    const dispatch = useDispatch();
    const history = useHistory();
    // console.log('event groupId: ', event.groupId)

    useEffect(() => {
        // console.log('useEffect test')
        // if (event.Group) {
        // console.log('event.groupId: ', event.groupId)
        dispatch(getGroup(event.groupId))
        dispatch(getAllEventComments(eventId))
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
            <div className='event-container'>
                <div className="event-arrowContainer">
                    <BackButton text={"All Events"} link={"/events"}/>
                </div>
                <EventGroupComponent type={type} previewImage={previewImage} info={info} />

                <div className="event-descriptionContainer descriptionTextSize">
                <h2>Description</h2>
                <p>{event?.description}</p>
                </div>
                <CommentComponent comments={comments}/>
            </div>
        </>
    )
}

export default EventDetails
