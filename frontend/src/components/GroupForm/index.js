import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './GroupForm.css';
import { submitGroup, editGroupThunk, getGroup } from '../../store/groupsThunk';
import { EditWrapper } from './editWrapper';
import formDividerImage from '../assets/Images/Daco_4730261.png';


function GroupForm({ currentGroup, formType }) {
    const [location, setLocation] = useState(currentGroup.id ? `${currentGroup.city}, ${currentGroup.state}` : "");
    const [displayLocErr, setDisplayLocErr] = useState(false);
    const [groupName, setGroupName] = useState(currentGroup.id ? currentGroup.name : "");
    const [displayGroupNameErr, setDisplayGroupNameErr] = useState(false);
    const [groupAbout, setGroupAbout] = useState(currentGroup.id ? currentGroup.about : "");
    const [displayGroupAboutErr, setDisplayGroupAboutErr] = useState(false);
    const [groupMeetingType, setGroupMeetingType] = useState(currentGroup.id ? currentGroup.type : '(select one)');
    const [displayGroupMeetingTypeErr, setDisplayGroupMeetingTypeErr] = useState(false);
    const [groupStatus, setGroupStatus] = useState(currentGroup.id ? currentGroup.private : '(select one)');
    const [displayGroupStatusErr, setDisplayGroupStatusErr] = useState(false);
    const [groupImage, setGroupImage] = useState('');
    const [displayGroupImageErr, setDisplayGroupImageErr] = useState(false);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();

    // console.log('initial meetingStatus: ', typeof groupStatus)

    let editForm = 'off';
    let newForm = 'off';
    formType === 'new' ? newForm = 'on' : editForm = 'on'

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        if (!location) {
            errors.location = 'Location is required (Enter as "City, State")'
        }
        if (location.split(',').length !== 2) {
            errors.location = 'Location is required  (Enter as "City, State")'
        }
        if (!groupName) {
            errors.name = 'Name is required'
        }
        if (groupAbout.length < 30) {
            errors.about = 'Description must be at least 30 characters long'
        }
        // console.log('groupImage: ', groupImage)
        if (formType === 'new' || groupImage) {
            let imageCheckArr = groupImage.split('.')
            let imageCheckVal = imageCheckArr[imageCheckArr.length - 1];
            if (imageCheckVal !== 'png' &&
                imageCheckVal !== 'jpg' &&
                imageCheckVal !== 'jpeg') {
                errors.image = 'Image URL must end in .png, .jpg, or .jpeg'
            }
        }
        if (groupMeetingType !== 'In person' &&
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

            let splitLocation = location.split(', ');
            // console.log('location? ', location)
            let city = currentGroup.id ? currentGroup.city : splitLocation[0];
            let state = currentGroup.id ? currentGroup.state : splitLocation[1];

            // console.log('city: ', city)
            // console.log('state: ', state)

            const payload = {
                city,
                state: splitLocation[1],
                name: groupName,
                about: groupAbout,
                type: groupMeetingType,
                private: groupStatus,
                url: groupImage
            }

            let createGroup;
            if (formType === 'new') {
                createGroup = await dispatch(submitGroup(payload));
            }

            let updateGroup
            if (formType === 'edit') {
                payload.groupId = currentGroup.id
                updateGroup = await dispatch(editGroupThunk(payload));
            }
            if (createGroup) {
                // console.log('createGroup: ', createGroup)
                history.push(`/groups/${createGroup.id}`)
            }
            if (updateGroup) {
                history.push(`/groups/${currentGroup.id}`)
            }
        }
    }

    let err = {};
    if (!location) {
        err.location = 'Location is required (Enter as "City, State")'
    }
    if (location.split(',').length !== 2) {
        err.location = 'Location is required  (Enter as "City, State")'
    }
    if (!groupName) {
        err.name = 'Name is required'
    }
    if (groupAbout.length < 30) {
        err.about = 'Description must be at least 30 characters long'
    }
    // console.log('groupImage: ', groupImage)
    if (formType === 'new' || groupImage) {
        let imageCheckArr = groupImage.split('.')
        let imageCheckVal = imageCheckArr[imageCheckArr.length - 1];
        if (imageCheckVal !== 'png' &&
            imageCheckVal !== 'jpg' &&
            imageCheckVal !== 'jpeg') {
            err.image = 'Image URL must end in .png, .jpg, or .jpeg'
        }
    }
    if (groupMeetingType !== 'In person' &&
        groupMeetingType !== 'Online') {
        err.meetingType = 'Group Type is required';
    }
    if (groupStatus === '(select one)') {
        err.groupStatus = 'Visibility Type is required'
    }


    return (
        <form onSubmit={handleSubmit}>
            <div>
                {/* <h3 className={newForm}>BECOME AN ORGANIZER</h3> */}
                <h3 className={newForm}>Start a New Group</h3>
                <h3 className={editForm}>UPDATE YOUR GROUP'S INFORMATION</h3>
                <h2 className={newForm}>We'll walk you through a few steps to build your local community</h2>
                <h2 className={editForm}>We'll walk you through a few steps to update your group's information</h2>
            </div>
            <div>
                <h2>
                    Set your group's location
                </h2>
                <p>
                    AdventureUp groups meet locally, in person, and online.
                    We'll connect you with people in your area.
                </p>
                <input
                    type='text'
                    placeholder='City, STATE'
                    value={location}
                    onChange={(e) => {
                        setLocation(e.target.value)
                        setDisplayLocErr(true)
                    }}
                ></input>
                {displayLocErr && <p className='error'>{err.location}</p>}
            </div>
            <img
                width='25%'
                // height='10%'
                src={formDividerImage}
            />
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
                    onChange={(e) => {
                        setGroupName(e.target.value)
                        setDisplayGroupNameErr(true)
                    }}
                ></input>
                {displayGroupNameErr && <p className='error'>{err.name}</p>}
            </div>
            <img
                width='25%'
                // height='10%'
                src={formDividerImage}
            />
            <div>
                <h2>
                    Describe the purpose of your group
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
                    onChange={(e) => {
                        setGroupAbout(e.target.value)
                        setDisplayGroupAboutErr(true)
                    }}
                ></textarea>
                {displayGroupAboutErr && <p className='error'>{err.about}</p>}
            </div>
            <img
                width='25%'
                // height='10%'
                src={formDividerImage}
            />
            <div>
                <h2>
                    Final steps...
                </h2>
                <div className='displayFlex flex-directionColumn'>
                    <div className='displayFlex'>
                        <label for='meetingType'>
                            Is this an in person or online group?
                        </label>
                        <select
                            name='meetingType'
                            onChange={(e) => {
                                setGroupMeetingType(e.target.value)
                                setDisplayGroupMeetingTypeErr(true)
                            }}
                            value={groupMeetingType}
                        >
                            <option>(select one)</option>
                            <option value='In person'>In Person</option>
                            <option value='Online'>Online</option>
                        </select>
                    </div>
                    {displayGroupMeetingTypeErr && <p className='error'>{err.meetingType}</p>}
                    <div className='displayFlex flex-directionColumn'>
                        <div className='displayFlex'>
                            <label>
                                Is this group private or public?
                            </label>
                            <select
                                onChange={(e) => {
                                    setGroupStatus(e.target.value)
                                    setDisplayGroupStatusErr(true)
                                }}
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
                        </div>
                    </div>
                    {displayGroupStatusErr && <p className='error'>{err.groupStatus}</p>}
                    <div className={newForm}>
                        <label>
                            Please add an image url for your group below:
                        </label>
                        <input
                            type='text'
                            placeholder='Image Url'
                            value={groupImage}
                            onChange={(e) => {
                                setGroupImage(e.target.value)
                                setDisplayGroupImageErr(true)
                            }}
                        ></input>
                        {displayGroupImageErr && <p className='error'>{err.image}</p>}
                        {/* possibly need to adjust the input type for image */}
                    </div>
                </div>
            </div>
            <div>
                <button
                    type='submit'
                    className={newForm}
                    disabled={Object.values(err).length > 0}
                >
                    Create Group
                </button>
                <button
                    type='submit'
                    className={editForm}
                    disabled={Object.values(err).length > 0}
                >
                    Update Group
                </button>
            </div>
        </form>
    )
}

export default GroupForm;
