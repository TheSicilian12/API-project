import React from 'react';
import { useEffect } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './GroupDetails.css';
import '../UniversalCSS.css'
import { getGroup } from '../../store/groupsThunk';
import { getGroupEventsThunk } from '../../store/eventsThunk';
import OpenModalDeleteGroupButton from '../DeleteGroupModalButton';
import DeleteGroupModal from '../DeleteGroupModal'
import { organizeEventsByDate } from '../EventOrganizer'
import { EventsDisplayComponent } from './eventsDisplayComponent'
import pinkArrowLeft from '../assets/Images/pinkArrowLeft-removebg-preview.png';
import EventGroupComponent from '../eventGroupComponent';
// import SignupFormModal from '../SignupFormModal';
// import backButtonImage from '../assets/52-528836_arrow-pointing-left-cartoon-arrow-pointing-left.jpg'
import BackButton from '../BackButton';

function GroupDetails({ group, user, events, groupId }) {
    const history = useHistory();

    if (!group.singleGroup) {
        return <div>loading</div>
    }

    const totalNumberEvents = Object.values(events).length

    let eventsArray = organizeEventsByDate(events);
    let futureEvents = eventsArray[1];
    let pastEvents = eventsArray[0];
    let currentEvents = eventsArray[2];

    let showPastEvents = 'Ushow';
    let showFutureEvents = 'Ushow';
    let showCurrentEvents = 'Ushow';
    if (futureEvents.length === 0) {
        showFutureEvents = 'Uhide';
    }
    if (pastEvents.length === 0) {
        showPastEvents = 'hide';
    }
    if (currentEvents.length === 0) {
        showCurrentEvents = 'Uhide'
    }

    let groupStatus = 'Public'
    if (group.singleGroup.private) {
        groupStatus = 'Private'
    }

    //determine the userStatus / display
    //organizer or creator, currently just checking if organizer
    //joinGroup for disable /enable button
    let joinGroup = false;
    let hideJoinGroup = 'Ushow';
    let displayJoinGroup = 'on';
    let options = 'off';

    if (user) {
        if (group.singleGroup.Organizer.id === user.id) {
            joinGroup = true;
            displayJoinGroup = 'off';
            options = 'on';
        }
    }

    if (!user) {
        joinGroup = true;
        hideJoinGroup = 'Uhide';
    }

    let imageData = 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';

    let groupPreviewImage = group.singleGroup.GroupImages.find(e => e.preview === true)

    const info = {
        group,
        numEvents: totalNumberEvents,
        groupStatus,
        displayJoinGroup,
        hideJoinGroup,
        joinGroup,
        options,
        groupId
    }

    const type = "group"

    return (
        <>
            <div className='GroupDetails UfontTreb textSize displayFlex justifyCenter alignCenter Uflexdirection-column'>

                <div className='back-button'>
                    <BackButton text={"All Groups"} link={"/groups"}/>
                </div>

                <div className="eventGroupComponent">
                    <EventGroupComponent type={type} previewImage={groupPreviewImage} info={info} />
                </div>

                <div key='current' className={`${showCurrentEvents} eventListMargin`}>
                    <EventsDisplayComponent
                        key='current'
                        timeline={'current'} eventsArray={eventsArray[2]}
                    />
                </div>
                <div key='future' className={`${showFutureEvents}`}>
                    <EventsDisplayComponent
                        key='future'
                        timeline={'future'} eventsArray={eventsArray[1]}
                    />
                </div>
                <div key='past' className={`${showPastEvents}`}>
                    <EventsDisplayComponent
                        key='past'
                        timeline={'past'} eventsArray={eventsArray[0]}
                    />
                </div>

            </div >
        </>
    )
}

export default GroupDetails;
