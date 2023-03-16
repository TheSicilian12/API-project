import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './GroupForm.css';
import { submitGroup, editGroupThunk, getGroup } from '../../store/groupsThunk';
import {EditWrapper} from './editWrapper';


function GroupForm({currentGroup, formType}) {
    // console.log('GroupFormRunning')
    // console.log('currentGroup: ', currentGroup)

    const [location, setLocation] = useState(currentGroup.id ? `${currentGroup.city}, ${currentGroup.state}` : "");
    const [groupName, setGroupName] = useState(currentGroup.id ? currentGroup.name : "");
    const [groupAbout, setGroupAbout] = useState(currentGroup.id ? currentGroup.about : "");
    const [groupMeetingType, setGroupMeetingType] = useState(currentGroup.id ? currentGroup.type : '(select one)');
    const [groupStatus, setGroupStatus] = useState(currentGroup.id ? currentGroup.private : '(select one)');
    const [groupImage, setGroupImage] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();

    // console.log('groupStatus: ', groupStatus)
    // console.log('groupType: ', groupMeetingType)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        if (!location) {
            errors.location = 'Location is required'
        }
        if (!groupName) {
            errors.name = 'Name is required'
        }
        if (groupAbout.length < 30) {
            errors.about = 'Description must be at least 30 characters long'
        }
        // console.log('groupImage: ', groupImage)
        if (groupImage) {
            let imageCheckArr = groupImage.split('.')
            let imageCheckVal = imageCheckArr[imageCheckArr.length - 1];
            if (imageCheckVal !== 'png' &&
                imageCheckVal !== 'jpg' &&
                imageCheckVal !== 'jpeg') {
                errors.image = 'Image URL must end in .png, .jpg, or .jpeg'
            }
        }
        if (groupMeetingType !== 'In Person' &&
            groupMeetingType !== 'Online') {
            errors.meetingType = 'Group Type is required';
        }
        if (groupStatus === '(select one)') {
            errors.groupStatus = 'Visibility Type is required'
        }

        // console.log('errors: ', errors)

        // console.log('location: ', location);

        if (Object.keys(errors).length > 0) setErrors(errors);

        if (Object.keys(errors).length === 0) {

            let splitLocation = location.split(',');
            let city = splitLocation[0];
            let state = splitLocation[1];

            const payload = {
                city,
                state,
                name: groupName,
                about: groupAbout,
                type: groupMeetingType,
                private: groupStatus,
                url: groupImage
            }
            if (groupMeetingType === 'In Person') {
                payload.type = 'In person'
            }

            let createGroup;
            if (formType === 'new') {
                createGroup = await dispatch(submitGroup(currentGroup));
            }
            let updateGroup;
            if (formType === 'edit') {
                updateGroup = await dispatch(editGroupThunk(currentGroup.id));
            }
            if (createGroup) {
                // console.log('createGroup: ', createGroup)
                history.push(`/groups/${createGroup.id}`)
            }

        }
    }

    return (
        <form onSubmit={handleSubmit}>
             <div>
                <h3 className={formType}>BECOME AN ORGANIZER</h3>
                <h3 className={formType}>UPDATE YOUR GROUP'S INFORMATION</h3>
                <h2 className={formType}>We'll walk you through a few steps to build your local community</h2>
            </div>
            <div>
                <h2>
                    First, set your group's location.
                </h2>
                <p>
                    Meetup groups meet locally, in person and online. We'll connect you with people
                    in your area, and more can join you online.
                </p>
                <input
                    type='text'
                    placeholder='City, STATE'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                ></input>
                <p className='error'>{errors.location}</p>
            </div>
            <div>
                <h2>
                    What will your group's name be?
                </h2>
                <p>
                    Choose a name that will give people a clear idea of what the group is about.
                </p>
                <p>
                    Feel free to get creative! You can edit this later if you change your mind.
                </p>
                <input
                    type='text'
                    placeholder='What is your group name?'
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                ></input>
                <p className='error'>{errors.name}</p>
            </div>
           <div>
                <h2>
                    Now describe what your group will be about
                </h2>
                <p>
                    People will see this when we promote your group, but you'll be able to add to it later, too.
                </p>
                <ol>
                    <li>What's the purpose of the group?</li>
                    <li>Who should join?</li>
                    <li>What will you do at your events?</li>
                </ol>
                <textarea
                    placeholder='Please write at least 30 characters'
                    value={groupAbout}
                    onChange={(e) => setGroupAbout(e.target.value)}
                ></textarea>
                <p className='error'>{errors.about}</p>
            </div>
            <div>
                <h2>
                    Final steps...
                </h2>
                <p>
                    Is this an in person or online group?
                </p>
                <select
                    onChange={(e) => setGroupMeetingType(e.target.value)}
                    value={groupMeetingType}
                >
                    <option>(select one)</option>
                    <option>In Person</option>
                    <option>Online</option>
                </select>
                <p className='error'>{errors.meetingType}</p>
                <p>
                    Is this group private or public?
                </p>
                <select
                    onChange={(e) => setGroupStatus(e.target.value)}
                    value={groupStatus}
                >
                    <option>(select one)</option>
                    <option
                        value={true}
                        checked={groupStatus === true}
                        onChange={() => setGroupStatus(true)}
                    >Private</option>
                    <option
                        value={false}
                        checked={groupStatus === false}
                        onChange={() => setGroupStatus(false)}
                    >Public</option>
                </select>
                <p className='error'>{errors.groupStatus}</p>
                <p>
                    Please add an image url for your group below:
                </p>
                <input
                    type='text'
                    placeholder='Image Url'
                    value={groupImage}
                    onChange={(e) => setGroupImage(e.target.value)}
                ></input>
                <p className='error'>{errors.image}</p>
                {/* possibly need to adjust the input type for image */}
            </div>
            <div>
                <button
                    type='submit'
                    className={formType}
                >
                    Create group
                </button>
            </div>
        </form>
    )
}

export default GroupForm;
