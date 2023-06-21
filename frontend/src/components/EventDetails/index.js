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
import AddCommentModal from '../AddCommentModal';
import OpenModalButton from '../OpenModalButton';

function EventDetails({ event, eventId, user, comments }) {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        // if (event.Group) {
        dispatch(getGroup(event.groupId))
        dispatch(getAllEventComments(eventId))
        // }
    }, [event.groupId])

    const organizer = useSelector((state) => state.groups.singleGroup?.Organizer)
    const groupImages = useSelector((state) => state.groups.singleGroup?.GroupImages)
    const isMember = useSelector((state) => state.groups.singleGroup?.isMember)

    console.log("isMember: ", isMember)

    let groupPreviewImage;
    if (groupImages) {
        groupPreviewImage = groupImages.find(image => image.preview === true)
    }

    const eventImages = useSelector((state) => state.events.EventImages)

    let eventPreviewImage;
    if (eventImages) {
        eventPreviewImage = eventImages.find(image => image.preview === true)
    }

    if (!event.Group) {
        return <div>loading</div>
    }
    const groupId = event.Group.id

    let imageData = 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';

    let noEventImage = 'off';
    let noGroupImage = 'off';
    // let test = eventPreviewImage.url;
    // eventPreviewImage.url ? noEventImage = 'on' : noEventImage = 'off'
    if (!eventPreviewImage) noEventImage = 'on';
    if (!groupPreviewImage) noGroupImage = 'on';

    let options = 'Uhide';
    if (user) {
        if (event.Group.organizerId === user.id) options = 'Ushow';
    }

    const type = "event"

    const previewImage = eventPreviewImage?.url

    const info = {
        event,
        organizer,
        groupPreviewImage: groupPreviewImage?.url,
        options
    }

    let alreadyCommented;
    user ? alreadyCommented = Object.values(comments).find(e => e.userId === user.id) : alreadyCommented = true;

    return (
        <>
            <div className='event-container'>
                <div className="event-arrowContainer">
                    <BackButton text={"All Events"} link={"/events"} />
                </div>

                <div className="eventDetails-event-component">

                    <EventGroupComponent type={type} previewImage={previewImage} info={info} />
                </div>
                <div className="event-descriptionContainer descriptionTextSize">
                    <div>
                        <h2>Description</h2>
                        <p>{event?.description}</p>
                    </div>
                </div>
                <div className="add-comment-section-header">
                    <h2>Comments</h2>
                    {user && isMember === "true" && <OpenModalButton
                        className="UfontTreb UpurpleButton UpinkBorder UbuttonProfileDimensions add-comment-button-modal"
                        buttonText="Add"
                        modalComponent={<AddCommentModal eventId={event.id} />}
                    />}
                </div>
                <CommentComponent comments={comments} eventId={eventId} />
            </div>
        </>
    )
}

export default EventDetails
