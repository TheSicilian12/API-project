import React from 'react';
import { NavLink } from 'react-router-dom';
import './GroupDetails.css';
import '../UniversalCSS.css'
import { organizeEventsByDate } from '../EventOrganizer'



export function EventsDisplayComponent({ timeline, eventsArray, seperator }) {
    // console.log('test')
    //timeline - past, present, future string
    //eventsArray - specific past, current, future

    if (eventsArray.length === 0) {
        return null;
    }

    console.log('seperator: ', seperator)

    let seperatorImage = 'Uhide';
    if (seperator) {
        seperatorImage = 'Ushow';
    }

    let holderDescription;
    if (timeline === 'past') {
        holderDescription = 'Past Events'
    } else if (timeline === 'future') {
        holderDescription = 'Upcoming Events'
    } else {
        holderDescription = 'Ongoing Events'
    }


    let imageData = 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';

    return (
        <div className={timeline}>
            <div className='displayFlex justifyCenter'>
                <div className='adjustInfoDiv'>
                    <div className='displayFlex justifyCenter'>

                        <h2
                            className='displayFlex justifyCenter sectionTitle'
                        >
                            {holderDescription} ({`${eventsArray.length}`})
                        </h2>
                    </div>
                    {eventsArray.map(e =>
                        <>
                            <div>
                                <img
                                    className='borderGreen'
                                    src={seperator}
                                />
                            </div>
                            <div className='pointerCursor eventMargin UBackGround border-Radius15'>
                                <NavLink
                                    className='noDecoration'
                                    to={`/events/${e?.id}`}
                                >
                                    <div className='noDecoration displayFlex UjustifyCenter'>
                                        <img
                                            //event image
                                            className='border-Radius15 eventImgDescMargin'
                                            src={e?.previewImage || imageData}
                                            height='200rem'
                                            width='300rem'
                                        />
                                        <div className='infoEventSpacing eventImgDescMargin'>
                                            <div className='displayFlex marginpaddingDate dateText'>
                                                {/* date */}
                                                {<h4>{new Date(e?.startDate).toUTCString().split(' ')[0].split(',')[0]}. {new Date(e?.startDate).toUTCString().split(' ')[2]} {new Date(e?.startDate).toUTCString().split(' ')[1]}, {new Date(e?.startDate).toUTCString().split(' ')[3]}</h4>}
                                                <h4 className='dotSpacing'>•</h4>
                                                {/* military time */}
                                                {<h4>{new Date(e?.startDate).toUTCString().split(' ')[4]}</h4>}
                                            </div>
                                            <h4 className='eventTitleText textWrap marginPaddingTitle'>{e?.name}</h4>
                                            <h4>{e?.Venue?.city ? `${e.Venue?.city}, ${e.Venue?.state}` : 'Venue location TBD'}</h4>
                                        </div>
                                    </div>
                                    <div className='UdisplayFlex UjustifyCenter'>
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
