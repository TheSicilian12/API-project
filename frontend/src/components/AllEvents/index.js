import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './AllEvents.css';
import { getAllEventsThunk } from '../../store/eventsThunk';
import { getGroup } from '../../store/groupsThunk';
import eventDividerImage from '../assets/Images/favpng_gif-clip-art-oekaki-fan-art.png'
import { EventsDisplayComponent } from '../GroupDetails/eventsDisplayComponent'
import { organizeEventsByDate } from '../EventOrganizer'

export default function AllEvents() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllEventsThunk());
    }, [])

    const events = useSelector((state) => state.events)

    if (!events.allEvents) {
        return <div>loading</div>
    }

    console.log('events: ', events)

    let imageData = 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';

    // function isEventFuture(eventEndDate) {
    //     //returns true if date is today or in the future.
    //     //false if not
    //     // const today = new Date();
    //     // const day = today.getDate();
    //     // const month = today.getMonth() + 1;
    //     // const year = today.getFullYear();
    //     // const todayDateParse = Date.parse(`${year}-${month}-${day}`)

    //     const todayParse = Date.parse(new Date());

    //     // console.log('todayDateParse: ', todayDateParse)
    //     // console.log('today: ', today)
    //     // console.log('day: ', day)
    //     // console.log('month: ', month)
    //     // console.log('year: ', year)

    //     // console.log(`today: ${year}-${month}-${day}`)
    //     // console.log('eventEndDate: ', eventEndDate)
    //     // console.log('today parse: ', todayDateParse)


    //     const eventEndDateParse = Date.parse(eventEndDate)
    //     // console.log('event parse: ', eventEndDateParse)

    //     // console.log('today > event: ', todayDateParse > eventEndDateParse)

    //     return eventEndDateParse >= todayParse;
    // }

    // //order events
    // function organizeEventsByDate(eventsObj) {
    //     //eventArray[0] is for past events
    //     //eventArray[1] is for current/future events
    //     let eventsArray = [[], []]

    //     Object.values(eventsObj).map((e) => {
    //         //     console.log(e?.endDate)
    //         //    console.log(isEventFuture(e?.endDate))
    //         if (isEventFuture(e?.endDate)) {
    //             eventsArray[1].push(e)
    //         } else {
    //             eventsArray[0].push(e)
    //         }
    //     })
    //     //organize the event dates from earliest date to newest date
    //     for (let i = 0; eventsArray.length > i; i++) {
    //         if (eventsArray[i].length) {
    //             eventsArray[i].sort((a, b) => {
    //                 const firstDate = Date.parse(a.endDate);
    //                 const secondDate = Date.parse(b.endDate);

    //                 if (i === 0) {
    //                     if (firstDate < secondDate) return +1;
    //                     if (firstDate > secondDate) return -1;
    //                 }
    //                 if (i === 1) {
    //                     if (firstDate < secondDate) return -1;
    //                     if (firstDate > secondDate) return +1;
    //                 }

    //                 return 0;
    //             })
    //         }

    //     }

    //     // console.log('return: ', eventsArray);
    //     return eventsArray;
    // }

    // console.log('events Organized: ', organizeEventsByDate(events.allEvents))

    let eventsArray = organizeEventsByDate(events.allEvents);


    // const eventsArray = organizeEventsByDate(events.allEvents)

    // console.log('eventsArray: ', eventsArray)

    return (
        <div className='AllEvents'>
            <div key='upcomingEvents'>
                <div className='displayFlex justifyCenter'>
                    <p className='mainText textSizeGroup'>
                        Events in AdventureUp
                    </p>
                </div>

            </div>
            <EventsDisplayComponent
                    timeline={'current'} eventsArray={eventsArray[2]} seperator={eventDividerImage}
                />
            <EventsDisplayComponent
                timeline={'future'} eventsArray={eventsArray[1]}
            />
            <EventsDisplayComponent
                timeline={'past'} eventsArray={eventsArray[0]}
            />
        </div>
    )
}
