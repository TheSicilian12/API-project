import React from 'react';
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './GroupDetails.css';
import '../UniversalCSS.css'
import { getGroup } from '../../store/groupsThunk';
import { getGroupEventsThunk } from '../../store/eventsThunk';
import OpenModalDeleteGroupButton from '../DeleteGroupModalButton';
import DeleteGroupModal from '../DeleteGroupModal'
import { organizeEventsByDate } from '../EventOrganizer'
// import SignupFormModal from '../SignupFormModal';
// import backButtonImage from '../assets/52-528836_arrow-pointing-left-cartoon-arrow-pointing-left.jpg'


function GroupDetails({ group, user, events, groupId }) {
    //  console.log('events prop: ', events['1']?.endDate)
    // console.log('Date: ', Date.parse(events['1']?.endDate))

    // console.log('events: ', Object.values(events).length)

    // console.log('delete event')

    // console.log('events: ', events)
    if (!group.singleGroup) {
        return <div>loading</div>
    }

    // console.log('user: ', user)

    const totalNumberEvents = Object.values(events).length

    let eventsArray = organizeEventsByDate(events);
    let futureEvents = eventsArray[1];
    let pastEvents = eventsArray[0];

    // console.log('futureEvents: ', futureEvents)

    // console.log('eventsArray: ', eventsArray)

    let showPastEvents = 'off';
    let showFutureEvents = 'off';
    if (futureEvents.length > 0) {
        showFutureEvents = 'on';
    }
    if (pastEvents.length > 0) {
        showPastEvents = 'on';
    }

    let groupStatus = 'Public'
    if (group.singleGroup.private) {
        groupStatus = 'Private'
    }

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

    return (
            <div className={showFutureEvents}>
                <div className='displayFlex justifyCenter'>
                    <div className='adjustInfoDiv'>
                        <h2>
                            Upcoming Events ({`${futureEvents.length}`})
                        </h2>
                        {futureEvents.map(e =>
                            <div className='borderRed pointerCursor'>
                                <NavLink to={`/events/${e.id}`}>
                                    <div className='borderGreen displayFlex'>
                                        <img
                                            //event image
                                            src={e.previewImage || imageData}
                                            height='200rem'
                                            width='300rem'
                                        />
                                        <div className='infoEventSpacing'>
                                            {/* month / day / year */}
                                            {/* {<h4>{e?.startDate.split('T')[0].split('-')[1]} / {e?.startDate.split('T')[0].split('-')[2]} / {e?.startDate.split('T')[0].split('-')[0]}</h4>} */}
                                            {/* {<h4>{e?.startDate.split('T')[1]}</h4>} */}
                                            {/* mdn docs Date.prototype.toJSON() */}
                                            <div className='borderGreen displayFlex'>
                                                {/* date */}
                                                {<h4>{new Date(e?.startDate).toUTCString().split(' ')[0].split(',')[0]}. {new Date(e?.startDate).toUTCString().split(' ')[2]} {new Date(e?.startDate).toUTCString().split(' ')[1]}, {new Date(e?.startDate).toUTCString().split(' ')[3]}</h4>}
                                                <h4 className='dotSpacing'>•</h4>
                                                {/* military time */}
                                                {<h4>{new Date(e?.startDate).toUTCString().split(' ')[4]}</h4>}
                                            </div>

                                            <h4 className='textWrap'>{e?.name}</h4>
                                            <h4>{e?.Venue?.city ? `${e.Venue?.city}, ${e.Venue?.state}` : 'Venue location TBD'}</h4>
                                        </div>
                                    </div>
                                    <div className='borderBlack'>
                                        <p className='textWrap'>{e?.description}</p>
                                    </div>
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default GroupDetails;
