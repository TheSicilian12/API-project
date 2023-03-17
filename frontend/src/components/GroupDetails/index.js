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
                    const firstDate = Date.parse(a.endDate);
                    const secondDate = Date.parse(b.endDate);

                    if (firstDate < secondDate) return -1;
                    if (firstDate > secondDate) return +1;

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

    return (
        <div className='GroupDetails'>
            <div className='GroupDetails_GroupsButton'>
                <p>{'<'}</p>
                <NavLink to='/groups'>Groups</NavLink>
            </div>
            <div className='GroupDetails_Details'>
                <div className='GroupDetails_Details_image'>

                </div>
                <h1 className='GroupDetails_Details_GroupName'>
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
                </div>
                <h4>
                    {`Organized by ${group.singleGroup.Organizer.firstName} ${group.singleGroup.Organizer.lastName}`}
                </h4>
                <div className={joinGroup}>
                    <button>
                        Join this group
                        {/* alert for no implementation */}
                    </button>
                </div>
                <div className={options}>
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
                    {/* <NavLink to='/test'>
                    <button>
                        Delete
                        {/* it really needs a pop up and then redirect *}
                    </button>
                    </NavLink> */}
                    <div>
                        <OpenModalDeleteGroupButton
                            buttonText="Delete"
                            modalComponent={<DeleteGroupModal groupId={groupId} />}
                        />
                    </div>
                </div>
            </div>
            <div>
                <h2>
                    Organizer
                </h2>
                <h4>
                    {`${group.singleGroup.Organizer.firstName} ${group.singleGroup.Organizer.lastName}`}
                </h4>
                <h2>
                    What we're about
                </h2>
                <p>
                    {group.singleGroup.about}
                </p>
            </div>


            <div className={showFutureEvents}>
                <h2>
                    Upcoming Events ({`${futureEvents.length}`})
                </h2>
                    {futureEvents.map(e =>
                        <div>
                            <div>
                                <div>image</div>
                                <div>
                                    <h4>{e.endDate}</h4>
                                    <h4>{e.name}</h4>
                                    <h4>{e.Venue?.city ? `${e.Venue?.city}, ${e.Venue?.state}` : 'Venue location TBD'}</h4>
                                </div>
                            </div>
                            <div>
                                <p>{e.description}</p>
                            </div>
                        </div>
                    )}
            </div>

            <div className={showPastEvents}>
                <h2>
                <h2>
                    Past Events ({`${pastEvents.length}`})
                </h2>
                    {pastEvents.map(e =>
                        <div>
                            <div>
                                <div>image</div>
                                <div>
                                    <h4>{e.endDate}</h4>
                                    <h4>{e.name}</h4>
                                    <h4>{e.Venue?.city ? `${e.Venue?.city}, ${e.Venue?.state}` : 'No venue location'}</h4>
                                </div>
                            </div>
                            <div>
                                <p>{e.description}</p>
                            </div>
                        </div>
                    )}
                </h2>
            </div>
        </div>

    )
}

export default GroupDetails;
