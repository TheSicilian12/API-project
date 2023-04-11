import React from 'react';
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './GroupDetails.css';
import { getGroup } from '../../store/groupsThunk';
import { getGroupEventsThunk } from '../../store/eventsThunk';
import OpenModalDeleteGroupButton from '../DeleteGroupModalButton';
import DeleteGroupModal from '../DeleteGroupModal'
// import SignupFormModal from '../SignupFormModal';

function GroupDetails({ group, user, events, groupId }) {
    //  console.log('events prop: ', events['1']?.endDate)
    // console.log('Date: ', Date.parse(events['1']?.endDate))

    // console.log('events: ', Object.values(events).length)

    // console.log('events: ', events)
    if (!group.singleGroup) {
        return <div>loading</div>
    }

    console.log('user: ', user)

    const totalNumberEvents = Object.values(events).length

    function organizeEventsByDate(eventsObj) {
        //eventArray[0] is for past events
        //eventArray[1] is for current/future events
        let eventsArray = [[], []]

        Object.values(eventsObj).map((e) => {
            //     console.log(e?.endDate)
            //    console.log(isEventFuture(e?.endDate))
            if (isEventFuture(e?.endDate)) {
                eventsArray[1].push(e)
            } else {
                eventsArray[0].push(e)
            }
        })

        //organize the event dates from earliest date to newest date
        for (let i = 0; eventsArray.length > i; i++) {
            if (eventsArray[i].length) {
                eventsArray[i].sort((a, b) => {
                    const firstDate = Date.parse(a?.endDate);
                    const secondDate = Date.parse(b?.endDate);
                    if (i === 0) {
                        if (firstDate < secondDate) return +1;
                        if (firstDate > secondDate) return -1;
                    }
                    if (i === 1) {
                        if (firstDate < secondDate) return -1;
                        if (firstDate > secondDate) return +1;
                    }

                    return 0;
                })
            }

        }

        // console.log('return: ', eventsArray);
        return eventsArray;
    }

    let eventsArray = organizeEventsByDate(events);
    let futureEvents = eventsArray[1];
    let pastEvents = eventsArray[0];

    // console.log('futureEvents: ', futureEvents)

    console.log('eventsArray: ', eventsArray)

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
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth();
        const year = today.getFullYear();
        const todayDateParse = Date.parse(`${year}-${month}-${day}`)

        const eventEndDateParse = Date.parse(eventEndDate)

        return eventEndDateParse >= todayDateParse;
    }
    // console.log('isDate: ', isDateValid('2023-02-17'))


    //determine the userStatus / display
    //organizer or creator, currently just checking if organizer
    let joinGroup = 'on'
    let options = 'off'
    // console.log('group - further: ', group.singleGroup)
    // console.log('user: ', user.id)

    if (user) {
        if (group.singleGroup.Organizer.id === user.id) {
            joinGroup = 'off'
            options = 'on'
        }
    }

    if (!user) {
        joinGroup = 'off';
    }

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

                <div className='infoGeneralSpacing borderGreen'>
                    <h1 className='GroupDetails_Details_GroupName textWrap'>
                        {`${group.singleGroup.name}`}
                    </h1>
                    <h4 className='GroupDetails_Details_Location'>
                        {`${group.singleGroup.city}, ${group.singleGroup.state}`}
                    </h4>
                    <div>
                        <h4>
                            {`${totalNumberEvents} events`}
                            {/* number of events */}
                        </h4>
                        <h4>
                            {groupStatus}
                        </h4>
                        <h4>
                            {`Organized by ${group.singleGroup.Organizer.firstName} ${group.singleGroup.Organizer.lastName}`}
                        </h4>
                    </div>
                    <div className='displayFlex alignBottom justifyCenter  buttonHeight'>
                        <div className={`${joinGroup} borderRed`}>
                            <button>
                                Join this group
                                {/* alert for no implementation */}
                            </button>
                        </div>
                        <div className={options}>
                            <div className='borderRed displayFlex justifySpaceAround eventInfo'>
                                <NavLink to={`/groups/${groupId}/events/new`}>
                                    <button>
                                        Create event
                                    </button>
                                </NavLink>
                                <NavLink to={`/groups/${groupId}/edit`}>
                                    <button>
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
                            <div className='borderRed'>
                                <div className='borderGreen displayFlex'>

                                    <img
                                        //event image
                                        src={e.previewImage || imageData}
                                        height='200rem'
                                        width='300rem'
                                    />
                                    <div className='infoEventSpacing'>
                                        <h4>{e?.endDate}</h4>
                                        <h4 className='textWrap'>{e?.name}</h4>
                                        <h4>{e?.Venue?.city ? `${e.Venue?.city}, ${e.Venue?.state}` : 'Venue location TBD'}</h4>
                                    </div>
                                </div>
                                <div className='borderBlack'>
                                    <p className='textWrap'>{e?.description}</p>
                                </div>
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
                                <div className='borderRed'>
                                    <div className='borderGreen displayFlex'>

                                            <img
                                                //group image
                                                src={e.previewImage || imageData}
                                                height='200rem'
                                                width='300rem'
                                            />

                                        <div className='infoEventSpacing'>
                                            <h4>{e?.endDate}</h4>
                                            <h4 className='textWrap'>{e?.name}</h4>
                                            <h4>{e?.Venue?.city ? `${e.Venue?.city}, ${e.Venue?.state}` : 'No venue location'}</h4>
                                        </div>
                                    </div>
                                    <div className='borderBlack'>
                                        <p>{e?.description}</p>
                                    </div>
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
