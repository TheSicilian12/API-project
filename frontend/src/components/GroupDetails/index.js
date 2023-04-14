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
import { EventsDisplayComponent } from './eventsDisplayComponent'
// import SignupFormModal from '../SignupFormModal';
// import backButtonImage from '../assets/52-528836_arrow-pointing-left-cartoon-arrow-pointing-left.jpg'


function GroupDetails({ group, user, events, groupId }) {
    if (!group.singleGroup) {
        return <div>loading</div>
    }

    // console.log('user: ', user)

    const totalNumberEvents = Object.values(events).length

    let eventsArray = organizeEventsByDate(events);
    let futureEvents = eventsArray[1];
    let pastEvents = eventsArray[0];
    let currentEvents = eventsArray[2];

    // console.log('futureEvents: ', futureEvents)

    // console.log('eventsArray: ', eventsArray)

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
            <div className={`${showCurrentEvents}`}>
                <EventsDisplayComponent
                    timeline={'current'} eventsArray={eventsArray[2]}
                />
            </div>
            <div className={`${showFutureEvents}`}>
                <EventsDisplayComponent
                    timeline={'future'} eventsArray={eventsArray[1]}
                />
            </div>
            <div className={`${showPastEvents}`}>
                <EventsDisplayComponent
                    timeline={'past'} eventsArray={eventsArray[0]}
                />
            </div>

        </div >

    )
}

export default GroupDetails;
