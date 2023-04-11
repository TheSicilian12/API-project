import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './AllEvents.css';
import { getAllEventsThunk } from '../../store/eventsThunk';
import { getGroup } from '../../store/groupsThunk';
import eventDividerImage from '../assets/Images/favpng_gif-clip-art-oekaki-fan-art.png'

export default function AllEvents() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllEventsThunk());
    }, [])

    const events = useSelector((state) => state.events)

    if (!events.allEvents) {
        return <div>loading</div>
    }

    // console.log('events: ', events)

    let imageData = 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';

    function isEventFuture(eventEndDate) {
        //returns true if date is today or in the future.
        //false if not
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const todayDateParse = Date.parse(`${year}-${month}-${day}`)

        // console.log('todayDateParse: ', todayDateParse)
        console.log('today: ', today)
        console.log('day: ', day)
        console.log('month: ', month)
        console.log('year: ', year)


        console.log(`today: ${year}-${month}-${day}`)
        console.log('eventEndDate: ', eventEndDate)
        console.log('today parse: ', todayDateParse)


        const eventEndDateParse = Date.parse(eventEndDate)
        console.log('event parse: ', eventEndDateParse)

        console.log('today > event: ', todayDateParse > eventEndDateParse)

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

    // console.log('events Organized: ', organizeEventsByDate(events.allEvents))

    const eventsArray = organizeEventsByDate(events.allEvents)

    console.log('eventsArray: ', eventsArray)

    return (
        <div className='AllEvents'>
            <div key='upcomingEvents'>
                <div className='displayFlex justifyCenter'>
                    <p className='mainText textSizeGroup'>
                        Events in AdventureUp
                    </p>
                </div>
                {eventsArray[1].map(e =>
                    <div className='displayFlex flex-directionColumn'>
                        <div className='displayFlex justifyCenter flex-directionColumn'>
                            <div className='displayFlex justifyCenter'>
                                <img
                                    className='dividerPadding'
                                    height='25%'
                                    width='25%'

                                    src={eventDividerImage}
                                />
                            </div>
                            <div className='displayFlex justifyCenter pointerCursor' key={`allEvents${e.id}`}>
                                <NavLink to={`/events/${e.id}`}>
                                    <div className='displayFlex' key={`allEvents${e.id}_main`}>
                                        <div className='' key={`allEvents${e.id}_image`}>
                                            <img className='eventImage'
                                                //super cool!
                                                src={e.previewImage || imageData}
                                            />
                                        </div>
                                        <div className='details eventInfo noDecoration' key={`allEvents${e.id}_info`}>
                                            <h4 className='textWrap' key={`allEvents${e.id}_startDate`}>{e.startDate}</h4>
                                            <h3 className='textWrap' key={`allEvents${e.id}_name`}>{e.name}</h3>
                                            {/* <h4>{e.Venue ? `${e.Venue?.city}, ${e.Venue?.state}` : 'Location TBD'}</h4> */}
                                            {/* issue with this is that a venue may not have a location. moving on for now, possible bug */}
                                            <h4 className='textWrap' key={`allEvents${e.id}_location`}>{e.type === 'Online' ? 'Event is online!' : `${e.Venue?.city}, ${e.Venue?.state}`}</h4>
                                        </div>
                                    </div>
                                    <div key={`allEvents${e.id}_description`}>
                                        <p key={`allEvents${e.id}_descriptionText`}>{e.description}</p>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div key='pastEvents'>
                <div className='displayFlex justifyCenter'>
                    <p className='mainText textSizeGroup'>
                    Past Events
                    </p>
                </div>
                {eventsArray[0].map(e =>
                    <div className='displayFlex flex-directionColumn'>
                        <div className='displayFlex justifyCenter flex-directionColumn'>
                            <div className='displayFlex justifyCenter'>
                                <img
                                    className='dividerPadding'
                                    height='25%'
                                    width='25%'

                                    src={eventDividerImage}
                                />
                            </div>
                            <div className='displayFlex justifyCenter pointerCursor' key={`allEvents${e.id}`}>
                                <NavLink to={`/events/${e.id}`}>
                                    <div className='displayFlex' key={`allEvents${e.id}_main`}>
                                        <div className='' key={`allEvents${e.id}_image`}>
                                            <img className='eventImage'
                                                //super cool!
                                                src={e.previewImage || imageData}
                                            />
                                        </div>
                                        <div className='details eventInfo noDecoration' key={`allEvents${e.id}_info`}>
                                            <h4 className='textWrap' key={`allEvents${e.id}_startDate`}>{e.startDate}</h4>
                                            <h3 className='textWrap' key={`allEvents${e.id}_name`}>{e.name}</h3>
                                            {/* <h4>{e.Venue ? `${e.Venue?.city}, ${e.Venue?.state}` : 'Location TBD'}</h4> */}
                                            {/* issue with this is that a venue may not have a location. moving on for now, possible bug */}
                                            <h4 className='textWrap' key={`allEvents${e.id}_location`}>{e.type === 'Online' ? 'Event is online!' : `${e.Venue?.city}, ${e.Venue?.state}`}</h4>
                                        </div>
                                    </div>
                                    <div key={`allEvents${e.id}_description`}>
                                        <p key={`allEvents${e.id}_descriptionText`}>{e.description}</p>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                )}

                {/* {eventsArray[0].map(e => */}
                    {/* <NavLink to={`/events/${e.id}`}> */}
                        {/* <div key={`allEvents${e.id}`}> */}
                            {/* <div key={`allEvents${e.id}_main`}> */}
                                {/* <div key={`allEvents${e.id}_image`}> */}
                                    {/* image */}
                                {/* </div> */}
                                {/* <div key={`allEvents${e.id}_info`}> */}
                                    {/* <h4 key={`allEvents${e.id}_startDate`}>{e.startDate}</h4> */}
                                    {/* <h3 key={`allEvents${e.id}_name`}>{e.name}</h3> */}
                                    {/* <h4>{e.Venue ? `${e.Venue?.city}, ${e.Venue?.state}` : 'Location TBD'}</h4> */}
                                    {/* issue with this is that a venue may not have a location. moving on for now, possible bug */}
                                    {/* <h4 key={`allEvents${e.id}_location`}>{e.type === 'Online' ? 'Event is online!' : `${e.Venue?.city}, ${e.Venue?.state}`}</h4> */}
                                {/* </div> */}
                            {/* </div> */}
                            {/* <div key={`allEvents${e.id}_description`}> */}
                                {/* <p key={`allEvents${e.id}_descriptionText`}>{e.description}</p> */}
                            {/* </div> */}
                        {/* </div> */}
                    {/* </NavLink> */}
                {/* )} */}


            </div>
        </div>
    )
}
