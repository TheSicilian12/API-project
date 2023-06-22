import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './EventForm.css';
import '../UniversalCSS.css';
// import { submitGroup, editGroupThunk, getGroup } from '../../store/groupsThunk';
import { EditEventWrapper } from './editEventWrapper';
import { addEventByGroupIdThunk } from '../../store/eventsThunk'
import formDividerImage from '../assets/Images/rainbow-removebg-preview_1.png';
import RainbowLine from '../HorizontalLines/RainbowLine';


function EventForm({ currentGroup, currentEvent, formType }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const groupId = useParams().id;

    const event = useSelector((state) => state.events)
    const user = useSelector((state) => state.session.user)

    let statusType;
    if (currentEvent) {
        if (currentEvent.status === "Private") {
            statusType = true;
        }
        else statusType = false;
    }

    // const [eventName, setEventName] = useState(currentEvent.name ? currentEvent.name : "");

    const [eventName, setEventName] = useState(currentEvent.name || "false");
    const [displayEventNameErr, setDisplayEventNameErr] = useState(false);

    const [eventAbout, setEventAbout] = useState(currentEvent?.description ? currentEvent?.description : "");
    const [displayEventAboutErr, setDisplayEventAboutErr] = useState(false);
    const [eventMeetingType, setEventMeetingType] = useState(currentEvent?.type ? currentEvent?.type : "(select one)");
    const [displayEventMeetingTypeErr, setDisplayEventMeetingTypeErr] = useState(false);
    const [eventStatus, setEventStatus] = useState(currentEvent?.status ? statusType : "");
    const [displayEventStatusErr, setDisplayEventStatusErr] = useState(false);
    const [eventPrice, setEventPrice] = useState(currentEvent?.price ? String(currentEvent?.price) : "0");
    const [displayEventPriceErr, setDisplayEventPriceErr] = useState(false);

    const [eventStartDate, setEventStartDate] = useState(currentEvent?.startDate
        ? new Date(currentEvent?.startDate).toISOString().slice(0, 16) : '');
    const [displayEventStartDateErr, setDisplayEventStartDateErr] = useState(false);

    const [eventEndDate, setEventEndDate] = useState(currentEvent?.endDate
        ? new Date(currentEvent?.endDate).toISOString().slice(0, 16) : '');
    const [displayEventEndDateErr, setDisplayEventEndDateErr] = useState(false);

    const [eventImage, setEventImage] = useState(currentEvent?.EventImages ? currentEvent?.EventImages[0]?.url : '');

    const [displayEventImageErr, setDisplayEventImageErr] = useState(false);
    const [errors, setErrors] = useState({});



    if (!user || user.id !== currentGroup.organizerId) {
        history.push('/')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const err = {}
        if (!eventName) {
            err.eventName = 'Name is required';
        }
        if (eventName && eventName.length < 5) {
            err.eventName = 'Name must be 5+ characters'
        }
        if (eventMeetingType === '(select one)') {
            err.eventMeetingType = 'Event Type is required';
        }
        if (eventStatus === '(select one)') {
            err.eventStatus = 'Visibility is required';
        }
        // if (!eventPrice) {
        //     err.eventPrice = 'Price is required';
        // }
        if (eventPrice < 0) {
            err.eventPrice = 'Price is required';
        }
        // if (typeof eventPrice !== 'number'){
        //     err.eventPrice = 'Price must be a number';
        // }
        if (!eventStartDate) {
            err.eventStartDate = 'Event start is required';
        }
        if (!eventEndDate) {
            err.eventEndDate = 'Event end is required';
        }

        let imageRouteSplit = eventImage.split('.')
        let imageRouteCheck = imageRouteSplit[imageRouteSplit.length - 1]
        if (imageRouteCheck !== 'png' &&
            imageRouteCheck !== 'jpg' &&
            imageRouteCheck !== 'jpeg') {
            err.eventImage = 'Image URL must end in .png, .jpg, or .jpeg';
        }
        if (eventAbout.length < 30) {
            err.eventAbout = 'Description must be at least 30 characters long';
        }

        let newEvent;
        if (Object.keys(err).length > 0) setErrors(err)
        else {
            const eventObj = {
                venueId: null,
                name: eventName,
                type: eventMeetingType,
                statusType: eventStatus,
                capacity: 1,
                price: Number(eventPrice),
                description: eventAbout,
                startDate: eventStartDate,
                endDate: eventEndDate,
            }

            const eventImageObj = {
                url: eventImage,
                preview: true
            }

            newEvent = await dispatch(addEventByGroupIdThunk(
                {
                    groupId,
                    eventObj,
                    eventImageObj
                }
            ))
        }

        if (newEvent?.id) {
            history.push(`/events/${newEvent.id}`)
        }
    }

    // ----------------------------------err real time--------------------------------------------------

    const err = {}
    if (!eventName) {
        err.eventName = 'Name is required';
    }
    if (eventName && eventName.length < 5) {
        err.eventName = 'Name must be 5+ characters';
    }
    if (eventMeetingType === '(select one)') {
        err.eventMeetingType = 'Event Type is required';
    }
    if (eventStatus === '(select one)') {
        err.eventStatus = 'Visibility is required';
    }
    if (!(Number(eventPrice) >= 0)) {
        err.eventPrice = 'Price is required. Price must be a positive number.';
    }
    if (eventPrice.includes('.')) {
        if (eventPrice.split('.')[1].length !== 2) {
            err.eventPrice = 'Please enter either a rounded amout or two decimals'
        }
    }

    if (!eventEndDate) {
        err.eventEndDate = 'Event end is required';
    }

    let imageRouteSplit = eventImage.split('.')
    let imageRouteCheck = imageRouteSplit[imageRouteSplit.length - 1]
    if (imageRouteCheck !== 'png' &&
        imageRouteCheck !== 'jpg' &&
        imageRouteCheck !== 'jpeg') {
        err.eventImage = 'Image URL must end in .png, .jpg, or .jpeg';
    }
    if (eventAbout.length < 30) {
        err.eventAbout = 'Description must be at least 30 characters long';
    }
    if (Date.parse(eventStartDate) < Date.parse(new Date())) {
        err.eventStartDate = 'The start date must occur in the future'
    }
    if (Date.parse(eventEndDate) < Date.parse(new Date())) {
        err.eventEndDate = 'The end date must occur in the future'
    }
    if (Date.parse(eventStartDate) > Date.parse(eventEndDate)) {
        err.eventEndDate = 'The end date must occur after the start date'
    }

    let disabled;
    if (Object.values(err).length > 0) {
        disabled = 'not-allowedCursor';
    }

    let hideImageUpdate = 'Ushow';
    if (formType === 'edit') {
        hideImageUpdate = 'Uhide';
    }

    console.log("err: ", err)

    // --------------------------------- ^ err real time ^ -----------------------------------------------

    return (
        <div className='displayFlex justifyCenter marginFormTop UfontTreb'>
            <form
                className='displayFlex flex-directionColumn formWidth UnoBorder UfontTreb groupFormText'
                onSubmit={handleSubmit}>
        <div>
            {formType === "new" && <h1>Create a new event for {currentGroup.name}</h1>}
            {formType === "edit" && <h1>Edit an event for {currentGroup.name}</h1>}
        </div>
        <div className='marginBottomMed'>
            <p className='groupFormText'>What is the name of your event?</p>
            <input
                className='groupFormInput'
                type='text'
                placeholder='Event Name'
                value={eventName}
                onChange={(e) => {
                    setEventName(e.target.value)
                    setDisplayEventNameErr(true)
                }}
            ></input>

            {displayEventNameErr && <p className='error'>{err.eventName}</p>}
        </div>

                <RainbowLine />
                <div className='marginBottomMed'>
                    <div>
                        <p className='groupFormText'>Is this an in-person or online group?</p>
                        <select
                            className='groupFormInput'
                            onChange={(e) => {
                                setEventMeetingType(e.target.value)
                                setDisplayEventMeetingTypeErr(true)
                            }}
                            value={eventMeetingType}
                        >
                            <option>(select one)</option>
                            <option
                                value={'In Person'}
                            >In Person</option>
                            <option
                                value={'Online'}
                            >Online</option>
                        </select>

                    </div>
                    {displayEventMeetingTypeErr && <p className='error'>{err.eventMeetingType}</p>}
                    <div>
                        <p className='groupFormText'>Is this event private or public?</p>
                        <select
                            className='groupFormInput'
                            onChange={(e) => {
                                setEventStatus(e.target.value)
                                setDisplayEventStatusErr(true)
                            }}
                            value={eventStatus}
                        >
                            <option>(select one)</option>
                            <option
                                value={true}
                                checked={eventStatus === true}
                                onChange={() => setEventStatus(true)}
                            >Private</option>
                            <option
                                value={false}
                                checked={eventStatus === false}
                                onChange={() => setEventStatus(false)}
                            >Public</option>
                        </select>

                    </div>
                    {displayEventStatusErr && <p className='error'>{err.eventStatus}</p>}

                    <div>
                        <p className='groupFormText'>What is the price for your event?</p>
                        <input
                            className='groupFormInput'
                            type='decimal'
                            min="0"
                            placeholder="0"
                            value={eventPrice}
                            onChange={(e) => {
                                setEventPrice(e.target.value)
                                setDisplayEventPriceErr(true)
                            }}
                        />

                        {displayEventPriceErr && <p className='error'>{err.eventPrice}</p>}
                    </div>
                </div>
                {/* <div className='displayFlex justifyCenter'>
                        <img
                            className='dividerImageForm'
                            width='25%'
                            // height='10%'
                            src={formDividerImage}
                        />
                    </div> */}
                <RainbowLine />
                <div className='marginBottomMed'>
                    <p className='groupFormText'>When does your event start?</p>
                    <input
                        className='groupFormInput'
                        placeholder='MM/DD/YYYY/HH/mm AM'
                        type='datetime-local'
                        // type='date'
                        value={eventStartDate}
                        onChange={(e) => {
                            setEventStartDate(e.target.value)
                            setDisplayEventStartDateErr(true)
                        }}
                    ></input>
                    {displayEventStartDateErr && <p className='error'>{err.eventStartDate}</p>}
                    <p className='groupFormText'>When does your event end?</p>
                    <input
                        className='groupFormInput'
                        type='datetime-local'
                        value={eventEndDate}
                        onChange={(e) => {
                            setEventEndDate(e.target.value)
                            setDisplayEventEndDateErr(true)
                        }}
                    ></input>
                    {displayEventEndDateErr && <p className='error'>{err.eventEndDate}</p>}
                </div>
                <RainbowLine />
                <div className='marginBottomMed'>
                    <p className='groupFormText'>Please add in image url for your event below:</p>
                    <input
                        className='groupFormInput'
                        type='text'
                        placeholder='Image URL'
                        value={eventImage}
                        onChange={(e) => {
                            setEventImage(e.target.value)
                            setDisplayEventImageErr(true)
                        }}
                    ></input>
                    {displayEventImageErr && <p className='error'>{err.eventImage}</p>}
                </div>
                <RainbowLine />
                <div className='marginBottomMed'>
                    <p className='groupFormText'>Please describe your event</p>
                    <textarea
                        className='groupFormInput'
                        placeholder='Please include at least 30 characters'
                        value={eventAbout}
                        onChange={(e) => {
                            setEventAbout(e.target.value)
                            setDisplayEventAboutErr(true)
                        }}
                    ></textarea>
                    {displayEventAboutErr && <p className='error'>{err.eventAbout}</p>}
                </div>
                <div className='eventForm-button'>
                    {formType === "new" && <button
                        className={`UpurpleButton UbuttonDimensions border-Radius15 ${disabled}`}
                        type='submit'
                        disabled={Object.values(err).length > 0}
                    >
                        Create Event
                    </button>}
                    {formType === "edit" && <button
                        className={`UpurpleButton UbuttonDimensions border-Radius15 ${disabled}`}
                        type='submit'
                        disabled={Object.values(err).length > 0}
                    >
                        Edit Event
                    </button>}
                    {Object.values(err).length > 0 && <div className={`errors`}>
                        *Add your Event's information
                    </div>}
                </div>
            </form>
        </div>
    )
}


export default EventForm;
