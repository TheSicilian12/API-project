import React from 'react';
import { NavLink } from 'react-router-dom';
import './GroupDetails.css';
import '../UniversalCSS.css'
import { organizeEventsByDate } from '../EventOrganizer'
import eventDividerImage from '../assets/Images/rainbow-removebg-preview_1.png';
import RainbowLine from '../HorizontalLines/RainbowLine';



export function EventsDisplayComponent({ timeline, eventsArray, seperator, seperatorClass}) {
    //timeline - past, present, future string
    //eventsArray - specific past, current, future

    if (eventsArray.length === 0) {
        return null;
    }

    let seperatorImage = 'Uhide';
    let background = 'UGroup-EventsBackGround'
    if (seperator) {
        seperatorImage = 'Ushow';
        background='noBackground'
    }
    if (!seperatorClass) {
        seperatorClass='noSeperatorClass'
    }

    let holderDescription;
    if (timeline === 'past') {
        holderDescription = 'Past Events'
    } else if (timeline === 'future') {
        holderDescription = 'Upcoming Events'
    } else {
        holderDescription = 'Ongoing Events'
    }

    let keyGen = 0;

    let imageData = 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';

    return (
        <div className={`${timeline}`}>
            <div key={`${timeline}${keyGen++}`} className='displayFlex justifyCenter  eventListMarginBottom'>
                <div key={`${timeline}${keyGen++}`} className='adjustInfoDiv'>
                    <div key={`${timeline}${keyGen++}`} className='displayFlex justifyCenter'>

                        <h2
                            className='displayFlex justifyCenter sectionTitle UfontTreb'
                        >
                            {holderDescription} ({`${eventsArray.length}`})
                        </h2>
                    </div>
                    {eventsArray.map(e =>
                        <>
                            {/* <div className={`${seperatorImage} displayFlex justifyCenter`}>
                                <img
                                    className={`${seperatorClass}`}
                                    src={seperator}
                                />
                            </div> */}
                            <RainbowLine key={`rainbow${e?.id}`}/>
                            <div key={`events${e?.id}`} className={`pointerCursor eventMargin ${background} border-Radius15 UfontTreb`}>
                                <NavLink
                                    className='noDecoration'
                                    to={`/events/${e?.id}`}
                                >
                                    <div key={`eventsImage${e?.id}`} className='noDecoration displayFlex UjustifyCenter'>
                                        <img
                                            //event image
                                            className='border-Radius15 eventImgDescMargin'
                                            src={e?.previewImage || imageData}
                                            height='200rem'
                                            width='300rem'
                                        />
                                        <div key={`events${e?.id}`} className='infoEventSpacing eventImgDescMargin'>
                                            <div key={`eventsDate${e?.id}`} className='displayFlex marginpaddingDate dateText'>
                                                {/* date */}
                                                {<h4>{new Date(e?.startDate).toUTCString().split(' ')[0].split(',')[0]}. {new Date(e?.startDate).toUTCString().split(' ')[2]} {new Date(e?.startDate).toUTCString().split(' ')[1]}, {new Date(e?.startDate).toUTCString().split(' ')[3]}</h4>}
                                                <h4 className='dotSpacing'>•</h4>
                                                {/* military time */}
                                                {<h4>{new Date(e?.startDate).toUTCString().split(' ')[4]}</h4>}
                                            </div>
                                            <h4 key={`eventsTitle${e?.id}`} className='eventTitleText textWrap marginPaddingTitle'>{e?.name}</h4>
                                            <h4 key={`eventsVenue${e?.id}`}>{e?.Venue?.city ? `${e.Venue?.city}, ${e.Venue?.state}` : 'Venue location TBD'}</h4>
                                        </div>
                                    </div>
                                    <div key={`eventsText${e?.id}`} className='UdisplayFlex UjustifyCenter'>
                                        <p className='textWrap eventInfo aboutText'>{e?.description}</p>
                                    </div>
                                </NavLink>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
