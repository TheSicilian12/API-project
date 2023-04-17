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

    // console.log('eventPreviewImage: ', eventPreviewImage)
    // console.log('options: ', options)
    return (
        <div className='GroupDetails UfontTreb textSize'>

            <div className='GroupDetails_GroupsButton'>
                <div className='displayFlex'>
                    <img
                        className='pointerCursor'
                        onClick={() => history.push('/groups')}
                        src={pinkArrowLeft}
                    />
                    <NavLink to='/groups' className='displayFlex UblackColor UnoDecoration backButtonTextSize alignCenter'>Back to All Groups</NavLink>
                </div>
            </div>

            <div className='GroupDetails_Details displayFlex justifyCenter borderRed'>
                <div>
                    <img
                        className='border-Radius15 padding'
                        src={eventPreviewImage?.url || imageData}
                        // width='1000rem'
                        height='72%'
                    />
                </div>

                <div>
                    <div className='UblackBorderWeighted'>
                        <div>
                            <img
                                //group image
                                className='border-Radius15'
                                src={groupPreviewImage?.url || imageData}
                            />
                        </div>
                        <div className='infoGroupSpacing'>
                            <h4 className='textWrap'>{event.Group?.name}</h4>
                            <h4>{event.Group?.private === true ? 'Private' : 'Public'}</h4>
                        </div>
                    </div>

                    <div>
                        
                    </div>

                </div>
            </div>

        </div>
    )
}

export default EventDetails
