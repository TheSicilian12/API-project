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
import {organizeEventsByDate} from '../EventOrganizer'
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
    // console.log('isEventFuture test: ', isEventFuture('2020-02-02'))

    // console.log('group: ', group.singleGroup.about)

    function isEventFuture(eventEndDate) {
        //returns true if date is today or in the future.
        //false if not

        // console.log('eventEndDate: ', eventEndDate)
        // console.log('parse end date: ', Date.parse(eventEndDate))

        const todayParse = Date.parse(new Date());

        // const today = new Date();
        // const day = today.getDate();
        // const month = today.getMonth();
        // const year = today.getFullYear();
        // const todayDateParse = Date.parse(`${year}-${month}-${day}`)


        // console.log('today: ', today)
        // console.log('today parse: ', Date.parse(today))


        const eventEndDateParse = Date.parse(eventEndDate)

        return eventEndDateParse >= todayParse;
    }
    // console.log('isDate: ', isDateValid('2023-02-17'))



    //difference confirmed
    // console.log('test----------------')
    // console.log('date 1: 2020-04-04')
    // console.log('date 1 parse: ', Date.parse('2020-04-04'))
    // console.log('date 2: 2020-04-04T04:36:00.000Z')
    // console.log('date 2 parse: ', Date.parse('2020-04-04T04:36:00.000Z'))


    //determine the userStatus / display
    //organizer or creator, currently just checking if organizer
    //joinGroup for disable /enable button
    let joinGroup = false;
    let hideJoinGroup = 'Ushow';
    let displayJoinGroup = 'on';
    let options = 'off';
    // console.log('group - further: ', group.singleGroup)
    // console.log('user: ', user.id)

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

    // console.log('joinGroup: ', joinGroup)

    let imageData = 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';

    // console.log('groups: ', group.singleGroup.GroupImages)

    let groupPreviewImage = group.singleGroup.GroupImages.find(e => e.preview === true)

    // console.log('groupPreviewImage: ', groupPreviewImage)

    return (
        <div className='GroupDetails'>
            <div className='GroupDetails_GroupsButton'>
                <p>{'<'}</p>
                <NavLink to='/groups'>Groups</NavLink>
            </div>
            <div className='GroupDetails_Details displayFlex borderRed justifyCenter'>
                <img
                    className=''
                    height='500rem'
                    width='700rem'
                    src={groupPreviewImage?.url || imageData}
                />

                <div className='infoGeneralSpacing'>
                    <h1 className='GroupDetails_Details_GroupName textWrap'>
                        {`${group.singleGroup.name}`}
                    </h1>
                    <h4 className='GroupDetails_Details_Location'>
                        {`${group.singleGroup.city}, ${group.singleGroup.state}`}
                    </h4>
                    <div className='displayFlex alignCenter'>
                        <h4 >
                            {`${totalNumberEvents} events`}
                        </h4>
                        <h4 className='dotSpacing'>•</h4>
                        <h4 >
                            {groupStatus}
                        </h4>
                    </div>
                    <h4>
                        {`Organized by ${group.singleGroup.Organizer.firstName} ${group.singleGroup.Organizer.lastName}`}
                    </h4>
                    <div className='displayFlex alignBottom justifyCenter buttonHeight'>
                        <div className={`${displayJoinGroup} ${hideJoinGroup}`}>
                            <button
                                className='UgrayButton UblackBorder UbuttonDimensions UfontTreb'
                                onClick={() => alert('Feature coming soon')}
                                disabled={`${joinGroup}` === 'true' ? true : false}
                            >
                                Join this group
                                {/* alert for no implementation */}
                            </button>
                        </div>
                        <div className={options}>
                            <div className='displayFlex justifySpaceAround eventInfo'>
                                <NavLink to={`/groups/${groupId}/events/new`}>
                                    <button
                                        className='UpinkBorder UpurpleButton UfontTreb UbuttonCreateDimensions'
                                    >
                                        Create event
                                    </button>
                                </NavLink>
                                <NavLink to={`/groups/${groupId}/edit`}>
                                    <button
                                     className='UpinkBorder UpurpleButton UfontTreb UbuttonSmallDimensions'
                                    >
                                        Update
                                    </button>
                                </NavLink>
                                <div>
                                    <OpenModalDeleteGroupButton

                                        buttonText="Delete"
                                        modalComponent={<DeleteGroupModal groupId={groupId} />}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='borderRed displayFlex justifyCenter'>
                <div className='borderGreen adjustInfoDiv'>

                    <h2>
                        Organizer
                    </h2>
                    <h4>
                        {`${group.singleGroup.Organizer.firstName} ${group.singleGroup.Organizer.lastName}`}
                    </h4>
                    <h2>
                        What we're about
                    </h2>
                    <p className='textWrap'>
                        {group.singleGroup.about}
                    </p>
                </div>
            </div>

            <div className={showFutureEvents}>
                <div className='borderGreen displayFlex justifyCenter'>
                    <div className='borderRed adjustInfoDiv'>

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

            <div className={showPastEvents}>
                <div className='borderGreen displayFlex justifyCenter'>
                    <div className='borderRed adjustInfoDiv'>
                        <h2>
                            <h2>
                                Past Events ({`${pastEvents.length}`})
                            </h2>
                            {pastEvents.map(e =>
                                <div className='borderRed pointerCursor'>
                                    <NavLink to={`/events/${e.id}`}>
                                        <div className='borderGreen displayFlex'>

                                            <img
                                                //group image
                                                src={e?.previewImage || imageData}
                                                height='200rem'
                                                width='300rem'
                                            />
                                            <div className='infoEventSpacing'>
                                                {/* <h4>{e?.endDate}</h4> */}
                                                <div className='borderGreen displayFlex'>
                                                    {/* date */}
                                                    {<h4>{new Date(e?.startDate).toUTCString().split(' ')[0].split(',')[0]}. {new Date(e?.startDate).toUTCString().split(' ')[2]} {new Date(e?.startDate).toUTCString().split(' ')[1]}, {new Date(e?.startDate).toUTCString().split(' ')[3]}</h4>}
                                                    <h4 className='dotSpacing'>•</h4>
                                                    {/* military time */}
                                                    {<h4>{new Date(e?.startDate).toUTCString().split(' ')[4]}</h4>}
                                                </div>
                                                <h4 className='textWrap'>{e?.name}</h4>
                                                <h4>{e?.Venue?.city ? `${e.Venue?.city}, ${e.Venue?.state}` : 'No venue location'}</h4>
                                            </div>
                                        </div>
                                        <div className='borderBlack'>
                                            <p>{e?.description}</p>
                                        </div>
                                    </NavLink>
                                </div>
                            )}
                        </h2>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default GroupDetails;
