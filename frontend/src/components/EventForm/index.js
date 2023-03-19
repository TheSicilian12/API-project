import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './EventForm.css';
// import { submitGroup, editGroupThunk, getGroup } from '../../store/groupsThunk';
import EditEventWrapper from './editEventWrapper';


function EventForm({currentGroup, formType}) {
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
        </form>
        // <form onSubmit={handleSubmit}>
        //     <div>
        //         <h3 className={newForm}>BECOME AN ORGANIZER</h3>
        //         <h3 className={editForm}>UPDATE YOUR GROUP'S INFORMATION</h3>
        //         <h2 className={newForm}>We'll walk you through a few steps to build your local community</h2>
        //         <h2 className={editForm}>We'll walk you through a few steps to update your group's information</h2>
        //     </div>
        //     <div>
        //         <h2>
        //             First, set your group's location.
        //         </h2>
        //         <p>
        //             Meetup groups meet locally, in person and online. We'll connect you with people
        //             in your area, and more can join you online.
        //         </p>
        //         <input
        //             type='text'
        //             placeholder='City, STATE'
        //             value={location}
        //             onChange={(e) => setLocation(e.target.value)}
        //         ></input>
        //         <p className='error'>{errors.location}</p>
        //     </div>
        //     <div>
        //         <h2>
        //             What will your group's name be?
        //         </h2>
        //         <p>
        //             Choose a name that will give people a clear idea of what the group is about.
        //         </p>
        //         <p>
        //             Feel free to get creative! You can edit this later if you change your mind.
        //         </p>
        //         <input
        //             type='text'
        //             placeholder='What is your group name?'
        //             value={groupName}
        //             onChange={(e) => setGroupName(e.target.value)}
        //         ></input>
        //         <p className='error'>{errors.name}</p>
        //     </div>
        //    <div>
        //         <h2>
        //             Now describe what your group will be about
        //         </h2>
        //         <p>
        //             People will see this when we promote your group, but you'll be able to add to it later, too.
        //         </p>
        //         <ol>
        //             <li>What's the purpose of the group?</li>
        //             <li>Who should join?</li>
        //             <li>What will you do at your events?</li>
        //         </ol>
        //         <textarea
        //             placeholder='Please write at least 30 characters'
        //             value={groupAbout}
        //             onChange={(e) => setGroupAbout(e.target.value)}
        //         ></textarea>
        //         <p className='error'>{errors.about}</p>
        //     </div>
        //     <div>
        //         <h2>
        //             Final steps...
        //         </h2>
        //         <p>
        //             Is this an in person or online group?
        //         </p>
        //         <select
        //             onChange={(e) => setGroupMeetingType(e.target.value)}
        //             value={groupMeetingType}
        //         >
        //             <option>(select one)</option>
        //             <option value='In person'>In Person</option>
        //             <option value='Online'>Online</option>
        //         </select>
        //         <p className='error'>{errors.meetingType}</p>
        //         <p>
        //             Is this group private or public?
        //         </p>
        //         <select
        //             onChange={(e) => setGroupStatus(e.target.value)}
        //             value={groupStatus}
        //         >
        //             <option>(select one)</option>
        //             <option
        //                 value={true}
        //                 checked={groupStatus === true}
        //                 onChange={() => setGroupStatus(true)}
        //             >Private</option>
        //             <option
        //                 value={false}
        //                 checked={groupStatus === false}
        //                 onChange={() => setGroupStatus(false)}
        //             >Public</option>
        //         </select>
        //         <p className='error'>{errors.groupStatus}</p>
        //         <div className={newForm}>

        //         <p>
        //             Please add an image url for your group below:
        //         </p>
        //         <input
        //             type='text'
        //             placeholder='Image Url'
        //             value={groupImage}
        //             onChange={(e) => setGroupImage(e.target.value)}
        //             ></input>
        //         <p className='error'>{errors.image}</p>
        //         {/* possibly need to adjust the input type for image */}
        //         </div>
        //     </div>
        //     <div>
        //         <button
        //             type='submit'
        //             className={newForm}
        //         >
        //             Create group
        //         </button>
        //         <button
        //             type='submit'
        //             className={editForm}
        //         >
        //             Update group
        //         </button>
        //     </div>
        // </form>
    )
}

export default EventForm;
