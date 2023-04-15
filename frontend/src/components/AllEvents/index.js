import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './AllEvents.css';
import { getAllEventsThunk } from '../../store/eventsThunk';
import { getGroup } from '../../store/groupsThunk';
import eventDividerImage from '../assets/Images/rainbow-removebg-preview_1.png';
// import eventDividerImage from '../HorizontalLines/RainbowLine';
// import formDividerImage from '../assets/Images/rainbow-removebg-preview_1.png';

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

    // console.log('events: ', events)

    let eventsArray = organizeEventsByDate(events.allEvents);

    return (
        <div className='AllEvents'>
            <div key='upcomingEvents'>
                <div className='displayFlex justifyCenter'>
                    <p className='mainText UfontTreb eventGroupHeaderFontSize'>
                        Events in AdventureUp
                    </p>
                </div>

            </div>
            <EventsDisplayComponent
                    timeline={'current'} eventsArray={eventsArray[2]} seperator={eventDividerImage} seperatorClass={'raincornSeperator'}
                />
            <EventsDisplayComponent
                timeline={'future'} eventsArray={eventsArray[1]} seperator={eventDividerImage} seperatorClass={'raincornSeperator'}
            />
            <EventsDisplayComponent
                timeline={'past'} eventsArray={eventsArray[0]} seperator={eventDividerImage} seperatorClass={'raincornSeperator'}
            />
        </div>
    )
}
