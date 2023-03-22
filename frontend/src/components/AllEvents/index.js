import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './AllEvents.css';
import { getAllEventsThunk } from '../../store/eventsThunk';
import { getGroup } from '../../store/groupsThunk';


export default function AllEvents() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllEventsThunk());
    }, [])

    const events = useSelector((state) => state.events)

    if (!events.allEvents) {
        return <div>loading</div>
    }

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

    //order events
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

    console.log('events: ', organizeEventsByDate(events.allEvents))

    const eventsArray = organizeEventsByDate(events.allEvents)

    return (
        <div className='AllEvents'>
            <div key='upcomingEvents'>
                Events
                {eventsArray[1].map(e =>
                    // <NavLink tp={}>
                    <NavLink to={`/events/${e.id}`}>
                        <div key={`allEvents${e.id}`}>
                            <div key={`allEvents${e.id}_main`}>
                                <div key={`allEvents${e.id}_image`}>
                                    image
                                </div>
                                <div key={`allEvents${e.id}_info`}>
                                    <h4 key={`allEvents${e.id}_startDate`}>{e.startDate}</h4>
                                    <h3 key={`allEvents${e.id}_name`}>{e.name}</h3>
                                    {/* <h4>{e.Venue ? `${e.Venue?.city}, ${e.Venue?.state}` : 'Location TBD'}</h4> */}
                                    {/* issue with this is that a venue may not have a location. moving on for now, possible bug */}
                                    <h4 key={`allEvents${e.id}_location`}>{e.type === 'Online' ? 'Event is online!' : `${e.Venue?.city}, ${e.Venue?.state}`}</h4>
                                </div>
                            </div>
                            <div key={`allEvents${e.id}_description`}>
                                <p key={`allEvents${e.id}_descriptionText`}>{e.description}</p>
                            </div>
                        </div>
                    </NavLink>
                )}
            </div>
            <div key='pastEvents'>
                Past Events
                {eventsArray[0].map(e =>
                    // <NavLink tp={}>
                    <NavLink to={`/events/${e.id}`}>
                        <div key={`allEvents${e.id}`}>
                            <div key={`allEvents${e.id}_main`}>
                                <div key={`allEvents${e.id}_image`}>
                                    image
                                </div>
                                <div key={`allEvents${e.id}_info`}>
                                    <h4 key={`allEvents${e.id}_startDate`}>{e.startDate}</h4>
                                    <h3 key={`allEvents${e.id}_name`}>{e.name}</h3>
                                    {/* <h4>{e.Venue ? `${e.Venue?.city}, ${e.Venue?.state}` : 'Location TBD'}</h4> */}
                                    {/* issue with this is that a venue may not have a location. moving on for now, possible bug */}
                                    <h4 key={`allEvents${e.id}_location`}>{e.type === 'Online' ? 'Event is online!' : `${e.Venue?.city}, ${e.Venue?.state}`}</h4>
                                </div>
                            </div>
                            <div key={`allEvents${e.id}_description`}>
                                <p key={`allEvents${e.id}_descriptionText`}>{e.description}</p>
                            </div>
                        </div>
                    </NavLink>
                )}
            </div>
        </div>

        // <div className='AllGroups'>
        //     Groups
        //     {Object.keys(groups.allGroups).map(e =>
        //         <NavLink to={`/groups/${groups.allGroups[e].id}`}>
        //             <div className='AllGroups_group'
        //                 key={`AllGroups_group${groups.allGroups[e].id}`}
        //                 >
        //                 <div className='image' key={`groups${groups.allGroups[e].id}`}>
        //                     {`${groups.allGroups[e].preivewImage}`}
        //                 </div>
        //                 <div className='details' key={`details_${groups.allGroups[e].name}`}>
        //                     <h2> {`${groups.allGroups[e].name}`}</h2>
        //                     <h4> {`${groups.allGroups[e].city}, ${groups.allGroups[e].state}`}</h4>
        //                     <p>{`${groups.allGroups[e].about}`}</p>
        //                 </div>
        //             </div>
        //         </NavLink>
        //     )}
        // </div>
    )
}