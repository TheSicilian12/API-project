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


function EventForm({ currentGroup, formType }) {
    // const [location, setLocation] = useState(currentGroup.id ? `${currentGroup.city}, ${currentGroup.state}` : "");
    const [eventName, setEventName] = useState("");
    const [displayEventNameErr, setDisplayEventNameErr] = useState(false);
    const [eventAbout, setEventAbout] = useState("");
    const [displayEventAboutErr, setDisplayEventAboutErr] = useState(false);
    const [eventMeetingType, setEventMeetingType] = useState("(select one)");
    const [displayEventMeetingTypeErr, setDisplayEventMeetingTypeErr] = useState(false);
    const [eventStatus, setEventStatus] = useState("");
    const [displayEventStatusErr, setDisplayEventStatusErr] = useState(false);
    const [eventPrice, setEventPrice] = useState("0");
    const [displayEventPriceErr, setDisplayEventPriceErr] = useState(false);
    const [eventStartDate, setEventStartDate] = useState('');
    const [displayEventStartDateErr, setDisplayEventStartDateErr] = useState(false);
    const [eventEndDate, setEventEndDate] = useState('');
    const [displayEventEndDateErr, setDisplayEventEndDateErr] = useState(false);
    const [eventImage, setEventImage] = useState('');
    const [displayEventImageErr, setDisplayEventImageErr] = useState(false);
    const [errors, setErrors] = useState({});

    const groupId = useParams().id;
    // console.log('groupid: ', groupId)
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user)


    if (!user || user.id !== currentGroup.organizerId) {
        history.push('/')
    }

    // console.log('currentGroup: ', currentGroup)

    // console.log('eventName: ', eventName)
    // console.log('eventStartDate: ', eventStartDate)
    // console.log('eventEndDate: ', eventEndDate)

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
        // console.log('before if: ', eventPrice)
        // if (!eventPrice) {
        //     console.log(eventPrice)
        //     err.eventPrice = 'Price is required';
        // }
        if (eventPrice < 0) {
            err.eventPrice = 'Price is required';
        }
        if (typeof eventPrice !== 'number'){
            err.eventPrice = 'Price must be a number';
        }
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
            // console.log(imageRouteSplit)
            // console.log(imageRouteCheck)
            err.eventImage = 'Image URL must end in .png, .jpg, or .jpeg';
        }
        if (eventAbout.length < 30) {
            err.eventAbout = 'Description must be at least 30 characters long';
        }

        // console.log('eventMeetType: ', eventMeetingType)

        // console.log('price: ', typeof Number(eventPrice))
        let newEvent;
        if (Object.keys(err).length > 0) setErrors(err)
        else {
            const eventObj = {
                venueId: null,
                name: eventName,
                type: eventMeetingType,
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

        // console.log('newEvent: ', newEvent)
        if (newEvent?.id) {
            history.push(`/events/${newEvent.id}`)
        }
        // console.log('errors: ', errors)
    }

    // ----------------------------------err real time--------------------------------------------------

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
    if (!(Number(eventPrice) >= 0)) {
        err.eventPrice = 'Price is required. Price must be a positive number.';
    }
    console.log('eventPrice type: ', !(Number(eventPrice) >= 0))
    if (!eventEndDate) {
        err.eventEndDate = 'Event end is required';
    }

    let imageRouteSplit = eventImage.split('.')
    let imageRouteCheck = imageRouteSplit[imageRouteSplit.length - 1]
    if (imageRouteCheck !== 'png' &&
        imageRouteCheck !== 'jpg' &&
        imageRouteCheck !== 'jpeg') {
        // console.log(imageRouteSplit)
        // console.log(imageRouteCheck)
        err.eventImage = 'Image URL must end in .png, .jpg, or .jpeg';
    }
    if (eventAbout.length < 30) {
        err.eventAbout = 'Description must be at least 30 characters long';
    }

    let disabled;
    if (Object.values(err).length > 0) {
        disabled = 'not-allowedCursor';
    }

    let hideImageUpdate = 'Ushow';
    if (formType === 'edit') {
        hideImageUpdate = 'Uhide';
    }

    // --------------------------------- ^ err real time ^ -----------------------------------------------

    return (
        // <div>test create event</div>
        <div className='displayFlex justifyCenter marginFormTop'>
            <form
                className='displayFlex flex-directionColumn formWidth UnoBorder UfontTreb groupFormText'
                onSubmit={handleSubmit}>
                <div>
                    <h1>Create a new event for {currentGroup.name}</h1>
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
                    {/* <p className='error'>{errors.eventName}</p> */}
                    {displayEventNameErr && <p className='error'>{err.eventName}</p>}
                </div>
                <div className='displayFlex justifyCenter'>
                    <img
                        className='dividerImageForm'
                        width='25%'
                        // height='10%'
                        src={formDividerImage}
                    />
                </div>
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
                        {/* <p className='error'>{errors.eventMeetingType}</p> */}
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
                        {/* <p className='error'>{errors.eventStatus}</p> */}
                    </div>
                    {displayEventStatusErr && <p className='error'>{err.eventStatus}</p>}
                    <div>
                        <p className='groupFormText'>What is the price for your event?</p>
                        <input
                            className='groupFormInput'
                            type='decimal'
                            min="0"
                            placeholder="0"
                            // pattern="/d*"
                            onChange={(e) => {
                                setEventPrice(e.target.value)
                                setDisplayEventPriceErr(true)
                            }}
                        />
                        {/* <p className='error'>{errors.eventPrice}</p> */}
                        {displayEventPriceErr && <p className='error'>{err.eventPrice}</p>}
                    </div>
                </div>
                    <div className='displayFlex justifyCenter'>
                        <img
                            className='dividerImageForm'
                            width='25%'
                            // height='10%'
                            src={formDividerImage}
                        />
                    </div>
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
                    {/* <p className='error'>{errors.eventStartDate}</p> */}
                    {displayEventStartDateErr && <p className='error'>{err.startDate}</p>}
                    <p className='groupFormText'>When does your event end?</p>
                    <input
                        className='groupFormInput'
                        type='datetime-local'
                        // type='date'
                        value={eventEndDate}
                        onChange={(e) => {
                            setEventEndDate(e.target.value)
                            setDisplayEventEndDateErr(true)
                        }}
                    ></input>
                    {/* <p className='error'>{errors.eventEndDate}</p> */}
                    {displayEventEndDateErr && <p className='error'>{err.eventEndDate}</p>}
                </div>
                <div className='displayFlex justifyCenter'>
                    <img
                        className='dividerImageForm'
                        width='25%'
                        // height='10%'
                        src={formDividerImage}
                    />
                </div>
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
                    {/* <p className='error'>{errors.eventImage}</p> */}
                    {displayEventImageErr && <p className='error'>{err.eventImage}</p>}
                </div>
                    <div className='displayFlex justifyCenter'>
                        <img
                            className='dividerImageForm'
                            width='25%'
                            // height='10%'
                            src={formDividerImage}
                        />
                    </div>
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
                    {/* <p className='error'>{errors.eventAbout}</p> */}
                    {displayEventAboutErr && <p className='error'>{err.eventAbout}</p>}
                </div>
                <div className='displayFlex justifyCenter'>
                    <button
                         className={`UpurpleButton UbuttonDimensions border-Radius15 ${disabled}`}
                        type='submit'
                        disabled={Object.values(err).length > 0}
                    >
                        Create Event
                    </button>
                </div>
            </form>
        </div>
    )
}


export default EventForm;
