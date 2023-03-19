import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './EventForm.css';
// import { submitGroup, editGroupThunk, getGroup } from '../../store/groupsThunk';
import EditEventWrapper from './editEventWrapper';
import {addEventByGroupIdThunk} from '../../store/eventsThunk'

function EventForm({ currentGroup, formType }) {
    // const [location, setLocation] = useState(currentGroup.id ? `${currentGroup.city}, ${currentGroup.state}` : "");
    const [eventName, setEventName] = useState("");
    const [eventAbout, setEventAbout] = useState("");
    const [eventMeetingType, setEventMeetingType] = useState("(select one)");
    const [eventStatus, setEventStatus] = useState("");
    const [eventPrice, setEventPrice] = useState("0");
    const [eventStartDate, setEventStartDate] = useState(Date());
    const [eventEndDate, setEventEndDate] = useState(Date());
    const [eventImage, setEventImage] = useState('');
    const [errors, setErrors] = useState({});

    // console.log('currentGroup: ', currentGroup)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const err = {}
        if (!eventName) {
            err.eventName = 'Name is required';
        }
        if (eventMeetingType === '(select one)') {
            err.eventMeetingType = 'Event Type is required';
        }
        if (eventStatus === '(select one)') {
            err.eventStatus = 'Visibility is required';
        }
        if (!eventPrice) {
            err.eventPrice = 'Price is required';
        }
        if (!eventStartDate) {
            err.eventStartDate = 'Event start is required';
        }
        if (!eventEndDate) {
            err.eventEndDate = 'Event end is required';
        }
        if (eventImage !== 'png' &&
            eventImage !== 'jpg' &&
            eventImage !== 'jpeg') {
                err.eventImage = 'Image URL must end in .png, .jpg, or .jpeg';
            }
        if (eventAbout.length < 30) {
            err.eventAbout = 'Description must be at least 30 characters long';
        }

        if (Object.keys(err).length > 0) setErrors(err)
        console.log('errors: ', errors)
    }
    return (
        // <div>test create event</div>
        <form
            onSubmit={handleSubmit}>
            <div>
                <h1>Create an event for {currentGroup.name}</h1>
            </div>
            <div>
                <p>What is the name of your event?</p>
                <input
                    type='text'
                    placeholder='Event Name'
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                ></input>
                <p className='error'>{errors.eventName}</p>
            </div>
            <div>
                <div>
                    <p>Is this an in person or online event?</p>
                    <select
                        onChange={(e) => setEventMeetingType(e.target.value)}
                        value={eventMeetingType}
                    >
                        <option>(select one)</option>
                        <option
                            value={'In person'}
                        >In Person</option>
                        <option
                            value={'Online'}
                        >Online</option>
                    </select>
                    <p className='error'>{errors.eventMeetingType}</p>
                </div>
                <div>
                    <p>Is this event private or public?</p>
                    <select
                        onChange={(e) => setEventStatus(e.target.value)}
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
                        <p className='error'>{errors.eventStatus}</p>
                </div>
                <div>
                    <p>What is the price for your event?</p>
                    <input
                        type='number'
                        min="0"
                        placeholder="0"
                        pattern="/d*" />
                        <p className='error'>{errors.eventPrice}</p>
                </div>
            </div>
            <div>
                <p>When does your event start?</p>
                <input
                    type='date'
                ></input>
                <p className='error'>{errors.eventStartDate}</p>
                <p>When does your event end?</p>
                <input
                    type='date'
                ></input>
                <p className='error'>{errors.eventEndDate}</p>
            </div>
            <div>
                <p>Please add in image url for your event below:</p>
                <input
                    type='text'
                    placeholder='Image URL'
                    value={eventImage}
                    onChange={(e) => setEventImage(e.target.value)}
                ></input>
                <p className='error'>{errors.eventImage}</p>
            </div>
            <div>
                <p>Please describe your event</p>
                <textarea
                    placeholder='Please include at least 30 characters'
                    value={eventAbout}
                    onChange={(e) => setEventAbout(e.target.value)}
                    ></textarea>
                    <p className='error'>{errors.eventAbout}</p>
            </div>
            <div>
                <button
                    type='submit'
                    >
                        Create Event
                    </button>
            </div>
        </form>
    )
}


export default EventForm;
