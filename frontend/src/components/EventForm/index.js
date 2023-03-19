import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './EventForm.css';
// import { submitGroup, editGroupThunk, getGroup } from '../../store/groupsThunk';
import EditEventWrapper from './editEventWrapper';


function EventForm({ currentGroup, formType }) {
    // const [location, setLocation] = useState(currentGroup.id ? `${currentGroup.city}, ${currentGroup.state}` : "");
    const [eventName, setEventName] = useState("");
    const [eventAbout, setEventAbout] = useState("");
    const [eventMeetingType, setEventMeetingType] = useState("(select one)");
    const [eventStatus, setEventStatus] = useState("");
    const [eventPrice, setEventPrice] = useState(0);
    const [eventStartDate, setEventStartDate] = useState(Date());
    const [eventEndDate, setEventEndDate] = useState(Date());
    const [eventImage, setEventImage] = useState('');

    console.log('currentGroup: ', currentGroup)

    return (
        // <div>test create event</div>
        <form>
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
                </div>
                <div>
                    <p>What is the price for your event?</p>
                    <input
                        type='number'
                        min="0"
                        placeholder="0"
                        pattern="/d*" />
                </div>
            </div>
            <div>
                <p>When does your event start?</p>
                <input
                    type='date'
                ></input>
                <p>When does your event end?</p>
                <input
                    type='date'
                ></input>
            </div>
            <div>
                <p>Please add in image url for your event below:</p>
                <input
                    type='text'
                    placeholder='Image URL'
                    value={eventImage}
                    onChange={(e) => setEventImage(e.target.value)}
                ></input>
            </div>
        </form>
    )
}

export default EventForm;
